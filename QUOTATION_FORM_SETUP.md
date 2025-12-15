# Quotation Form Setup Guide

## Current Status

The quotation form is currently using a **mailto:** link solution as a temporary workaround because BigCommerce's contact form endpoint is not accessible from the product page context.

### How It Currently Works:
1. Customer fills out the quotation form
2. Clicks "Submit Quote Request"
3. Their default email client opens with a pre-filled email containing:
   - All customer information
   - Product details (name, SKU, URL, quantity)
   - Customer's message/requirements
4. Customer sends the email from their email client

**Pros:**
- ✅ Works 100% of the time (no server dependencies)
- ✅ Simple and reliable
- ✅ No configuration needed

**Cons:**
- ❌ Requires user to have email client configured
- ❌ Not ideal UX for users without email clients
- ❌ User must manually send the email

---

## Permanent Solutions

Choose one of these options for a production-ready solution:

### Option 1: Configure BigCommerce Contact Form (Recommended)

**Steps:**
1. Log into BigCommerce Admin
2. Go to **Storefront → Web Pages**
3. Create or edit "Contact Us" page
4. Enable contact form with these fields:
   - Name
   - Email
   - Company Name
   - Comments/Question
5. Note the Page ID from the URL (e.g., `page_id=6`)
6. Update line 70 in `templates/components/products/modals/writeReview.html`:
   ```html
   <input type="hidden" name="page_id" value="YOUR_PAGE_ID">
   ```
7. Update `assets/js/theme/product.js` line 193:
   ```javascript
   url: '/pages.php?action=sendContactForm',
   data: {
       contact_fullname: formData.fullname,
       contact_email: formData.email,
       contact_companyname: formData.companyname,
       contact_question: fullMessage,
       page_id: YOUR_PAGE_ID, // Use your actual page ID
   },
   ```

**Cost:** Free (native BigCommerce feature)

---

### Option 2: Use Web3Forms (Simple & Free)

**Steps:**
1. Go to https://web3forms.com
2. Enter your email to get a free access key (no signup required)
3. Update `templates/components/products/modals/writeReview.html` line 14:
   ```html
   <form class="form writeReview-form quotation-form"
         action="https://api.web3forms.com/submit"
         method="post"
         data-quotation-form>
   ```
4. Add hidden field after line 70:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY">
   ```
5. Update `assets/js/theme/product.js` line 191-202:
   ```javascript
   $.ajax({
       type: 'POST',
       url: 'https://api.web3forms.com/submit',
       data: {
           access_key: 'YOUR_WEB3FORMS_KEY',
           name: formData.fullname,
           email: formData.email,
           subject: `Quote Request - ${formData.productName}`,
           message: fullMessage,
       },
       success: (response) => {
           // Success handling (already implemented)
       },
       error: (xhr, status, error) => {
           // Error handling (already implemented)
       },
   });
   ```

**Cost:** Free (unlimited submissions)
**Pros:**
- No signup required
- Instant setup
- Reliable delivery
- Works from any device

---

### Option 3: Use Formspree (Free Tier)

**Steps:**
1. Sign up at https://formspree.io (free account)
2. Create a new form
3. Get your form endpoint (e.g., `https://formspree.io/f/YOUR_FORM_ID`)
4. Update `templates/components/products/modals/writeReview.html` line 14:
   ```html
   <form class="form writeReview-form quotation-form"
         action="https://formspree.io/f/YOUR_FORM_ID"
         method="post"
         data-quotation-form>
   ```
5. Update JavaScript to use standard form submission (remove AJAX)

**Cost:** Free (50 submissions/month), $10/month for 1000 submissions
**Pros:**
- Dashboard to view submissions
- Spam filtering
- Auto-responder emails
- File uploads support

---

### Option 4: Custom Backend Endpoint

Create a custom serverless function using:
- **Netlify Functions** (if using Netlify)
- **Vercel Serverless Functions** (if using Vercel)
- **AWS Lambda**
- **Cloudflare Workers**

**Example with Cloudflare Workers:**
```javascript
// worker.js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'POST') {
    const formData = await request.formData()

    // Send email using Cloudflare Email Workers or SendGrid
    // Implementation details depend on your email service

    return new Response('Success', { status: 200 })
  }
  return new Response('Method not allowed', { status: 405 })
}
```

**Cost:** Free tier available on most platforms
**Pros:**
- Full control
- Can integrate with any email service
- Can save to database
- Can integrate with CRM

---

## Recommended Implementation Path

1. **Short-term (Current):** Use mailto solution (already implemented)
2. **Production:** Implement **Option 2 (Web3Forms)** - takes 5 minutes, completely free, no signup

---

## Files Modified

- `templates/components/products/modals/writeReview.html` - Form template
- `templates/components/products/product-view.html` - Button text (2 locations)
- `assets/js/theme/product.js` - Form handling and validation

---

## Testing Checklist

- [ ] Fill out quotation form
- [ ] Verify all product details are included
- [ ] Test email client opens (or form submits if using alternative)
- [ ] Confirm admin receives email with all information
- [ ] Test on mobile devices
- [ ] Test validation (try submitting with empty required fields)

---

## Support

For questions or issues, contact:
- Email: support@electrowell.com
- Developer: Claude Code Implementation

---

**Last Updated:** 2025-12-15
