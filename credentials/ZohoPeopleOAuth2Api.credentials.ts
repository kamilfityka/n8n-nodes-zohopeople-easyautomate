import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class ZohoPeopleOAuth2Api implements ICredentialType {
	name = 'zohoPeopleOAuth2Api';
	extends = ['oAuth2Api'];
	displayName = 'Zoho People OAuth2 API';
	documentationUrl = 'https://www.zoho.com/people/api/overview.html';
	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'authorizationCode',
		},
		{
			displayName: 'API Domain',
			name: 'apiDomain',
			type: 'options',
			options: [
				{
					name: '🇺🇸 US (people.zoho.com)',
					value: 'com',
				},
				{
					name: '🇪🇺 EU (people.zoho.eu)',
					value: 'eu',
				},
				{
					name: '🇦🇺 Australia (people.zoho.com.au)',
					value: 'com.au',
				},
				{
					name: '🇮🇳 India (people.zoho.in)',
					value: 'in',
				},
				{
					name: '🇨🇳 China (people.zoho.com.cn)',
					value: 'com.cn',
				},
			],
			default: 'com',
			required: true,
			description: 'Select the Zoho People API data center region for your account',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'options',
			options: [
				{
					name: 'https://accounts.zoho.com/oauth/v2/auth',
					value: 'https://accounts.zoho.com/oauth/v2/auth',
					description: 'For the EU, AU, and IN domains',
				},
				{
					name: 'https://accounts.zoho.com.cn/oauth/v2/auth',
					value: 'https://accounts.zoho.com.cn/oauth/v2/auth',
					description: 'For the CN domain',
				},
			],
			default: 'https://accounts.zoho.com/oauth/v2/auth',
			required: true,
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'options',
			options: [
				{
					name: 'AU - https://accounts.zoho.com.au/oauth/v2/token',
					value: 'https://accounts.zoho.com.au/oauth/v2/token',
				},
				{
					name: 'CN - https://accounts.zoho.com.cn/oauth/v2/token',
					value: 'https://accounts.zoho.com.cn/oauth/v2/token',
				},
				{
					name: 'EU - https://accounts.zoho.eu/oauth/v2/token',
					value: 'https://accounts.zoho.eu/oauth/v2/token',
				},
				{
					name: 'IN - https://accounts.zoho.in/oauth/v2/token',
					value: 'https://accounts.zoho.in/oauth/v2/token',
				},
				{
					name: 'US - https://accounts.zoho.com/oauth/v2/token',
					value: 'https://accounts.zoho.com/oauth/v2/token',
				},
			],
			default: 'https://accounts.zoho.com/oauth/v2/token',
			required: true,
		},
		{
			displayName: 'Scope Information',
			name: 'scopeInfo',
			type: 'notice',
			default: `
				<strong>Understanding Zoho People Scopes</strong><br><br>
				Scopes control what your application can access. Format: <code>ZOHOPEOPLE.scopename.operation</code><br><br>
				<strong>Operation Types:</strong><br>
				• <strong>ALL</strong> - Full CRUD access (Create, Read, Update, Delete)<br>
				• <strong>CREATE</strong> - Permission to create new records<br>
				• <strong>READ</strong> - Permission to view data (read-only)<br>
				• <strong>UPDATE</strong> - Permission to modify existing records<br>
				• <strong>DELETE</strong> - Permission to remove records<br><br>
				<strong>Examples:</strong><br>
				• <code>ZOHOPEOPLE.forms.ALL</code> - Full access to forms<br>
				• <code>ZOHOPEOPLE.timetracker.READ</code> - View time tracking data only<br>
				• <code>ZOHOPEOPLE.leave.CREATE</code> - Create leave requests only<br><br>
				<em>💡 Tip: Select only the permissions your application needs for better security.</em>
			`,
		},
		{
			displayName: 'Scopes',
			name: 'scope',
			type: 'multiOptions',
			required: true,
			options: [
				// ========================================
				// EMPLOYEE
				// ========================================
				{
					name: '👤 Employee → All Operations',
					value: 'ZOHOPEOPLE.employee.ALL',
					description: 'CRUD: Create, Read, Update, Delete employee data',
				},

				// ========================================
				// FORMS
				// ========================================
				{
					name: '📝 Forms → All Operations',
					value: 'ZOHOPEOPLE.forms.ALL',
					description: 'CRUD: Create, Read, Update, Delete form data',
				},
				{
					name: '📝 Forms → Read',
					value: 'ZOHOPEOPLE.forms.READ',
					description: 'View form data only',
				},
				{
					name: '📝 Forms → Create',
					value: 'ZOHOPEOPLE.forms.CREATE',
					description: 'Create new form records',
				},
				{
					name: '📝 Forms → Update',
					value: 'ZOHOPEOPLE.forms.UPDATE',
					description: 'Modify existing form records',
				},

				// ========================================
				// DASHBOARD
				// ========================================
				{
					name: '📊 Dashboard → All Operations',
					value: 'ZOHOPEOPLE.dashboard.ALL',
					description: 'CRUD: Create, Read, Update, Delete dashboard data',
				},

				// ========================================
				// AUTOMATION
				// ========================================
				{
					name: '⚙️ Automation → All Operations',
					value: 'ZOHOPEOPLE.automation.ALL',
					description: 'CRUD: Create, Read, Update, Delete automation rules',
				},

				// ========================================
				// TIME TRACKER
				// ========================================
				{
					name: '⏱️ Time Tracker → All Operations',
					value: 'ZOHOPEOPLE.timetracker.ALL',
					description: 'CRUD: Create, Read, Update, Delete time tracking data',
				},

				// ========================================
				// ATTENDANCE
				// ========================================
				{
					name: '📅 Attendance → All Operations',
					value: 'ZOHOPEOPLE.attendance.ALL',
					description: 'CRUD: Create, Read, Update, Delete attendance records',
				},

				// ========================================
				// LEAVE
				// ========================================
				{
					name: '🏖️ Leave → All Operations',
					value: 'ZOHOPEOPLE.leave.ALL',
					description: 'CRUD: Create, Read, Update, Delete leave records',
				},
				{
					name: '🏖️ Leave → Read',
					value: 'ZOHOPEOPLE.leave.READ',
					description: 'View leave records only',
				},
				{
					name: '🏖️ Leave → Create',
					value: 'ZOHOPEOPLE.leave.CREATE',
					description: 'Create leave requests',
				},
				{
					name: '🏖️ Leave → Update',
					value: 'ZOHOPEOPLE.leave.UPDATE',
					description: 'Modify leave requests',
				},

			],
			default: [],
			description: 'Select the permissions your application needs. Choose "All Operations" for full access or specific operations for limited access.',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: 'access_type=offline',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
	];
}
