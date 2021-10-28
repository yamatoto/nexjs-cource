import { useEffect, useState } from "react";
import { transformObjectToIdList } from "../helpers/list";
import useSWR from "swr";

type Sales = {
  username: string;
  volume: number;
};

function LastSalesPage() {
  const [sales, setSales] = useState<(Sales & { id: string })[] | null>([]);
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

  if (!data || !sales) {
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

export default LastSalesPage;
