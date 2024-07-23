import { Server } from '../../../src/apps/pecera/server';
import { envs } from '../../../src/config/envs.plugin';

jest.mock('../../../src/apps/pecera/server');

describe('Pecera', () => {
  it('should start', async () => {
    await import('../../../src/apps/pecera/start');
    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith(envs.HOST, envs.PORT);
  });
});
