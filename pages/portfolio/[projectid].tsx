import { useRouter } from "next/router";
import Link from "next/link";

const PortfolioProjectPage = () => {
  const router = useRouter();
  const {
    pathname,
    query: { projectid },
  } = router;
  return (
    <div>
      <h1>The Portfolio Project Page</h1>

      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href={{ pathname: "/portfolio" }}>Portfolio</Link>
        </li>
      </ul>

      <div>pathname: {pathname}</div>
      <div>projectid: {projectid}</div>
    </div>
  );
};
export default PortfolioProjectPage;
