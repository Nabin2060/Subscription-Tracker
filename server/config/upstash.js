import { Client as workflowClient } from '@upstash/workflow';
import config from './config.js';

export const workFlowClient = new workflowClient({
    baseUrl: config.UPSTASH_QSTASH_URL,
    token: config.UPSTASH_QSTASH_AUTH_TOKEN,
});

