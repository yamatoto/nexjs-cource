import { MongoClient } from "mongodb";
import config from "config";

const clusterName = config.get<string>("mongodb.clusterName");
const dbname = config.get<string>("mongodb.dbname");
const username = config.get<string>("mongodb.username");
const password = config.get<string>("mongodb.password");

export async function connectDatabase(): Promise<MongoClient> {
  return await MongoClient.connect(
    `mongodb+srv://${username}:${password}@${clusterName}.mongodb.net/${dbname}?retryWrites=true&w=majority`
  );
}

export async function insertDocument<T>(
  mongoClient: MongoClient,
  collectionName: string,
  document: T
): Promise<string> {
  const db = mongoClient.db();
  const { insertedId } = await db
    .collection(collectionName)
    .insertOne(document);
  return insertedId.toString();
}
