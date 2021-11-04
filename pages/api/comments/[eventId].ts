import { NextApiRequest, NextApiResponse } from "next";
import { Comment } from "../../../models/comment";
import { MongoClient } from "mongodb";
import config from "config";
import { getAllDocuments, insertDocument } from "../../../helpers/db-util";

const username = config.get("mongodb.username");
const password = config.get("mongodb.password");

function isInvalid({ email, name, text }: Comment): boolean {
  return (
    !email ||
    !email.includes("@") ||
    !name ||
    name.trim() === "" ||
    !text ||
    text.trim() === ""
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const eventId = req.query.eventId as string;
  const { method } = req;
  if (method === "POST") {
    const { email, name, text } = req.body;
    if (isInvalid({ email, name, text })) {
      res.status(422).json({ message: "invalid input." });
      return;
    }
    const newComment: Omit<Comment, "_id"> = {
      email,
      name,
      text,
      eventId,
    };

    let client: MongoClient;
    try {
      client = await MongoClient.connect(
        `mongodb+srv://${username}:${password}@cluster0.1d8fn.mongodb.net/events?retryWrites=true&w=majority`
      );
      const insertedId = await insertDocument(client, "comments", newComment);
      res.status(201).json({
        message: "Added comment.",
        payload: { ...newComment, _id: insertedId },
      });
    } catch (err) {
      console.error(err);
    }
    await client!.close();
    return;
  }

  if (method === "GET") {
    let client: MongoClient;
    try {
      client = await MongoClient.connect(
        `mongodb+srv://${username}:${password}@cluster0.1d8fn.mongodb.net/events?retryWrites=true&w=majority`
      );
      const documents = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId }
      );
      res.status(200).json({ payload: documents });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "db error" });
    }
    await client!.close();
    return;
  }
}
