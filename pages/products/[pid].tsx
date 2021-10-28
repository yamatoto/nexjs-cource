import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { Product } from "../../models/product";
import { getProducts } from "../../repositories/product";

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

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<Props>> {
  const products = await getProducts();

  const loadedProduct = products?.find(
    ({ id }) => id === context.params?.pid?.toString()
  );
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
