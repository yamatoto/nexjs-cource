import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { Comment } from "../../models/comment";
import { createComment, fetchComments } from "../../repositories/comments";

function Comments({ eventId }: { eventId: string }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (showComments) {
      fetchComments(eventId)
        .then((comments) => setComments(comments))
        .catch(alert);
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: Comment) {
    createComment(eventId, commentData)
      .then((comment) => {
        setComments([...comments, comment]);
      })
      .catch(alert);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
