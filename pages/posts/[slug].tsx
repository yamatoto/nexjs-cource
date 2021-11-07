import PostContent from "../../components/posts/post-content";
import { Post } from "../../model/post";

const DUMMY_POST: Post = {
  _id: "p1",
  slug: "getting-started-with-nextjs",
  title: "Getting Started with NextJS",
  image: "getting-started-nextjs.png",
  excerpt:
    "NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.",
  date: "2022-02-10",
  content: "# This is a first post",
  isFeatured: true,
};

function PostDetailPage() {
  return <PostContent {...DUMMY_POST} />;
}

export default PostDetailPage;
