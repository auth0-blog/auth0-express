const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'vacation';

async function insertVacation(vacation) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(vacation);
  return insertedId;
}

async function getVacations() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function deleteVacation(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    _id: new ObjectID(id),
  });
}

async function updateVacation(id, vacation) {
  const database = await getDatabase();
  delete vacation._id;
  await database.collection(collectionName).update(
    { _id: new ObjectID(id), },
    {
      $set: {
        ...vacation,
      },
    },
  );
}

module.exports = {
  insertVacation,
  getVacations,
  deleteVacation,
  updateVacation,
};
