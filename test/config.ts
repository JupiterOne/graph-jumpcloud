import * as dotenv from 'dotenv';
import * as path from 'path';
import { IntegrationConfig } from '../src/config';
import { StepTestConfig } from '@jupiterone/integration-sdk-testing';
import { invocationConfig } from '../src';
if (process.env.LOAD_ENV) {
  dotenv.config({
    path: path.join(__dirname, '../.env'),
  });
}

export const integrationConfig: IntegrationConfig = {
  apiKey: process.env.API_KEY || 'test-api-key',
};

export function getStepTestConfigForStep(
  stepId: string,
): StepTestConfig<any, IntegrationConfig> {
  return {
    stepId,
    instanceConfig: integrationConfig,
    invocationConfig: {
      ...invocationConfig,
    } as any,
  };
}
