import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { Product } from "../models/product";
import path from "path";
import fs from "fs/promises";

type Props = {
  loadedProduct: Product;
};
function ProductDetailPage({ loadedProduct }: Props) {
  if (!loadedProduct) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <h1>{loadedProduct.title}</h1>
      <div>{loadedProduct.description}</div>
    </div>
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

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<Props>> {
  const products = await getProducts();

  const loadedProduct = products?.find(
    ({ id }) => id === context.params?.pid?.toString()
  );
  console.log({ loadedProduct });
  if (!loadedProduct) {
    return { notFound: true };
  }

  return {
    props: { loadedProduct },
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const products = await getProducts();
  const pathsWithParams = products!.map(({ id }) => {
    return { params: { pid: id } };
  });

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}

export default ProductDetailPage;
