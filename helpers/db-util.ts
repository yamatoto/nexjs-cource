import { MongoClient, Document } from "mongodb";
import config from "config";

const username = config.get("mongodb.username");
const password = config.get("mongodb.password");

export async function connectDatabase(): Promise<MongoClient> {
  return await MongoClient.connect(
    `mongodb+srv://${username}:${password}@cluster0.1d8fn.mongodb.net/events?retryWrites=true&w=majority`
  );
}

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
  const { insertedId } = await db.collection(collection).insertOne(newDocument);
  return insertedId.toString();
}
