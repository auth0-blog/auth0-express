const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const {insertInvoice, getInvoices, deleteInvoice, updateInvoice} = require('../database/invoices');

const router = express.Router();

router.use(jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.ISSUER}.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.INVOICE_API,
  issuer: process.env.ISSUER,
  algorithms: ['RS256']
}));

// endpoint to return all invoice requests
router.get('/', async (req, res) => {
  res.send(await getInvoices());
});

// endpoint to insert new invoice request
router.post('/', async (req, res) => {
  const newInvoice = req.body;
  await insertInvoice(newInvoice);
  res.send({ message: 'Invoice request inserted.' });
});

// endpoint to delete invoice request
router.delete('/:id', async (req, res) => {
  await deleteInvoice(req.params.id);
  res.send({ message: 'Invoice request removed.' });
});

// endpoint to update invoice request
router.put('/:id', async (req, res) => {
  const updatedInvoice = req.body;
  await updateInvoice(req.params.id, updatedInvoice);
  res.send({ message: 'Invoice request updated.' });
});

module.exports = router;
