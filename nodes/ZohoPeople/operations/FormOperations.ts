import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { zohoApiRequest } from '../GenericFunctions';

export async function executeFormOperation(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<IDataObject> {
	let responseData: IDataObject = {};

	if (operation === 'fetchForms') {
		responseData = await zohoApiRequest.call(this, 'GET', '/forms', {}, {});
	}

	if (operation === 'getBulkRecords') {
		const formLinkName = this.getNodeParameter('formLinkName', itemIndex) as string;
		const sIndex = this.getNodeParameter('sIndex', itemIndex) as number;
		const limit = this.getNodeParameter('limit', itemIndex) as number;
		const endpoint = `/forms/${formLinkName}/getRecords?sIndex=${sIndex}&limit=${limit}`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	if (operation === 'getRecordCount') {
		const formLinkName = this.getNodeParameter('formLinkName', itemIndex) as string;
		const endpoint = `/forms/${formLinkName}/getRecordCount`;
		responseData = await zohoApiRequest.call(this, 'GET', endpoint, {}, {});
	}

	return responseData;
}
