import { JumpCloudObject } from '.';

export interface JumpCloudDevice extends JumpCloudObject {
  createdAt: string;
  depRegistered: boolean;
  deviceInformation: {
    activationLockAllowedWhileSupervised: boolean;
    availableDeviceCapacity: number;
    deviceCapacity: number;
    deviceName: string;
    iccid: string;
    imei: string;
    isActivationLockEnabled: boolean;
    isSupervised: boolean;
    modelName: string;
    subscriberCarrierNetwork: string;
    wifiMac: string;
  };
  enrolled: boolean;
  hasActivationLockBypassCodes: boolean;
  id: string;
  osVersion: string;
  securityInfo: {
    enrolledViaDep: boolean;
    isActivationLockManageable: boolean;
    isUserEnrollment: boolean;
    passcodePresent: boolean;
    userApprovedEnrollment: boolean;
  };
  serialNumber: string;
  udid: string;
}

export interface JumpCloudDeviceMDM extends JumpCloudObject {
  ades: {
    ios: {
      defaultDeviceGroupObjectIds: [string];
      enableZeroTouchEnrollment: boolean;
      setupAssistantOptions: [
        {
          option: string;
        },
      ];
      welcomeScreen: {
        button: string;
        paragraph: string;
        title: string;
      };
    };
    macos: {
      defaultDeviceGroupObjectIds: [string];
      enableZeroTouchEnrollment: boolean;
      setupAssistantOptions: [
        {
          option: string;
        },
      ];
      welcomeScreen: {
        button: string;
        paragraph: string;
        title: string;
      };
    };
  };
  allowMobileUserEnrollment: boolean;
  apnsCertExpiry: string;
  apnsPushTopic: string;
  defaultIosUserEnrollmentDeviceGroupID: string;
  defaultSystemGroupID: string;
  dep: {
    enableZeroTouchEnrollment: boolean;
    setupAssistantOptions: [
      {
        option: string;
      },
    ];
    welcomeScreen: {
      button: string;
      paragraph: string;
      title: string;
    };
  };
  depAccessTokenExpiry: string;
  depServerTokenState: boolean | unknown;
  id: string;
  name: string;
}

export interface JumpCloudSystemInsightsApp extends JumpCloudObject {
  applescript_enabled: number;
  bundle_executable: string;
  bundle_identifier: string;
  bundle_name: string;
  bundle_package_type: string;
  bundle_short_version: number;
  bundle_version: number;
  category: string;
  collection_time: string;
  compiler: string;
  copyright: string;
  development_region: string;
  display_name: string;
  element: string;
  environment: string;
  info_string: string;
  last_opened_time: number;
  minimum_system_version: number;
  name: string;
  path: string;
  system_id: string;
}
