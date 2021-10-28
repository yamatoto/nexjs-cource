import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

type Props = {
  userId: string;
};

function UserIdPage({ userId }: Props) {
  return (
    <div>
      <h1>userId: {userId}</h1>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const { params } = context;
  const userId = params!.uid!.toString();
  return {
    props: {
      userId,
    },
  };
}

export default UserIdPage;
