import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';
import { OrgEntities } from '../orgs/constants';

export const AppleEntities: Record<
  'APPLE_MDM' | 'APPLE_DEVICE',
  StepEntityMetadata
> = {
  APPLE_MDM: {
    _type: 'jumpcloud_apple_mdm',
    _class: ['Configuration'],
    resourceName: 'Configuration',
  },
  APPLE_DEVICE: {
    _type: 'jumpcloud_apple_device',
    _class: ['Device'],
    resourceName: 'Device',
  },
};
export const AppleRelationships: Record<
  'ORG_HAS_MDM_APPLE' | 'APPLE_DEVICE_HAS_MDM',
  StepRelationshipMetadata
> = {
  ORG_HAS_MDM_APPLE: {
    _type: 'jumpcloud_account_has_apple_mdm',
    _class: RelationshipClass.HAS,
    sourceType: OrgEntities.ORG._type,
    targetType: AppleEntities.APPLE_MDM._type,
  },
  APPLE_DEVICE_HAS_MDM: {
    _type: 'jumpcloud_apple_device_has_mdm',
    _class: RelationshipClass.HAS,
    sourceType: AppleEntities.APPLE_DEVICE._type,
    targetType: AppleEntities.APPLE_MDM._type,
  },
};
