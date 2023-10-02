import {
  setupRecording,
  SetupRecordingInput,
  mutations,
  Recording,
} from '@jupiterone/integration-sdk-testing';

export { Recording } from '@jupiterone/integration-sdk-testing';
export function setupJumpCloudRecording(input: SetupRecordingInput): Recording {
  return setupRecording({
    mutateEntry,
    redactedRequestHeaders: ['x-api-key'],
    ...input,
  });
}

export async function withRecording(
  recordingName: string,
  directoryName: string,
  cb: () => Promise<void>,
  options?: SetupRecordingInput['options'],
) {
  const recording = setupRecording({
    directory: directoryName,
    name: recordingName,
    redactedRequestHeaders: ['x-api-key'],
    mutateEntry,
    options: {
      recordFailedRequests: false,
      ...(options || {}),
    },
  });

  try {
    await cb();
  } finally {
    await recording.stop();
  }
}
function mutateEntry(entry) {
  mutations.unzipGzippedRecordingEntry(entry);
  const responseContent = JSON.parse(entry.response.content.text);
  if (responseContent.results && Array.isArray(responseContent.results)) {
    for (const result of responseContent.results) {
      if (result.config) {
        //has SAML certs in it
        result.config = '[REDACTED]';
      }
    }
    entry.response.content.text = JSON.stringify(responseContent);
  }
}
