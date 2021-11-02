import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { Feedback } from "../../../models/feedback";

export function buildFeedbackPath(): string {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filepath: string): Feedback[] {
  const fileData = fs.readFileSync(filepath);
  return JSON.parse(fileData.toString());
}

function writeToFile(newFeedBack: Feedback) {
  const filepath = buildFeedbackPath();
  const data = extractFeedback(filepath);
  data.push(newFeedBack);
  fs.writeFileSync(filepath, JSON.stringify(data));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const newFeedBack: Feedback = {
      id: new Date().toISOString(),
      ...req.body,
    };
    writeToFile(newFeedBack);
    res
      .status(201)
      .json({ message: "Success!", data: JSON.stringify(newFeedBack) });
  } else {
    const filepath = buildFeedbackPath();
    const data = extractFeedback(filepath);
    res.status(200).json({ feedBack: data });
  }
}
