import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1>The Home Page</h1>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href={{ pathname: "/portfolio" }}>Portfolio</Link>
        </li>
        <li>
          <Link href={{ pathname: "/clients" }}>Clients</Link>
        </li>
        <li>
          <Link href={{ pathname: "/blog/1" }}>Blog/1</Link>
        </li>
        <li>
          <Link href={{ pathname: "/about" }}>About</Link>
        </li>
      </ul>
    </div>
  );
};
export default HomePage;
