import ContactForm from "../../components/contact/contact-form";
import { Fragment } from "react";
import Head from "next/head";

function ContactPage() {
  return (
    <Fragment>
      <Head>
        <title>お問い合わせ</title>
        <meta name="description" content="お問い合わせください" />
      </Head>
      <ContactForm />;
    </Fragment>
  );
}

export default ContactPage;
