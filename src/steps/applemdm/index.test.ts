import {
  Recording,
  executeStepWithDependencies,
} from '@jupiterone/integration-sdk-testing';
import { setupJumpCloudRecording } from '../../../test/recording';
import { getStepTestConfigForStep } from '../../../test/config';

let recording: Recording;

afterEach(async () => {
  if (recording) {
    await recording.stop();
  }
});
test('fetch-apple-mdm', async () => {
  const stepTestConfig = getStepTestConfigForStep('fetch-apple-mdm');

  recording = setupJumpCloudRecording({
    name: 'fetch-apple-mdm',
    directory: __dirname,
  });

  const stepResults = await executeStepWithDependencies(stepTestConfig);
  expect(stepResults).toMatchStepMetadata(stepTestConfig);
}, 10_000);

test('fetch-apple-devices', async () => {
  const stepTestConfig = getStepTestConfigForStep('fetch-apple-devices');

  recording = setupJumpCloudRecording({
    name: 'fetch-apple-devices',
    directory: __dirname,
  });

  const stepResults = await executeStepWithDependencies(stepTestConfig);
  expect(stepResults).toMatchStepMetadata(stepTestConfig);
}, 10_000);
