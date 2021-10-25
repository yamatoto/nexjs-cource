import Link from "next/link";

const ClientsPage = () => {
  const clients = [
    { id: "yamato" },
    { id: "miho" },
    { id: "shogo" },
    { id: "kobashi" },
    { id: "kashi" },
  ];
  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>

      <div>
        <span>clients</span>
        <ul>
          {clients.map(({ id }) => {
            return (
              <li key={id}>
                <Link href={{ pathname: "/clients/[id]", query: { id } }}>
                  {id}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default ClientsPage;
