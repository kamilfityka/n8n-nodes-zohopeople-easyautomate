import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { zohoApiRequest } from '../GenericFunctions';

export async function executeTimesheetOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	let responseData: IDataObject = {};

	if (operation === 'getTimesheets') {
		const user = this.getNodeParameter('user', itemIndex) as string;
		const options = this.getNodeParameter('options', itemIndex) as IDataObject;

		const queryParams: string[] = [];
		queryParams.push(`user=${encodeURIComponent(user)}`);

		const approvalStatus = (options.approvalStatus as string) || 'all';
		const employeeStatus = (options.employeeStatus as string) || 'usersandnonusers';
		const sIndex = (options.sIndex as number) ?? 0;
		const limit = (options.limit as number) ?? 200;

		queryParams.push(`approvalStatus=${approvalStatus}`);
		queryParams.push(`employeeStatus=${employeeStatus}`);
		queryParams.push(`sIndex=${sIndex}`);
		queryParams.push(`limit=${limit}`);

		if (options.dateFormat) {
			queryParams.push(`dateFormat=${encodeURIComponent(options.dateFormat as string)}`);
		}
		if (options.fromDate) {
			queryParams.push(`fromDate=${encodeURIComponent(options.fromDate as string)}`);
		}
		if (options.toDate) {
			queryParams.push(`toDate=${encodeURIComponent(options.toDate as string)}`);
		}

		const endpoint = `/timetracker/gettimesheet?${queryParams.join('&')}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'getTimesheetDetails') {
		const timesheetId = this.getNodeParameter('timesheetId', itemIndex) as string;
		const options = this.getNodeParameter('options', itemIndex) as IDataObject;
		const dateFormat = (options.dateFormat as string) || 'yyyy-MM-dd';

		const endpoint = `/timetracker/gettimesheetdetails?timesheetId=${timesheetId}&dateFormat=${encodeURIComponent(dateFormat)}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'createTimesheet') {
		const user = this.getNodeParameter('user', itemIndex) as string;
		const timesheetName = this.getNodeParameter('timesheetName', itemIndex) as string;
		const fromDate = this.getNodeParameter('fromDate', itemIndex) as string;
		const toDate = this.getNodeParameter('toDate', itemIndex) as string;
		const options = this.getNodeParameter('options', itemIndex) as IDataObject;

		const queryParams: string[] = [];
		queryParams.push(`user=${encodeURIComponent(user)}`);
		queryParams.push(`timesheetName=${encodeURIComponent(timesheetName)}`);
		queryParams.push(`fromDate=${encodeURIComponent(fromDate)}`);
		queryParams.push(`toDate=${encodeURIComponent(toDate)}`);

		if (options.dateFormat) {
			queryParams.push(`dateFormat=${encodeURIComponent(options.dateFormat as string)}`);
		}
		if (options.description) {
			queryParams.push(`description=${encodeURIComponent(options.description as string)}`);
		}
		if (options.billableStatus) {
			queryParams.push(`billableStatus=${encodeURIComponent(options.billableStatus as string)}`);
		}
		if (options.jobId) {
			queryParams.push(`jobId=${encodeURIComponent(options.jobId as string)}`);
		}
		if (options.projectId) {
			queryParams.push(`projectId=${encodeURIComponent(options.projectId as string)}`);
		}
		if (options.clientId) {
			queryParams.push(`clientId=${encodeURIComponent(options.clientId as string)}`);
		}
		if (options.sendforApproval !== undefined) {
			queryParams.push(`sendforApproval=${options.sendforApproval}`);
		}

		const endpoint = `/timetracker/createtimesheet?${queryParams.join('&')}`;
		responseData = await zohoApiRequest.call(this, 'POST', endpoint, {}, {});
	}

	if (operation === 'modifyTimesheet') {
		const timesheetId = this.getNodeParameter('timesheetId', itemIndex) as string;
		const options = this.getNodeParameter('options', itemIndex) as IDataObject;

		const queryParams: string[] = [];
		queryParams.push(`timesheetId=${encodeURIComponent(timesheetId)}`);

		if (options.timesheetName) {
			queryParams.push(`timesheetName=${encodeURIComponent(options.timesheetName as string)}`);
		}
		if (options.description) {
			queryParams.push(`description=${encodeURIComponent(options.description as string)}`);
		}
		if (options.sendforApproval !== undefined) {
			queryParams.push(`sendforApproval=${options.sendforApproval}`);
		}
		if (options.removeAttachment !== undefined) {
			queryParams.push(`removeAttachment=${options.removeAttachment}`);
		}

		const endpoint = `/timetracker/modifytimesheet?${queryParams.join('&')}`;
		responseData = await zohoApiRequest.call(this, 'POST', endpoint, {}, {});
	}

	if (operation === 'approveTimesheet') {
		const timesheetId = this.getNodeParameter('timesheetId', itemIndex) as string;
		const approvalStatus = this.getNodeParameter('approvalStatus', itemIndex) as string;
		const options = this.getNodeParameter('options', itemIndex) as IDataObject;

		const queryParams: string[] = [];
		queryParams.push(`timesheetId=${encodeURIComponent(timesheetId)}`);
		queryParams.push(`approvalStatus=${approvalStatus}`);

		if (options.comments) {
			queryParams.push(`comments=${encodeURIComponent(options.comments as string)}`);
		}
		if (options.isAllLevelApprove !== undefined) {
			queryParams.push(`isAllLevelApprove=${options.isAllLevelApprove}`);
		}
		if (options.timeLogs) {
			queryParams.push(`timeLogs=${encodeURIComponent(options.timeLogs as string)}`);
		}

		const endpoint = `/timetracker/approvetimesheet?${queryParams.join('&')}`;
		responseData = await zohoApiRequest.call(this, 'POST', endpoint, {}, {});
	}

	if (operation === 'deleteTimesheets') {
		const timesheetIds = this.getNodeParameter('timesheetIds', itemIndex) as string;

		const endpoint = `/timetracker/deletetimesheet?timesheetId=${encodeURIComponent(timesheetIds)}`;
		responseData = await zohoApiRequest.call(this, 'POST', endpoint, {}, {});
	}

	return responseData;
}
