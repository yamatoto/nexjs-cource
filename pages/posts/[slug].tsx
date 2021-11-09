import PostContent from "../../components/posts/post-content";
import { Post } from "../../model/post";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { getPostData, getPostsFiles } from "../../lib/posts-util";
import { Fragment } from "react";
import Head from "next/head";

type Props = {
  post: Post;
};

function PostDetailPage({ post }: Props) {
  return (
    <Fragment>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent {...post} />
    </Fragment>
  );
}

export function getStaticProps(
  ctx: GetStaticPropsContext
): GetStaticPropsResult<Props> {
  const { params } = ctx;
  return {
    props: {
      post: getPostData(params!.slug!.toString()),
    },
    revalidate: 600,
  };
}

export function getStaticPaths(): GetStaticPathsResult {
  const slugs = getPostsFiles().map((fileName) =>
    fileName.replace(/\.md$/, "")
  );

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
