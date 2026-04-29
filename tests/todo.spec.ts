import { test, expect } from '@playwright/test';

test('Add todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  await page.fill('.new-todo', 'Learn Playwright');
  await page.press('.new-todo', 'Enter');

  await expect(page.locator('.todo-list li')).toHaveCount(1);
});

test('Complete todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  await page.fill('.new-todo', 'Task');
  await page.press('.new-todo', 'Enter');

  await page.click('.toggle');

  await expect(page.locator('.todo-list li')).toHaveClass(/completed/);
});

test('Delete todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  await page.fill('.new-todo', 'Delete me');
  await page.press('.new-todo', 'Enter');

  const item = page.locator('.todo-list li');
  await item.hover();
  await item.locator('.destroy').click();

  await expect(page.locator('.todo-list li')).toHaveCount(0);
});

test('Filter todos', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  await page.fill('.new-todo', 'Task 1');
  await page.press('.new-todo', 'Enter');

  await page.fill('.new-todo', 'Task 2');
  await page.press('.new-todo', 'Enter');

  await page.locator('.toggle').first().click();

  await page.click('text=Active');
  await expect(page.locator('.todo-list li')).toHaveCount(1);

  await page.click('text=Completed');
  await expect(page.locator('.todo-list li')).toHaveCount(1);
});

// Edge case
test('Should not allow empty todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  await page.fill('.new-todo', '   ');
  await page.press('.new-todo', 'Enter');

  await expect(page.locator('.todo-list li')).toHaveCount(0);
});
