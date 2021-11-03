import { create } from "./base";

export async function createNewsletter(email: string) {
  return await create(`newsletter`, { email });
}
