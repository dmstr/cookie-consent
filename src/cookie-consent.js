const CookieConsent = function (options) {
  this.defaultsOptions = {
    name: 'cookie_consent_status',
    value: [],
    path: '/',
    domain: '',
    expiryDays: 365
  }
  this.options = this.mergeObjects(this.defaultsOptions, options)
  this.inputs = [].slice.call(document.querySelectorAll('[data-cc-consent]'))
  this.popup = document.querySelector('.cookie-consent-popup')
  this.controls = document.querySelector('.cookie-consent-controls')
  this.saveButtons = [].slice.call(document.querySelectorAll('.cookie-consent-save'))
  this.acceptAllButtons = [].slice.call(document.querySelectorAll('.cookie-consent-accept-all'))
  this.denyAllButtons = [].slice.call(document.querySelectorAll('.cookie-consent-deny-all'))
  this.openControlsButtons = [].slice.call(document.querySelectorAll('.cookie-consent-controls-open'))
  this.closeControlsButtons = [].slice.call(document.querySelectorAll('.cookie-consent-controls-close'))
  this.openButtons = [].slice.call(document.querySelectorAll('.cookie-consent-open'))
  this.closeButtons = [].slice.call(document.querySelectorAll('.cookie-consent-close'))

  this.addEventListeners()
  if (typeof this.get() === 'undefined') {
    this.open()
  }
  this.refreshUI()
}

CookieConsent.prototype.open = function () {
  if (this.popup) {
    this.popup.classList.add('open')
  }
}

CookieConsent.prototype.close = function () {
  if (this.popup) {
    this.popup.classList.remove('open')
  }
}

CookieConsent.prototype.openControls = function () {
  if (this.controls) {
    this.controls.classList.add('open')
  }
}

CookieConsent.prototype.closeControls = function () {
  if (this.controls) {
    this.controls.classList.remove('open')
  }
}

CookieConsent.prototype.addEventListeners = function () {
  if (this.openControlsButtons.length > 0) {
    this.openControlsButtons.forEach((openControlsButton) => {
      openControlsButton.addEventListener('click', () => {
        this.open()
        this.openControls()
      })
    })
  }
  if (this.closeControlsButtons.length > 0) {
    this.closeControlsButtons.forEach((closeControlsButton) => {
      closeControlsButton.addEventListener('click', () => {
        this.closeControls()
      })
    })
  }
  if (this.saveButtons.length > 0) {
    this.saveButtons.forEach((saveButton) => {
      saveButton.addEventListener('click', () => {
        this.save()
      })
    })
  }
  if (this.acceptAllButtons.length > 0) {
    this.acceptAllButtons.forEach((acceptAll) => {
      acceptAll.addEventListener('click', () => {
        if (this.inputs.length > 0) {
          this.inputs.forEach((input) => {
            input.checked = true
          })
        }
        this.save()
      })
    })
  }
  if (this.denyAllButtons.length > 0) {
    this.denyAllButtons.forEach((denyAll) => {
      denyAll.addEventListener('click', () => {
        if (this.inputs.length > 0) {
          this.inputs.forEach((input) => {
            input.checked = false
          })
        }
        this.save()
      })
    })
  }
  if (this.openButtons.length > 0) {
    this.openButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.open()
      })
    })
  }
  if (this.closeButtons.length > 0) {
    this.closeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.close()
      })
    })
  }
}

CookieConsent.prototype.save = function () {
  this.set(this.options)
  if (this.inputs.length > 0) {
    this.inputs.forEach((input) => {
      const consent = input.getAttribute('data-cc-consent')
      if (input.checked) {
        this.add(consent)
      } else {
        this.remove(consent)
      }
    })
  }
  this.refreshUI()
  this.afterSave(this)
}

CookieConsent.prototype.refreshUI = function () {
  const value = this.get()
  if (typeof value === 'undefined') {
    return
  }
  this.inputs.forEach((input) => {
    const consent = input.getAttribute('data-cc-consent')
    input.checked = this.has(consent)
  })
}

CookieConsent.prototype.set = function (options) {
  const d = new Date()
  d.setDate(d.getDate() + (options.expiryDays || 365))
  const cookie = [
    options.name + '=' + JSON.stringify(options.value),
    'expires=' + d.toUTCString(),
    'path=' + (options.path || '/')
  ]
  if (options.domain) {
    cookie.push('domain=' + options.domain)
  }
  document.cookie = cookie.join(';')
}

CookieConsent.prototype.get = function () {
  const string = '; ' + document.cookie
  const parts = string.split('; ' + this.options.name + '=')
  const value = parts.length !== 2 ? undefined : parts.pop().split(';').shift()
  if (typeof value !== 'undefined') {
    return JSON.parse(value)
  }
  return value
}

CookieConsent.prototype.has = function (consent) {
  const value = this.get()
  // return (typeof value !== 'undefined' && value.includes(consent))
  return (typeof value !== 'undefined' && value.indexOf(consent) > -1)
}

CookieConsent.prototype.add = function (consent) {
  const value = this.get()
  // if (typeof value !== 'undefined' && !value.includes(consent)) {
  if (typeof value !== 'undefined' && !value.indexOf(consent) > -1) {
    value.push(consent)
    const options = this.mergeObjects(this.defaultsOptions, { value: value })
    this.set(options)
    return true
  } else {
    return false
  }
}

CookieConsent.prototype.remove = function (consent) {
  const value = this.get()
  if (typeof value === 'undefined') {
    return false
  }
  const index = value.indexOf(consent)
  if (index > -1) {
    value.splice(index, 1)
    const options = this.mergeObjects(this.defaultsOptions, { value: value })
    this.set(options)
    return true
  } else {
    return false
  }
}

CookieConsent.prototype.clean = function (config) {
  for (const consent in config) {
    if (Object.prototype.hasOwnProperty.call(config, consent)) {
      if (!this.has(consent)) {
        const cookies = config[consent].cookies
        for (const cookie in cookies) {
          if (Object.prototype.hasOwnProperty.call(cookies, cookie)) {
            const setConfig = {
              name: cookies[cookie].name,
              expiryDays: -1
            }
            if (typeof cookies[cookie].domain !== 'undefined') {
              setConfig.domain = cookies[cookie].domain
            }
            if (typeof cookies[cookie].path !== 'undefined') {
              setConfig.path = cookies[cookie].path
            }
            this.set(setConfig)
          }
        }
      }
    }
  }
}

CookieConsent.prototype.mergeObjects = function () {
  const res = {}
  for (let i = 0; i < arguments.length; i++) {
    for (const x in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], x)) {
        res[x] = arguments[i][x]
      }
    }
  }
  return res
}

CookieConsent.prototype.afterSave = function () {}

export default CookieConsent
