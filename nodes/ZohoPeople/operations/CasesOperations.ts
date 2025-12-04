import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { zohoApiRequest } from '../GenericFunctions';

export async function executeCasesOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	let responseData: IDataObject = {};

	if (operation === 'listCategory') {
		const endpoint = '/hrcases/listCategory';
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'viewcase') {
		const recordId = this.getNodeParameter('recordId', itemIndex) as string;
		const endpoint = `/hrcases/viewcase?recordId=${recordId}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	return responseData;
}
