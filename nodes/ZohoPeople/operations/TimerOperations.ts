import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { zohoApiRequest } from '../GenericFunctions';

export async function executeTimerOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	let responseData: IDataObject = {};

	if (operation === 'startTimer') {
		const user = this.getNodeParameter('user', itemIndex) as string;
		const jobId = this.getNodeParameter('jobId', itemIndex) as string;
		const workDate = this.getNodeParameter('workDate', itemIndex) as string;
		const billingStatus = this.getNodeParameter('billingStatus', itemIndex) as string;
		const options = this.getNodeParameter('options', itemIndex) as IDataObject;

		const queryParams: string[] = [];
		queryParams.push(`user=${encodeURIComponent(user)}`);
		queryParams.push(`jobId=${encodeURIComponent(jobId)}`);
		queryParams.push(`workDate=${encodeURIComponent(workDate)}`);
		queryParams.push(`billingStatus=${encodeURIComponent(billingStatus)}`);
		queryParams.push('timer=start');

		if (options.dateFormat) {
			queryParams.push(`dateFormat=${encodeURIComponent(options.dateFormat as string)}`);
		}
		if (options.projectId) {
			queryParams.push(`projectId=${encodeURIComponent(options.projectId as string)}`);
		}
		if (options.description) {
			queryParams.push(`description=${encodeURIComponent(options.description as string)}`);
		}
		if (options.workItem) {
			queryParams.push(`workItem=${encodeURIComponent(options.workItem as string)}`);
		}

		const endpoint = `/timetracker/timer?${queryParams.join('&')}`;
		responseData = await zohoApiRequest.call(this, 'POST', endpoint, {}, {});
	}

	if (operation === 'pauseTimer') {
		const timeLogId = this.getNodeParameter('timeLogId', itemIndex) as string;

		const endpoint = `/timetracker/timer?timeLogId=${encodeURIComponent(timeLogId)}&timer=stop`;
		responseData = await zohoApiRequest.call(this, 'POST', endpoint, {}, {});
	}

	if (operation === 'resumeTimer') {
		const timeLogId = this.getNodeParameter('timeLogId', itemIndex) as string;

		const endpoint = `/timetracker/timer?timeLogId=${encodeURIComponent(timeLogId)}&timer=start`;
		responseData = await zohoApiRequest.call(this, 'POST', endpoint, {}, {});
	}

	if (operation === 'getCurrentlyRunningTimer') {
		const options = this.getNodeParameter('options', itemIndex) as IDataObject;

		let endpoint = '/timetracker/getcurrentlyrunningtimer';

		if (options.dateFormat) {
			endpoint += `?dateFormat=${encodeURIComponent(options.dateFormat as string)}`;
		}

		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'addComment') {
		const timeLogId = this.getNodeParameter('timeLogId', itemIndex) as string;
		const comment = this.getNodeParameter('comment', itemIndex) as string;

		const endpoint = `/timetracker/addcomment?timeLogId=${encodeURIComponent(timeLogId)}&comment=${encodeURIComponent(comment)}`;
		responseData = await zohoApiRequest.call(this, 'POST', endpoint, {}, {});
	}

	if (operation === 'getComments') {
		const timeLogId = this.getNodeParameter('timeLogId', itemIndex) as string;

		const endpoint = `/timetracker/getcomments?timeLogId=${encodeURIComponent(timeLogId)}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'deleteComment') {
		const commentId = this.getNodeParameter('commentId', itemIndex) as string;

		const endpoint = `/timetracker/deletecomment?commentId=${encodeURIComponent(commentId)}`;
		responseData = await zohoApiRequest.call(this, 'POST', endpoint, {}, {});
	}

	return responseData;
}
