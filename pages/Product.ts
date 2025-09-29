import { expect, type Locator, type Page } from '@playwright/test';
export class Product{
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchResult: Locator;
    readonly addToCartBtn: Locator;
    readonly category: Locator;
    readonly shoppingCart: Locator;
    readonly price: Locator;
    readonly qty: Locator;
    readonly updateShopCartBtn: Locator;
    readonly checkbox: Locator;
 
 
    constructor(page:Page){
        
        this.page = page;
        this.searchInput = page.locator("#small-searchterms");
        this.searchButton = page.getByRole('button',{name:'Search'});
        this.searchResult = page.getByRole('link',{name:'Picture of 14.1-inch Laptop'});
        this.addToCartBtn = page.getByRole('button',{name:'Add to cart'}).first();
        this.price = page.locator('//span[@class="product-unit-price"]');  
        this.category = page.locator('//ul[@class="top-menu"]//parent::a[@href="/apparel-shoes"]');
        this.shoppingCart = page.locator('//li[@id="topcartlink"]//parent::span[@class="cart-label"]');
        this.qty = page.locator('//input[@value="1"]');
        this.updateShopCartBtn = page.getByRole('button',{name:'Update shopping cart'});
        this.checkbox = page.locator('//input[@name="removefromcart"]');
    }
 
    async searchInputValue(searchInput:string){
        await this.searchInput.fill(searchInput);
    }
 
    async searchButton_click(){
        await this.searchButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(5000);
    }
 
    async searchResult_verify(){
        await expect(this.addToCartBtn).toBeVisible();
        await expect(this.searchResult).toBeVisible();        
    }
 
 
    async category_click(){
        await this.category.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }
    

    async addToCartBtn_click(){
        await this.addToCartBtn.click();
        // await this.page.waitForTimeout(5000);
        // await this.page.waitForLoadState('domcontentloaded');    
    }
    
    async priceQtyVerify(){    
    //    await expect(this.price).toBeVisible();  
       await expect(this.qty).toBeVisible();
    //    await this.page.waitForTimeout(5000);
    }
    async shoppingCart_click(){
        await this.shoppingCart.click();
        await this.page.waitForTimeout(2000);
        // await this.page.waitForLoadState('domcontentloaded');
    }
 
    async removeCartProd() {
        await this.checkbox.click();
        await this.updateShopCartBtn.click();
        await this.page.waitForTimeout(3000);      
    }
}