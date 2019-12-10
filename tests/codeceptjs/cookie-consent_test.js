/* global Feature Scenario */

var assert = require('assert')

Feature('Cookie Consent')

Scenario('should work correctly', async function (I) {
  // initial state
  I.amOnPage('cookie-consent.html')
  I.dontSeeCookie('cookie_consent_status')
  I.dontSeeCookie('_ga')
  I.dontSeeCookie('_gat')
  I.dontSeeCookie('_gid')
  I.waitForVisible('.cookie-consent-popup', 5);
  I.waitForVisible('[data-cc-consent="statistics"]', 5);
  I.waitForVisible('[data-cc-consent="extern-media"]', 5);
  I.waitForVisible('.cookie-consent-save', 5);
  I.dontSeeCheckboxIsChecked('[data-cc-consent="statistics"]')
  I.dontSeeCheckboxIsChecked('[data-cc-consent="extern-media"]')

  // allow single consents
  I.checkOption('[data-cc-consent="statistics"]')
  I.checkOption('[data-cc-consent="extern-media"]')
  I.click('.cookie-consent-save')
  I.seeCookie('cookie_consent_status')
  I.seeCookie('_ga')
  I.seeCookie('_gat')
  I.seeCookie('_gid')
  let cookie = await I.grabCookie('cookie_consent_status')
  assert.deepStrictEqual(cookie.value, '["statistics","extern-media"]')

  // dissallow some consents
  I.click('.cookie-consent-open')
  I.waitForVisible('.cookie-consent-popup', 5);
  I.waitForVisible('[data-cc-consent="statistics"]', 5);
  I.waitForVisible('[data-cc-consent="extern-media"]', 5);
  I.waitForVisible('.cookie-consent-save', 5);
  I.seeCheckboxIsChecked('[data-cc-consent="statistics"]')
  I.seeCheckboxIsChecked('[data-cc-consent="extern-media"]')
  I.uncheckOption('[data-cc-consent="statistics"]')
  I.uncheckOption('[data-cc-consent="extern-media"]')
  I.click('.cookie-consent-save')
  I.seeCookie('cookie_consent_status')
  I.dontSeeCookie('_ga')
  I.dontSeeCookie('_gat')
  I.dontSeeCookie('_gid')
  cookie = await I.grabCookie('cookie_consent_status')
  assert.deepStrictEqual(cookie.value, '[]')
  I.click('.cookie-consent-open')
  I.waitForVisible('.cookie-consent-popup', 5);
  I.waitForVisible('[data-cc-consent="statistics"]', 5);
  I.waitForVisible('[data-cc-consent="extern-media"]', 5);
  I.waitForVisible('.cookie-consent-save', 5);
  I.dontSeeCheckboxIsChecked('[data-cc-consent="statistics"]')
  I.dontSeeCheckboxIsChecked('[data-cc-consent="extern-media"]')

  // open and close buttons
  I.click('.cookie-consent-close')
  I.waitForInvisible('.cookie-consent-popup', 5);
  I.waitForInvisible('[data-cc-consent="statistics"]', 5);
  I.waitForInvisible('[data-cc-consent="extern-media"]', 5);
  I.waitForInvisible('.cookie-consent-save', 5);
  I.click('.cookie-consent-controls-open')
  I.waitForVisible('.cookie-consent-popup', 5);
  I.waitForVisible('[data-cc-consent="statistics"]', 5);
  I.waitForVisible('[data-cc-consent="extern-media"]', 5);
  I.waitForVisible('.cookie-consent-save', 5);
  I.click('.cookie-consent-controls-close')
  I.waitForVisible('.cookie-consent-popup', 5);
  I.waitForInvisible('[data-cc-consent="statistics"]', 5);
  I.waitForInvisible('[data-cc-consent="extern-media"]', 5);
  I.waitForInvisible('.cookie-consent-save', 5);
  I.click('.cookie-consent-details-open')
  I.waitForVisible('.cookie-consent-popup', 5);
  I.waitForVisible('.cookie-consent-details', 5);
  I.click('.cookie-consent-details-close')
  I.waitForVisible('.cookie-consent-popup', 5);
  I.waitForInvisible('.cookie-consent-details', 5);

  // toggle buttons
  I.click('.cookie-consent-close')
  I.click('.cookie-consent-controls-close')
  I.click('.cookie-consent-details-close')
  I.waitForInvisible('.cookie-consent-popup', 5);
  I.waitForInvisible('.cookie-consent-controls', 5);
  I.waitForInvisible('.cookie-consent-details', 5);
  I.click('.cookie-consent-toggle')
  I.waitForVisible('.cookie-consent-popup', 5);
  I.click('.cookie-consent-toggle')
  I.waitForInvisible('.cookie-consent-popup', 5);

  // control toggle buttons
  I.click('.cookie-consent-close')
  I.click('.cookie-consent-controls-toggle')
  I.waitForVisible('.cookie-consent-popup', 5);
  I.waitForVisible('.cookie-consent-controls', 5);
  I.click('.cookie-consent-controls-toggle')
  I.waitForVisible('.cookie-consent-popup', 5);
  I.waitForInvisible('.cookie-consent-controls', 5);

  // details toggle buttons
  I.click('.cookie-consent-close')
  I.click('.cookie-consent-details-toggle')
  I.waitForVisible('.cookie-consent-popup', 5);
  I.waitForVisible('.cookie-consent-details', 5);
  I.click('.cookie-consent-details-toggle')
  I.waitForVisible('.cookie-consent-popup', 5);
  I.waitForInvisible('.cookie-consent-details', 5);

  // accept all
  I.click('.cookie-consent-accept-all')
  I.seeCookie('cookie_consent_status')
  I.seeCookie('_ga')
  I.seeCookie('_gat')
  I.seeCookie('_gid')
  cookie = await I.grabCookie('cookie_consent_status')
  assert.deepStrictEqual(cookie.value, '["statistics","extern-media"]')
  I.click('.cookie-consent-open')
  I.waitForVisible('.cookie-consent-popup', 5);
  I.waitForVisible('[data-cc-consent="statistics"]', 5);
  I.waitForVisible('[data-cc-consent="extern-media"]', 5);
  I.waitForVisible('.cookie-consent-save', 5);

  // deny all
  I.click('.cookie-consent-deny-all')
  I.seeCookie('cookie_consent_status')
  I.dontSeeCookie('_ga')
  I.dontSeeCookie('_gat')
  I.dontSeeCookie('_gid')
  cookie = await I.grabCookie('cookie_consent_status')
  assert.deepStrictEqual(cookie.value, '[]')
})
