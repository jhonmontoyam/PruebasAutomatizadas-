import { test, expect } from '@playwright/test';
import { BASE_URL } from './config.js';

test('Módulo A - Compra Completa', async ({ page }) => {
  test.slow(); // allow for slower environments
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle(/JPetStore|Pet Store/);

  // 
  const signOn = page.locator('a[href*="signonForm"], a:has-text("Sign In"), a:has-text("SignOn")').first();
  await expect(signOn).toBeVisible({ timeout: 10000 });
  await signOn.click();

  await page.fill('input[name="username"], input[name="usernameText"], input[id="username"]', 'j2ee');
  await page.fill('input[name="password"], input[name="passwordText"], input[id="password"]', 'j2ee');
  await page.click('input[name="signon"], button:has-text("Login"), input[type="submit"]');

  // 
  await expect(page.locator('a[href*="signoff"], a:has-text("Sign Out")')).toBeVisible({ timeout: 10000 });

  // 
  await page.goto('https://jpetstore.aspectran.com/actions/Catalog.action?viewCategory=&categoryId=FISH', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/categoryId=FISH/);

  //
  const firstProduct = page.locator('a[href*="productId"], a[href*="FI-SW-01"], a:has-text("Fish")').first();
  if (await firstProduct.count() > 0) {
    await firstProduct.click();
  } else {
    // 
    const add = page.locator('a[href*="addToCart"], a:has-text("Add to Cart")').first();
    await expect(add).toBeVisible({ timeout: 10000 });
    await add.click();
  }

  // 
  const addToCart = page.locator('a[href*="addToCart"], button:has-text("Add to Cart")').first();
  if (await addToCart.count() > 0) {
    await addToCart.click();
  }

  // 
  await expect(page.locator('h2, h1')).toContainText(/Shopping Cart|Cart/);

  // 
  const checkout = page.locator('a[href*="newOrderForm"], a:has-text("Proceed to Checkout"), button:has-text("Proceed")').first();
  if (await checkout.count() > 0) {
    await checkout.click();
  }

  // 
  const confirm = page.locator('input[name="newOrder"], input[name="confirmOrder"], button:has-text("Confirm")').first();
  if (await confirm.count() > 0) {
    await confirm.click();
  }

  // 
  const confirmation = page.locator('text=Thank you, your order has been submitted., text=Thank you');
  await expect(confirmation).toBeVisible({ timeout: 15000 });

  console.log("✅ Compra completada con éxito");
});
