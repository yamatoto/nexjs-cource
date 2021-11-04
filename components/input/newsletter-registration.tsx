import classes from "./newsletter-registration.module.css";
import React, { useContext, useRef } from "react";
import { createNewsletter } from "../../repositories/newsletters";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { showNotification } = useContext(NotificationContext);

  function registrationHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    const email = emailInputRef.current?.value;
    if (!email) {
      showNotification({
        title: "Error!",
        message: "Invalid input!",
        status: "error",
      });
      return;
    }

    createNewsletter(email)
      .then(() => {
        showNotification({
          title: "Success!",
          message: "Successfully register for newsletter!",
          status: "success",
        });
      })
      .catch((error) => {
        showNotification({
          title: "Error!",
          message: error?.message || "Something went wrong!",
          status: "error",
        });
      });
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
