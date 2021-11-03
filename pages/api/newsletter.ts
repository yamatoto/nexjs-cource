import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userEmail: string = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({
        message: "Invalid email address.",
      });
      return;
    }

    res
      .status(201)
      .json({ message: "Signed up!", payload: { email: userEmail } });
    return;
  }

  res.status(200).json({ message: "Please POST" });
}
