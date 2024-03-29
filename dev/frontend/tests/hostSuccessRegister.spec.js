const query = require('./query.js');
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
const email = 'host@example.com';
const pw = "123456789";
const name = "host";

describe('hostSuccessRegister', function () {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
    const users = await query.getAllUsers();
    const host = users.filter(data => data.first_name === name);
    if (host.length > 0) {
      query.deleteUser(host[0].id);
    }
  })
  afterEach(async function () {
    await driver.quit();
  })
  it('hostSuccessRegister', async function () {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1440, height: 809 })
    await driver.findElement(By.linkText("Register")).click()
    await driver.findElement(By.id("first_name")).click()
    await driver.findElement(By.id("first_name")).sendKeys(name)
    await driver.findElement(By.id("last_name")).sendKeys(name)
    await driver.findElement(By.id("username")).sendKeys(name)
    await driver.findElement(By.id("email")).sendKeys(email)
    await driver.findElement(By.id("password")).sendKeys(pw)
    await driver.findElement(By.id("passwordConfirm")).sendKeys(pw)
    await driver.findElement(By.id("subscription")).click()
    await driver.findElement(By.id('submit-button')).click()
    await driver.manage().setTimeouts({ implicit: 1000 });
    await driver.findElement(By.linkText("Home")).click()
    await driver.findElement(By.linkText("Profile")).click()
    await driver.findElement(By.linkText("Dashboard")).click()
    await driver.findElement(By.linkText("About Us")).click()
    await driver.findElement(By.linkText("Contact Us")).click()
    await driver.findElement(By.linkText("Log Out")).click()
  })
})
