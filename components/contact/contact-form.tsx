import classes from "./contact-form.module.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Message } from "../../model/message";
import { isInvalidMessage } from "../../validation/message";
import { Notification as NotificationType } from "../../model/notification";
import Notification from "../ui/notification";

async function sendContactData(input: Message): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const { message } = await res.json();

  if (!res.ok) {
    throw new Error(message || "エラーが発生しました");
  }
}

function ContactForm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const [requestStatus, setRequestStatus] = useState<NotificationType | null>(
    null
  );

  useEffect(() => {
    if (requestStatus) {
      const { status } = requestStatus;
      if (status === "success" || status === "error") {
        const timer = setTimeout(() => {
          setRequestStatus(null);
        }, 3000);

        return () => clearTimeout(timer);
      }
    }
  }, [requestStatus]);

  function clearInputValues(): void {
    emailInputRef.current!.value = "";
    nameInputRef.current!.value = "";
    messageInputRef.current!.value = "";
  }

  async function sendMessageHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const emailInput = emailInputRef.current!.value;
    const nameInput = nameInputRef.current!.value;
    const messageInput = messageInputRef.current!.value;
    const input: Message = {
      email: emailInput,
      name: nameInput,
      message: messageInput,
    };
    setRequestStatus({
      status: "pending",
      title: "送信中",
      message: "送信中です。",
    });

    if (isInvalidMessage(input)) {
      setRequestStatus({
        status: "error",
        title: "エラー",
        message: "入力に誤りがあります。",
      });
      return;
    }

    try {
      await sendContactData(input);
      setRequestStatus({
        status: "success",
        title: "成功",
        message: "登録しました。",
      });
      clearInputValues();
    } catch (error: any) {
      setRequestStatus({
        status: "error",
        title: "エラー",
        message: error.message,
      });
    }
  }

  return (
    <section className={classes.contact}>
      <h1>お問い合わせ</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">メールアドレス</label>
            <input id="email" type="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">お名前</label>
            <input id="name" type="text" required ref={nameInputRef} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">内容</label>
          <textarea id="message" rows={5} required ref={messageInputRef} />
        </div>

        <div className={classes.actions}>
          <button>送信</button>
        </div>
      </form>

      {requestStatus && <Notification {...requestStatus} />}
    </section>
  );
}

export default ContactForm;
