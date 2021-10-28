import { GetStaticPropsResult } from "next";
import { Product } from "../models/product";
import Link from "next/Link";
import { getProducts } from "../repositories/product";

type Props = {
  products: Product[];
};

function HomePage({ products }: Props) {
  return (
    <ul>
      {products.map(({ id, title }) => (
        <li key={id}>
          <Link href={{ pathname: "/products/[pid]", query: { pid: id } }}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return { notFound: true };
  }

  return {
    props: { products },
    revalidate: 10,
  };
}

export default HomePage;
