import AllPosts from "../../components/posts/all-posts";
import { Post } from "../../model/post";
import { GetStaticPropsResult } from "next";
import { getAllPosts } from "../../lib/posts-util";
import { Fragment } from "react";
import Head from "next/head";

type Props = {
  posts: Post[];
};

function AllPostsPage({ posts }: Props) {
  return (
    <Fragment>
      <Head>
        <title>投稿一覧</title>
        <meta name="description" content="ブログ投稿一覧ページです。" />
      </Head>
      <AllPosts posts={posts} />
    </Fragment>
  );
}

export function getStaticProps(): GetStaticPropsResult<Props> {
  return {
    props: {
      posts: getAllPosts(),
    },
  };
}

export default AllPostsPage;
