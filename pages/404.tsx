import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
    </div>
  );
};
export default NotFoundPage;
