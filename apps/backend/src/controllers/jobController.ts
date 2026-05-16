import { Request, Response } from 'express';
import { emailQueue } from '../queues/queueConfig.js';

export const scheduleEmail = async (req: Request, res: Response) => {
    const { to, subject, html, text } = req.body;
    if (!to || (!html && !text)) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const job = await emailQueue.add('send-email', {
        to,
        subject,
        html,
        text,
    });

    res.json({ jobId: job.id, message: 'Email scheduled' });
};

export const getJobStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const job = await emailQueue.getJob(id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    const state = await job.getState();
    res.json({ id: job.id, state, data: job.data, result: job.returnvalue, failedReason: job.failedReason });
};
