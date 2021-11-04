import classes from "./comment-list.module.css";
import { Comment } from "../../models/comment";
import { Fragment } from "react";

function CommentList({ comments }: { comments: Comment[] | undefined }) {
  if (!Array.isArray(comments)) {
    return <Fragment />;
  }

  return (
    <ul className={classes.comments}>
      {comments.map(({ _id, text, name }) => {
        return (
          <li key={_id}>
            <p>{text}</p>
            <div>
              By <address>{name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
