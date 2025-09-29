import {test,expect} from '@playwright/test';
import {Loginpage} from '../pages/LoginPage.ts';
import {Product} from '../pages/Product.ts';
 
interface User{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
 
test('TC01_Verify that a new user can register successfully', async({page}) =>{
    const login_page = new Loginpage(page);
    const {faker} = await import('@faker-js/faker');
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password({length:8 , prefix:'Test'});
   
    await login_page.url();
    await login_page.registerLink_click();
 
    await page.locator('#gender-female').click();
    await page.locator('#FirstName').fill(firstName);
    await page.locator('#LastName').fill(lastName);
    await page.locator('#Email').fill(email);
    await page.locator('#Password').fill(password);
    await page.locator('#ConfirmPassword').fill(password);
 
    await login_page.registerBtn_click();
    await login_page.registerSuccess_verify();
})
 
 
test('TC02_Verify login with valid credentials', async({page}) =>{
    const login_page = new Loginpage(page);
 
    await login_page.url();
    await login_page.login_linkclick();
    await login_page.loginCredential("kkhekade@gmail.com", "Komal@1994");
    await login_page.login_buttonclick();
    await login_page.logout_linkVerify();
 
})
 
test('TC03_Verify user can search for a product', async({page})=>{
    const search_prod = new Product(page);
    const login_page = new Loginpage(page);
 
    await login_page.url();
    await login_page.login_linkclick();
    await login_page.loginCredential("kkhekade@gmail.com", "Komal@1994");
    await login_page.login_buttonclick();
   
    await search_prod.searchInputValue("Laptop");
    await search_prod.searchButton_click();
    //await page.pause();
    await search_prod.searchResult_verify();    
})
 
test('TC04_Verify user can add product to cart', async({page})=>{
    const search_prod = new Product(page);
    const login_page = new Loginpage(page);
 
    await login_page.url();
    await login_page.login_linkclick();
    await login_page.loginCredential("kkhekade@gmail.com", "Komal@1994");
    await login_page.login_buttonclick();
    await search_prod.category_click();   
    await search_prod.addToCartBtn_click();   
    await search_prod.priceQtyVerify();
    await search_prod.addToCartBtn_click();  
    await search_prod.shoppingCart_click()
    await search_prod.removeCartProd();
})
 
test('TC05_Verify user can logout successfully', async({page})=>{
    const login_page = new Loginpage(page);
 
    await login_page.url();
    await login_page.login_linkclick();
    await login_page.loginCredential("kkhekade@gmail.com", "Komal@1994");
    await login_page.login_buttonclick();
    await login_page.logout_linkVerify();
    await login_page.logout_linkClick();
    await login_page.login_linkVerify();
})