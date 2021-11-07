import AllPosts from "../../components/posts/all-posts";
import { Post } from "../../model/post";
import { GetStaticPropsResult } from "next";
import { getAllPosts } from "../../lib/posts-util";

type Props = {
  posts: Post[];
};

function AllPostsPage({ posts }: Props) {
  return <AllPosts posts={posts} />;
}

export function getStaticProps(): GetStaticPropsResult<Props> {
  return {
    props: {
      posts: getAllPosts(),
    },
  };
}

export default AllPostsPage;
