import { JumpCloudAppleDevice, JumpCloudAppleMDM } from '../../jumpcloud/types';
import { AppleEntities } from './constants';
import {
  createIntegrationEntity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
export function createAppleMDMEntity(data: JumpCloudAppleMDM) {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: data.id,
        _type: AppleEntities.APPLE_MDM._type,
        _class: AppleEntities.APPLE_MDM._class,
        id: data.id,
        displayName: data.name,
        depServerTokenState: data.depServerTokenState,
        apnsCertExpiry: data.apnsCertExpiry,
        appleCertSerialNumber: data.appleCertSerialNumber,
      },
    },
  });
}
export function createAppleMDMDevice(data: JumpCloudAppleDevice) {
  return createIntegrationEntity({
    entityData: {
      source: data,
      assign: {
        _key: data.id,
        _type: AppleEntities.APPLE_DEVICE._type,
        _class: AppleEntities.APPLE_DEVICE._class,
        id: data.id,
        serial: data.serialNumber,
        deviceId: data.udid,
        osVersion: data.osVersion,
        depRegistered: data.depRegistered,
        enrolled: data.enrolled,
        createdAt: parseTimePropertyValue(data.createdAt),
        hasActivationLockBypassCodes: data.hasActivationLockBypassCodes,
        isSupervised: data.deviceInformation.isSupervised,
        deviceCapacity: data.deviceInformation.deviceCapacity,
        name: data.deviceInformation.deviceName,
        macAddress: data.deviceInformation.wifiMac,
        category: data.deviceInformation.modelName,
        model: data.deviceInformation.modelName,
        make: 'Apple',
      },
    },
  });
}
