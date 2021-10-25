import { useRouter } from "next/router";
import Link from "next/link";

const ClientProjectsPage = () => {
  const router = useRouter();
  const {
    pathname,
    query: { id },
  } = router;

  const projects = [{ pid: "asa" }, { pid: "tamen" }, { pid: "shinko" }];

  function loadProjectHandler() {
    router
      .push({
        pathname: "/clients/[id]/[clientprojectid]",
        query: { id, clientprojectid: "projecta" },
      })
      .then();
  }

  return (
    <div>
      <h1>The Projects of {id}</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>

      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href={`/clients`}>Clients</Link>
        </li>
      </ul>

      <div>
        <span>projects</span>
        <ul>
          {projects.map(({ pid }) => {
            return (
              <li key={pid}>
                <Link
                  href={{
                    pathname: "/clients/[id]/[clientprojectid]",
                    query: { id, clientprojectid: pid },
                  }}
                >
                  {pid}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>pathname: {pathname}</div>
      <div>id: {id}</div>
    </div>
  );
};
export default ClientProjectsPage;
