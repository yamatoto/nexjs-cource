import Link from "next/link";

const ListPage = () => {
  return (
    <div>
      <h1>The List Page</h1>

      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href={{ pathname: "/portfolio" }}>Portfolio</Link>
        </li>
      </ul>
    </div>
  );
};
export default ListPage;
