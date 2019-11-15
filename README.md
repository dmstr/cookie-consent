[![Build Status](https://travis-ci.org/germanbisurgi/cookie-consent.svg?branch=master)](https://travis-ci.org/germanbisurgi/cookie-consent)

# COOKIE CONSENT
It allows the user to choose through his active consent if the page can or not
use/render/register features that could collect users personal data.  

## Getting started

### Install
```html
<script src="cookie-consent.js"></script>
```

### Javascript

```javascript
var cc = new CookieConsent();
```

or

```javascript
var cc = new CookieConsent({
  name: 'cookie_consent_status',
  path: '/',
  domain: '',
  expiryDays: 365
});
```

### HTML

```html
<!-- the popup that will appear if no consent cookie where saved -->
<div class="cookie-consent-popup">
  <div>
    <span class="cookie-consent-message">We are using cookies</span>
    <a class="cookie-consent-link" href="#">Learn more</a>
  </div>
  <div>
    <label><input type="checkbox" data-cc-namespace="popup" data-cc-consent="statistics">Statistics</label>
    <label><input type="checkbox" data-cc-namespace="popup" data-cc-consent="marketing">Marketing</label>
    <label><input type="checkbox" data-cc-namespace="popup" data-cc-consent="external-media">External Media</label>
    <button class="cookie-consent-save" data-cc-namespace="popup">SAVE</button>
  </div>
</div>

<script src="../../dist/cookie-consent.js"></script>
<script>
var cc = new CookieConsent()
</script>
```

### CSS

```html
<link rel="stylesheet" href="cookie-consent.css">
```

and your cookie-consent.css

```css
.cookie-consent-popup {
    animation-name: show;
    animation-duration: 1s;
    animation-timing-function: ease;
    display: none;
    padding: 15px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 999999;
}

.cookie-consent-popup.open {
    display: block;
    opacity: 1;
    animation-name: show;
    animation-duration: 1s;
    animation-timing-function: ease;
}

@keyframes show {
    from {opacity: 0;}
    to {opacity: 1;}
}

@keyframes hide {
    from {opacity: 1;}
    to {opacity: 0;}
}
```

## Open and Close buttons

```html
<!-- popup toggle buttons (for convenience) -->
<button class="cookie-consent-open">open</button>
<button class="cookie-consent-close">close</button>
```

## OPTIONS

<table>
    <thead>
        <tr>
            <th>option</th>
            <th>description</th>
            <th>default</th>
            <th>type</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>name</td>
            <td>Defines the cookie name that Cookie Consent will use to store the status of the consent</td>
            <td> 'cookie_consent_status' </td>
            <td> STRING </td>
        </tr>
        <tr>
            <td>path</td>
            <td>Defines the cookie path</td>
            <td> '/' </td>
            <td> STRING </td>
        </tr>
        <tr>
            <td>domain</td>
            <td>Defines the cookie domain</td>
            <td> '' </td>
            <td> STRING </td>
        </tr>
        <tr>
            <td>expiryDays</td>
            <td>Defines the cookie exipration days</td>
            <td> 365 </td>
            <td> INT </td>
        </tr>
    </tbody>
</table>

## HTML

This Cookie Consent library works in a declarative approach. That mean that you
just need to put the right classes in your html to get it working.

* `cookie-consent-popup`: The popup widget. It will take the class "open" when no consent cookie was saved or when its manually triggered.
* `cookie-consent-save`: save the data-cc-consent values of the checkboxes in its same namespace in the consent cookie.
* `cookie-consent-open`: opens the popup.
* `cookie-consent-close`: closes the popup.
* `data-cc-consent`: the consent name/value that will be stored in the consent cookie.
* `data-cc-namespace`: used to group checkboxes and save buttons. In that way you can add different groups in different zones of your website without conflicting with other checkboxes or save buttons.

## Events

```javascript
cc.afterSave = function (cc) {
    // clean google analytics cookies if we do not have the "statistics" consent by expiring them. Then reload the page
    cc.clean({
        'statistics': {
          'cookies': [ '_ga', '_gat', '_gid' ]
        }
    })
  window.location.reload()
}
```
