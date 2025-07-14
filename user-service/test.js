const { Worker } = require('worker_threads');
const { monitorEventLoopDelay } = require('perf_hooks');
const h = monitorEventLoopDelay();
h.enable();

const bigArray = Array.from({ length: 500_000 }, (_, i) => 'abcdefghij' + i);

setInterval(() => {
  const worker = new Worker('./fib-worker.js');
  worker.postMessage(40); // Heavy calculation in worker

  worker.on('message', (result) => {
    console.log('Fibonacci result:', result);
    const mem = process.memoryUsage();
    console.log(
      `Heap Used: ${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB | ` +
      `Heap Total: ${(mem.heapTotal / 1024 / 1024).toFixed(2)} MB | ` +
      `Event Loop Latency (mean): ${(h.mean / 1e6).toFixed(2)} ms`
    );
    worker.terminate();
  });
}, 2000);