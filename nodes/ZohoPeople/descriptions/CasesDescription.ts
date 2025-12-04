import { INodeProperties } from 'n8n-workflow';

import {
	makeGetAllFields,
} from './SharedFields';

export const casesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['cases'],
			},
		},
		options: [
			{
				name: 'View List of Categories',
				value: 'listCategory',
				description: 'Used to list categories that a user case raise query to',
				action: 'View list of categories a cases',
			},
			{
				name: 'View Case Details',
				value: 'viewcase',
				description: 'Used to view case details',
				action: 'View case details a cases',
			},
		],
		default: 'listCategory',
	},
];

export const casesFields: INodeProperties[] = [
	// ----------------------------------------
	//             cases
	// ----------------------------------------
	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['cases'],
				operation: ['viewcase'],
			},
		},
	},
];
