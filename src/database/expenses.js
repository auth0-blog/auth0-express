const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'expense';

async function insertExpense(expense) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(expense);
  return insertedId;
}

async function getExpenses() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function deleteExpense(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    _id: new ObjectID(id),
  });
}

async function updateExpense(id, expense) {
  const database = await getDatabase();
  delete expense._id;
  await database.collection(collectionName).update(
    { _id: new ObjectID(id), },
    {
      $set: {
        ...expense,
      },
    },
  );
}

module.exports = {
  insertExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
};
