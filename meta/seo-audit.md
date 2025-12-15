# BigCommerce Stencil SEO & Platform Audit

## Status and next steps
- The recommendations below are **not yet applied to the theme code**; they are provided as guidance.
- To deliver them, implement the changes in the indicated templates and open/merge a Pull Request in your store's theme repo.
- Prioritize `templates/layout/base.html` for head/canonical/script order updates, then apply the product and navigation fixes.

## templates/layout/base.html
- **Code Snippet**: templates/layout/base.html
- **Critical SEO Issue**: Viewport meta blocks zoom (`maximum-scale=1`) and there are no preload/preconnect hints or deferrals for non-critical scripts (AddThis blocks rendering); CSS is not preloaded which can delay LCP and images are not given fetchpriority hooks.【F:templates/layout/base.html†L8-L22】【F:templates/layout/base.html†L91-L157】
- **Platform Update Required**: Scripts load synchronously and jQuery is pulled late from a theme asset without `defer`; no canonical guard using `settings.request.absolute_path` and no `responsive_image` usage for hero/LCP assets. Replace legacy script ordering with deferred Stencil bundling and add CDN hints.【F:templates/layout/base.html†L9-L22】【F:templates/layout/base.html†L91-L157】
- **Optimized Code Block**:
```handlebars
<head>
  <title>{{head.title}}</title>
  {{{head.meta_tags}}}
  {{{head.config}}}
  <link rel="canonical" href="{{#if settings.request.absolute_path}}{{settings.request.absolute_path}}{{else}}{{urls.canonical}}{{/if}}">
  <link rel="icon" href="{{head.favicon}}" sizes="32x32">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="preconnect" href="{{cdn '/'}}" crossorigin>
  <link rel="preload" as="style" href="{{cdn 'assets/css/theme.css'}}">
  <link rel="stylesheet" href="{{cdn 'assets/css/theme.css'}}">
  {{> components/common/structured-data }}
  {{{head.rsslinks}}}
  {{{block "head"}}}
  {{{snippet 'htmlhead'}}}
  <script async src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-589d7698f6fa5c40"></script>
</head>
<body class="page-type-{{page_type}}">
  <script>window.__webpack_public_path__ = "{{cdn 'assets/dist/'}}";</script>
  <script src="{{cdn 'assets/dist/theme-bundle.main.js'}}" defer></script>
  <script defer>window.stencilBootstrap("{{template_file}}", {{jsContext}}).load();</script>
</body>
```

## templates/pages/product.html
- **Code Snippet**: templates/pages/product.html
- **Critical SEO Issue**: Product JSON-LD and availability are hidden inside `components/products/product-view` without explicit preload of the primary image; main product image likely lazy-loaded (hurting LCP) and no fetchpriority/preload directive from the page shell.【F:templates/pages/product.html†L16-L68】
- **Platform Update Required**: Ensure schema variables use tax-aware keys (`price.without_tax`/`price.with_tax`) and migrate hero image rendering to `{{responsive_image}}` with `fetchpriority="high"`; add `preload` for the first gallery image from Stencil context to avoid CLS/LCP regression.【F:templates/pages/product.html†L16-L68】
- **Optimized Code Block**:
```handlebars
<main itemscope itemtype="https://schema.org/Product" class="page-content col-sm-9">
  <link rel="preload" as="image" imagesrcset="{{getImage product.main_image 'zoom' (cdn 'webdav:' )}}" fetchpriority="high">
  {{#if product.main_image}}
    {{responsive_image
      image=product.main_image
      class="product-main-image"
      lazyload=false
      fetchpriority="high"
      fallback_size="zoom"
      max_width=1200
      itemprop="image"
    }}
  {{/if}}
  {{> components/products/product-view schema=true}}
  <script type="application/ld+json">
  {{> components/products/schema/product
      price=product.price.without_tax.value
      availability=product.availability
      url=urls.product}} 
  </script>
</main>
```

## templates/components/common/navigation.html
- **Code Snippet**: templates/components/common/navigation.html
- **Critical SEO Issue**: Uses empty anchors (`href="#"`, `javascript:void(0)`) and non-semantic list items without ARIA labels, reducing accessibility and crawl clarity; mobile trigger lacks descriptive text.【F:templates/components/common/navigation.html†L3-L38】
- **Platform Update Required**: Replace placeholder anchors with buttons, add `aria-expanded`/`aria-controls`, and avoid inline JS triggers in favor of Stencil data attributes; ensure dropdown images use `{{cdn}}` with responsive helpers instead of hardcoded paths.【F:templates/components/common/navigation.html†L13-L35】
- **Optimized Code Block**:
```handlebars
<nav class="navUser" aria-label="Store utilities">
  <ul>
    <li id="trigger-mobile" class="visible-xs">
      <button type="button" class="navUser-mobileToggle" aria-controls="menu" aria-expanded="false">Menu</button>
    </li>
    {{#if settings.phone_number}}
      <li class="phone_number hidden-xs">
        <a href="tel:{{settings.phone_number}}" aria-label="Call customer service at {{settings.phone_number}}">Customer Service <span>{{settings.phone_number}}</span></a>
      </li>
    {{/if}}
    <li class="hidden-xs"><a href="{{urls.contact_us}}" aria-label="Need help contact link">Need Help?</a></li>
    {{#if settings.account_creation_enabled}}
      {{#if customer}}
        <li class="hidden-xs">{{lang 'Welcome back,'}} <strong>{{customer.name}}</strong></li>
        <li class="logged-out hidden-sm hidden-xs"><a href="{{urls.auth.logout}}"><span>{{lang 'common.logout'}}</span></a></li>
      {{else}}
        <li class="login hidden-sm hidden-xs customer-login">
          <button type="button" class="toggle-dropdown-login" aria-haspopup="dialog" aria-expanded="false">{{lang 'common.login'}}</button>
          <div id="dropdown-login" role="dialog" aria-label="{{lang 'common.login'}}">
            <h3>Login</h3>
            <form class="login-popup" id="loginForm" action="{{urls.auth.login}}" method="post" name="mainLoginForm">
              <fieldset class="form-fieldset">
                <div class="form-field">
                  <label for="login_email">Email address</label>
                  <input class="form-input" name="login_email" id="login_email" type="email" autocomplete="username" required>
                </div>
                <div class="form-field">
                  <label for="login_pass">Password</label>
                  <input class="form-input" id="login_pass" type="password" name="login_pass" autocomplete="current-password" required>
                </div>
                <p id="popup-loading" class="visually-hidden" aria-live="polite"><img src="{{cdn 'assets/img/vendor/jstree/throbber.gif'}}" alt="Loading"></p>
                <div class="form-actions">
                  <button type="submit" class="btn btn-alt">Login</button>
                </div>
              </fieldset>
            </form>
            <div class="separated-form" role="group" aria-label="Account links">
              <a class="forgot-password" href="{{urls.auth.forgot_password}}">{{lang 'login.forgot_password' }}</a>
              <span aria-hidden="true">OR</span>
              <a href="{{urls.auth.create_account}}" class="btn btn-primary"><span>{{lang 'login.new_customer.create_account'}}</span></a>
            </div>
          </div>
        </li>
        <li class="sing_up hidden-sm hidden-xs"><a href="{{urls.auth.create_account}}"><span>{{lang 'common.sign_up'}}</span></a></li>
      {{/if}}
    {{/if}}
    {{#if settings.gift_certificates_enabled}}
      <li class="hidden-xs">
        <a href="{{urls.gift_certificate.purchase}}"><span>{{lang 'common.gift_cert'}}</span></a>
      </li>
    {{/if}}
    <li class="hidden-xs"><a href="{{urls.brands}}">Brands</a></li>
    {{#if customer.store_credit.value '>' 0}}
      <li class="my-account hidden-xs hidden-sm">
        <a class="navUser-action--storeCredit" data-dropdown="storeCredit-dropdown" data-options="align:bottom" href="{{urls.cart}}" aria-expanded="false">
          <span class="navUser-action-divider">{{lang 'common.store_credit_overview' credit=customer.store_credit.formatted}}</span>
        </a>
        <div class="dropdown-menu" id="storeCredit-dropdown" data-dropdown-content aria-hidden="true">
          <div class="triangle-with-shadow"></div>
          {{{lang 'common.store_credit' store_credit=customer.store_credit.formatted}}}
        </div>
      </li>
    {{/if}}
    {{> components/common/currency-selector}}
    <li id="topcart-mobile" class="visible-xs"></li>
  </ul>
</nav>
```

## Additional Priority Recommendations
- **Code Snippet**: templates/layout/base.html
- **Critical SEO Issue**: AddThis loads synchronously in the `<head>` and jQuery plus custom inline scripts execute without `defer`, blocking first paint and delaying LCP; there is no preconnect/preload for fonts or CDN origins, so early resource discovery is slow.【F:templates/layout/base.html†L8-L22】【F:templates/layout/base.html†L91-L157】
- **Platform Update Required**: Move non-critical widgets below the fold with `defer`/`async`, preload primary font files and the main hero stylesheet, and prefer the bundled jQuery in `theme-bundle` instead of re-downloading `assets/js/theme/halothemes/jquery.min.js`. Also add `<link rel="preconnect" href="{{cdn '/'}}" crossorigin>` to prime CDN connections.【F:templates/layout/base.html†L8-L22】【F:templates/layout/base.html†L91-L157】
- **Optimized Code Block**:
```handlebars
<head>
  <title>{{head.title}}</title>
  {{{head.meta_tags}}}
  {{{head.config}}}
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="canonical" href="{{#if settings.request.absolute_path}}{{settings.request.absolute_path}}{{else}}{{urls.canonical}}{{/if}}">
  <link rel="preconnect" href="{{cdn '/'}}" crossorigin>
  <link rel="preload" as="style" href="{{cdn 'assets/css/theme.css'}}">
  <link rel="stylesheet" href="{{cdn 'assets/css/theme.css'}}">
  <link rel="preload" as="font" type="font/woff2" href="{{cdn 'assets/fonts/theme.woff2'}}" crossorigin>
  {{{head.rsslinks}}}
  {{{block "head"}}}
  {{{snippet 'htmlhead'}}}
  <script src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-589d7698f6fa5c40" defer></script>
</head>
<body class="page-type-{{page_type}}">
  <script>window.__webpack_public_path__ = "{{cdn 'assets/dist/'}}";</script>
  <script src="{{cdn 'assets/dist/theme-bundle.main.js'}}" defer></script>
  <script defer>window.stencilBootstrap("{{template_file}}", {{jsContext}}).load();</script>
</body>
```

- **Code Snippet**: templates/pages/product.html
- **Critical SEO Issue**: No explicit preload or fetchpriority for the first gallery image and no breadcrumb JSON-LD emitted from the shell, so Google must infer hierarchy and LCP image discovery is delayed.【F:templates/pages/product.html†L16-L68】
- **Platform Update Required**: Preload the first product image using `{{responsive_image}}` with `lazyload=false` and `fetchpriority="high"`, and emit a BreadcrumbList JSON-LD using `breadcrumbs` data to strengthen internal linking. Reserve height for price/review blocks to reduce CLS when JS rehydrates.【F:templates/pages/product.html†L16-L68】
- **Optimized Code Block**:
```handlebars
<main itemscope itemtype="https://schema.org/Product" class="page-content col-sm-9">
  {{#if product.main_image}}
    <link rel="preload"
          as="image"
          imagesrcset="{{getImageSrcset product.main_image use_default_sizes=true}}"
          imagesizes="(min-width: 1024px) 50vw, 100vw"
          fetchpriority="high">
    {{responsive_image
      image=product.main_image
      class="product-main-image"
      lazyload=false
      fetchpriority="high"
      fallback_size="zoom"
      max_width=1400
      itemprop="image"
    }}
  {{/if}}

  {{> components/products/product-view schema=true reserve_price_height=true reserve_review_height=true}}

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {{#each breadcrumbs}}
        {
          "@type": "ListItem",
          "position": {{@index_plus_one}},
          "name": "{{name}}",
          "item": "{{url}}"
        }{{#unless @last}},{{/unless}}
      {{/each}}
    ]
  }
  </script>

  {{{region name="product_below_content"}}}
</main>
```
