const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const {insertVacation, getVacations, deleteVacation, updateVacation} = require('../database/vacations');

const router = express.Router();

router.use(jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.ISSUER}.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.VACATIONS_API,
  issuer: process.env.ISSUER,
  algorithms: ['RS256']
}));

// endpoint to return all vacation requests
router.get('/', async (req, res) => {
  res.send(await getVacations());
});

// endpoint to insert new vacation request
router.post('/', async (req, res) => {
  const newVacation = req.body;
  await insertVacation(newVacation);
  res.send({ message: 'Vacation request inserted.' });
});

// endpoint to delete vacation request
router.delete('/:id', async (req, res) => {
  await deleteVacation(req.params.id);
  res.send({ message: 'Vacation request removed.' });
});

// endpoint to update vacation request
router.put('/:id', async (req, res) => {
  const updatedVacation = req.body;
  await updateVacation(req.params.id, updatedVacation);
  res.send({ message: 'Vacation request updated.' });
});

module.exports = router;
