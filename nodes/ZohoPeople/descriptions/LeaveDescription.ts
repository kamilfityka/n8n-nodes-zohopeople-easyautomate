import { INodeProperties } from 'n8n-workflow';

import {
	makeGetAllFields,
} from './SharedFields';

export const leaveOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['leave'],
			},
		},
		options: [
			{
				name: 'Add Leave',
				value: 'addLeave',
				description: 'Add leave records using the forms API',
				action: 'Add a leave record',
			},
			{
				name: 'Cancel Leave',
				value: 'cancelLeave',
				description: 'Cancel a leave record using the record ID',
				action: 'Cancel a leave record',
			},
			{
				name: 'Get All Holidays V2',
				value: 'getAllHolidaysV2',
				description: 'Fetch holidays of a location, shift or for an employee (V2 API)',
				action: 'Get all holidays v2 a leave',
			},
			{
				name: 'Get Booked and Balance Report',
				value: 'getBookedAndBalanceReport',
				description: 'Get booked and balance count of employees leave type wise',
				action: 'Get booked and balance report',
			},
			{
				name: 'Get Bradford Report',
				value: 'getBradfordReport',
				description: 'Fetch Bradford report for rolling 12 months',
				action: 'Get bradford report',
			},
			{
				name: 'Get Encashment Report',
				value: 'getEncashmentReport',
				description: 'Get encashment report of the specified pay cycle',
				action: 'Get encashment report',
			},
			{
				name: 'Get Holidays',
				value: 'getHolidays',
				description: 'Used to fetch specific holidays of any employees using their employee ID, email ID and record ID parameters',
				action: 'Get holidays a leave',
			},
			{
				name: 'Get Leave Records V2',
				value: 'getLeaveRecordsV2',
				description: 'Fetch leave records with advanced filtering (V2 API)',
				action: 'Get leave records v2 a leave',
			},
			{
				name: 'Get Leave Types',
				value: 'getLeaveTypes',
				description: 'Can be used to get leave types of a specific employee',
				action: 'Get leave types a leave',
			},
			{
				name: 'Get Single Leave Record',
				value: 'getSingleLeaveRecord',
				description: 'Fetch a single leave record by record ID',
				action: 'Get a single leave record',
			},
			{
				name: 'Get User Report',
				value: 'getUserReport',
				description: 'Get user leave report for current leave year',
				action: 'Get user leave report',
			},
		],
		default: 'getLeaveTypes',
	},
];

export const leaveFields: INodeProperties[] = [
	// ========================================
	//     leave: getLeaveTypes, getHolidays
	// ========================================
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getLeaveTypes', 'getHolidays'],
			},
		},
	},

	// ========================================
	//     leave: getAllHolidaysV2
	// ========================================
	{
		displayName: 'Additional Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getAllHolidaysV2'],
			},
		},
		options: [
			{
				displayName: 'Date Format',
				name: 'dateFormat',
				type: 'string',
				default: 'dd-MMM-yyyy',
				description: 'Date format used to specify From and To dates',
			},
			{
				displayName: 'Employee',
				name: 'employee',
				type: 'string',
				default: '',
				description: 'Emp ID or Email ID or Erecno of the employee, or "all" for all employees',
			},
			{
				displayName: 'From Date',
				name: 'from',
				type: 'string',
				default: '',
				placeholder: '01-Jan-2024',
			},
			{
				displayName: 'Location',
				name: 'location',
				type: 'string',
				default: '',
				description: 'Location name',
			},
			{
				displayName: 'Shift',
				name: 'shift',
				type: 'string',
				default: '',
				description: 'Shift name',
			},
			{
				displayName: 'To Date',
				name: 'to',
				type: 'string',
				default: '',
				placeholder: '31-Dec-2024',
			},
			{
				displayName: 'Upcoming',
				name: 'upcoming',
				type: 'boolean',
				default: false,
				description: 'Whether to get the holidays for the next 365 days',
			},
		],
	},

	// ========================================
	//     leave: getLeaveRecordsV2
	// ========================================
	{
		displayName: 'From Date',
		name: 'from',
		type: 'string',
		required: true,
		default: '',
		placeholder: '2024-01-01',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getLeaveRecordsV2'],
			},
		},
		description: 'Date filter from date',
	},
	{
		displayName: 'To Date',
		name: 'to',
		type: 'string',
		required: true,
		default: '',
		placeholder: '2024-12-31',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getLeaveRecordsV2'],
			},
		},
		description: 'Date filter to date',
	},
	{
		displayName: 'Additional Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getLeaveRecordsV2'],
			},
		},
		options: [
			{
				displayName: 'Approval Status (JSON Array)',
				name: 'approvalStatus',
				type: 'string',
				default: '',
				placeholder: '["APPROVED","PENDING"]',
				description: 'JSON Array of approval statuses: APPROVED, PENDING, CANCELLED, REJECTED',
			},
			{
				displayName: 'Data Select',
				name: 'dataSelect',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'ALL',
					},
					{
						name: 'Direct Subordinates',
						value: 'DIRSUBS',
					},
					{
						name: 'Mine',
						value: 'MINE',
					},
					{
						name: 'Mine and Subordinates',
						value: 'MINE,SUBS',
					},
					{
						name: 'Subordinates',
						value: 'SUBS',
					},
				],
				default: 'MINE',
				description: 'Scope of records to fetch',
			},
			{
				displayName: 'Date Format',
				name: 'dateFormat',
				type: 'string',
				default: 'yyyy-MM-dd',
				description: 'Date format of the date in the request parameters',
			},
			{
				displayName: 'Employee (JSON Array)',
				name: 'employee',
				type: 'string',
				default: '',
				placeholder: '["1234567890"]',
				description: 'JSON Array of employee erecnos. Example: ["1234567890","0987654321"].',
			},
			{
				displayName: 'Leave Type (JSON Array)',
				name: 'leavetype',
				type: 'string',
				default: '',
				placeholder: '["123","456"]',
				description: 'JSON Array of leave type IDs',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 200,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Start Index',
				name: 'startIndex',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Specify from which index the records have to be fetched',
			},
		],
	},

	// ========================================
	//     leave: addLeave
	// ========================================
	{
		displayName: 'Form Link Name',
		name: 'formLinkName',
		type: 'string',
		required: true,
		default: 'leave',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['addLeave'],
			},
		},
		description: 'Form label name (usually "leave")',
	},
	{
		displayName: 'Employee ID',
		name: 'employeeId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['addLeave'],
			},
		},
		description: 'Employee ID for the leave record',
	},
	{
		displayName: 'Leave Type ID',
		name: 'leaveTypeId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['addLeave'],
			},
		},
	},
	{
		displayName: 'From Date',
		name: 'fromDate',
		type: 'string',
		required: true,
		default: '',
		placeholder: '07-Jan-2021',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['addLeave'],
			},
		},
		description: 'Start date of the leave',
	},
	{
		displayName: 'To Date',
		name: 'toDate',
		type: 'string',
		required: true,
		default: '',
		placeholder: '07-Jan-2021',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['addLeave'],
			},
		},
		description: 'End date of the leave',
	},
	{
		displayName: 'Leave Type',
		name: 'leaveType',
		type: 'options',
		required: true,
		options: [
			{
				name: 'Day-Based',
				value: 'day',
			},
			{
				name: 'Hour-Based',
				value: 'hour',
			},
		],
		default: 'day',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['addLeave'],
			},
		},
		description: 'Type of leave (day-based or hour-based)',
	},
	{
		displayName: 'Days Configuration (JSON)',
		name: 'daysConfig',
		type: 'string',
		required: true,
		default: '{"07-Jan-2021":{"LeaveCount":0.5,"Session":2}}',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['addLeave'],
				leaveType: ['day'],
			},
		},
		description: 'JSON configuration for day-based leave. Example: {"07-Jan-2021":{"LeaveCount":0.5,"Session":2}}. LeaveCount: 1 (full day), 0.5 (half day), 0.25 (quarter day). Session for 0.5 day: 1 (first half), 2 (second half). Session for 0.25 day: 1-4 (quarters).',
	},
	{
		displayName: 'Days Configuration (JSON)',
		name: 'daysConfig',
		type: 'string',
		required: true,
		default: '{"07-Jan-2021":{"LeaveCount":"01:00","StartTime":"17:00","EndTime":"18:00"}}',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['addLeave'],
				leaveType: ['hour'],
			},
		},
		description: 'JSON configuration for hour-based leave. Example: {"07-Jan-2021":{"LeaveCount":"01:00","StartTime":"17:00","EndTime":"18:00"}}. Time format: hh:mm (e.g., 02:00 means 2 hours).',
	},

	// ========================================
	//     leave: cancelLeave
	// ========================================
	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['cancelLeave'],
			},
		},
		description: 'Record ID of the leave to cancel',
	},
	{
		displayName: 'Reason',
		name: 'reason',
		type: 'string',
		default: '-',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['cancelLeave'],
			},
		},
		description: 'Reason for canceling the leave',
	},

	// ========================================
	//     leave: getSingleLeaveRecord
	// ========================================
	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getSingleLeaveRecord'],
			},
		},
		description: 'Record ID of the leave record to fetch',
	},

	// ========================================
	//     leave: getUserReport
	// ========================================
	{
		displayName: 'Employee ID',
		name: 'employee',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getUserReport'],
			},
		},
		description: 'Employee erecno',
	},
	{
		displayName: 'To Date',
		name: 'to',
		type: 'string',
		default: '',
		placeholder: '31-Dec-2024',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getUserReport'],
			},
		},
		description: 'Report till date (defaults to current leave year end if not provided)',
	},

	// ========================================
	//     leave: getBookedAndBalanceReport
	// ========================================
	{
		displayName: 'From Date',
		name: 'from',
		type: 'string',
		required: true,
		default: '',
		placeholder: '01-Jan-2024',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getBookedAndBalanceReport'],
			},
		},
		description: 'Report start date',
	},
	{
		displayName: 'To Date',
		name: 'to',
		type: 'string',
		required: true,
		default: '',
		placeholder: '31-Dec-2024',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getBookedAndBalanceReport'],
			},
		},
		description: 'Report till date',
	},
	{
		displayName: 'Additional Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getBookedAndBalanceReport'],
			},
		},
		options: [
			{
				displayName: 'Department (JSON Array)',
				name: 'department',
				type: 'string',
				default: '',
				placeholder: '["dept1","dept2"]',
				description: 'JSON Array of department IDs (maximum 30)',
			},
			{
				displayName: 'Employee (JSON Array)',
				name: 'employee',
				type: 'string',
				default: '',
				placeholder: '["1234567890"]',
				description: 'JSON Array of employee erecnos (maximum 30)',
			},
			{
				displayName: 'Employee Status (JSON Array)',
				name: 'employeeStatus',
				type: 'string',
				default: '["ACTIVE_USERS"]',
				placeholder: '["ACTIVE_USERS"]',
				description: 'JSON Array of employee statuses: ACTIVE_USERS, ACTIVE_EMPLOYEE_PROFILES, EX_EMPLOYEES, LOGIN_DISABLED',
			},
			{
				displayName: 'Leave Type (JSON Array)',
				name: 'leavetype',
				type: 'string',
				default: '',
				placeholder: '["123","456"]',
				description: 'JSON Array of leave type IDs (maximum 30)',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 30,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Start Index',
				name: 'startIndex',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'From which index of the employee report has to be fetched',
			},
			{
				displayName: 'Unit',
				name: 'unit',
				type: 'options',
				options: [
					{
						name: 'Day',
						value: 'Day',
					},
					{
						name: 'Hour',
						value: 'Hour',
					},
				],
				default: 'Day',
				description: 'Unit of the report',
			},
		],
	},

	// ========================================
	//     leave: getBradfordReport
	// ========================================
	{
		displayName: 'Employee (JSON Array)',
		name: 'employee',
		type: 'string',
		required: true,
		default: '',
		placeholder: '["1234567890"]',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getBradfordReport'],
			},
		},
		description: 'JSON Array of employee erecnos (maximum 30)',
	},
	{
		displayName: 'As On Date',
		name: 'asOn',
		type: 'string',
		default: '',
		placeholder: '02-12-2024',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getBradfordReport'],
			},
		},
		description: 'Report till date (defaults to current date if not provided)',
	},

	// ========================================
	//     leave: getEncashmentReport
	// ========================================
	{
		displayName: 'Pay Period Setting ID',
		name: 'payPeriodSettingId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getEncashmentReport'],
			},
		},
		description: 'ID of the pay period setting which the pay cycle falls in',
	},
	{
		displayName: 'From Date',
		name: 'from',
		type: 'string',
		required: true,
		default: '',
		placeholder: '01-Jan-2024',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getEncashmentReport'],
			},
		},
		description: 'PayCycle start date',
	},
	{
		displayName: 'To Date',
		name: 'to',
		type: 'string',
		required: true,
		default: '',
		placeholder: '31-Jan-2024',
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getEncashmentReport'],
			},
		},
		description: 'PayCycle end date',
	},
	{
		displayName: 'Additional Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['leave'],
				operation: ['getEncashmentReport'],
			},
		},
		options: [
			{
				displayName: 'Employee (JSON Array)',
				name: 'employee',
				type: 'string',
				default: '',
				placeholder: '["1234567890"]',
				description: 'JSON Array of employee erecnos (maximum 30)',
			},
			{
				displayName: 'Unit',
				name: 'unit',
				type: 'options',
				options: [
					{
						name: 'Day',
						value: 'Day',
					},
					{
						name: 'Hour',
						value: 'Hour',
					},
				],
				default: 'Day',
				description: 'Unit of report',
			},
			{
				displayName: 'Start Index',
				name: 'startIndex',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'From which index of the employees report has to be fetched',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 30,
				description: 'Max number of results to return',
			},
		],
	},
];
