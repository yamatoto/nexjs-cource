import Link from "next/link";

const PortfolioPage = () => {
  return (
    <div>
      <h1>The Portfolio Page</h1>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>

      <div>
        <span>Portfolio/list</span>
        <ul>
          <li>
            <Link href={{ pathname: "/portfolio/list" }}>Portfolio/list</Link>
          </li>
        </ul>
      </div>

      <div>
        <span>Portfolio/projectid</span>
        <ul>
          <li>
            <Link href={{ pathname: "/portfolio/hoge" }}>Portfolio/hoge</Link>
          </li>
          <li>
            <Link href={{ pathname: "/portfolio/fuga" }}>Portfolio/fuga</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default PortfolioPage;
