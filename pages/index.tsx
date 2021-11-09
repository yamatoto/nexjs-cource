import Hero from "../components/home-page/hero";
import { Fragment } from "react";
import FeaturedPosts from "../components/home-page/featured-posts";
import { Post } from "../model/post";
import { GetStaticPropsResult } from "next";
import { getFeaturedPosts } from "../lib/posts-util";
import Head from "next/head";

type Props = {
  posts: Post[];
};

function HomePage({ posts }: Props) {
  return (
    <Fragment>
      <Head>
        <title>Yamato Blog</title>
        <meta
          name="description"
          content="プログラミング、Web開発について投稿します。"
        />
      </Head>
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
