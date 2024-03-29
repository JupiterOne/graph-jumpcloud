import { JumpCloudObject } from '.';

export interface JumpCloudApplication extends JumpCloudObject {
  active?: boolean | null;
  name?: string | null;
  beta?: boolean | null;
  displayName?: string | null;
  displayLabel?: string | null;
  organization?: string | null;
  description?: string | null;
  ssoUrl?: string | null;
  learnMore?: string | null;
  created?: string | null;
  config?: object | null;
  sso?: {
    jit: boolean | null;
    beta: boolean | null;
    type: string | null;
    idpCertExpirationAt: string | null;
  };
}

export interface JumpCloudApplicationConfig {
  idpEntityId?: JumpCloudApplicationConfigOptions | null;
  idpCertificate?: JumpCloudApplicationConfigOptions | null;
  idpPrivateKey?: JumpCloudApplicationConfigOptions | null;
  spEntityId?: JumpCloudApplicationConfigOptions | null;
  acsUrl?: JumpCloudApplicationConfigOptions | null;
  constantAttributes?: JumpCloudApplicationConfigOptions | null;
}

export interface JumpCloudApplicationConfigOptions {
  label?: string | null;
  readOnly?: boolean | null;
  toggle?: null;
  tooltip?: object | null;
  type?: string | null;
  value?: string | JumpCloudApplicationConfigAttribute[] | null;
  visible?: boolean | null;
  options?: null;
  required?: boolean | null;
  mutable?: boolean | null;
  position?: number | null;
}

export interface JumpCloudApplicationConfigAttribute {
  name?: string | null;
  value?: string | null;
  required?: boolean | null;
  visible?: boolean | null;
  readOnly?: boolean | null;
}
