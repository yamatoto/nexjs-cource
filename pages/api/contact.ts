import { NextApiRequest, NextApiResponse } from "next";
import { isInvalidMessage } from "../../validation/message";
import { MongoClient } from "mongodb";
import { connectDatabase, insertDocument } from "../../helpers/db-util";
import { Message } from "../../model/message";

async function postHandler(body: Message): Promise<{
  statusCode: number;
  message: string;
  payload?: Message & { id: string };
}> {
  if (isInvalidMessage(body)) {
    return { statusCode: 422, message: "入力値に誤りがあります" };
  }

  const { email, name, message } = body;

  let mongoClient: MongoClient;
  try {
    mongoClient = await connectDatabase();
  } catch (error) {
    console.error(error);
    return { statusCode: 500, message: "データベース接続に失敗しました" };
  }

  try {
    const insertedId = await insertDocument<Message>(mongoClient, "messages", {
      email,
      name,
      message,
    });
    return {
      statusCode: 201,
      message: "データベースに登録しました",
      payload: { id: insertedId, email, name, message },
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, message: "データベースへの登録に失敗しました" };
  } finally {
    await mongoClient.close();
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  if (method === "POST") {
    const { statusCode, message, payload } = await postHandler(body);
    res.status(statusCode).json({ message, payload });
    return;
  }
}
