import { Job, JobsOptions } from 'bullmq';

export interface MetaDataBullMQ {
  /**
   * The id of the job
   * @type {string}
   * @memberof MetaData
   * @example '1'
   */
  id: string;
  /**
   * The name of the job
   * @type {string}
   * @memberof MetaDataBullMQ
   * @example 'translate'
   * @description This is the name of the job, not the queue
   * @see https://api.docs.bullmq.io/classes/Job.html#name
   */
  name: string;
  /**
   * The timestamp of the job
   * @type {number}
   * @memberof MetaDataBullMQ
   * @example 1611234567890
   * @description Timestamp when the job was created
   * @see https://api.docs.bullmq.io/classes/Job.html#timestamp
   */
  timestamp: number;
  /**
   * The options object for this job.
   * @type {JobsOptions}
   * @memberof MetaDataBullMQ
   * @example { attempts: 3, backoff: { type: 'exponential', delay: 1000 } }
   * @see https://api.docs.bullmq.io/types/JobsOptions.html
   * @see https://api.docs.bullmq.io/interfaces/BaseJobOptions.html
   */
  opts: JobsOptions;
  /**
   * The job object
   * @type {Job}
   * @memberof MetaDataBullMQ
   * @see https://api.docs.bullmq.io/classes/Job.html
   */
  job: Job;
  /**
   * the unique token for the job
   * @type {string}
   * @memberof MetaDataBullMQ
   */
  token: string;
}

export interface TranslateBullMQ {
  /**
   * The content of the job
   * @type {Job['data']}
   * @memberof TranslateBullMQ
   * @example { text: 'Hello World', from: 'en', to: 'de' }
   * @see https://api.docs.bullmq.io/classes/Job.html#data
   */
  content: Job['data'];
  /**
   * The metadata of the evolutty
   * @type {MetaDataBullMQ}
   * @memberof TranslateBullMQ
   * @see MetaDataBullMQ
   */
  metadata: MetaDataBullMQ;
}
