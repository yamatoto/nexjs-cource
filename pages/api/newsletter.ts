import { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, insertDocument } from "../../helpers/db-util";
import { MongoClient } from "mongodb";

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const userEmail: string = req.body.email;
  if (!userEmail || !userEmail.includes("@")) {
    res.status(422).json({
      message: "Invalid email address.",
    });
    return;
  }

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
    await insertDocument(client, "newsletter", { email: userEmail });
    res
      .status(201)
      .json({ message: "Signed up!", payload: { email: userEmail } });
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
  switch (req.method) {
    case "POST":
      await postHandler(req, res);
      return;
    default:
  }
}
