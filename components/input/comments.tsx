import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { Comment } from "../../models/comment";
import { createComment, fetchComments } from "../../repositories/comments";
import NotificationContext from "../../store/notification-context";

function Comments({ eventId }: { eventId: string }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetchComments(eventId)
        .then((comments) => setComments(comments))
        .catch(alert)
        .finally(() => setIsFetchingComments(false));
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: Comment) {
    showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored into a database.",
      status: "pending",
    });

    createComment(eventId, commentData)
      .then((comment) => {
        showNotification({
          title: "Success!",
          message: "Your comment was saved!",
          status: "success",
        });
        setComments([...comments, comment]);
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
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
