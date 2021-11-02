import React, { Fragment, useState } from "react";
import { GetStaticPropsResult } from "next";
import { Feedback } from "../../models/feedback";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

type Props = {
  feedbackList: Feedback[];
};

function FeedbackPage({ feedbackList }: Props) {
  const [feedbackData, setFeedbackData] = useState<Feedback>();
  function loadedFeedbackHandler(id: string) {
    fetch(`/api/feedback/${id}`).then(async (res) => {
      const { feedBack } = await res.json();
      setFeedbackData(feedBack);
    });
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackList.map(({ id, feedback }) => (
          <li key={id}>
            {feedback}
            <button onClick={loadedFeedbackHandler.bind(null, id)}>
              show details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const filepath = buildFeedbackPath();
  const feedBack = extractFeedback(filepath);

  return {
    props: {
      feedbackList: feedBack,
    },
  };
}

export default FeedbackPage;
