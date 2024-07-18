import { Pecera } from "../../../../src/apps/pecera/Pecera";
import { Server } from "../../../../src/apps/pecera/server";



describe('Pecera', () => {
  let pecera: Pecera;
  const listenSpy = jest.spyOn(Server.prototype, 'listen');
  const stopSpy = jest.spyOn(Server.prototype, 'stop');

  beforeAll(() => {
    pecera = new Pecera();
  });

  afterEach(async () => {
    if (pecera.httpServer?.listening) {
      await pecera.stop();
    }
  });

  it('should start the server', async () => {
    await pecera.start();

    expect(listenSpy).toHaveBeenCalled();
  });

  it('should stop the server', async () => {
    await pecera.start();

    await pecera.stop();

    expect(stopSpy).toHaveBeenCalled();
  });

  it('should return the HTTP server', async () => {
    await pecera.start();

    const httpServer = pecera.httpServer;

    expect(httpServer).toBeDefined();
  });
});
