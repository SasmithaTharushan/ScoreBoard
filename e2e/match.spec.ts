import { expect, test } from '@playwright/test'

test('create match, score a 1-over chase and check result in demo mode', async ({ page }) => {
  // 1. Visit login and continue in demo mode
  await page.goto('/login')
  await expect(page.getByRole('heading', { name: 'Sign in to score' })).toBeVisible()
  await page.getByRole('button', { name: 'Continue in demo mode' }).click()

  // 2. Redirected to /new
  await expect(page).toHaveURL(/\/new/)
  await page.fill('#ta', 'Sri Lanka')
  await page.fill('#tb', 'India')
  await page.fill('#overs', '1')
  await page.getByRole('button', { name: 'Create match & start scoring' }).click()

  // 3. On scorer page
  await expect(page).toHaveURL(/\/match\/.*\/score/)
  await expect(page.getByText('Sri Lanka batting').first()).toBeVisible()

  // 4. Score 1st innings: 6 legal deliveries (each 1 run) = 6/0 in 1.0 ov
  for (let i = 0; i < 6; i++) {
    await page.getByRole('button', { name: '1', exact: true }).click()
  }

  // Innings 1 completes (1.0 overs up). Target is 7.
  await expect(page.getByText('India need 7 to win')).toBeVisible()

  // 5. Score 2nd innings: chase down 7 runs with a 4 and a 4 (8 runs >= 7)
  await page.getByRole('button', { name: '4', exact: true }).click()
  await page.getByRole('button', { name: '4', exact: true }).click()

  // 6. Match completes and result line is displayed
  await expect(page.getByText('India won by 10 wickets')).toBeVisible()
})
