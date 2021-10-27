import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { Product } from "../models/product";
import fs from "fs/promises";
import path from "path";

type Props = {
  products: Product[];
};

function HomePage({ products }: Props) {
  return (
    <ul>
      {products.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<Props>> {
  const filepath = path.join(process.cwd(), "data", "dummy-backend.json");
  const data = await fs.readFile(filepath);
  const { products } = JSON.parse(data.toString());
  return {
    props: { products },
  };
}

export default HomePage;
