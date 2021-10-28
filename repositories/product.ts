import { Product } from "../models/product";
import path from "path";
import fs from "fs/promises";

export async function getProducts(): Promise<Product[] | null> {
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
