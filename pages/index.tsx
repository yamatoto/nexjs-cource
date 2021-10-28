import { GetStaticPropsResult } from "next";
import { Product } from "../models/product";
import fs from "fs/promises";
import path from "path";
import Link from "next/Link";
type Props = {
  products: Product[];
};

function HomePage({ products }: Props) {
  return (
    <ul>
      {products.map(({ id, title }) => (
        <li key={id}>
          <Link href={{ pathname: "/[pid]", query: { pid: id } }}>{title}</Link>
        </li>
      ))}
    </ul>
  );
}

async function getProducts(): Promise<Product[] | null> {
  try {
    const filepath = path.join(process.cwd(), "data", "dummy-backend.json");
    const data = await fs.readFile(filepath);
    const { products } = JSON.parse(data.toString());
    return products;
  } catch (e) {
    console.error(e);
    return null;
  }
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
