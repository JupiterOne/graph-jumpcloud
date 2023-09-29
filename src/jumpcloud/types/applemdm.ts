export interface JumpCloudAppleMDM {
  ades: Ades;
  allowMobileUserEnrollment: boolean;
  apnsCertExpiry: string;
  apnsPushTopic: string;
  appleCertCreatorAppleID: string;
  appleCertSerialNumber: string;
  defaultIosUserEnrollmentDeviceGroupID: string;
  defaultSystemGroupID: string;
  dep: Dep;
  depAccessTokenExpiry: string;
  depServerTokenState: string;
  id: string;
  name: string;
  organization: string;
}

export interface Ades {
  ios: Ios;
  macos: Ios;
}

export interface Ios {
  defaultDeviceGroupObjectIds: string[];
  enableZeroTouchEnrollment: boolean;
  setupAssistantOptions: SetupAssistantOption[];
  setupOptions: string[];
  welcomeScreen: WelcomeScreen;
}

export interface SetupAssistantOption {
  option: string;
}

export interface WelcomeScreen {
  button: string;
  paragraph: string;
  title: string;
}

export interface Dep {
  enableZeroTouchEnrollment: boolean;
  setupAssistantOptions: SetupAssistantOption[];
  welcomeScreen: WelcomeScreen;
}

export interface JumpCloudAppleDevice {
  createdAt: string;
  depRegistered: boolean;
  deviceInformation: DeviceInformation;
  enrolled: boolean;
  hasActivationLockBypassCodes: boolean;
  id: string;
  osVersion: string;
  securityInfo: SecurityInfo;
  serialNumber: string;
  udid: string;
}

export interface DeviceInformation {
  activationLockAllowedWhileSupervised: boolean;
  availableDeviceCapacity: number;
  deviceCapacity: number;
  deviceName: string;
  iccid: string;
  imei: string;
  isSupervised: boolean;
  modelName: string;
  secondIccid: string;
  secondImei: string;
  secondSubscriberCarrierNetwork: string;
  subscriberCarrierNetwork: string;
  wifiMac: string;
}

export interface SecurityInfo {
  enrolledViaDep: boolean;
  isActivationLockManageable: boolean;
  isUserEnrollment: boolean;
  passcodePresent: boolean;
  userApprovedEnrollment: boolean;
}
