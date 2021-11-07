import PostItem from "./post-item";
import classes from "./posts-grid.module.css";
import { Post } from "../../model/post";

function PostsGrid({ posts }: { posts: Post[] }) {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post._id} {...post} />
      ))}
    </ul>
  );
}

export default PostsGrid;
