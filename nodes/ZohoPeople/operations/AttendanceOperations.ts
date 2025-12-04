import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { zohoApiRequest } from '../GenericFunctions';

export async function executeAttendanceOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	let responseData: IDataObject = {};

	if (operation === 'bulkImport') {
		const data = this.getNodeParameter('data', itemIndex) as string;
		const dateFormat = this.getNodeParameter('dateFormat', itemIndex) as string;
		const endpoint = `/attendance/bulkImport?data=${encodeURIComponent(data)}&dateFormat=${encodeURIComponent(dateFormat)}`;
		responseData = await zohoApiRequest.call(this, 'POST', endpoint, {}, {});
	}

	if (operation === 'checkInOut') {
		const checkIn = this.getNodeParameter('checkIn', itemIndex) as string;
		const checkOut = this.getNodeParameter('checkOut', itemIndex) as string;
		const dateFormat = this.getNodeParameter('dateFormat', itemIndex) as string;
		const identifierType = this.getNodeParameter('identifierType', itemIndex) as string;

		const queryParams: string[] = [];

		if (checkIn) {
			queryParams.push(`checkIn=${encodeURIComponent(checkIn)}`);
		}
		if (checkOut) {
			queryParams.push(`checkOut=${encodeURIComponent(checkOut)}`);
		}
		if (dateFormat) {
			queryParams.push(`dateFormat=${encodeURIComponent(dateFormat)}`);
		}

		// Add the appropriate identifier parameter
		if (identifierType === 'empId') {
			const empId = this.getNodeParameter('empId', itemIndex) as string;
			queryParams.push(`empId=${encodeURIComponent(empId)}`);
		} else if (identifierType === 'emailId') {
			const emailId = this.getNodeParameter('emailId', itemIndex) as string;
			queryParams.push(`emailId=${encodeURIComponent(emailId)}`);
		} else if (identifierType === 'mapId') {
			const mapId = this.getNodeParameter('mapId', itemIndex) as string;
			queryParams.push(`mapId=${encodeURIComponent(mapId)}`);
		}

		const endpoint = `/attendance${queryParams.length ? '?' + queryParams.join('&') : ''}`;
		responseData = await zohoApiRequest.call(this, 'POST', endpoint, {}, {});
	}

	if (operation === 'fetchLastAttendanceEntries') {
		const duration = this.getNodeParameter('duration', itemIndex) as number;
		const dateTimeFormat = this.getNodeParameter('dateTimeFormat', itemIndex) as string;
		const endpoint = `/attendance/fetchLatestAttEntries?duration=${duration}&dateTimeFormat=${dateTimeFormat}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'getAttendanceEntries') {
		const options = this.getNodeParameter('options', itemIndex) as IDataObject;
		const queryParams: string[] = [];

		if (options.date) {
			queryParams.push(`date=${encodeURIComponent(options.date as string)}`);
		}
		if (options.dateFormat) {
			queryParams.push(`dateFormat=${encodeURIComponent(options.dateFormat as string)}`);
		}
		if (options.erecno) {
			queryParams.push(`erecno=${encodeURIComponent(options.erecno as string)}`);
		}
		if (options.mapId) {
			queryParams.push(`mapId=${encodeURIComponent(options.mapId as string)}`);
		}
		if (options.emailId) {
			queryParams.push(`emailId=${encodeURIComponent(options.emailId as string)}`);
		}
		if (options.empId) {
			queryParams.push(`empId=${encodeURIComponent(options.empId as string)}`);
		}

		const endpoint = `/attendance/getAttendanceEntries${queryParams.length ? '?' + queryParams.join('&') : ''}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'getRegularizationRecords') {
		const options = this.getNodeParameter('options', itemIndex) as IDataObject;
		const queryParams: string[] = [];

		// If recordId is provided, use it and ignore other parameters
		if (options.recordId) {
			queryParams.push(`recordId=${encodeURIComponent(options.recordId as string)}`);
		} else {
			// fromdate and todate are mandatory if recordId is not provided
			if (options.fromdate) {
				queryParams.push(`fromdate=${encodeURIComponent(options.fromdate as string)}`);
			}
			if (options.todate) {
				queryParams.push(`todate=${encodeURIComponent(options.todate as string)}`);
			}
			if (options.dateFormat) {
				queryParams.push(`dateFormat=${encodeURIComponent(options.dateFormat as string)}`);
			}
			if (options.employeeId) {
				queryParams.push(`employeeId=${encodeURIComponent(options.employeeId as string)}`);
			}
			if (options.startIndex !== undefined) {
				queryParams.push(`startIndex=${options.startIndex}`);
			}
		}

		const endpoint = `/attendance/getRegularizationRecords${queryParams.length ? '?' + queryParams.join('&') : ''}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'shiftDetailsOfEmployee') {
		const empId = this.getNodeParameter('empId', itemIndex) as string;
		const sdate = this.getNodeParameter('sdate', itemIndex) as string;
		const edate = this.getNodeParameter('edate', itemIndex) as string;
		const endpoint = `/attendance/getShiftConfiguration?empId=${empId}&sdate=${sdate}&edate=${edate}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'updateUserShift') {
		const empId = this.getNodeParameter('empId', itemIndex) as string;
		const shiftName = this.getNodeParameter('shiftName', itemIndex) as string;
		const fdate = this.getNodeParameter('fdate', itemIndex) as string;
		const tdate = this.getNodeParameter('tdate', itemIndex) as string;
		const dateFormat = this.getNodeParameter('dateFormat', itemIndex) as string;

		const queryParams: string[] = [];
		queryParams.push(`empId=${encodeURIComponent(empId)}`);
		queryParams.push(`shiftName=${encodeURIComponent(shiftName)}`);
		queryParams.push(`fdate=${encodeURIComponent(fdate)}`);
		queryParams.push(`tdate=${encodeURIComponent(tdate)}`);

		if (dateFormat) {
			queryParams.push(`dateFormat=${encodeURIComponent(dateFormat)}`);
		}

		const endpoint = `/attendance/updateUserShift?${queryParams.join('&')}`;
		responseData = await zohoApiRequest.call(this, 'POST', endpoint, {}, {});
	}

	return responseData;
}
