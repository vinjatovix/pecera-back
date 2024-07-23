import { buildLogger } from '../../Contexts/shared/plugins';
import { Pecera } from './Pecera';

const logger = buildLogger('start');

try {
  new Pecera().start();
} catch (e) {
  logger.error("Error in Pecera's start");
  process.exit(1);
}

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}, ${err.stack}`);
  process.exit(1);
});

process.on(
  'unhandledRejection',
  (reason: unknown, promise: Promise<unknown>) => {
    if (reason instanceof Error) {
      logger.error(`Unhandled Rejection: ${reason.message}, ${promise}`);
    } else {
      logger.error(`Unhandled Rejection: ${reason}, ${promise}`);
    }
    process.exit(1);
  }
);
