import { test, expect } from '@playwright/test';

import { GetStartedPage } from './pages/get-started';
import { BoardPage } from './pages/board';
import { MyBoardsPage } from './pages/my-boards';



// test.beforeAll(async ({ request }) => {
//     // Clear the database
//     await request.post('http://localhost:3000/api/reset');
// });

test('Create a new board with a list and cards', async ({ page }) => {
    const getStartedPage = new GetStartedPage(page);
const boardPage = new BoardPage(page);
const myBoardsPage = new MyBoardsPage(page);

    // Load the app
    await getStartedPage.load();
    
    // Create a new board
    await getStartedPage.createFirstBoard('Chores');
    await boardPage.expectNewBoardLoaded('Chores');

    // Create a new list
    await boardPage.addList('TODO');
    await expect(boardPage.listName).toHaveValue('TODO');

    // Add cards to the list
    await boardPage.addCardToList(0, 'Buy groceries');
    await boardPage.addCardToList(0, 'Mow the lawn');
    await boardPage.addCardToList(0, 'Walk the dog');
    await expect(boardPage.cardTexts).toHaveText(
        ['Buy groceries', 'Mow the lawn', 'Walk the dog']);
    
    // Navigate to the home page
    await boardPage.goHome();
    await myBoardsPage.expectLoaded(['Chores']);
//   await page.goto('http://localhost:3000/');

//   // Create a new board
//   //page.locator('[name="newBoard"]')
//   //page.locator('[data-cy="first-board"]').fill('Chores');



// //   await page.getByPlaceholder('Name of your first board').fill('Chores');
// //   await page.getByPlaceholder('Name of your first board').press('Enter');
// //   await expect(page.locator('[name="board-title"]')).toHaveValue('Chores');
// //   await expect(page.getByPlaceholder('Enter list title...')).toBeVisible();
// //   await expect(page.locator('[data-cy="list"]')).not.toBeVisible();

//   await page.getByPlaceholder('Enter list title...').fill('TODO');
//   await page.getByPlaceholder('Enter list title...').press('Enter');
//   await expect (page.locator('[data-cy="list-name"]')).toHaveValue('TODO');

//   //Add cards to the list
//   await page.getByText('Add another card').click();
//   await page.getByPlaceholder('Enter a title for this card...').fill('Buy groceries');
//   await page.getByRole('button', { name: 'Add card' }).click();
//   await page.getByPlaceholder('Enter a title for this card...').fill('Mow the lawn');
//   await page.getByRole('button', { name: 'Add card' }).click();
//   await page.getByPlaceholder('Enter a title for this card...').fill('Walk the dog');
//   await page.getByRole('button', { name: 'Add card' }).click();
//   await expect(page.locator('[data-cy="card-text"]')).toHaveText(
//       ['Buy groceries', 'Mow the lawn', 'Walk the dog']);

//    // Navigate to the home page
//    await page.getByRole('navigation').getByRole('button').click();
//    await expect(page.getByText('My Boards')).toBeVisible();
//    await expect(page.getByText('Chores')).toBeVisible();

});

