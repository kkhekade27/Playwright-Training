import { expect, type Locator, type Page } from '@playwright/test';
 
export class Loginpage {
  readonly page: Page;   //page object userdefined ; Page property ;
  readonly login_link: Locator;   //login_link object userdefined ; Locator property ;
  readonly emailID: Locator;
  readonly password: Locator;
  readonly login_button: Locator;
  readonly logout_link: Locator;
  readonly registerLink: Locator;
  readonly registerButton: Locator;
  readonly registerSuccess: Locator;
 
  constructor(page: Page) {      // under constructor we initialize the value
    this.page = page;
    this.login_link = page.getByRole('link', { name: 'Log in' });
    this.emailID = page.locator("#Email");
    this.password = page.locator("#Password");
    this.login_button = page.getByRole('button',{name:'Log in'});
    this.logout_link = page.getByRole('link',{name:'Log out'});  
    this.registerLink = page.getByRole('link',{name: 'Register'})
    this.registerButton = page.getByRole('button', {name: 'Register'});
    this.registerSuccess = page.locator('//div[@class="page registration-result-page"]');
  }
 
  async url(){ //function created to open the website
    await this.page.goto('https://demowebshop.tricentis.com/');
    await this.page.waitForTimeout(5000);
  }
 
  async login_linkclick() {    //function created to click on login link
    await this.login_link.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }
 
  async loginCredential(emailID:string,password:string) { // function created for login credentials
    await this.emailID.fill(emailID);
    await this.password.fill(password);
    await this.page.waitForTimeout(2000);
  }
 
  async login_buttonclick() {    //function created to click on login button
    await this.login_button.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }
 
  async logout_linkVerify() {   //function created to verify logout exists
    await expect(this.logout_link).toBeVisible();
  }
 
  async logout_linkClick() {   //function created to click logout link
    await this.logout_link.click();
  }
 
  async login_linkVerify() {   //function created to verify login exists
    await expect(this.login_link).toBeVisible();
  }
 
  async registerLink_click() {  //function created to click register link
    await this.registerLink.click();
  }
 
  async registerBtn_click() {  //function created to click register button
    await this.registerButton.click();
    await this.page.waitForTimeout(2000);
  }
 
  async registerSuccess_verify(){   //function created to verify success message
    await expect(this.registerSuccess).toBeVisible();
  }
}