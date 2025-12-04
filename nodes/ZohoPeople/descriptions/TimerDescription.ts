import { INodeProperties } from 'n8n-workflow';

export const timerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['timer'],
			},
		},
		options: [
			{
				name: 'Add Comment',
				value: 'addComment',
				description: 'Add a comment to a timer',
				action: 'Add comment to timer',
			},
			{
				name: 'Delete Comment',
				value: 'deleteComment',
				description: 'Delete a comment from a timer',
				action: 'Delete comment from timer',
			},
			{
				name: 'Get Comments',
				value: 'getComments',
				description: 'Get comments for a timer',
				action: 'Get comments for timer',
			},
			{
				name: 'Get Currently Running Timer',
				value: 'getCurrentlyRunningTimer',
				description: 'Get the currently running timer details',
				action: 'Get currently running timer',
			},
			{
				name: 'Pause Timer',
				value: 'pauseTimer',
				description: 'Pause an existing timer',
				action: 'Pause timer',
			},
			{
				name: 'Resume Timer',
				value: 'resumeTimer',
				description: 'Resume a paused timer',
				action: 'Resume timer',
			},
			{
				name: 'Start Timer',
				value: 'startTimer',
				description: 'Start a new timer',
				action: 'Start timer',
			},
		],
		default: 'startTimer',
	},
];

export const timerFields: INodeProperties[] = [
	// ========================================
	//     timer: startTimer
	// ========================================
	{
		displayName: 'User',
		name: 'user',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timer'],
				operation: ['startTimer'],
			},
		},
		description: 'Specify the current user\'s value (ERECNO, Email-ID, or Employee-ID)',
	},
	{
		displayName: 'Job ID',
		name: 'jobId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timer'],
				operation: ['startTimer'],
			},
		},
		description: 'Specify jobId for which timer needs to be started',
	},
	{
		displayName: 'Work Date',
		name: 'workDate',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'yyyy-MM-dd',
		displayOptions: {
			show: {
				resource: ['timer'],
				operation: ['startTimer'],
			},
		},
		description: 'Specify the work date for when timelog needs to be added (format: yyyy-MM-dd or company dateformat)',
	},
	{
		displayName: 'Billing Status',
		name: 'billingStatus',
		type: 'options',
		required: true,
		options: [
			{
				name: 'All',
				value: 'all',
			},
			{
				name: 'All (-1)',
				value: '-1',
			},
			{
				name: 'Billable',
				value: 'billable',
			},
			{
				name: 'Billable (1)',
				value: '1',
			},
			{
				name: 'Non-Billable',
				value: 'non billable',
			},
			{
				name: 'Non-Billable (0)',
				value: '0',
			},
			{
				name: 'Non-Billable (Alt)',
				value: 'nonbillable',
			},
		],
		default: 'billable',
		displayOptions: {
			show: {
				resource: ['timer'],
				operation: ['startTimer'],
			},
		},
		description: 'Specify the billable status',
	},
	{
		displayName: 'Additional Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['timer'],
				operation: ['startTimer'],
			},
		},
		options: [
			{
				displayName: 'Date Format',
				name: 'dateFormat',
				type: 'string',
				default: '',
				placeholder: 'yyyy-MM-dd',
				description: 'Specify the date format (defaults to company\'s date format)',
			},
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				default: '',
				description: 'Specify the project ID based on which timer needs to be started',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Specify the description (maximum length is 250)',
			},
			{
				displayName: 'Work Item',
				name: 'workItem',
				type: 'string',
				default: '',
				description: 'Specify the workitem (maximum length is 500)',
			},
		],
	},

	// ========================================
	//     timer: pauseTimer
	// ========================================
	{
		displayName: 'Time Log ID',
		name: 'timeLogId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timer'],
				operation: ['pauseTimer'],
			},
		},
		description: 'Specify the timelog ID to pause',
	},

	// ========================================
	//     timer: resumeTimer
	// ========================================
	{
		displayName: 'Time Log ID',
		name: 'timeLogId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timer'],
				operation: ['resumeTimer'],
			},
		},
		description: 'Specify the timelog ID to resume',
	},

	// ========================================
	//     timer: getCurrentlyRunningTimer
	// ========================================
	{
		displayName: 'Additional Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['timer'],
				operation: ['getCurrentlyRunningTimer'],
			},
		},
		options: [
			{
				displayName: 'Date Format',
				name: 'dateFormat',
				type: 'string',
				default: '',
				placeholder: 'yyyy-MM-dd',
				description: 'Specify the date format',
			},
		],
	},

	// ========================================
	//     timer: addComment
	// ========================================
	{
		displayName: 'Time Log ID',
		name: 'timeLogId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timer'],
				operation: ['addComment'],
			},
		},
		description: 'Specify the timeLogId',
	},
	{
		displayName: 'Comment',
		name: 'comment',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timer'],
				operation: ['addComment'],
			},
		},
		description: 'Specify the comment to add',
	},

	// ========================================
	//     timer: getComments
	// ========================================
	{
		displayName: 'Time Log ID',
		name: 'timeLogId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timer'],
				operation: ['getComments'],
			},
		},
		description: 'Specify the timeLogId',
	},

	// ========================================
	//     timer: deleteComment
	// ========================================
	{
		displayName: 'Comment ID',
		name: 'commentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['timer'],
				operation: ['deleteComment'],
			},
		},
		description: 'Specify the commentId to delete',
	},
];
