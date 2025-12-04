import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { zohoApiRequest } from '../GenericFunctions';

export async function executeLeaveOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	let responseData: IDataObject = {};

	if (operation === 'getLeaveTypes') {
		const userId = this.getNodeParameter('userId', itemIndex) as string;
		const endpoint = `/leave/getLeaveTypeDetails?userId=${userId}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'getHolidays') {
		const userId = this.getNodeParameter('userId', itemIndex) as string;
		const endpoint = `/leave/getHolidays?userId=${userId}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'getAllHolidaysV2') {
		const options = this.getNodeParameter('options', itemIndex) as IDataObject;
		const queryParams: string[] = [];

		if (options.location) {
			queryParams.push(`location=${encodeURIComponent(options.location as string)}`);
		}
		if (options.shift) {
			queryParams.push(`shift=${encodeURIComponent(options.shift as string)}`);
		}
		if (options.employee) {
			queryParams.push(`employee=${encodeURIComponent(options.employee as string)}`);
		}
		if (options.upcoming !== undefined) {
			queryParams.push(`upcoming=${options.upcoming}`);
		}
		if (options.from) {
			queryParams.push(`from=${encodeURIComponent(options.from as string)}`);
		}
		if (options.to) {
			queryParams.push(`to=${encodeURIComponent(options.to as string)}`);
		}
		if (options.dateFormat) {
			queryParams.push(`dateFormat=${encodeURIComponent(options.dateFormat as string)}`);
		}

		const endpoint = `/leave/v2/holidays/get${queryParams.length ? '?' + queryParams.join('&') : ''}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'getLeaveRecordsV2') {
		const from = this.getNodeParameter('from', itemIndex) as string;
		const to = this.getNodeParameter('to', itemIndex) as string;
		const options = this.getNodeParameter('options', itemIndex) as IDataObject;

		const queryParams: string[] = [];
		queryParams.push(`from=${encodeURIComponent(from)}`);
		queryParams.push(`to=${encodeURIComponent(to)}`);

		if (options.dateFormat) {
			queryParams.push(`dateFormat=${encodeURIComponent(options.dateFormat as string)}`);
		}
		if (options.employee) {
			queryParams.push(`employee=${encodeURIComponent(options.employee as string)}`);
		}
		if (options.leavetype) {
			queryParams.push(`leavetype=${encodeURIComponent(options.leavetype as string)}`);
		}
		if (options.approvalStatus) {
			queryParams.push(`approvalStatus=${encodeURIComponent(options.approvalStatus as string)}`);
		}
		if (options.startIndex !== undefined) {
			queryParams.push(`startIndex=${options.startIndex}`);
		}
		if (options.limit !== undefined) {
			queryParams.push(`limit=${options.limit}`);
		}
		if (options.dataSelect) {
			queryParams.push(`dataSelect=${encodeURIComponent(options.dataSelect as string)}`);
		}

		// API V2 uses different base URL pattern
		const endpoint = `/v2/leavetracker/leaves/records?${queryParams.join('&')}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'addLeave') {
		const formLinkName = this.getNodeParameter('formLinkName', itemIndex) as string;
		const employeeId = this.getNodeParameter('employeeId', itemIndex) as string;
		const leaveTypeId = this.getNodeParameter('leaveTypeId', itemIndex) as string;
		const fromDate = this.getNodeParameter('fromDate', itemIndex) as string;
		const toDate = this.getNodeParameter('toDate', itemIndex) as string;
		const daysConfigStr = this.getNodeParameter('daysConfig', itemIndex) as string;

		// Parse the days configuration JSON
		let daysConfig;
		try {
			daysConfig = JSON.parse(daysConfigStr);
		} catch (error) {
			throw new Error('Invalid JSON format for Days Configuration');
		}

		// Build the inputData JSON
		const inputData = {
			Employee_ID: employeeId,
			Leavetype: leaveTypeId,
			From: fromDate,
			To: toDate,
			days: daysConfig,
		};

		const endpoint = `/forms/json/${formLinkName}/insertRecord?inputData=${encodeURIComponent(JSON.stringify(inputData))}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'cancelLeave') {
		const recordId = this.getNodeParameter('recordId', itemIndex) as string;
		const reason = this.getNodeParameter('reason', itemIndex, '-') as string;

		const queryParams: string[] = [];
		queryParams.push(`reason=${encodeURIComponent(reason)}`);

		const endpoint = `/v2/leavetracker/leaves/records/cancel/${recordId}?${queryParams.join('&')}`;
		responseData = await zohoApiRequest.call(this, 'PATCH', endpoint, {}, {});
	}

	if (operation === 'getSingleLeaveRecord') {
		const recordId = this.getNodeParameter('recordId', itemIndex) as string;
		const endpoint = `/forms/leave/getDataByID?recordId=${recordId}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'getUserReport') {
		const employee = this.getNodeParameter('employee', itemIndex) as string;
		const to = this.getNodeParameter('to', itemIndex, '') as string;

		const queryParams: string[] = [];
		queryParams.push(`employee=${encodeURIComponent(employee)}`);

		if (to) {
			queryParams.push(`to=${encodeURIComponent(to)}`);
		}

		const endpoint = `/v2/leavetracker/reports/user?${queryParams.join('&')}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'getBookedAndBalanceReport') {
		const from = this.getNodeParameter('from', itemIndex) as string;
		const to = this.getNodeParameter('to', itemIndex) as string;
		const options = this.getNodeParameter('options', itemIndex) as IDataObject;

		const queryParams: string[] = [];
		queryParams.push(`from=${encodeURIComponent(from)}`);
		queryParams.push(`to=${encodeURIComponent(to)}`);

		if (options.unit) {
			queryParams.push(`unit=${encodeURIComponent(options.unit as string)}`);
		}
		if (options.leavetype) {
			queryParams.push(`leavetype=${encodeURIComponent(options.leavetype as string)}`);
		}
		if (options.employee) {
			queryParams.push(`employee=${encodeURIComponent(options.employee as string)}`);
		}
		if (options.department) {
			queryParams.push(`department=${encodeURIComponent(options.department as string)}`);
		}
		if (options.employeeStatus) {
			queryParams.push(`employeeStatus=${encodeURIComponent(options.employeeStatus as string)}`);
		}
		if (options.startIndex !== undefined) {
			queryParams.push(`startIndex=${options.startIndex}`);
		}
		if (options.limit !== undefined) {
			queryParams.push(`limit=${options.limit}`);
		}

		const endpoint = `/v2/leavetracker/reports/bookedAndBalance?${queryParams.join('&')}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'getBradfordReport') {
		const employee = this.getNodeParameter('employee', itemIndex) as string;
		const asOn = this.getNodeParameter('asOn', itemIndex, '') as string;

		const queryParams: string[] = [];
		queryParams.push(`employee=${encodeURIComponent(employee)}`);

		if (asOn) {
			queryParams.push(`asOn=${encodeURIComponent(asOn)}`);
		}

		const endpoint = `/v2/leavetracker/reports/bradford?${queryParams.join('&')}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'getEncashmentReport') {
		const payPeriodSettingId = this.getNodeParameter('payPeriodSettingId', itemIndex) as string;
		const from = this.getNodeParameter('from', itemIndex) as string;
		const to = this.getNodeParameter('to', itemIndex) as string;
		const options = this.getNodeParameter('options', itemIndex) as IDataObject;

		const queryParams: string[] = [];
		queryParams.push(`payPeriodSettingId=${encodeURIComponent(payPeriodSettingId)}`);
		queryParams.push(`from=${encodeURIComponent(from)}`);
		queryParams.push(`to=${encodeURIComponent(to)}`);

		if (options.employee) {
			queryParams.push(`employee=${encodeURIComponent(options.employee as string)}`);
		}
		if (options.unit) {
			queryParams.push(`unit=${encodeURIComponent(options.unit as string)}`);
		}
		if (options.startIndex !== undefined) {
			queryParams.push(`startIndex=${options.startIndex}`);
		}
		if (options.limit !== undefined) {
			queryParams.push(`limit=${options.limit}`);
		}

		const endpoint = `/v2/leavetracker/reports/encashment?${queryParams.join('&')}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	return responseData;
}
