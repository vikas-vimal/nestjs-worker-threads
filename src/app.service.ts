import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import { WorkerThreadFilePath } from './workers/workers-config';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  blockingIO(cpuTimeMs: number) {
    const startTime = Date.now();
    while (Date.now() - startTime < cpuTimeMs) {}

    return {
      code: 200,
      success: true,
      message: 'OK',
      data: null,
    };
  }

  workerIO(cpuTimeMs: number) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(WorkerThreadFilePath, {
        workerData: {
          cpuTimeMs,
        },
      });
      worker.on('message', (data) => {
        console.log('Main thread received data from worker', data);
        resolve(data);
      });
      worker.on('error', (error) => {
        console.log('Worker thread got error', error);
        reject(error);
      });
      worker.on('exit', (code) => {
        console.log('Worker thread exited with code', code);
      });
    });
  }
}
