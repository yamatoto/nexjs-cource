export function transformObjectToIdList<T>(data: {
  [key: string]: T;
}): (T & { id: string })[] {
  return Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));
}
