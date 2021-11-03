import { NextApiRequest, NextApiResponse } from "next";
import { Comment } from "../../../models/comment";

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { eventId } = req.query;
  const { method } = req;
  if (method === "POST") {
    const { email, name, text } = req.body;
    if (isInvalid({ email, name, text })) {
      res.status(422).json({ message: "invalid input." });
      return;
    }
    const newComment: Comment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    res.status(201).json({ message: "Added comment.", payload: newComment });
    return;
  }

  if (method === "GET") {
    const dummyList: Omit<Comment, "email">[] = [
      { id: "c1", name: "yamato", text: "hello!" },
      { id: "c2", name: "miho", text: "hello!!" },
      { id: "c3", name: "shogo", text: "hello!!!" },
      { id: "c4", name: "kobashi", text: "hello!!!!" },
      { id: "c5", name: "kashi", text: "hello!!!!!" },
    ];
    res.status(200).json({ payload: dummyList });
    return;
  }
}
