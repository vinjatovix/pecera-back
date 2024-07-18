import dotenv from 'dotenv';
import { Pecera } from './Pecera';

dotenv.config();

try {
  new Pecera().start();
} catch (e) {
  console.error(e);
  process.exit(1);
}

process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err);
  process.exit(1);
});

process.on(
  'unhandledRejection',
  (reason: unknown, promise: Promise<unknown>) => {
    if (reason instanceof Error) {
      console.error(`Unhandled Rejection: ${reason.message}, ${promise}`);
    } else {
      console.error(`Unhandled Rejection: ${reason}, ${promise}`);
    }
    process.exit(1);
  }
);
