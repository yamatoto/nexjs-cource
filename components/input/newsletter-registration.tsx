import classes from "./newsletter-registration.module.css";
import React, { useRef } from "react";
import { createNewsletter } from "../../repositories/newsletters";

function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>(null);

  function registrationHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = emailInputRef.current?.value;
    if (!email) {
      alert("email is empty.");
      return;
    }
    createNewsletter(email).then(console.log).catch(alert);
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
