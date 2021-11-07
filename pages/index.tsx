import Hero from "../components/home-page/hero";
import { Fragment } from "react";
import FeaturedPosts from "../components/home-page/featured-posts";
import { Post } from "../model/post";
import { GetStaticPropsResult } from "next";
import { getFeaturedPosts } from "../lib/posts-util";

type Props = {
  posts: Post[];
};

function HomePage({ posts }: Props) {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
}

export function getStaticProps(): GetStaticPropsResult<Props> {
  return {
    props: {
      posts: getFeaturedPosts(),
    },
  };
}

export default HomePage;
