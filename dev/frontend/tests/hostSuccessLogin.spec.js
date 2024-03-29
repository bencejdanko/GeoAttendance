const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('successLogin', function() {
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
  it('hostSuccessLogin', async function() {
    await driver.get("http://localhost:3000/")
    await driver.manage().window().setRect({ width: 1440, height: 809 })
    await driver.findElement(By.linkText("Log In")).click()
    await driver.findElement(By.id("email")).click()
    await driver.findElement(By.id("email")).sendKeys("dathaotrinh@gmail.com")
    await driver.findElement(By.id("password")).sendKeys("123456789")
    await driver.findElement(By.id("submit-button")).click()
    await driver.manage().setTimeouts({ implicit: 1000 });
    await driver.findElement(By.linkText("Profile")).click()    
    await driver.findElement(By.linkText("Home")).click()  
    await driver.findElement(By.linkText("Dashboard")).click()    
    await driver.findElement(By.linkText("About Us")).click()   
    await driver.findElement(By.linkText("Contact Us")).click() 
    await driver.findElement(By.linkText("Log Out")).click()
  })
})
