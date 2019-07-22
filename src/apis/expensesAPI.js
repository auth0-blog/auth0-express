const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const {insertExpense, getExpenses, deleteExpense, updateExpense} = require('../database/expenses');

const router = express.Router();

router.use(jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.ISSUER}.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.EXPENSE_API,
  issuer: process.env.ISSUER,
  algorithms: ['RS256']
}));

// endpoint to return all expense reports
router.get('/', async (req, res) => {
  res.send(await getExpenses());
});

// endpoint to insert new expense report
router.post('/', async (req, res) => {
  const newExpense = req.body;
  await insertExpense(newExpense);
  res.send({ message: 'Expense report inserted.' });
});

// endpoint to delete expense report
router.delete('/:id', async (req, res) => {
  await deleteExpense(req.params.id);
  res.send({ message: 'Expense report removed.' });
});

// endpoint to update expense report
router.put('/:id', async (req, res) => {
  const updatedExpense = req.body;
  await updateExpense(req.params.id, updatedExpense);
  res.send({ message: 'Expense report updated.' });
});

module.exports = router;
