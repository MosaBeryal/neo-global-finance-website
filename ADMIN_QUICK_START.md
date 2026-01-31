# Admin System - Quick Start (5 Minutes)

## ⚡ Quick Setup

### 1. Install Dependencies
```bash
npm install mysql2 nodemailer jsonwebtoken bcryptjs
```

### 2. Create .env.local
```bash
cp .env.example .env.local
```

### 3. Edit .env.local with your details:

**For MySQL:**
```
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=neo_finance
```

**For Gmail Email:**
1. Go to: https://myaccount.google.com/apppasswords
2. Generate app password
3. Add to .env.local:
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=app-password-from-google
EMAIL_FROM=your-email@gmail.com
```

**Security:**
```
JWT_SECRET=change-this-to-random-string
```

### 4. Setup Database
```bash
mysql -u root -p neo_finance < scripts/init-database.sql
```

### 5. Start Server
```bash
npm run dev
```

---

## 🚀 First Time Use

### Create Admin Account
1. Go to: http://localhost:3000/admin/login
2. Enter any username & password
3. ✅ Admin account created!

### Test Contact Form
1. Go to: http://localhost:3000 (homepage)
2. Scroll to contact form
3. Fill & submit
4. ✅ Confirmation email sent to you!

### View Dashboard
1. Go to: http://localhost:3000/admin/login
2. Login with your credentials
3. ✅ See all submissions + reply to emails!

---

## 📧 Email Features

✅ Automatic confirmation email when client submits  
✅ Admin can send reply emails from dashboard  
✅ Email logs tracked in database  
✅ Beautiful HTML email templates  

---

## 🔐 Admin Features

✅ Secure login with JWT tokens  
✅ View all contact submissions  
✅ Search and filter by name/email/status  
✅ Track: new, read, replied status  
✅ Send replies directly to clients  
✅ View original message while replying  

---

## 🔗 Important URLs

- **Homepage:** http://localhost:3000
- **Contact Form:** http://localhost:3000#contact
- **Admin Login:** http://localhost:3000/admin/login
- **Admin Dashboard:** http://localhost:3000/admin/dashboard

---

## 🛠 Troubleshooting

**Database Connection Error?**
- Start MySQL: `mysql.server start` (Mac) or check Windows Services
- Verify credentials in .env.local

**Email Not Sending?**
- For Gmail: Generate App Password (link above)
- Check EMAIL_USER and EMAIL_PASSWORD

**Login Not Working?**
- Clear browser cache/localStorage
- Restart dev server: `npm run dev`

---

## 📱 Available APIs

```
POST /api/contacts
  Submit contact form

POST /api/admin/login
  Login to admin (creates account on first login)

GET /api/admin/contacts
  Get all submissions (requires auth token)

POST /api/admin/contacts/{id}/reply
  Send reply email to client (requires auth token)
```

---

That's it! You now have a complete admin system for managing client inquiries with email automation. 🎉
