import { test, expect } from '@playwright/test';
import { BASE_URL } from './config.js';

test('Módulo B - Gestión de Cuenta', async ({ page }) => {
  test.slow();
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle(/JPetStore|Pet Store/);

  //
  const signOn = page.locator('a[href*="signonForm"], a:has-text("Sign In")').first();
  await expect(signOn).toBeVisible({ timeout: 10000 });
  await signOn.click();

  await page.fill('input[name="username"], input[id="username"]', 'j2ee');
  await page.fill('input[name="password"], input[id="password"]', 'j2ee');
  await page.click('input[name="signon"], button:has-text("Login"), input[type="submit"]');

  await expect(page.locator('a[href*="signoff"], a:has-text("Sign Out")')).toBeVisible({ timeout: 10000 });

  //
  const editAccount = page.locator('a[href*="editAccountForm"], a:has-text("Edit Account")').first();
  await expect(editAccount).toBeVisible({ timeout: 10000 });
  await editAccount.click();

  // 
  await expect(page.getByRole('heading', { name: /Account Information|Account/ })).toBeVisible({ timeout: 10000 });

  // 
  await page.fill('input[name="account.firstName"], input[id="firstName"]', 'Juan');
  await page.fill('input[name="account.lastName"], input[id="lastName"]', 'Pérez');
  await page.click('input[name="editAccount"], button:has-text("Save")');

  //
  const success = page.locator('text=Account information updated successfully, text=Your account information has been updated, text=Welcome');
  await expect(success.first()).toBeVisible({ timeout: 15000 });

  console.log("✅ Perfil actualizado correctamente");
});
