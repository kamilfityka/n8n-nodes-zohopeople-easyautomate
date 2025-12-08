import type {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IRequestOptions,
	IDataObject,
} from 'n8n-workflow';

import { NodeApiError, NodeOperationError } from 'n8n-workflow';

import {
	GetAllFilterOptions,
	ZohoPeopleOAuth2ApiCredentials,
} from './types';

function getDomainUrl(apiDomain: string): string {
	const domainMap: { [key: string]: string } = {
		com: 'https://people.zoho.com',
		eu: 'https://people.zoho.eu',
		'com.au': 'https://people.zoho.com.au',
		in: 'https://people.zoho.in',
		'com.cn': 'https://people.zoho.com.cn',
	};

	return domainMap[apiDomain] || domainMap.com;
}

export async function zohoApiRequest(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	uri?: string,
) {
	const credentials = (await this.getCredentials(
		'zohoPeopleOAuth2Api',
	)) as ZohoPeopleOAuth2ApiCredentials;

	const apiDomain = credentials.apiDomain || 'com';
	const baseUrl = getDomainUrl(apiDomain);

	// API V2 endpoints use different URL pattern (without /people/ prefix)
	const isV2Endpoint = endpoint.startsWith('/v2/');
	const defaultUri = isV2Endpoint
		? `${baseUrl}/api${endpoint}`
		: `${baseUrl}/people/api${endpoint}`;

	const options: IRequestOptions = {
		method,
		body: Object.keys(body).length ? { data: [body] } : undefined,
		qs: Object.keys(qs).length ? qs : undefined,
		uri: uri ?? defaultUri,
		json: true,
	};

	console.log(options);

	try {
		const responseData = await this.helpers.httpRequestWithAuthentication.call(
			this,
			'zohoPeopleOAuth2Api',
			options
		);

		if (responseData === undefined) return [];

		throwOnErrorStatus.call(this, responseData);

		console.log(responseData);

		return responseData;
	} catch (error) {
		console.log(error);
		throw new NodeApiError(this.getNode(), error as any);
	}
}

export function throwOnErrorStatus(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	responseData: { data?: Array<{ status: string; message: string }> },
) {
	if (responseData?.data?.[0]?.status === 'error') {
		throw new NodeOperationError(this.getNode(), responseData as Error);
	}
}

export async function zohoApiRequestAllItems(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
) {
	const returnData: IDataObject[] = [];

	let responseData;
	qs.per_page = 200;
	qs.page = 1;

	do {
		responseData = await zohoApiRequest.call(this, method, endpoint, body, qs);
		console.log(responseData);
		if (Array.isArray(responseData) && !responseData.length) return returnData;
		returnData.push(...(responseData as IDataObject[]));
		qs.page = (qs.page as number) + 1;
	} while (
		responseData.info?.more_records !== undefined &&
		responseData.info.more_records === true
		);

	return returnData;
}

export async function handleListing(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
) {
	const responseData = await zohoApiRequest.call(this, method, endpoint, body, qs);
	console.log(responseData);
	return responseData;
}

export const addGetAllFilterOptions = (qs: IDataObject, options: GetAllFilterOptions) => {
	if (Object.keys(options).length) {
		const { fields, ...rest } = options;
		Object.assign(qs, fields && { fields: fields.join(',') }, rest);
	}
};

export const capitalizeInitial = (str: string) => str[0].toUpperCase() + str.slice(1);
