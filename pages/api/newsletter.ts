import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import config from "config";

const username = config.get("mongodb.username");
const password = config.get("mongodb.password");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const userEmail: string = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({
        message: "Invalid email address.",
      });
      return;
    }

    let client: MongoClient;
    try {
      client = await MongoClient.connect(
        `mongodb+srv://${username}:${password}@cluster0.1d8fn.mongodb.net/events?retryWrites=true&w=majority`
      );
      const db = client.db();
      await db.collection("newsletter").insertOne({ email: userEmail });
    } catch (err) {
      console.error(err);
    }
    await client!.close();

    res
      .status(201)
      .json({ message: "Signed up!", payload: { email: userEmail } });
    return;
  }

  res.status(200).json({ message: "Please POST" });
}
