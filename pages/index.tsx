import React, { useRef, useState } from "react";
import { Feedback } from "../models/feedback";

function HomePage() {
  const [loadedFeedBackList, setLoadedFeedBackList] = useState<Feedback[]>([]);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const emailInput = emailInputRef.current?.value;
    const feedbackInput = feedbackInputRef.current?.value;
    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        feedback: feedbackInput,
      }),
    })
      .then(() => {
        loadFeedBackHandler();
      })
      .catch(console.error);
  }

  function loadFeedBackHandler() {
    fetch("/api/feedback")
      .then(async (res) => {
        const { feedBack } = await res.json();
        setLoadedFeedBackList(feedBack);
      })
      .catch(console.error);
  }

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows={5} ref={feedbackInputRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedBackHandler}>Load Feedback</button>
      <ul>
        {loadedFeedBackList.map((fb) => (
          <li key={fb.id}>{fb.feedback}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
