# Database Setup Guide for Neo Global Finance Admin System

## Prerequisites

- MySQL Server (5.7 or higher)
- Node.js and npm
- Environment variables configured

## Step 1: Install MySQL

### macOS (Homebrew)
```bash
brew install mysql
brew services start mysql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install mysql-server
sudo systemctl start mysql
```

### Windows
Download and install from: https://dev.mysql.com/downloads/mysql/

## Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Open `.env.local` and configure your MySQL credentials:
```env
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=your_password_here
DATABASE_NAME=neo_finance
ADMIN_PASSWORD=your_admin_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
JWT_SECRET=your_jwt_secret_here
```

### Email Configuration (Gmail Example)

1. Enable 2FA on your Google Account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use the generated password in `EMAIL_PASSWORD`

Or use any SMTP service (SendGrid, Mailgun, etc.)

## Step 3: Initialize Database

1. Connect to MySQL:
```bash
mysql -u root -p
```

2. Run the initialization script:
```bash
mysql -u root -p < scripts/init-database.sql
```

Or execute the SQL manually:
```sql
CREATE DATABASE IF NOT EXISTS neo_finance;
USE neo_finance;

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'replied') DEFAULT 'new',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status (status)
);

CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  passwordHash VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE email_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contactId INT NOT NULL,
  recipientEmail VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  status ENUM('sent', 'failed') DEFAULT 'sent',
  errorMessage TEXT,
  sentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (contactId) REFERENCES contacts(id)
);
```

## Step 4: Install Dependencies

```bash
npm install mysql2 nodemailer jsonwebtoken bcryptjs
```

## Step 5: Start Development Server

```bash
npm run dev
```

## Step 6: Access Admin Panel

1. Navigate to: `http://localhost:3000/admin/login`
2. First login creates your admin account (use any username/password)
3. Dashboard will be at: `http://localhost:3000/admin/dashboard`

## Troubleshooting

### Error: connect ECONNREFUSED 127.0.0.1:3306

**Solution:** MySQL is not running
```bash
# macOS
brew services start mysql

# Linux
sudo systemctl start mysql

# Windows
net start MySQL80  # or your MySQL version
```

### Error: Access denied for user 'root'@'localhost'

**Solution:** Check your `.env.local` password

```bash
# Test connection
mysql -u root -p -e "SELECT 1"
```

### Error: Unknown database 'neo_finance'

**Solution:** Run the database initialization script

```bash
mysql -u root -p < scripts/init-database.sql
```

### Email not sending

- Check EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD in `.env.local`
- For Gmail: Use App Password, not your regular password
- Check firewall/network issues
- Verify SMTP port (usually 587 or 465)

### Database connection works locally but not in production

1. Update `DATABASE_HOST` to your server IP/domain
2. Ensure MySQL port (3306) is accessible
3. Create database user with proper permissions:

```sql
CREATE USER 'neo_admin'@'your_server_ip' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON neo_finance.* TO 'neo_admin'@'your_server_ip';
FLUSH PRIVILEGES;
```

## Production Deployment

1. Use environment variables from your hosting provider
2. Use a strong `JWT_SECRET` (generate: `openssl rand -base64 32`)
3. Use a separate email service account (SendGrid, AWS SES, etc.)
4. Enable SSL/TLS for MySQL connections
5. Set up regular database backups
6. Use a reverse proxy (Nginx) in front of your Node server

## Security Checklist

- [ ] Changed default admin password
- [ ] Using strong JWT_SECRET
- [ ] Email credentials are secure (app password or service account)
- [ ] Database backups enabled
- [ ] HTTPS enabled in production
- [ ] Firewall restricts database access
- [ ] Admin panel behind authentication
