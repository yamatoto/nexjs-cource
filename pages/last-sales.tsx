import { useEffect, useState } from "react";
import { transformObjectToIdList } from "../helpers/list";
import useSWR from "swr";
import { GetStaticPropsResult } from "next";

type Props = {
  sales: (Sales & { id: string })[];
};

type Sales = {
  username: string;
  volume: number;
};

function LastSalesPage(props: Props) {
  const [sales, setSales] = useState<(Sales & { id: string })[]>(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://nextjs-course-bdb90-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const sales = transformObjectToIdList<Sales>(data);
      setSales(sales);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://nextjs-course-bdb90-default-rtdb.firebaseio.com/sales.json")
  //     .then(async (res) => {
  //       const data = await res.json();
  //       const sales = transformObjectToIdList<Sales>(data);
  //       setSales(sales);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <ul>
      {sales.map(({ id, username, volume }) => (
        <li key={id}>
          {username} - {volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const res = await fetch(
    "https://nextjs-course-bdb90-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await res.json();

  return {
    props: {
      sales: transformObjectToIdList<Sales>(data),
    },
  };
}

export default LastSalesPage;
