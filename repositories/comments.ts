import { create, getList } from "./base";
import { Comment } from "../models/comment";

export async function createComment(
  eventId: string,
  reqBody: Comment
): Promise<Comment> {
  return await create<Comment>(`comments`, reqBody, eventId);
}

export async function fetchComments(eventId: string): Promise<Comment[]> {
  return await getList<Comment[]>(`comments`, eventId);
}
