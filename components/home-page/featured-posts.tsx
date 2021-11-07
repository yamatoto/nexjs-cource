import classes from "./featured-posts.module.css";
import PostsGrid from "../posts/posts-grid";
import { Post } from "../../model/post";

function FeaturedPosts({ posts }: { posts: Post[] }) {
  return (
    <section className={classes.latest}>
      <h2>注目の記事</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default FeaturedPosts;
