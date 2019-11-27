[![Build Status](https://travis-ci.org/dmstr/cookie-consent.svg?branch=master)](https://travis-ci.org/dmstr/cookie-consent)

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
<!-- popup toggle buttons (for convenience) -->
<button class="cookie-consent-open">open</button>
<button class="cookie-consent-close">close</button>
<button class="cookie-consent-controls-open">Open controls</button>
<button class="cookie-consent-controls-close">Close controls</button>

<!-- the popup that will appear if no consent cookie where saved -->
<div class="cookie-consent-popup">
  <div>
    <span class="cookie-consent-message">We are using cookies</span>
    <a class="cookie-consent-link" href="#">Learn more</a>
    <button class="cookie-consent-accept-all">Accept All</button>
    <button class="cookie-consent-deny-all">Deny All</button>
    <button class="cookie-consent-controls-open">Open controls</button>
    <button class="cookie-consent-controls-close">Close controls</button>
  </div>
  <div class="cookie-consent-controls open">
    <label><input type="checkbox" data-cc-consent="statistics">Statistics</label>
    <label><input type="checkbox" data-cc-consent="extern-media">Extern Media</label>
    <button class="cookie-consent-save">SAVE</button>
  </div>
</div>


<script src="../../dist/cookie-consent.js"></script>
<script>
var cc = new CookieConsent()
</script>
```

### CSS

```css
.cookie-consent-popup {
    animation-name: show;
    animation-duration: 1s;
    animation-timing-function: ease;
    display: none;
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

.cookie-consent-controls {
    max-height: 0;
    overflow: hidden;
    -webkit-transition: max-height 0.5s ease-out;
    -moz-transition: max-height 0.5s ease-out;
    transition: max-height 0.5s ease-out;
}

.cookie-consent-controls.open {
    max-height: 600px;
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
* `cookie-consent-controls`: container for the consent checkboxes (controls).
* `cookie-consent-save`: save the data-cc-consent values of the checkboxes in its same namespace in the consent cookie.
* `cookie-consent-accept-all`: check all consents controls and save.
* `cookie-consent-deny-all`: uncheck all consents controls and save.
* `cookie-consent-open`: opens the popup.
* `cookie-consent-close`: closes the popup.
* `cookie-consent-controls-toggle`: Toggles the cookie-consent-controls "open" class.
* `data-cc-consent`: the consent name/value that will be stored in the consent cookie.
* `data-cc-namespace`: used to group checkboxes and save buttons. In that way you can add different groups in different zones of your website without conflicting with other checkboxes or save buttons.

## Events

```javascript
cc.afterSave = function (cc) {
    // clean google analytics cookies if we do not have the "statistics" consent by expiring them. Then reload the page
  cc.clean({
    'statistics': {
      'cookies': [
        {name: '_ga'},
        {name: '_gat', domain: '', path: '/'},
        {name: '_gid', domain: '', path: '/'}
      ]
    }
  })
  window.location.reload()
}
```
