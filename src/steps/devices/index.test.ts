import { createMockStepExecutionContext } from '@jupiterone/integration-sdk-testing';
import { fetchDevices, fetchDeviceRelationships } from '.';
import { withRecording } from '../../../test/recording';
import { integrationConfig } from '../../../test/config';
import { IntegrationConfig } from '../../config';
import { DeviceEntities, DeviceRelationships } from './constants';
import { RelationshipClass } from '@jupiterone/integration-sdk-core';
import { fetchApplications } from '../applications';
import { fetchUsers } from '../users';

describe('#fetchDevices', () => {
  test.skip('should collect data', async () => {
    await withRecording('fetchDevices', __dirname, async () => {
      const context = createMockStepExecutionContext<IntegrationConfig>({
        instanceConfig: integrationConfig,
      });

      await fetchDevices(context);

      expect({
        numCollectedEntities: context.jobState.collectedEntities.length,
        numCollectedRelationships:
          context.jobState.collectedRelationships.length,
        collectedEntities: context.jobState.collectedEntities,
        collectedRelationships: context.jobState.collectedRelationships,
        encounteredTypes: context.jobState.encounteredTypes,
      }).toMatchSnapshot();

      expect(
        context.jobState.collectedEntities.filter(
          (e) => e._type === DeviceEntities.DEVICE._type,
        ),
      ).toMatchGraphObjectSchema({
        _class: ['Device'],
        schema: {
          additionalProperties: true,
          properties: {
            _type: { const: 'jumpcloud_device' },
            _rawData: {
              type: 'array',
              items: { type: 'object' },
            },
            attributes: { type: 'string' },
          },
        },
      });
    });
  });
});

describe('#fetchAppBoundUsersAndGroups', () => {
  test.skip('should collect data', async () => {
    await withRecording('fetchApplications', __dirname, async () => {
      const context = createMockStepExecutionContext<IntegrationConfig>({
        instanceConfig: integrationConfig,
      });

      await fetchDevices(context);
      await fetchApplications(context);
      await fetchUsers(context);
      await fetchDeviceRelationships(context);

      expect({
        numCollectedEntities: context.jobState.collectedEntities.length,
        numCollectedRelationships:
          context.jobState.collectedRelationships.length,
        collectedEntities: context.jobState.collectedEntities,
        collectedRelationships: context.jobState.collectedRelationships,
        encounteredTypes: context.jobState.encounteredTypes,
      }).toMatchSnapshot();

      expect(
        context.jobState.collectedRelationships.filter(
          (r) =>
            r._type === DeviceRelationships.DEVICE_INSTALLED_APPLICATION._type,
        ),
      ).toMatchDirectRelationshipSchema({
        schema: {
          properties: {
            _class: { const: RelationshipClass.INSTALLED },
            _type: { const: 'jumpcloud_device_installed_application' },
          },
        },
      });

      expect(
        context.jobState.collectedRelationships.filter(
          (r) => r._type === DeviceRelationships.USER_HAS_DEVICE._type,
        ),
      ).toMatchDirectRelationshipSchema({
        schema: {
          properties: {
            _class: { const: RelationshipClass.HAS },
            _type: { const: 'jumpcloud_user_has_device' },
          },
        },
      });
    });
  });
});
