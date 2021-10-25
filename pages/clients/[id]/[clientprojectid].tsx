import { useRouter } from "next/router";
import Link from "next/link";

const SelectedClientProjectPage = () => {
  const router = useRouter();
  const {
    query: { id, clientprojectid },
  } = router;

  return (
    <div>
      <h1>
        The Project Page for {clientprojectid} Project for {id}
      </h1>

      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href={{ pathname: "/clients" }}>Clients</Link>
        </li>
        <li>
          <Link
            href={{ pathname: "/clients/[id]", query: { id } }}
          >{`${id} project list`}</Link>
        </li>
      </ul>
    </div>
  );
};
export default SelectedClientProjectPage;
