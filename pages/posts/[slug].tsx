import PostContent from "../../components/posts/post-content";
import { Post } from "../../model/post";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

type Props = {
  post: Post;
};

function PostDetailPage({ post }: Props) {
  return <PostContent {...post} />;
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
