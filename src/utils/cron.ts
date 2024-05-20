import cron from 'node-cron';

export type CronFn = () => void;

const runCron = (v: string, cb: CronFn) => cron.schedule(v, cb);

export default runCron;

// const sec = '*/10 * * * * *'
// const min = '*/10 * * * *'
