import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { zohoApiRequest } from '../GenericFunctions';

export async function executeViewOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	let responseData: IDataObject = {};

	if (operation === 'defaultAndCustomView') {
		const endpoint = '/views';
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'fetchViewOfSpecificForm') {
		const formLinkName = this.getNodeParameter('formLinkName', itemIndex) as string;
		const endpoint = `/forms/${formLinkName}/views`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	return responseData;
}
