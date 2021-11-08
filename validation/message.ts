import { Message } from "../model/message";

export function isInvalidMessage({ email, name, message }: Message): boolean {
  return (
    !email ||
    !email.includes("@") ||
    !name ||
    name.trim() === "" ||
    !message ||
    message.trim() === ""
  );
}
