import { createMockUser } from '../../../test/mocks';
import { JumpCloudUser } from '../../jumpcloud/types';
import { createUserEntity } from './converters';

describe('#createUserEntity', () => {
  test('should convert data', () => {
    expect(createUserEntity(createMockUser())).toMatchSnapshot();
  });

  test('should set active field correctly', () => {
    const mockUser: JumpCloudUser = {
      ...createMockUser(),
      state: 'ACTIVATED',
      activated: true,
      suspended: false,
    };
    expect(createUserEntity(mockUser).active).toBe(true);

    mockUser.state = 'SUSPENDED';
    mockUser.suspended = false;
    expect(createUserEntity(mockUser).active).toBe(true);

    mockUser.suspended = true;
    expect(createUserEntity(mockUser).active).toBe(false);
  });
});
