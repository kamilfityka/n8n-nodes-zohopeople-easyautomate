import { INodeProperties } from 'n8n-workflow';

import {
	makeGetAllFields,
} from './SharedFields';

export const formOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['forms'],
			},
		},
		options: [
			{
				name: 'Fetch Forms',
				value: 'fetchForms',
				description: 'Used to retrieve the list of forms and its details available in your Zoho People account',
				action: 'Fetch forms a forms',
			},
			{
				name: 'Get Bulk Records',
				value: 'getBulkRecords',
				description: 'Used to fetch bulk records along with its tabular section details from particular forms',
				action: 'Get bulk records a forms',
			},
			{
				name: 'Get Record Count',
				value: 'getRecordCount',
				description: 'Used to know the total records count of any form',
				action: 'Get record count a forms',
			},
		],
		default: 'fetchForms',
	},
];

export const formFields: INodeProperties[] = [
	// ----------------------------------------
	//             form: getAll
	// ----------------------------------------
	// ...makeGetAllFields('form'),
	{
		displayName: 'Form Link Name',
		name: 'formLinkName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['forms', 'view'],
				operation: ['getBulkRecords','getRecordCount', 'fetchViewOfSpecificForm'],
			},
		},
	},
	{
		displayName: 'Start Index',
		name: 'sIndex',
		type: 'number',
		required: true,
		default: 1,
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['getBulkRecords'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		description: 'Max number of results to return',
		required: true,
		default: 200,
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['getBulkRecords'],
			},
		},
	},
	{
		displayName: 'Search Column',
		name: 'searchColumn',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['getBulkRecords'],
			},
		},
	},
	{
		displayName: 'Search Value',
		name: 'searchValue',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['getBulkRecords'],
			},
		},
	},
	{
		displayName: 'Modified Time',
		name: 'modifiedtime',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['getBulkRecords'],
			},
		},
	},
];
