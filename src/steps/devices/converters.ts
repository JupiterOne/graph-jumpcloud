import {
  createIntegrationEntity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { JumpCloudDevice } from '../../jumpcloud/types';
import { DeviceEntities } from './constants';

export function createDeviceEntity(data: JumpCloudDevice) {
  const deviceId = data.id || (data._id as string);

  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: deviceId,
        _type: DeviceEntities.DEVICE._type,
        _class: DeviceEntities.DEVICE._class,
        id: data.id,
        name: data.deviceInformation.deviceName,
        displayName: data.deviceInformation.deviceName,
        createdOn: parseTimePropertyValue(data.created),
      },
    },
  });
}
