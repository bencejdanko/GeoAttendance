const query = require('./query.js');
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

const email = 'test@example.com';
const name = "test";

describe('failedLogin', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
    const users = await query.getAllUsers();
    const host = users.filter(data => data.first_name === name);
    if (host.length > 0) {
      query.deleteUser(host[0].id);
    }
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('failedLogin', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1435, height: 1035 })
    await driver.findElement(By.linkText("Log In")).click()
    await driver.findElement(By.id("email")).click()
    await driver.findElement(By.id("email")).sendKeys(email)
    await driver.findElement(By.id("password")).sendKeys("password")
    await driver.findElement(By.id('submit-button')).click()
    await driver.manage().setTimeouts({ implicit: 1000 });
    const actualErrorMessage = await driver.findElement(By.id('error-message')).getAttribute("innerHTML");
    const expectedMessage = "Failed to authenticate.";
    assert.equal(actualErrorMessage, expectedMessage);
  })
})
