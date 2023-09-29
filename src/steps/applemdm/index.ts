import {
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
  createDirectRelationship,
} from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../config';
import { JumpCloudClient } from '../../jumpcloud/client';
import { AppleEntities, AppleRelationships } from './constants';
import { createAppleMDMDevice, createAppleMDMEntity } from './converters';
import { OrgEntities } from '../orgs/constants';

export async function fetchAppleMDM({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = new JumpCloudClient({
    logger,
    apiKey: instance.config.apiKey,
  });

  await client.iterateAppleMDM(async (mdm) => {
    await jobState.addEntity(createAppleMDMEntity(mdm));

    if (jobState.hasKey(mdm.organization)) {
      await jobState.addRelationship(
        createDirectRelationship({
          _class: RelationshipClass.HAS,
          toKey: mdm.id,
          fromKey: mdm.organization,
          toType: AppleEntities.APPLE_MDM._type,
          fromType: OrgEntities.ORG._type,
        }),
      );
    }
  });
}

export async function fetchAppleDevices({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = new JumpCloudClient({
    logger,
    apiKey: instance.config.apiKey,
  });

  await jobState.iterateEntities(
    {
      _type: AppleEntities.APPLE_MDM._type,
    },
    async (appleMdm) => {
      await client.iterateAppleDevices(appleMdm._key, async (device) => {
        const deviceEntity = await jobState.addEntity(
          createAppleMDMDevice(device),
        );
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: deviceEntity,
            to: appleMdm,
          }),
        );
      });
    },
  );
}
export const appleSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: 'fetch-apple-mdm',
    name: 'Fetch Apple MDM',
    entities: [AppleEntities.APPLE_MDM],
    relationships: [AppleRelationships.ORG_HAS_MDM_APPLE],
    dependsOn: ['fetch-orgs'],
    executionHandler: fetchAppleMDM,
  },
  {
    id: 'fetch-apple-devices',
    name: 'Fetch Apple Devices',
    entities: [AppleEntities.APPLE_DEVICE],
    relationships: [AppleRelationships.APPLE_DEVICE_HAS_MDM],
    dependsOn: ['fetch-apple-mdm'],
    executionHandler: fetchAppleDevices,
  },
];
