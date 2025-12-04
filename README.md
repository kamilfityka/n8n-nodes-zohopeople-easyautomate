# n8n-nodes-zohopeople-easyautomate

<br />
<p align="center">
    <a href="https://n8n.io" target="_blank"><img width="260" height="" src="https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png" alt="n8n Logo"></a>
    <br />
    <br />
    <b>Free and open fair-code licensed node-based Workflow Automation Tool</b>
    <br />
    <br />
</p>

<br />
<p align="center">
    <a href="https://www.zoho.com/people/" target="_blank"><img width="150" height="" src="/nodes/ZohoPeople/zohopeople.svg" alt="Zoho People Logo"></a>
    <br />
    <br />
    <b>Zoho People is a cloud-based HR software crafted to nurture employees, quickly adapt to changes, and make HR management agile and effective</b>
    <br />
    <br />
</p>

<p align="center">
    <a href="https://n8n.io" target="_blank"><img width="600" height="" src="/n8n-zohopeople-node.png" alt="Zoho People Node"></a>
    <br />
    <br />
</p>

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Installation](#-installation)
  - [Via n8n Community Nodes](#1-via-n8n-community-nodes-recommended)
  - [Via npm](#2-via-npm)
  - [Via Docker](#3-via-docker)
- [Configuration](#-configuration)
  - [Step 1: Create OAuth Application in Zoho](#step-1-create-oauth-application-in-zoho)
  - [Step 2: Configure Credentials in n8n](#step-2-configure-credentials-in-n8n)
- [Usage](#-usage)
- [Available Resources & Operations](#-available-resources--operations)
- [Usage Examples](#-usage-examples)
- [Requirements](#-requirements)
- [Development](#-development)
- [License](#-license)
- [Author](#-author)

## 🎯 About

**n8n-nodes-zohopeople-easyautomate** is an official community node for n8n that enables integration with Zoho People API. This node allows you to automate HR processes, manage employee data, track time, handle leaves, attendance, and much more - all within the powerful n8n automation engine.

## ✨ Features

This node provides support for 7 main Zoho People resources:

### 📝 Forms
- Fetch list of forms
- Get bulk records with tabular sections
- Get record count in forms

### 📅 Attendance
- Employee check-in/check-out
- Bulk attendance import
- Fetch last attendance entries
- Employee shift details
- Get attendance entries for specific date
- Regularization records
- Update user shifts

### 💼 Cases
- List case categories
- View case details

### 🏖️ Leave
- Add leave (day-based and hour-based)
- Cancel leave
- Get leave types
- Get holidays
- Advanced leave records retrieval (V2 API)
- Single leave record
- User reports
- Booked and balance reports
- Bradford reports
- Encashment reports

### ⏱️ Timer
- Start timer
- Pause timer
- Resume timer
- Get currently running timer
- Add comments
- Get comments
- Delete comments

### 📊 Timesheet
- Get timesheets list
- Get specific timesheet details

### 👁️ View
- Default and custom views
- Fetch views for specific form

## 📦 Installation

### 1. Via n8n Community Nodes (Recommended)

This is the easiest installation method:

1. Open your n8n instance
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Type: `n8n-nodes-zohopeople-easyautomate`
5. Click **Install**

### 2. Via npm

If you're managing n8n locally, you can install the node using npm:

```bash
cd ~/.n8n/nodes
npm install n8n-nodes-zohopeople-easyautomate
```

Or in your n8n root directory:

```bash
npm install n8n-nodes-zohopeople-easyautomate
```

After installation, restart n8n:

```bash
n8n start
```

### 3. Via Docker

If you're using n8n in a Docker container, add the following line to your Dockerfile **before** the font installation command:

```dockerfile
RUN cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-zohopeople-easyautomate
```

Complete Dockerfile example:

```dockerfile
FROM n8nio/n8n

USER root

# Install Zoho People node
RUN cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-zohopeople-easyautomate

# Rest of configuration...
USER node
```

Then rebuild and run the container:

```bash
docker build -t n8n-custom .
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8n-custom
```

**For docker-compose:**

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=password
    volumes:
      - ~/.n8n:/home/node/.n8n
    command: >
      /bin/sh -c "
      cd /usr/local/lib/node_modules/n8n &&
      npm install n8n-nodes-zohopeople-easyautomate &&
      n8n start
      "
```

## 🔐 Configuration

### Step 1: Create OAuth Application in Zoho

Before using the node, you need to configure OAuth2 in Zoho Developer Console:

1. **Log in to Zoho API Console:**
   - Go to [https://api-console.zoho.com/](https://api-console.zoho.com/)
   - Sign in with your Zoho account

2. **Create a new application:**
   - Click **Add Client**
   - Select **Server-based Applications**

3. **Fill in application details:**
   - **Client Name**: `n8n Zoho People Integration` (or any name)
   - **Homepage URL**: Your n8n instance URL (e.g., `https://your-domain.com`)
   - **Authorized Redirect URIs**:
     ```
     https://your-domain.com/rest/oauth2-credential/callback
     ```
     ⚠️ **Important**: Replace `your-domain.com` with your actual n8n instance URL

4. **Save application credentials:**
   - After creating the application, save:
     - **Client ID**
     - **Client Secret**
   - You'll need these in the next step

5. **Configure scopes:**
   - In the application details, go to the **Scope** tab
   - Add the required scopes, e.g.:
     ```
     ZOHOPEOPLE.forms.ALL
     ZOHOPEOPLE.attendance.ALL
     ZOHOPEOPLE.leave.ALL
     ZOHOPEOPLE.timetracker.ALL
     ZOHOPEOPLE.employee.READ
     ZOHOPEOPLE.hrcases.ALL
     ZOHOPEOPLE.view.READ
     ```

### Step 2: Configure Credentials in n8n

1. **Open n8n:**
   - Go to **Credentials** in the main menu
   - Click **New** → Search for **Zoho People OAuth2 API**

2. **Fill in OAuth2 credentials:**

   | Field | Value | Description                                                                                                                                                          |
   |-------|-------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
   | **API Domain** | Select your region | 🇺🇸 US / 🇪🇺 EU / 🇦🇺 AU / 🇮🇳 IN / 🇨🇳 CN.<br/>IMPORTANT: The Zoho OAuth2 returns a URL, but it is incorrect for Zoho People API and should not be used as-is. |
   | **Client ID** | Your Client ID | From Zoho API Console                                                                                                                                                |
   | **Client Secret** | Your Client Secret | From Zoho API Console                                                                                                                                                |
   | **Authorization URL** | Automatic | Depends on region                                                                                                                                                    |
   | **Access Token URL** | Select region | US/EU/AU/IN/CN                                                                                                                                                       |
   | **Scopes** | Select required | Choose operations for each resource                                                                                                                                  |

3. **Select scopes:**

   Scopes control API access. Format: `ZOHOPEOPLE.scopename.operation`

   **Operation types:**
   - `ALL` - Full CRUD access (Create, Read, Update, Delete)
   - `CREATE` - Create only
   - `READ` - Read only
   - `UPDATE` - Update only
   - `DELETE` - Delete only

   **Examples:**
   - ✅ `ZOHOPEOPLE.forms.ALL` - Full access to forms
   - ✅ `ZOHOPEOPLE.timetracker.READ` - Read-only time tracking
   - ✅ `ZOHOPEOPLE.leave.CREATE` - Create leaves only

   💡 **Tip**: Select only the permissions your application needs for better security.

4. **Authorize:**
   - Click **Connect my account**
   - Log in to Zoho and accept permissions
   - After successful authorization, you'll see a green "Connected" status

5. **Save credentials:**
   - Click **Save**

## 🚀 Usage

### Basic Usage

1. Create a new workflow in n8n
2. Add **Zoho People** node
3. Select or create credentials (OAuth2)
4. Select **Resource**
5. Select **Operation**
6. Fill in required fields
7. Execute the workflow

### Simple Workflow Example

```
[Trigger: Webhook or Cron] → [Zoho People: Get Leave Types] → [Set Node] → [Email Node]
```

## 📚 Available Resources & Operations

### 📝 Forms

#### Fetch Forms
Retrieves the list of all forms available in Zoho People.

**Parameters:**
- No required parameters

**Use case:**
Check what forms are available in the system.

---

#### Get Bulk Records
Fetch bulk records from a specific form along with tabular section data.

**Parameters:**
- `formLinkName` (required) - Form link name
- `sIndex` (required) - Start index (default: 1)
- `limit` (required) - Number of records to fetch (default: 200)
- `searchColumn` (optional) - Search column
- `searchValue` (optional) - Search value
- `modifiedtime` (optional) - Modified date

**Use case:**
Fetch 100 employee records modified after a specific date.

---

#### Get Record Count
Returns the total number of records in a form.

**Parameters:**
- `formLinkName` (required) - Form link name

**Use case:**
Check the number of employees in the system.

---

### 📅 Attendance

#### Attendance Bulk Import
Bulk import check-in and check-out data for employees.

**Parameters:**
- `data` (required) - JSON array with data
- `dateFormat` (optional) - Date format

**Data format:**
```json
[
  {
    "empId": "1",
    "checkIn": "2014-11-07 09:01:00",
    "location": "Warsaw",
    "building": "Main Office"
  },
  {
    "empId": "1",
    "checkOut": "2014-11-07 18:02:00"
  }
]
```

---

#### Check In/Check Out
Record check-in or check-out for a single employee.

**Parameters:**
- `checkIn` (optional) - Check-in time
- `checkOut` (optional) - Check-out time
- `identifierType` (required) - Identifier type (empId/emailId/mapId)
- `empId/emailId/mapId` (required) - Identifier value
- `dateFormat` (optional) - Date format

---

#### Fetch Last Attendance Entries
Fetch the latest attendance entries from a specified period.

**Parameters:**
- `duration` (required) - Time in minutes (default: 5)
- `dateTimeFormat` (required) - Date and time format

---

#### Get Attendance Entries
Fetch attendance entries for a specific date.

**Optional parameters:**
- `date` - Date
- `dateFormat` - Date format
- `erecno` - Employee record number
- `mapId` - Mapping ID
- `emailId` - Employee email
- `empId` - Employee ID

---

#### Get Regularization Records
Fetch attendance regularization records.

**Optional parameters:**
- `recordId` - Record ID (if provided, other parameters are ignored)
- `fromdate` - From date
- `todate` - To date
- `dateFormat` - Date format
- `employeeId` - Employee ID
- `startIndex` - Start index

---

#### Shift Details Of Employee
Fetch employee shift configuration details.

**Parameters:**
- `empId` (optional) - Employee ID
- `emailId` (optional) - Employee email
- `mapId` (optional) - Mapping ID
- `sdate` (required) - Start date
- `edate` (required) - End date

---

#### Update User Shift
Map employees to respective shifts.

**Parameters:**
- `empId` (required) - Employee ID
- `shiftName` (required) - Shift name
- `fdate` (required) - From date
- `tdate` (required) - To date
- `dateFormat` (optional) - Date format

---

### 💼 Cases

#### View List of Categories
Display the list of case categories users can raise queries to.

**Parameters:**
- No required parameters

---

#### View Case Details
Display details of a specific case.

**Parameters:**
- `recordId` (required) - Case record ID

---

### 🏖️ Leave

#### Add Leave
Add a leave record (day-based or hour-based).

**Parameters:**
- `formLinkName` (required) - Form name (usually "leave")
- `employeeId` (required) - Employee ID
- `leaveTypeId` (required) - Leave type ID
- `fromDate` (required) - Start date
- `toDate` (required) - End date
- `leaveType` (required) - Type: "day" or "hour"
- `daysConfig` (required) - JSON configuration

**daysConfig format for day-based leave:**
```json
{
  "07-Jan-2021": {
    "LeaveCount": 0.5,
    "Session": 2
  }
}
```
- LeaveCount: 1 (full day), 0.5 (half day), 0.25 (quarter day)
- Session for 0.5: 1 (first half), 2 (second half)
- Session for 0.25: 1-4 (quarters)

**daysConfig format for hour-based leave:**
```json
{
  "07-Jan-2021": {
    "LeaveCount": "01:00",
    "StartTime": "17:00",
    "EndTime": "18:00"
  }
}
```

---

#### Cancel Leave
Cancel a leave record.

**Parameters:**
- `recordId` (required) - Leave record ID
- `reason` (optional) - Cancellation reason

---

#### Get Leave Types
Fetch leave types for a specific employee.

**Parameters:**
- `userId` (required) - User ID

---

#### Get Holidays
Fetch holidays for a specific employee.

**Parameters:**
- `userId` (required) - User ID

---

#### Get All Holidays V2
Fetch holidays for location, shift, or employee (V2 API).

**Optional parameters:**
- `location` - Location name
- `shift` - Shift name
- `employee` - Emp ID, Email ID, or Erecno
- `upcoming` - Whether to get holidays for next 365 days
- `from` - From date
- `to` - To date
- `dateFormat` - Date format

---

#### Get Leave Records V2
Fetch leave records with advanced filtering (V2 API).

**Parameters:**
- `from` (required) - From date
- `to` (required) - To date

**Optional parameters:**
- `dateFormat` - Date format
- `employee` - JSON array of employee erecnos
- `leavetype` - JSON array of leave type IDs
- `approvalStatus` - JSON array of statuses
- `startIndex` - Start index
- `limit` - Limit (max 200)
- `dataSelect` - Scope: MINE, SUBS, DIRSUBS, MINE,SUBS, ALL

---

#### Get Single Leave Record
Fetch a single leave record.

**Parameters:**
- `recordId` (required) - Record ID

---

#### Get User Report
Get user leave report for current leave year.

**Parameters:**
- `employee` (required) - Employee erecno
- `to` (optional) - To date

---

#### Get Booked and Balance Report
Get booked and balance report for leaves.

**Parameters:**
- `from` (required) - From date
- `to` (required) - To date

**Optional parameters:**
- `unit` - "Day" or "Hour"
- `leavetype` - JSON array of type IDs (max 30)
- `employee` - JSON array of erecnos (max 30)
- `department` - JSON array of department IDs (max 30)
- `employeeStatus` - JSON array of statuses
- `startIndex` - Start index
- `limit` - Limit (max 30)

---

#### Get Bradford Report
Get Bradford report for rolling 12 months.

**Parameters:**
- `employee` (required) - JSON array of erecnos (max 30)
- `asOn` (optional) - As on date

---

#### Get Encashment Report
Get encashment report for specified pay cycle.

**Parameters:**
- `payPeriodSettingId` (required) - Pay period setting ID
- `from` (required) - Pay cycle start date
- `to` (required) - Pay cycle end date

**Optional parameters:**
- `employee` - JSON array of erecnos (max 30)
- `unit` - "Day" or "Hour"
- `startIndex` - Start index
- `limit` - Limit (max 30)

---

### ⏱️ Timer

#### Start Timer
Start a new timer.

**Parameters:**
- `user` (required) - ERECNO, Email-ID, or Employee-ID
- `jobId` (required) - Job ID
- `workDate` (required) - Work date (yyyy-MM-dd)
- `billingStatus` (required) - Billing status

**Optional parameters:**
- `dateFormat` - Date format
- `projectId` - Project ID
- `description` - Description (max 250 chars)
- `workItem` - Work item (max 500 chars)

---

#### Pause Timer
Pause a running timer.

**Parameters:**
- `timeLogId` (required) - Time log ID

---

#### Resume Timer
Resume a paused timer.

**Parameters:**
- `timeLogId` (required) - Time log ID

---

#### Get Currently Running Timer
Get details of the currently running timer.

**Optional parameters:**
- `dateFormat` - Date format

---

#### Add Comment
Add a comment to a timer.

**Parameters:**
- `timeLogId` (required) - Time log ID
- `comment` (required) - Comment text

---

#### Get Comments
Get comments for a timer.

**Parameters:**
- `timeLogId` (required) - Time log ID

---

#### Delete Comment
Delete a comment from a timer.

**Parameters:**
- `commentId` (required) - Comment ID

---

### 📊 Timesheet

#### Get Timesheets
Get list of timesheets.

**Parameters:**
- `user` (required) - "all", Email ID, Employee ID, or Erec No.

**Optional parameters:**
- `approvalStatus` - all, approved, draft, pending, rejected
- `dateFormat` - Date format
- `employeeStatus` - users, nonusers, usersandnonusers, logindisabled
- `fromDate` - From date
- `limit` - Limit (max 200)
- `sIndex` - Start index
- `toDate` - To date

---

#### Get Timesheet Details
Get details of a specific timesheet.

**Parameters:**
- `timesheetId` (required) - Timesheet ID

**Optional parameters:**
- `dateFormat` - Date format

---

### 👁️ View

#### Default And Custom View
Get default and custom views for forms.

**Parameters:**
- No required parameters

---

#### Fetch View of a Specific Form
Get list of views for a specific form.

**Parameters:**
- `formLinkName` (required) - Form link name

---

## 🎓 Usage Examples

### Example 1: Automated Leave Reporting

**Goal:** Send daily email with today's leave list every morning.

**Workflow:**
```
[Cron: 7:00 AM daily]
  → [Zoho People: Get Leave Records V2]
      - from: {{$now.format('yyyy-MM-dd')}}
      - to: {{$now.format('yyyy-MM-dd')}}
      - approvalStatus: ["APPROVED"]
  → [Function: Format data]
  → [Gmail: Send Email]
```

---

### Example 2: Attendance Sync from Biometric System

**Goal:** Sync data from biometric system every 5 minutes.

**Workflow:**
```
[Cron: Every 5 minutes]
  → [HTTP Request: Fetch from biometric system]
  → [Function: Transform data]
  → [Zoho People: Attendance Bulk Import]
  → [Slack: Notify on error]
```

---

### Example 3: Automatic Timer Start

**Goal:** Start timer when employee begins work on Jira task.

**Workflow:**
```
[Jira Trigger: Issue updated]
  → [IF: Status = "In Progress"]
  → [Zoho People: Start Timer]
      - jobId: {{$json["issue"]["key"]}}
      - workDate: {{$now.format('yyyy-MM-dd')}}
  → [Slack: Notify user]
```

---

### Example 4: Weekly Time Report

**Goal:** Generate and send time report to manager every Friday.

**Workflow:**
```
[Cron: Friday 5:00 PM]
  → [Zoho People: Get Timesheets]
      - user: "all"
      - approvalStatus: "pending"
  → [Function: Generate report]
  → [Google Sheets: Append data]
  → [Gmail: Send to manager]
```

---

### Example 5: Unapproved Timesheet Reminder

**Goal:** Send reminder to employees with unapproved timesheets.

**Workflow:**
```
[Cron: Monday 9:00 AM]
  → [Zoho People: Get Timesheets]
      - approvalStatus: "draft"
  → [Split In Batches]
  → [Gmail: Send reminder]
      - To: {{$json["email"]}}
```

---

## 💻 Requirements

- **n8n**: v0.200.0 or newer
- **Node.js**: 20.19 or newer
- **Zoho People**: Active account with API access
- **OAuth2**: Configured application in Zoho API Console

## 🛠️ Development

### Building from Source

```bash
# Clone repository
git clone https://github.com/kamilfityka/n8n-nodes-zohopeople-easyautomate.git

# Navigate to directory
cd n8n-nodes-zohopeople-easyautomate

# Install dependencies
npm install

# Build project
npm run build

# Run linter
npm run lint

# Run tests
npm test
```

### Project Structure

```
n8n-nodes-zohopeople-easyautomate/
├── nodes/
│   └── ZohoPeople/
│       ├── ZohoPeople.node.ts          # Main node file
│       ├── GenericFunctions.ts          # API helper functions
│       ├── types.d.ts                   # Type definitions
│       ├── descriptions/                # Parameter descriptions
│       │   ├── AttendanceDescription.ts
│       │   ├── CasesDescription.ts
│       │   ├── FormDescription.ts
│       │   ├── LeaveDescription.ts
│       │   ├── SharedFields.ts
│       │   ├── TimerDescription.ts
│       │   ├── TimesheetDescription.ts
│       │   └── ViewDescription.ts
│       └── operations/                  # Operation logic
│           ├── AttendanceOperations.ts
│           ├── CasesOperations.ts
│           ├── FormOperations.ts
│           ├── LeaveOperations.ts
│           ├── TimerOperations.ts
│           ├── TimesheetOperations.ts
│           └── ViewOperations.ts
├── credentials/
│   └── ZohoPeopleOAuth2Api.credentials.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Available Scripts

- `npm run build` - Compile TypeScript and copy files
- `npm run dev` - Watch mode for development
- `npm run format` - Format code using Prettier
- `npm run lint` - Check code using ESLint
- `npm run lintfix` - Fix ESLint issues automatically
- `npm test` - Run Jest tests

## 📄 License

This project is licensed under Apache 2.0 with Commons Clause - see [LICENSE.md](LICENSE.md) for details.

**Commons Clause** means that:
- ✅ You can use this software for free
- ✅ You can modify the code
- ✅ You can distribute modified versions
- ❌ You cannot sell commercial versions of this software as a service

## 👨‍💻 Author

**Kamil Fityka**
- Email: kamil.fityka@easyautomate.pl
- GitHub: [@kamilfityka](https://github.com/kamilfityka)
- Company: [EasyAutomate](https://easyautomate.pl)

## 🙏 Support

If this project is helpful, please consider:
- ⭐ Starring the repository on GitHub
- 🐛 Reporting bugs via [Issues](https://github.com/kamilfityka/n8n-nodes-zohopeople-easyautomate/issues)
- 🔧 Submitting Pull Requests with improvements
- 📖 Improving documentation

## 🔗 Useful Links

- [n8n Documentation](https://docs.n8n.io/)
- [Zoho People API Documentation](https://www.zoho.com/people/api/overview.html)
- [n8n Community](https://community.n8n.io/)
- [Zoho People](https://www.zoho.com/people/)

## 📋 Changelog

### v0.2.0
- ✨ Added comprehensive Timer API integration (7 operations)
- ✨ Added advanced Leave API operations (11 operations)
- ✨ Added Timesheet operations (2 operations)
- 🔧 Refactoring: Split ZohoPeople.node.ts into separate operation files
- 📝 Enhanced OAuth2 credentials documentation
- 🎨 Added emoji to scopes for better readability

### v0.1.0
- 🎉 Initial release
- ✨ Support for Forms, Attendance, Cases, Leave, View

---

<p align="center">
    <b>Built with ❤️ for the n8n community</b>
    <br />
    <sub>Powered by EasyAutomate</sub>
</p>
