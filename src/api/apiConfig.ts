type ApiEndpoint<T extends any[] = []> = T extends [] ? string : (...args: T) => string;

type ApiResource = {
  list: ApiEndpoint;
  detail: ApiEndpoint<[string]>;
};

type ApiConfig = {
  products: ApiResource & {
    byCategory: ApiEndpoint<[string]>;
  };
  categories: ApiResource;
  employees: ApiResource;
  sales: {
    active: ApiEndpoint;
    detail: ApiEndpoint<[string]>;
  };
};

export const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

export const buildUrl = (path: string) => {
  const base = `${BASE_URL}/api`;
  return API_VERSION ? `${base}/${API_VERSION}/${path}` : `${base}/${path}`;
};

export const API: ApiConfig = {
  products: {
    list: buildUrl("products"),
    byCategory: (categoryId) => buildUrl(`products/category/${categoryId}`),
    detail: (id) => buildUrl(`products/${id}`),
  },
  categories: {
    list: buildUrl("categories"),
    detail: (id) => buildUrl(`categories/${id}`),
  },
  employees: {
    list: buildUrl("employees"),
    detail: (id) => buildUrl(`employees/${id}`),
  },
  sales: {
    active: buildUrl("sales/active"),
    detail: (id) => buildUrl(`sales/${id}`),
  },
};