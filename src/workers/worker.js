import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AppService } from '../app.service';
import { parentPort, workerData } from 'worker_threads';

async function runWorker() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appService = app.get(AppService);
  console.log('Worker received data', workerData);
  const result = appService.blockingIO(workerData.cpuTimeMs);
  parentPort.postMessage(result);
}

runWorker();
