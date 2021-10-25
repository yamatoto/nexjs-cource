import { useRouter } from "next/router";
import Link from "next/link";

const BlogPostsPage = () => {
  const router = useRouter();
  const {
    pathname,
    query: { slug },
  } = router;

  return (
    <div>
      <h1>The Blog Posts Page</h1>

      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>

      <div>
        <span>other blogs</span>
        <ul>
          <li>
            <Link href={{ pathname: "/blog/1" }}>Blog/1</Link>
          </li>
          <li>
            <Link href={{ pathname: "/blog/2021/12" }}>Blog/2021/12</Link>
          </li>
          <li>
            <Link href={{ pathname: "/blog/2021/12/31" }}>Blog/2021/12/31</Link>
          </li>
        </ul>
      </div>

      <div>pathname: {pathname}</div>
      <div>
        slug: {Array.isArray(slug) ? slug.map((s) => s).join("/") : slug}
      </div>
    </div>
  );
};
export default BlogPostsPage;
