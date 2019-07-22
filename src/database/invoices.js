const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'invoice';

async function insertInvoice(invoice) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(invoice);
  return insertedId;
}

async function getInvoices() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function deleteInvoice(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    _id: new ObjectID(id),
  });
}

async function updateInvoice(id, invoice) {
  const database = await getDatabase();
  delete invoice._id;
  await database.collection(collectionName).update(
    { _id: new ObjectID(id), },
    {
      $set: {
        ...invoice,
      },
    },
  );
}

module.exports = {
  insertInvoice,
  getInvoices,
  deleteInvoice,
  updateInvoice,
};
