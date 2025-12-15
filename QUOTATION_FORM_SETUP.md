# Quotation Form Setup Guide - EmailJS Integration

## ✅ Current Status

The quotation form is now configured to use **EmailJS** - a free, reliable email sending service that works perfectly for contact forms.

### How It Works:
1. Customer fills out the quotation form
2. Clicks "Submit Quote Request"
3. Form submits directly via EmailJS API
4. You receive a professional email with all details
5. Customer sees success message and modal closes
6. **Fallback:** If EmailJS fails, opens email client automatically

---

## 🚀 EmailJS Setup (10 Minutes - FREE)

### Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Click **"Sign Up Free"**
3. Create account (free tier: 200 emails/month)
4. Verify your email address

### Step 2: Add Email Service

1. In EmailJS dashboard, click **"Add New Service"**
2. Choose your email provider:
   - **Gmail** (recommended for most users)
   - **Outlook/Office 365**
   - **Yahoo**
   - **Custom SMTP**
3. Connect your email account (info@electrowell.com)
4. **Note your Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Click **"Email Templates"** → **"Create New Template"**
2. Set Template Name: `Quotation Request`
3. Copy this template:

```
Subject: New Quote Request - {{product_name}}

You have received a new quotation request:

CUSTOMER INFORMATION
━━━━━━━━━━━━━━━━━━━━
Name: {{customer_name}}
Email: {{customer_email}}
Company: {{customer_company}}
Country: {{customer_country}}

PRODUCT INFORMATION
━━━━━━━━━━━━━━━━━━━━
Product: {{product_name}}
SKU: {{product_sku}}
URL: {{product_url}}
Quantity: {{quantity}}

CUSTOMER MESSAGE
━━━━━━━━━━━━━━━━━━━━
{{message}}

━━━━━━━━━━━━━━━━━━━━
This email was sent via the quotation form on electrowell.com
```

4. Click **"Save"**
5. **Note your Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"**
2. Find your **Public Key** (e.g., `abc123XYZ_public_key`)
3. Copy it

### Step 5: Update Your Code

Edit `/home/user/electrowell-codex/assets/js/theme/product.js` lines 174-176:

```javascript
const serviceID = 'service_abc123';        // Replace with YOUR Service ID
const templateID = 'template_xyz789';      // Replace with YOUR Template ID
const publicKey = 'abc123XYZ_public_key';  // Replace with YOUR Public Key
```

**That's it!** Your form will now send emails directly to your inbox.

---

## 🧪 Testing

1. Go to any product page
2. Click **"Request a Quote"**
3. Fill out the form
4. Click **"Submit Quote Request"**
5. **Expected Results:**
   - Button shows "Sending..."
   - Success message appears
   - Form resets
   - Modal closes after 3 seconds
   - You receive email at info@electrowell.com

---

## 📋 Alternative Options

### Option 1: Web3Forms (No Signup Required)

**Pros:** No signup, instant setup, unlimited emails
**Cons:** Less customization

**Setup:**

1. Go to https://web3forms.com
2. Enter `info@electrowell.com`
3. Get access key instantly
4. Update `product.js`:

```javascript
handleQuotationSubmit($form) {
    // ... existing code ...

    $.ajax({
        type: 'POST',
        url: 'https://api.web3forms.com/submit',
        data: {
            access_key: 'YOUR_WEB3FORMS_KEY',
            name: formData.fullname,
            email: formData.email,
            subject: `Quote Request - ${formData.productName}`,
            message: emailBody,
        },
        success: () => { /* ... */ },
    });
}
```

---

### Option 2: Elfsight Contact Form Widget

**Note:** Elfsight is a widget platform, not a form submission API. You would need to replace your entire form with an Elfsight widget.

**Pros:**
- Visual form builder
- Pre-designed templates
- Built-in spam protection
- Dashboard to manage submissions

**Cons:**
- **Cost:** $5-10/month
- Requires replacing your custom form
- Less control over design
- Adds external dependency

**Setup:**

1. Go to https://apps.elfsight.com/
2. Sign up for account
3. Create a **Contact Form** widget
4. Customize fields to match:
   - Full Name
   - Email
   - Company
   - Country
   - Quantity
   - Message
5. Get embed code
6. Replace modal form with Elfsight widget:

```html
<!-- In writeReview.html -->
<div id="modal-review-form" class="modal review-for-detail" data-reveal>
    <div class="modal-header">
        <h2 class="modal-header-title">Request a Quote</h2>
        <a href="#" class="modal-close" aria-label="Close">
            <span aria-hidden="true">&#215;</span>
        </a>
    </div>
    <div class="modal-body">
        <!-- Elfsight Contact Form Widget -->
        <script src="https://apps.elfsight.com/p/platform.js" defer></script>
        <div class="elfsight-app-YOUR_WIDGET_ID"></div>
    </div>
</div>
```

**Note:** You would lose the automatic product information (SKU, name, URL) unless you configure hidden fields in Elfsight.

---

### Option 3: Formspree

**Pros:** Free tier (50/month), dashboard, spam filtering
**Cons:** Requires signup, paid for higher volume

**Setup:**

1. Sign up at https://formspree.io
2. Create new form
3. Get endpoint: `https://formspree.io/f/YOUR_FORM_ID`
4. Update `product.js`:

```javascript
$.ajax({
    type: 'POST',
    url: 'https://formspree.io/f/YOUR_FORM_ID',
    data: formData,
    success: () => { /* ... */ },
});
```

---

### Option 4: BigCommerce Native Contact Form

If you configure the Contact Us page in BigCommerce:

1. **BigCommerce Admin** → **Storefront** → **Web Pages**
2. Create/Edit "Contact Us" page
3. Enable contact form
4. Note the Page ID
5. Update form action in `writeReview.html`:

```html
<form action="/pages.php?action=sendContactForm" method="post">
    <input type="hidden" name="page_id" value="YOUR_PAGE_ID">
    <!-- rest of form -->
</form>
```

---

## 📊 Comparison Table

| Solution | Cost | Setup Time | Emails/Month | Customization | Recommendation |
|----------|------|------------|--------------|---------------|----------------|
| **EmailJS** | Free | 10 min | 200 (free tier) | High | ⭐ **Best** |
| Web3Forms | Free | 5 min | Unlimited | Medium | Great |
| Elfsight | $5-10/mo | 15 min | Unlimited | Low | Not recommended |
| Formspree | Free/$10 | 10 min | 50/1000 | Medium | Good |
| BigCommerce | Free | 30 min | Unlimited | Low | If already configured |

---

## 🎯 Recommended: EmailJS

**Why EmailJS is the best choice:**

✅ **Free** (200 emails/month - plenty for most B2B sites)
✅ **Keeps your custom form** (no redesign needed)
✅ **Product details automatically included**
✅ **Professional email templates**
✅ **Reliable delivery**
✅ **Dashboard to track emails**
✅ **Auto-responder support** (send confirmation to customer)
✅ **Fallback to mailto** if service fails

---

## 💰 Pricing Comparison

### EmailJS
- **Free:** 200 emails/month
- **Personal:** $7/month - 1,000 emails
- **Professional:** $15/month - 5,000 emails

### Elfsight
- **Lite:** $5/month - 1 widget
- **Basic:** $10/month - 3 widgets
- Must keep subscription active

### Web3Forms
- **Free:** Unlimited (no catch)

### Formspree
- **Free:** 50 submissions/month
- **Gold:** $10/month - 1,000 submissions

---

## 🔧 Troubleshooting

### EmailJS not sending?

1. **Check credentials** in `product.js` lines 174-176
2. **Verify service is connected** in EmailJS dashboard
3. **Check email quota** (200/month on free tier)
4. **Check browser console** for errors
5. **Test from EmailJS dashboard** first

### Emails going to spam?

1. **Add custom domain** in EmailJS (paid feature)
2. **Use authenticated email service** (Gmail/Outlook)
3. **Ask recipient to whitelist** EmailJS

### Want to send confirmation to customer?

In EmailJS dashboard:
1. Create second template for customer
2. Add auto-reply in template settings
3. Use `{{customer_email}}` as recipient

---

## 📞 Support

- **EmailJS Documentation:** https://www.emailjs.com/docs/
- **EmailJS Support:** support@emailjs.com
- **Your Developer:** Claude Code Implementation

---

## 🚀 Quick Start Command

Already done! Just add your EmailJS credentials to `product.js`:

```bash
# Edit this file:
/home/user/electrowell-codex/assets/js/theme/product.js

# Lines 174-176:
const serviceID = 'YOUR_SERVICE_ID';
const templateID = 'YOUR_TEMPLATE_ID';
const publicKey = 'YOUR_PUBLIC_KEY';
```

---

**Last Updated:** 2025-12-15
**Implementation:** EmailJS with mailto fallback
