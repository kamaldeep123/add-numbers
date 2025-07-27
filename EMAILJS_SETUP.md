# 📧 EmailJS Setup Guide - Direct Email Sending

Your contact form is now ready for **direct email sending** from the browser! Follow this guide to enable instant email delivery to **kamaldeeeppurba@gmail.com** without any server requirements.

## 🚀 What You'll Get

✅ **Instant Email Delivery** - Emails sent directly from your website  
✅ **No Server Required** - Works perfectly on GitHub Pages  
✅ **Professional Email Templates** - Beautifully formatted emails  
✅ **Free Service** - EmailJS offers 200 free emails per month  
✅ **Reliable Delivery** - Professional email service infrastructure  

## 📋 Step-by-Step Setup (5 minutes)

### Step 1: Create EmailJS Account

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up Free"**
3. Create your account with any email address
4. Verify your email address

### Step 2: Add Email Service

1. In your EmailJS dashboard, click **"Add Service"**
2. Choose **"Gmail"** (recommended) or your preferred email provider
3. **For Gmail:**
   - Click "Connect Account"
   - Sign in with **kamaldeeeppurba@gmail.com**
   - Allow EmailJS permissions
4. **Service ID** will be auto-generated (e.g., `service_xyz123`)

### Step 3: Create Email Template

1. Click **"Create Template"**
2. Use this template content:

**Template Name:** `contact_form`

**Subject:** `New Contact Form Message: {{subject}}`

**Content:**
```
Hello,

You have received a new message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}
Time: {{timestamp}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent automatically from your website contact form.
You can reply directly to this email to respond to {{from_name}}.

Best regards,
Your Website Contact Form
```

3. **Template ID** will be generated (e.g., `template_abc789`)

### Step 4: Get Your Keys

1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `user_xyz123abc`)
3. Note your **Service ID** and **Template ID** from previous steps

### Step 5: Update Your Contact Form

Edit your `contact.html` file and replace these placeholders:

```javascript
// Replace these lines in contact.html:

// Line ~15: Replace YOUR_PUBLIC_KEY
emailjs.init({
    publicKey: "YOUR_ACTUAL_PUBLIC_KEY_HERE", // Replace with your key
});

// Line ~189: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
```

**Example after replacement:**
```javascript
emailjs.init({
    publicKey: "user_abc123xyz", // Your actual key
});

emailjs.sendForm('service_gmail_789', 'template_contact_456', this)
```

### Step 6: Enable EmailJS in Code

In `contact.html`, find line ~128 and change:
```javascript
let emailjsConfigured = false;
```
to:
```javascript
let emailjsConfigured = true;
```

## 🎯 Quick Setup Example

If your EmailJS details are:
- **Public Key:** `user_abc123xyz`
- **Service ID:** `service_gmail_789`  
- **Template ID:** `template_contact_456`

Then update your `contact.html` like this:

```javascript
// Line ~15
emailjs.init({
    publicKey: "user_abc123xyz",
});

// Line ~128
let emailjsConfigured = true;

// Line ~189
emailjs.sendForm('service_gmail_789', 'template_contact_456', this)
```

## 🔧 Testing Your Setup

1. Save and push your changes to GitHub
2. Visit your contact page: `https://kamaldeep123.github.io/add-numbers/contact.html`
3. Fill out the test form
4. Click "Send Message"
5. Check **kamaldeeeppurba@gmail.com** inbox (and spam folder)

## 🎨 Email Template Variables

Your email template can use these variables:

- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content
- `{{timestamp}}` - When message was sent

## 🔒 Security Features

- ✅ **No API keys exposed** - Only public key visible
- ✅ **Rate limiting** - Prevents spam abuse
- ✅ **Origin whitelist** - Only your domain can send emails
- ✅ **Human verification** - Can add CAPTCHA if needed

## 💡 Advanced Features (Optional)

### Auto-Reply Setup
1. Create second template for auto-replies to visitors
2. Add auto-reply configuration in EmailJS dashboard

### Custom Styling
- Modify the HTML template for branded emails
- Add your logo and custom formatting

### Analytics
- Track email delivery rates in EmailJS dashboard
- Monitor form submission analytics

## 🚨 Troubleshooting

**Form not sending emails?**
- Check browser console for errors
- Verify all IDs match exactly
- Ensure `emailjsConfigured = true`

**Emails not arriving?**
- Check spam folder
- Verify Gmail service connection
- Test with different email address

**403 Errors?**
- Check public key is correct
- Verify domain whitelist in EmailJS settings

## 💰 Pricing

**Free Plan:** 200 emails/month  
**Paid Plans:** Start at $20/month for 10,000 emails

Perfect for contact forms and small websites!

## 📞 Support

- **EmailJS Docs:** https://www.emailjs.com/docs/
- **EmailJS Support:** Available in dashboard
- **Test Email:** Use the contact form to verify setup

---

Once setup is complete, your contact form will send emails **instantly and directly** from your website to your Gmail inbox! 🚀

## ✅ Current Status

- ✅ Contact form HTML ready
- ✅ EmailJS SDK integrated  
- ✅ Mailto fallback working
- 🔄 **Waiting for EmailJS configuration**

After following this guide, your contact page will have **professional email delivery** without any server requirements!