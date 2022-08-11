import { createMockDevice } from '../../../test/mocks';
import { createDeviceEntity } from './converters';

describe('#createDeviceEntity', () => {
  test('should convert data', () => {
    expect(createDeviceEntity(createMockDevice())).toMatchSnapshot();
  });
});
