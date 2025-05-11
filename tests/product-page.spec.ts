import { test, expect } from '@playwright/test';
import { productData } from '../src/mock/productData';

test.describe('Product Display Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
  });

  test('should display product information correctly and allow color selection', async ({
    page,
  }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Product Display'
    );

    // Assert initial product image
    await expect(page.getByAltText(productData.productName)).toHaveAttribute(
      'src',
      productData.imageUrls[0].url
    );

    // Assert product name
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(
      productData.productName
    );

    // Assert product price
    await expect(page.getByText(productData.price)).toBeVisible();

    // Assert product description
    await expect(page.getByText(productData.description)).toBeVisible();

    // Assert number of color options
    const colorButtons = page.locator('button[data-testid^="color-button-"]');
    await expect(colorButtons).toHaveCount(productData.colors.length);

    // Assert badge text
    await expect(page.getByText(productData.badge.text)).toBeVisible();
  });

  test('color selection and image updates', async ({ page }) => {
    // Assert product name
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(
      productData.productName
    );

    await page.getByTestId('color-button-ash').click();

    const ashImageUrl = productData.imageUrls.find(
      (img) => img.name === 'Ash'
    )?.url;
    await expect(page.getByAltText(productData.productName)).toHaveAttribute(
      'src',
      ashImageUrl || ''
    );

    await page.getByTestId('color-button-terracotta').click();

    const terracottaImageUrl = productData.imageUrls.find(
      (img) => img.name === 'Terracotta'
    )?.url;
    await expect(page.getByAltText(productData.productName)).toHaveAttribute(
      'src',
      terracottaImageUrl || ''
    );

    await page.getByTestId('color-button-graphite').click();

    const graphiteImageUrl = productData.imageUrls.find(
      (img) => img.name === 'Graphite'
    )?.url;
    await expect(page.getByAltText(productData.productName)).toHaveAttribute(
      'src',
      graphiteImageUrl || ''
    );
  });
});
