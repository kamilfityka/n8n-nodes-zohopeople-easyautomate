import { INodeProperties } from 'n8n-workflow';

export const attendanceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['attendance'],
			},
		},
		options: [
			{
				name: 'Attendance Bulk Import',
				value: 'bulkImport',
				description: 'Bulk import the check-in and check-out details of employees',
				action: 'Attendance bulk import',
			},
			{
				name: 'Check In/Check Out',
				value: 'checkInOut',
				description: 'Capture the check-in and check-out entries of an individual employee',
				action: 'Check in or check out',
			},
			{
				name: 'Fetch Last Attendance Entries',
				value: 'fetchLastAttendanceEntries',
				description: 'Fetches the latest attendance entries with Regularisation entries that has been added/updated within the latest minutes(given in param)',
				action: 'Fetch last attendance entries an attendance',
			},
			{
				name: 'Get Attendance Entries',
				value: 'getAttendanceEntries',
				description: 'Get employee attendance entries for a specific date',
				action: 'Get attendance entries',
			},
			{
				name: 'Get Regularization Records',
				value: 'getRegularizationRecords',
				description: 'Fetch multiple records of regularization requests raised within a given date range',
				action: 'Get regularization records an attendance',
			},
			{
				name: 'Shift Details Of Employee',
				value: 'shiftDetailsOfEmployee',
				description: 'Used to fetch the shift configuration details of an employee',
				action: 'Shift details of employee an attendance',
			},
			{
				name: 'Update User Shift',
				value: 'updateUserShift',
				description: 'Map employees to respective shifts',
				action: 'Update user shift',
			},
		],
		default: 'shiftDetailsOfEmployee',
	},
];

export const attendanceFields: INodeProperties[] = [
	// ========================================
	//     attendance: fetchLastAttendanceEntries
	// ========================================
	{
		displayName: 'Duration',
		name: 'duration',
		type: 'number',
		required: true,
		default: 5,
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['fetchLastAttendanceEntries'],
			},
		},
	},
	{
		displayName: 'Date Time Format',
		name: 'dateTimeFormat',
		type: 'string',
		required: true,
		default: 'dd-MM-yyyy HH:mm:ss',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['fetchLastAttendanceEntries'],
			},
		},
	},

	// ========================================
	//     attendance: shiftDetailsOfEmployee
	// ========================================
	{
		displayName: 'Employee ID',
		name: 'empId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['shiftDetailsOfEmployee'],
			},
		},
		description: 'Employee ID (e.g., XYZ000)',
	},
	{
		displayName: 'Email ID',
		name: 'emailId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['shiftDetailsOfEmployee'],
			},
		},
	},
	{
		displayName: 'Map ID',
		name: 'mapId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['shiftDetailsOfEmployee'],
			},
		},
	},
	{
		displayName: 'Start Date',
		name: 'sdate',
		type: 'string',
		required: true,
		default: '2022-08-01',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['shiftDetailsOfEmployee'],
			},
		},
	},
	{
		displayName: 'End Date',
		name: 'edate',
		type: 'string',
		required: true,
		default: '2022-08-30',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['shiftDetailsOfEmployee'],
			},
		},
	},

	// ========================================
	//     attendance: getRegularizationRecords
	// ========================================
	{
		displayName: 'Additional Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['getRegularizationRecords'],
			},
		},
		options: [
			{
				displayName: 'Date Format',
				name: 'dateFormat',
				type: 'string',
				default: 'yyyy-MM-dd',
				description: 'Specify the date format for the dates provided',
			},
			{
				displayName: 'Employee ID',
				name: 'employeeId',
				type: 'string',
				default: '',
				description: 'Employee Email ID, Employee ID (e.g., XYZ000), or Erec No (e.g., 000000)',
			},
			{
				displayName: 'From Date',
				name: 'fromdate',
				type: 'string',
				default: '',
				placeholder: '2024-01-01',
				description: 'Specify the start date (mandatory if Record ID is not provided)',
			},
			{
				displayName: 'Record ID',
				name: 'recordId',
				type: 'string',
				default: '',
				description: 'Record ID of Attendance Regularization. If provided, no other parameter will be considered.',
			},
			{
				displayName: 'Start Index',
				name: 'startIndex',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Specify from which record the response should be fetched (max 200 records at a time)',
			},
			{
				displayName: 'To Date',
				name: 'todate',
				type: 'string',
				default: '',
				placeholder: '2024-01-31',
				description: 'Specify the end date (mandatory if Record ID is not provided)',
			},
		],
	},

	// ========================================
	//     attendance: bulkImport
	// ========================================
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		default: '[{"empId":"1","checkIn":"2014-11-07 09:01:00","location":"Chennai","building":"Administration"},{"empId":"1","checkOut":"2014-11-07 18:02:00"}]',
		description: 'JSON array with check-in and check-out details. Format: [{"empId":"1","checkIn":"2014-11-07 09:01:00","location":"Chennai","building":"Administration"},{"empId":"1","checkOut":"2014-11-07 18:02:00"}].',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['bulkImport'],
			},
		},
	},
	{
		displayName: 'Date Format',
		name: 'dateFormat',
		type: 'string',
		default: 'yyyy-MM-dd HH:mm:ss',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['bulkImport'],
			},
		},
	},

	// ========================================
	//     attendance: updateUserShift
	// ========================================
	{
		displayName: 'Employee ID',
		name: 'empId',
		type: 'string',
		required: true,
		default: '',
		description: 'Employee ID (e.g., XYZ000)',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['updateUserShift'],
			},
		},
	},
	{
		displayName: 'Shift Name',
		name: 'shiftName',
		type: 'string',
		required: true,
		default: '',
		description: 'Name of the shift to be mapped',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['updateUserShift'],
			},
		},
	},
	{
		displayName: 'From Date',
		name: 'fdate',
		type: 'string',
		required: true,
		default: '',
		placeholder: '2024-01-01',
		description: 'Start date for shift mapping',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['updateUserShift'],
			},
		},
	},
	{
		displayName: 'To Date',
		name: 'tdate',
		type: 'string',
		required: true,
		default: '',
		placeholder: '2024-01-31',
		description: 'End date for shift mapping',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['updateUserShift'],
			},
		},
	},
	{
		displayName: 'Date Format',
		name: 'dateFormat',
		type: 'string',
		default: '',
		description: 'Date format (optional, uses organization format if not specified)',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['updateUserShift'],
			},
		},
	},

	// ========================================
	//     attendance: getAttendanceEntries
	// ========================================
	{
		displayName: 'Additional Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['getAttendanceEntries'],
			},
		},
		options: [
			{
				displayName: 'Date',
				name: 'date',
				type: 'string',
				default: '',
				placeholder: '2024-01-01',
				description: 'Specify the date in organization date format',
			},
			{
				displayName: 'Date Format',
				name: 'dateFormat',
				type: 'string',
				default: '',
				description: 'Specify the response date format',
			},
			{
				displayName: 'Email ID',
				name: 'emailId',
				type: 'string',
				default: '',
				description: 'Employee email ID',
			},
			{
				displayName: 'Employee ID',
				name: 'empId',
				type: 'string',
				default: '',
				description: 'Employee ID (e.g., XYZ000)',
			},
			{
				displayName: 'Employee Record Number',
				name: 'erecno',
				type: 'string',
				default: '',
				description: 'Employee Erec No (e.g., 000000)',
			},
			{
				displayName: 'Map ID',
				name: 'mapId',
				type: 'string',
				default: '',
				description: 'Mapper ID',
			},
		],
	},

	// ========================================
	//     attendance: checkInOut
	// ========================================
	{
		displayName: 'Check In Time',
		name: 'checkIn',
		type: 'string',
		default: '',
		placeholder: '07/11/2014 09:01:00',
		description: 'Check-in time of employee (format: dd/MM/yyyy HH:mm:ss)',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['checkInOut'],
			},
		},
	},
	{
		displayName: 'Check Out Time',
		name: 'checkOut',
		type: 'string',
		default: '',
		placeholder: '07/11/2014 18:02:00',
		description: 'Check-out time of employee (format: dd/MM/yyyy HH:mm:ss)',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['checkInOut'],
			},
		},
	},
	{
		displayName: 'Employee Identifier',
		name: 'identifierType',
		type: 'options',
		required: true,
		options: [
			{
				name: 'Employee ID',
				value: 'empId',
			},
			{
				name: 'Email ID',
				value: 'emailId',
			},
			{
				name: 'Map ID',
				value: 'mapId',
			},
		],
		default: 'empId',
		description: 'Type of identifier to use for the employee',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['checkInOut'],
			},
		},
	},
	{
		displayName: 'Employee ID',
		name: 'empId',
		type: 'string',
		required: true,
		default: '',
		description: 'Employee ID (e.g., XYZ000)',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['checkInOut'],
				identifierType: ['empId'],
			},
		},
	},
	{
		displayName: 'Email ID',
		name: 'emailId',
		type: 'string',
		required: true,
		default: '',
		description: 'Employee email ID',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['checkInOut'],
				identifierType: ['emailId'],
			},
		},
	},
	{
		displayName: 'Map ID',
		name: 'mapId',
		type: 'string',
		required: true,
		default: '',
		description: 'Mapper ID (unique ID from attendance system like Biometric)',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['checkInOut'],
				identifierType: ['mapId'],
			},
		},
	},
	{
		displayName: 'Date Format',
		name: 'dateFormat',
		type: 'string',
		default: '',
		description: 'Date format (optional)',
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['checkInOut'],
			},
		},
	},
];
