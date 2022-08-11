import {
  createDirectRelationship,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { JumpCloudClient } from '../../jumpcloud/client';
import { IntegrationConfig } from '../../config';
import { DeviceRelationships, DeviceEntities } from './constants';
import { createDeviceEntity } from './converters';

export async function fetchDevices({
  instance,
  jobState,
  logger,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const client = new JumpCloudClient({
    logger,
    apiKey: instance.config.apiKey,
  });

  await client.iterateDevices(async (application) => {
    await jobState.addEntity(createDeviceEntity(application));
  });
}

export async function fetchDeviceRelationships({
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
      _type: DeviceEntities.DEVICE._type,
    },
    async (deviceEntity) => {
      const deviceId = deviceEntity.id as string;
      await client.iterateAppsByDevice(deviceId, async (app) => {
        const appId = app.id;
        if (!appId) {
          return;
        }
        const appEntity = await jobState.findEntity(appId);

        if (!appEntity) {
          // It's possible that this user was created in between the time that
          // we collected all users and now. Just ignore this one and carry on!
          return;
        }

        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.INSTALLED,
            from: deviceEntity,
            to: appEntity,
          }),
        );
      });

      await client.iterateUsersByDevice(deviceId, async (user) => {
        const userId = user.id;
        if (!userId) {
          return;
        }
        const userEntity = await jobState.findEntity(userId);

        if (!userEntity) {
          return;
        }
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.HAS,
            from: userEntity,
            to: deviceEntity,
          }),
        );
      });
    },
  );
}

export const deviceSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: 'fetch-devices',
    name: 'Fetch Devices',
    entities: [DeviceEntities.DEVICE],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchDevices,
  },
  {
    id: 'fetch-device-relationships',
    name: 'Fetch Device Relationships',
    entities: [],
    relationships: [
      DeviceRelationships.DEVICE_INSTALLED_APPLICATION,
      DeviceRelationships.USER_HAS_DEVICE,
    ],
    dependsOn: ['fetch-applications', 'fetch-users', 'fetch-devices'],
    executionHandler: fetchDeviceRelationships,
  },
];
