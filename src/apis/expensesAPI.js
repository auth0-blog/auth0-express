const express = require('express');
const {checkAccessToken, checkPermission} = require('../authorizationUtils');

const {insertExpense, getExpenses} = require('../database/expenses');

const router = express.Router();

router.use(checkAccessToken(process.env.ISSUER, process.env.EXPENSE_API));

// endpoint to return all expense reports
router.get('/', checkPermission('read:expenses'), async (req, res) => {
  res.send(await getExpenses());
});

// endpoint to insert new expense report
router.post('/', checkPermission('create:expenses'), async (req, res) => {
  const newExpense = req.body;
  await insertExpense(newExpense);
  res.send({ message: 'Expense report inserted.' });
});

module.exports = router;
