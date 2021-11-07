import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { Post } from "../model/post";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export function getPostsFiles(): string[] {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier: string): Post {
  const postSlug = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug: postSlug,
    content,
    ...(data as Omit<Post, "slug" | "content">),
  };
}

export function getAllPosts(): Post[] {
  return getPostsFiles()
    .map((postFile) => getPostData(postFile))
    .sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter(({ isFeatured }) => isFeatured);
}
