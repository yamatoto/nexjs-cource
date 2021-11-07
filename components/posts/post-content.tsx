import classes from "./post-content.module.css";
import { Post } from "../../model/post";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";

function PostContent({ title, slug, image, content }: Post) {
  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={title} imagePath={imagePath} />
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
