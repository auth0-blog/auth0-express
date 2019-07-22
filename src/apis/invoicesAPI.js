const express = require('express');
const {checkAccessToken, checkPermission} = require('../authorizationUtils');

const {insertInvoice, getInvoices} = require('../database/invoices');

const router = express.Router();

router.use(checkAccessToken(process.env.ISSUER, process.env.INVOICE_API));

// endpoint to return all invoice requests
router.get('/', checkPermission('read:invoices'), async (req, res) => {
  res.send(await getInvoices());
});

// endpoint to insert new invoice request
router.post('/', checkPermission('create:invoice'), async (req, res) => {
  const newInvoice = req.body;
  await insertInvoice(newInvoice);
  res.send({ message: 'Invoice request inserted.' });
});

module.exports = router;
