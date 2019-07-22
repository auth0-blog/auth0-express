const express = require('express');
const {checkAccessToken, checkPermission} = require('../authorizationUtils');

const {insertVacation, getVacations} = require('../database/vacations');

const router = express.Router();

router.use(checkAccessToken(process.env.ISSUER, process.env.VACATION_API));

// endpoint to return all vacation requests
router.get('/', checkPermission('read:requests'), async (req, res) => {
  res.send(await getVacations());
});

// endpoint to insert new vacation request
router.post('/', checkPermission('create:request'), async (req, res) => {
  const newVacation = req.body;
  await insertVacation(newVacation);
  res.send({ message: 'Vacation request inserted.' });
});

module.exports = router;
