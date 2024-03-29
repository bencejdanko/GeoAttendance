// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('failedRegister', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('failedRegister', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1435, height: 1035 })
    await driver.findElement(By.linkText("Register")).click()
    await driver.findElement(By.id("first_name")).click()
    await driver.findElement(By.id("first_name")).sendKeys("test")
    await driver.findElement(By.id("last_name")).click()
    await driver.findElement(By.id("last_name")).sendKeys("test")
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("test")
    await driver.findElement(By.id("email")).click()
    await driver.findElement(By.id("email")).sendKeys("test@example.com")
    await driver.findElement(By.id("password")).sendKeys("password")
    await driver.findElement(By.id("passwordConfirm")).sendKeys("passwor")
    await driver.findElement(By.css(".bg-blue-500")).click()
  })
})
