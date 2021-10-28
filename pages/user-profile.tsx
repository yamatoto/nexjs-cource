import { GetServerSidePropsResult } from "next";
import Link from "next/Link";

type Props = {
  username: string;
};

function UserProfilePage({ username }: Props) {
  return (
    <div>
      <h1>{username}</h1>
      <div>
        <Link href={{ pathname: "/[uid]", query: { uid: "aaa" } }}>aaa</Link>
      </div>
      <div>
        <Link href={{ pathname: "/[uid]", query: { uid: "bbb" } }}>bbb</Link>
      </div>
      <div>
        <Link href={{ pathname: "/[uid]", query: { uid: "ccc" } }}>ccc</Link>
      </div>
    </div>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  return {
    props: {
      username: "Yamato",
    },
  };
}

export default UserProfilePage;
