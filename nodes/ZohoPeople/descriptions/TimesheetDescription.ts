import { INodeProperties } from 'n8n-workflow';

export const timesheetOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['timesheet'],
			},
		},
		options: [
			{
				name: 'Approve Timesheet',
				value: 'approveTimesheet',
				description: 'Approve or reject a timesheet',
				action: 'Approve timesheet',
			},
			{
				name: 'Create Timesheet',
				value: 'createTimesheet',
				description: 'Create a new timesheet',
				action: 'Create timesheet',
			},
			{
				name: 'Delete Timesheets',
				value: 'deleteTimesheets',
				description: 'Delete one or more timesheets',
				action: 'Delete timesheets',
			},
			{
				name: 'Get Timesheet Details',
				value: 'getTimesheetDetails',
				description: 'Used to get the details from a particular timesheet',
				action: 'Get timesheet details',
			},
			{
				name: 'Get Timesheets',
				value: 'getTimesheets',
				description: 'Used to get the list of timesheets',
				action: 'Get timesheets',
			},
			{
				name: 'Modify Timesheet',
				value: 'modifyTimesheet',
				description: 'Modify an existing timesheet',
				action: 'Modify timesheet',
			},
		],
		default: 'getTimesheets',
	},
];

export const timesheetFields: INodeProperties[] = [
	// ========================================
	//     timesheet: getTimesheets
	// ========================================
	{
		displayName: 'User',
		name: 'user',
		type: 'string',
		required: true,
		default: 'all',
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['getTimesheets'],
			},
		},
		description: 'Specify the user whose timesheets have to be fetched. Can be "all", Email ID, Employee ID, or Erec No.',
	},
	{
		displayName: 'Additional Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['getTimesheets'],
			},
		},
		options: [
			{
				displayName: 'Approval Status',
				name: 'approvalStatus',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Approved',
						value: 'approved',
					},
					{
						name: 'Draft',
						value: 'draft',
					},
					{
						name: 'Pending',
						value: 'pending',
					},
					{
						name: 'Rejected',
						value: 'rejected',
					},
				],
				default: 'all',
				description: 'Specify the approval status of the timesheet',
			},
			{
				displayName: 'Date Format',
				name: 'dateFormat',
				type: 'string',
				default: '',
				placeholder: 'dd-MMM-yyyy',
				description: 'Specify the format in which the dates should be provided (e.g., dd-MMM-yyyy). Leave empty to use company date format.',
			},
			{
				displayName: 'Employee Status',
				name: 'employeeStatus',
				type: 'options',
				options: [
					{
						name: 'Users',
						value: 'users',
					},
					{
						name: 'Non Users',
						value: 'nonusers',
					},
					{
						name: 'Users and Non Users',
						value: 'usersandnonusers',
					},
					{
						name: 'Login Disabled',
						value: 'logindisabled',
					},
				],
				default: 'usersandnonusers',
				description: 'Specify the status of the employees whose timesheets have to be fetched',
			},
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'string',
				default: '',
				placeholder: '01-Jan-2024',
				description: 'Specify the "from date" of the timesheet (format according to dateFormat parameter)',
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
				name: 'sIndex',
				type: 'number',
				typeOptions: {
					minValue: 0,
				},
				default: 0,
				description: 'Specify from which record the response should be fetched',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'string',
				default: '',
				placeholder: '31-Dec-2024',
				description: 'Specify the "to date" of the timesheet (format according to dateFormat parameter)',
			},
		],
	},

	// ========================================
	//     timesheet: getTimesheetDetails
	// ========================================
	{
		displayName: 'Timesheet ID',
		name: 'timesheetId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['getTimesheetDetails'],
			},
		},
		description: 'Specify the timesheet ID',
	},
	{
		displayName: 'Additional Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['getTimesheetDetails'],
			},
		},
		options: [
			{
				displayName: 'Date Format',
				name: 'dateFormat',
				type: 'string',
				default: '',
				placeholder: 'dd-MMM-yyyy',
				description: 'Specify the format in which the dates should be provided (e.g., dd-MMM-yyyy). Leave empty to use company date format.',
			},
		],
	},

	// ========================================
	//     timesheet: createTimesheet
	// ========================================
	{
		displayName: 'User',
		name: 'user',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['createTimesheet'],
			},
		},
		description: 'Specify the user for whom timesheet has to be created (Email ID, Employee ID, or Erec No)',
	},
	{
		displayName: 'Timesheet Name',
		name: 'timesheetName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['createTimesheet'],
			},
		},
		description: 'Specify the timesheet name',
	},
	{
		displayName: 'From Date',
		name: 'fromDate',
		type: 'string',
		required: true,
		default: '',
		placeholder: '2024-01-01',
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['createTimesheet'],
			},
		},
		description: 'Specify the from date (format according to dateFormat parameter)',
	},
	{
		displayName: 'To Date',
		name: 'toDate',
		type: 'string',
		required: true,
		default: '',
		placeholder: '2024-01-31',
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['createTimesheet'],
			},
		},
		description: 'Specify the to date (format according to dateFormat parameter)',
	},
	{
		displayName: 'Additional Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['createTimesheet'],
			},
		},
		options: [
			{
				displayName: 'Billable Status',
				name: 'billableStatus',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Billable',
						value: 'Billable',
					},
					{
						name: 'Non-Billable',
						value: 'Non-Billable',
					},
				],
				default: 'all',
				description: 'Specify the billable status of the timelogs',
			},
			{
				displayName: 'Client ID',
				name: 'clientId',
				type: 'string',
				default: 'all',
				description: 'Specify the client ID',
			},
			{
				displayName: 'Date Format',
				name: 'dateFormat',
				type: 'string',
				default: 'yyyy-MM-dd',
				placeholder: 'yyyy-MM-dd',
				description: 'Specify the format in which the dates should be provided',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Specify the description',
			},
			{
				displayName: 'Job ID',
				name: 'jobId',
				type: 'string',
				default: 'all',
				description: 'Specify the job ID',
			},
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				default: 'all',
				description: 'Specify the project ID',
			},
			{
				displayName: 'Send for Approval',
				name: 'sendforApproval',
				type: 'boolean',
				default: false,
				description: 'Whether to submit the timesheet for approval',
			},
		],
	},

	// ========================================
	//     timesheet: modifyTimesheet
	// ========================================
	{
		displayName: 'Timesheet ID',
		name: 'timesheetId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['modifyTimesheet'],
			},
		},
		description: 'Specify the timesheet ID',
	},
	{
		displayName: 'Additional Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['modifyTimesheet'],
			},
		},
		options: [
			{
				displayName: 'Timesheet Name',
				name: 'timesheetName',
				type: 'string',
				default: '',
				description: 'Specify the timesheet name',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Specify the description',
			},
			{
				displayName: 'Send for Approval',
				name: 'sendforApproval',
				type: 'boolean',
				default: false,
				description: 'Whether to submit the timesheet for approval',
			},
			{
				displayName: 'Remove Attachment',
				name: 'removeAttachment',
				type: 'boolean',
				default: false,
				description: 'Whether to remove the attachment attached to the timesheet',
			},
		],
	},

	// ========================================
	//     timesheet: approveTimesheet
	// ========================================
	{
		displayName: 'Timesheet ID',
		name: 'timesheetId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['approveTimesheet'],
			},
		},
		description: 'Specify the timesheet ID',
	},
	{
		displayName: 'Approval Status',
		name: 'approvalStatus',
		type: 'options',
		required: true,
		options: [
			{
				name: 'Approved',
				value: 'approved',
			},
			{
				name: 'Rejected',
				value: 'rejected',
			},
		],
		default: 'approved',
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['approveTimesheet'],
			},
		},
		description: 'Specify the approval status',
	},
	{
		displayName: 'Additional Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['approveTimesheet'],
			},
		},
		options: [
			{
				displayName: 'Comments',
				name: 'comments',
				type: 'string',
				default: '',
				description: 'Specify the approval comments',
			},
			{
				displayName: 'Is All Level Approve',
				name: 'isAllLevelApprove',
				type: 'boolean',
				default: false,
				description: 'Whether to approve the timesheet on behalf of all the approvers',
			},
			{
				displayName: 'Time Logs',
				name: 'timeLogs',
				type: 'string',
				default: '',
				placeholder: '{"123": "approved", "124": "rejected"}',
				description: 'Specify the time logs of the timesheet along with the approval status in JSON format',
			},
		],
	},

	// ========================================
	//     timesheet: deleteTimesheets
	// ========================================
	{
		displayName: 'Timesheet IDs',
		name: 'timesheetIds',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timesheet'],
				operation: ['deleteTimesheets'],
			},
		},
		description: 'Specify the timesheet IDs (separated by commas). Maximum number of IDs allowed is 1000.',
	},
];
