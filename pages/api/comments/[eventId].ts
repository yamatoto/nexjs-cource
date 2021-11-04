import { NextApiRequest, NextApiResponse } from "next";
import { Comment } from "../../../models/comment";
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-util";
import { MongoClient } from "mongodb";

async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  eventId: string
) {
  let client: MongoClient;
  try {
    client = await connectDatabase();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database Connect failed.",
    });
    return;
  }

  try {
    const documents = await getAllDocuments(
      client,
      "comments",
      { _id: -1 },
      { eventId }
    );
    res.status(200).json({ payload: documents });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Get Documents failed.",
    });
  }
  await client.close();
}

function isInvalidPostData({ email, name, text }: Comment): boolean {
  return (
    !email ||
    !email.includes("@") ||
    !name ||
    name.trim() === "" ||
    !text ||
    text.trim() === ""
  );
}

async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  eventId: string
) {
  const { email, name, text } = req.body;
  if (isInvalidPostData({ email, name, text })) {
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
    client = await connectDatabase();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database Connect failed.",
    });
    return;
  }

  try {
    const insertedId = await insertDocument(client, "comments", newComment);
    res.status(201).json({
      message: "Added comment.",
      payload: { ...newComment, _id: insertedId },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Insert Document failed.",
    });
  }
  await client.close();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req;
  const eventId = query.eventId as string;
  switch (method) {
    case "GET":
      await getHandler(req, res, eventId);
      return;
    case "POST":
      await postHandler(req, res, eventId);
      return;
    default:
  }
}
