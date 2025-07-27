# Contact Form Setup

Your professional contact page has been created! Here's what you need to know:

## Files Created

1. **contact.html** - The main contact page with a beautiful, professional design
2. **contact_handler.php** - PHP script to handle form submissions and send emails
3. **CONTACT_SETUP.md** - This setup guide

## Features

✅ **Professional Design** - Matches your website's aesthetic with gradient backgrounds and modern styling  
✅ **Responsive Layout** - Works perfectly on mobile, tablet, and desktop  
✅ **Email Integration** - Sends messages directly to kamaldeeeppurba@gmail.com  
✅ **Form Validation** - Client-side and server-side validation  
✅ **Fallback Support** - Uses mailto: as backup if PHP isn't available  
✅ **Interactive Effects** - Smooth animations and hover effects  
✅ **Back Navigation** - Easy navigation back to your calculator  

## How to Access

1. **Direct Access**: Open `contact.html` in your browser
2. **From Calculator**: Click the "📧 Contact Me" link at the bottom of your calculator page

## Email Setup Options

### Option 1: PHP Mail (Server Required)
- Upload both `contact.html` and `contact_handler.php` to a web server with PHP support
- The form will automatically send emails to your Gmail address
- Most reliable method for production use

### Option 2: Mailto Fallback (Works Everywhere)
- If PHP isn't available, the form automatically falls back to opening the user's email client
- Works on any web server or even when opening files locally
- User's default email client will open with pre-filled message

### Option 3: Third-Party Service Integration
If you want to use a service like Formspree, Netlify Forms, or EmailJS:

1. Sign up for your preferred service
2. Replace the form action in `contact.html`:
   ```html
   <form class="contact-form" id="contactForm" action="YOUR_SERVICE_ENDPOINT" method="POST">
   ```

## Form Fields

- **Name** - Full name (required)
- **Email** - Contact email (required, validated)
- **Subject** - Message subject (required)
- **Message** - Detailed message (required)

## Security Features

- Input sanitization and validation
- Email format validation
- CSRF protection ready
- XSS protection through input filtering

## Browser Support

- ✅ Chrome, Firefox, Safari, Edge (latest versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Works with JavaScript disabled (fallback to mailto)

## Customization

You can easily customize:
- Colors by modifying the CSS gradient values
- Form fields by adding/removing input groups
- Email template in `contact_handler.php`
- Success/error messages

## Testing

1. Open `contact.html` in your browser
2. Fill out all fields with test data
3. Submit the form
4. Check your email (kamaldeeeppurba@gmail.com) for the message

Enjoy your new professional contact page! 🚀