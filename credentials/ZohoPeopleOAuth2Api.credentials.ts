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
			options: [
				// ========================================
				// EMPLOYEE
				// ========================================
				{
					name: '👤 Employee → All Operations',
					value: 'ZOHOPEOPLE.employee.ALL',
					description: 'CRUD: Create, Read, Update, Delete employee data',
				},
				{
					name: '👤 Employee → Read',
					value: 'ZOHOPEOPLE.employee.READ',
					description: 'View employee data only',
				},
				{
					name: '👤 Employee → Create',
					value: 'ZOHOPEOPLE.employee.CREATE',
					description: 'Create new employee records',
				},
				{
					name: '👤 Employee → Update',
					value: 'ZOHOPEOPLE.employee.UPDATE',
					description: 'Modify existing employee records',
				},
				{
					name: '👤 Employee → Delete',
					value: 'ZOHOPEOPLE.employee.DELETE',
					description: 'Remove employee records',
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
				{
					name: '📝 Forms → Delete',
					value: 'ZOHOPEOPLE.forms.DELETE',
					description: 'Remove form records',
				},

				// ========================================
				// DASHBOARD
				// ========================================
				{
					name: '📊 Dashboard → All Operations',
					value: 'ZOHOPEOPLE.dashboard.ALL',
					description: 'CRUD: Create, Read, Update, Delete dashboard data',
				},
				{
					name: '📊 Dashboard → Read',
					value: 'ZOHOPEOPLE.dashboard.READ',
					description: 'View dashboard data only',
				},
				{
					name: '📊 Dashboard → Create',
					value: 'ZOHOPEOPLE.dashboard.CREATE',
					description: 'Create dashboard configurations',
				},
				{
					name: '📊 Dashboard → Update',
					value: 'ZOHOPEOPLE.dashboard.UPDATE',
					description: 'Modify dashboard configurations',
				},
				{
					name: '📊 Dashboard → Delete',
					value: 'ZOHOPEOPLE.dashboard.DELETE',
					description: 'Remove dashboard configurations',
				},

				// ========================================
				// AUTOMATION
				// ========================================
				{
					name: '⚙️ Automation → All Operations',
					value: 'ZOHOPEOPLE.automation.ALL',
					description: 'CRUD: Create, Read, Update, Delete automation rules',
				},
				{
					name: '⚙️ Automation → Read',
					value: 'ZOHOPEOPLE.automation.READ',
					description: 'View automation configurations only',
				},
				{
					name: '⚙️ Automation → Create',
					value: 'ZOHOPEOPLE.automation.CREATE',
					description: 'Create automation rules',
				},
				{
					name: '⚙️ Automation → Update',
					value: 'ZOHOPEOPLE.automation.UPDATE',
					description: 'Modify automation rules',
				},
				{
					name: '⚙️ Automation → Delete',
					value: 'ZOHOPEOPLE.automation.DELETE',
					description: 'Remove automation rules',
				},

				// ========================================
				// TIME TRACKER
				// ========================================
				{
					name: '⏱️ Time Tracker → All Operations',
					value: 'ZOHOPEOPLE.timetracker.ALL',
					description: 'CRUD: Create, Read, Update, Delete time tracking data',
				},
				{
					name: '⏱️ Time Tracker → Read',
					value: 'ZOHOPEOPLE.timetracker.READ',
					description: 'View time tracking data only',
				},
				{
					name: '⏱️ Time Tracker → Create',
					value: 'ZOHOPEOPLE.timetracker.CREATE',
					description: 'Create time entries',
				},
				{
					name: '⏱️ Time Tracker → Update',
					value: 'ZOHOPEOPLE.timetracker.UPDATE',
					description: 'Modify time entries',
				},
				{
					name: '⏱️ Time Tracker → Delete',
					value: 'ZOHOPEOPLE.timetracker.DELETE',
					description: 'Remove time entries',
				},

				// ========================================
				// ATTENDANCE
				// ========================================
				{
					name: '📅 Attendance → All Operations',
					value: 'ZOHOPEOPLE.attendance.ALL',
					description: 'CRUD: Create, Read, Update, Delete attendance records',
				},
				{
					name: '📅 Attendance → Read',
					value: 'ZOHOPEOPLE.attendance.READ',
					description: 'View attendance records only',
				},
				{
					name: '📅 Attendance → Create',
					value: 'ZOHOPEOPLE.attendance.CREATE',
					description: 'Create attendance entries',
				},
				{
					name: '📅 Attendance → Update',
					value: 'ZOHOPEOPLE.attendance.UPDATE',
					description: 'Modify attendance entries',
				},
				{
					name: '📅 Attendance → Delete',
					value: 'ZOHOPEOPLE.attendance.DELETE',
					description: 'Remove attendance entries',
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
				{
					name: '🏖️ Leave → Delete',
					value: 'ZOHOPEOPLE.leave.DELETE',
					description: 'Remove leave requests',
				},

				// ========================================
				// HR CASES
				// ========================================
				{
					name: '💼 HR Cases → All Operations',
					value: 'ZOHOPEOPLE.hrcases.ALL',
					description: 'CRUD: Create, Read, Update, Delete HR case records',
				},
				{
					name: '💼 HR Cases → Read',
					value: 'ZOHOPEOPLE.hrcases.READ',
					description: 'View HR case records only',
				},
				{
					name: '💼 HR Cases → Create',
					value: 'ZOHOPEOPLE.hrcases.CREATE',
					description: 'Create HR cases',
				},
				{
					name: '💼 HR Cases → Update',
					value: 'ZOHOPEOPLE.hrcases.UPDATE',
					description: 'Modify HR cases',
				},
				{
					name: '💼 HR Cases → Delete',
					value: 'ZOHOPEOPLE.hrcases.DELETE',
					description: 'Remove HR cases',
				},

				// ========================================
				// VIEW
				// ========================================
				{
					name: '👁️ View → All Operations',
					value: 'ZOHOPEOPLE.view.ALL',
					description: 'CRUD: Create, Read, Update, Delete view configurations',
				},
				{
					name: '👁️ View → Read',
					value: 'ZOHOPEOPLE.view.READ',
					description: 'Access custom and default views',
				},
				{
					name: '👁️ View → Create',
					value: 'ZOHOPEOPLE.view.CREATE',
					description: 'Create custom views',
				},
				{
					name: '👁️ View → Update',
					value: 'ZOHOPEOPLE.view.UPDATE',
					description: 'Modify view configurations',
				},
				{
					name: '👁️ View → Delete',
					value: 'ZOHOPEOPLE.view.DELETE',
					description: 'Remove custom views',
				},
			],
			default: [
				'ZOHOPEOPLE.employee.ALL',
				'ZOHOPEOPLE.forms.ALL',
				'ZOHOPEOPLE.dashboard.ALL',
				'ZOHOPEOPLE.automation.ALL',
				'ZOHOPEOPLE.timetracker.ALL',
				'ZOHOPEOPLE.attendance.ALL',
				'ZOHOPEOPLE.leave.ALL',
				'ZOHOPEOPLE.hrcases.ALL',
				'ZOHOPEOPLE.view.ALL',
			],
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
