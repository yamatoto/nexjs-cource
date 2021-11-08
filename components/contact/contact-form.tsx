import classes from "./contact-form.module.css";
import { FormEvent, useRef } from "react";
import { Message } from "../../model/message";
import { isInvalidMessage } from "../../validation/message";

function ContactForm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const emailInput = emailInputRef.current!.value;
    const nameInput = nameInputRef.current!.value;
    const messageInput = messageInputRef.current!.value;
    const message: Message = {
      email: emailInput,
      name: nameInput,
      message: messageInput,
    };
    if (isInvalidMessage(message)) {
      alert("入力値に誤りがあります");
      return;
    }
    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then(async (res) => {
        const { message, payload } = await res.json();
        if (!res.ok) {
          console.error(res);
          alert(message || "エラーが発生しました");
        }
        console.log(message, payload);
      })
      .catch((error) => {
        console.error(error);
        alert(error || "エラーが発生しました");
      });
  }

  return (
    <section className={classes.contact}>
      <h1>お問い合わせ</h1>
      <form className={classes.form} onSubmit={submitHandler}>
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
    </section>
  );
}

export default ContactForm;
