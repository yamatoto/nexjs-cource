import { NextApiRequest, NextApiResponse } from "next";
import { buildFeedbackPath, extractFeedback } from "./";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const feedbackId = req.query.feedbackId;
  const filepath = buildFeedbackPath();
  const feedBack = extractFeedback(filepath);
  const selectedFeedBack = feedBack.find(({ id }) => id === feedbackId);
  res.status(200).json({ feedBack: selectedFeedBack });
}
