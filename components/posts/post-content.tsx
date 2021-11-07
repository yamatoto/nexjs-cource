import classes from "./post-content.module.css";
import { Post } from "../../model/post";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import Image from "next/image";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

function PostContent({ title, slug, image, content }: Post) {
  const imagePath = `/images/posts/${slug}/${image}`;
  const customRenderers: Partial<
    Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
  > = {
    p({ node, children }) {
      const child = node.children[0];
      if (child.type === "element" && child.tagName === "img") {
        const { properties } = child;
        const { src, alt } = properties!;
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${slug}/${src}`}
              alt={String(alt)}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{children}</p>;
    },
    code({ className, children }) {
      const language = className?.split("-")[1];
      return (
        <SyntaxHighlighter style={atomDark} language={language}>
          {children}
        </SyntaxHighlighter>
      );
    },
  };
  return (
    <article className={classes.content}>
      <PostHeader title={title} imagePath={imagePath} />
      <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
