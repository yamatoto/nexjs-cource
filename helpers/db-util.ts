import { MongoClient, Document } from "mongodb";

export async function getAllDocuments(
  client: MongoClient,
  collection: string,
  sort: {},
  filter = {}
): Promise<Document[]> {
  const db = client.db();
  return await db
    .collection(collection)
    .find(filter) // this changed - we use the "filter" parameter!
    .sort(sort)
    .toArray();
}

export async function insertDocument(
  client: MongoClient,
  collection: string,
  newDocument: Document
): Promise<string> {
  const db = client.db();
  const { insertedId } = await db.collection("comments").insertOne(newDocument);
  return insertedId.toString();
}
