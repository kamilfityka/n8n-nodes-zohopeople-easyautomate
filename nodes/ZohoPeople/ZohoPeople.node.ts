import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';

import { attendanceFields, attendanceOperations } from './descriptions/AttendanceDescription';
import { casesFields, casesOperations } from './descriptions/CasesDescription';
import { formFields, formOperations } from './descriptions/FormDescription';
import { leaveFields, leaveOperations } from './descriptions/LeaveDescription';
import { timesheetFields, timesheetOperations } from './descriptions/TimesheetDescription';
import { timerFields, timerOperations } from './descriptions/TimerDescription';
import { viewFields, viewOperations } from './descriptions/ViewDescription';

import { executeFormOperation } from './operations/FormOperations';
import { executeAttendanceOperation } from './operations/AttendanceOperations';
import { executeCasesOperation } from './operations/CasesOperations';
import { executeViewOperation } from './operations/ViewOperations';
import { executeLeaveOperation } from './operations/LeaveOperations';
import { executeTimerOperation } from './operations/TimerOperations';
import { executeTimesheetOperation } from './operations/TimesheetOperations';

export class ZohoPeople implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zoho People',
		name: 'zohoPeople',
		icon: 'file:zohopeople.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Consume Zoho People API',
		defaults: {
			name: 'ZohoPeople',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'zohoPeopleOAuth2Api',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				noDataExpression: true,
				type: 'options',
				options: [
					{
						name: 'Attendance',
						value: 'attendance',
					},
					{
						name: 'Case',
						value: 'cases',
					},
					{
						name: 'Form',
						value: 'forms',
					},
					{
						name: 'Leave',
						value: 'leave',
					},
					{
						name: 'Timer',
						value: 'timer',
					},
					{
						name: 'Timesheet',
						value: 'timesheet',
					},
					{
						name: 'View',
						value: 'view',
					},
				],
				default: 'forms',
				required: true,
			},
			...attendanceOperations,
			...attendanceFields,
			...casesOperations,
			...casesFields,
			...formOperations,
			...formFields,
			...leaveOperations,
			...leaveFields,
			...timerOperations,
			...timerFields,
			...timesheetOperations,
			...timesheetFields,
			...viewOperations,
			...viewFields,
		],
	};

	methods = {
		loadOptions: {},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject = {};

				if (resource === 'forms') {
					responseData = await executeFormOperation.call(this, operation, i);
				} else if (resource === 'attendance') {
					responseData = await executeAttendanceOperation.call(this, operation, i);
				} else if (resource === 'cases') {
					responseData = await executeCasesOperation.call(this, operation, i);
				} else if (resource === 'view') {
					responseData = await executeViewOperation.call(this, operation, i);
				} else if (resource === 'leave') {
					responseData = await executeLeaveOperation.call(this, operation, i);
				} else if (resource === 'timer') {
					responseData = await executeTimerOperation.call(this, operation, i);
				} else if (resource === 'timesheet') {
					responseData = await executeTimesheetOperation.call(this, operation, i);
				}

				Array.isArray(responseData)
					? returnData.push(...(responseData as IDataObject[]))
					: returnData.push(responseData as IDataObject);
			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
