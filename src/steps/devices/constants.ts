import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';
import { ApplicationEntities } from '../applications/constants';
import { UserEntities } from '../users/constants';

export const DeviceEntities: Record<'DEVICE', StepEntityMetadata> = {
  DEVICE: {
    _type: 'jumpcloud_device',
    _class: ['Device'],
    resourceName: 'Device',
  },
};

export const DeviceRelationships: Record<
  'DEVICE_INSTALLED_APPLICATION' | 'USER_HAS_DEVICE',
  StepRelationshipMetadata
> = {
  DEVICE_INSTALLED_APPLICATION: {
    _type: 'jumpcloud_device_installed_application',
    _class: RelationshipClass.INSTALLED,
    sourceType: DeviceEntities.DEVICE._type,
    targetType: ApplicationEntities.APPLICATION._type,
  },
  USER_HAS_DEVICE: {
    _type: 'jumpcloud_user_has_device',
    _class: RelationshipClass.HAS,
    sourceType: UserEntities.USER._type,
    targetType: DeviceEntities.DEVICE._type,
  },
};
