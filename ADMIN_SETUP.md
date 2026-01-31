# Neo Global Finance - Admin System Setup Guide

This guide will help you set up the complete admin dashboard for managing contact form submissions with email notifications.

## Features

✅ Contact form submissions stored in MySQL  
✅ Automatic confirmation emails sent to clients  
✅ Admin login system with JWT authentication  
✅ Dashboard to view all submissions  
✅ Reply to client emails directly from dashboard  
✅ Search and filter contacts  
✅ Status tracking (new, read, replied)  

---

## Step 1: Database Setup

### 1.1 Create MySQL Database

```bash
mysql -u root -p
```

Then in MySQL:

```sql
CREATE DATABASE neo_finance;
USE neo_finance;
```

### 1.2 Run Database Schema

Execute the SQL script to create all required tables:

```bash
mysql -u root -p neo_finance < scripts/init-database.sql
```

This creates:
- `contacts` - Stores contact form submissions
- `admin_users` - Admin account storage
- `email_logs` - Email sending logs

---

## Step 2: Environment Configuration

### 2.1 Create .env.local file

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### 2.2 Configure Database Credentials

Update `.env.local` with your MySQL details:

```
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=your_mysql_password
DATABASE_NAME=neo_finance
```

### 2.3 Configure Email Service

For **Gmail** (Recommended):

1. Go to https://myaccount.google.com/apppasswords
2. Generate an App Password
3. Update `.env.local`:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
```

For **Other Email Providers** (Outlook, SendGrid, etc.):
- Contact: SMTP Host, Port, and Credentials from your provider
- Update EMAIL_* variables accordingly

### 2.4 Configure JWT Secret

Change the JWT_SECRET to a random string:

```
JWT_SECRET=your-random-secure-key-here-min-32-chars
```

---

## Step 3: Install Dependencies

Add required npm packages:

```bash
npm install mysql2 nodemailer jsonwebtoken bcryptjs
npm install --save-dev @types/nodemailer @types/jsonwebtoken
```

---

## Step 4: First Time Admin Login

### 4.1 Access Admin Login

1. Navigate to: `http://localhost:3000/admin/login`
2. Enter any username and password (first login creates the admin account)
3. Example:
   - Username: `admin`
   - Password: `your-secure-password`

### 4.2 Admin Credentials

The first login creates a permanent admin account. Save your credentials securely.

---

## Step 5: Test the System

### 5.1 Submit a Contact Form

1. Go to homepage
2. Scroll to contact form
3. Fill in details and submit
4. You should receive a confirmation email

### 5.2 View in Admin Dashboard

1. Go to `http://localhost:3000/admin/login`
2. Login with your admin credentials
3. You'll see the submission in the dashboard

### 5.3 Send a Reply

1. Click on a contact in the dashboard
2. Scroll down to "Send Reply"
3. Type your message
4. Click "Send Reply"
5. Client will receive your reply email

---

## API Endpoints

### Contact Submission
- **POST** `/api/contacts`
- Body: `{ firstName, lastName, email, company, message }`

### Admin Login
- **POST** `/api/admin/login`
- Body: `{ username, password }`
- Response: `{ token, adminId }`

### Fetch Contacts
- **GET** `/api/admin/contacts`
- Header: `Authorization: Bearer {token}`

### Send Reply
- **POST** `/api/admin/contacts/{id}/reply`
- Header: `Authorization: Bearer {token}`
- Body: `{ message }`

---

## Troubleshooting

### "Cannot Connect to Database"
- Verify MySQL is running
- Check DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD
- Make sure neo_finance database exists

### "Email Not Sending"
- Verify EMAIL_HOST and EMAIL_PORT are correct
- For Gmail: Ensure App Password is generated correctly
- Check EMAIL_USER and EMAIL_PASSWORD
- Enable "Less secure app access" if needed

### "Login Failed"
- First login creates admin account automatically
- Check that admin_users table exists
- Clear browser localStorage and try again

### "No contacts showing"
- Refresh the page or clear browser cache
- Check that contacts table has data
- Verify token is valid in browser console

---

## Security Tips

1. **Change JWT_SECRET** to a random string in production
2. **Use HTTPS** when accessing admin panel
3. **Change admin password** immediately after first login
4. **Use App Passwords** instead of regular passwords for email
5. **Backup your database** regularly
6. **Keep dependencies updated**

---

## Email Template Customization

Edit `/lib/email.ts` to customize:
- Email subject lines
- HTML email templates
- Sender name and branding
- Reply message formatting

---

## Production Deployment

### Database Hosting
- Use managed MySQL: AWS RDS, DigitalOcean, Heroku, PlanetScale
- Update DATABASE_* variables

### Email Service
- For high volume: Use SendGrid, Mailgun, or Amazon SES
- Update EMAIL_* variables with service credentials

### Environment Variables
- Add .env.local variables to your deployment platform
- Never commit .env.local to version control

### SSL/TLS
- Always use HTTPS in production
- Enable secure cookies
- Update EMAIL_SECURE=true for SMTP

---

## Support

For issues or questions:
1. Check logs in browser console
2. Review .env.local configuration
3. Verify database tables with: `SHOW TABLES; SELECT * FROM contacts;`
4. Test email with: telnet {EMAIL_HOST} {EMAIL_PORT}
