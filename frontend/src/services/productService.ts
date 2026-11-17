import { api } from '../lib/api';
import type {
  ApiResponse,
  PageResponse,
  Product,
  ProductCategory,
  ProductRequest,
} from '../types';

export interface CatalogQuery {
  search?: string;
  category?: ProductCategory | '';
  page?: number;
  size?: number;
}

export const productService = {
  async catalog(query: CatalogQuery = {}): Promise<PageResponse<Product>> {
    const { data } = await api.get<ApiResponse<PageResponse<Product>>>('/products', {
      params: {
        page: query.page ?? 0,
        size: query.size ?? 12,
        ...(query.search ? { search: query.search } : {}),
        ...(query.category ? { category: query.category } : {}),
      },
    });
    return data.data;
  },
  async get(id: number): Promise<Product> {
    const { data } = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return data.data;
  },
  async listMine(page = 0, size = 50): Promise<PageResponse<Product>> {
    const { data } = await api.get<ApiResponse<PageResponse<Product>>>('/products/mine', {
      params: { page, size },
    });
    return data.data;
  },
  async create(payload: ProductRequest): Promise<Product> {
    const { data } = await api.post<ApiResponse<Product>>('/products', payload);
    return data.data;
  },
  async update(id: number, payload: ProductRequest): Promise<Product> {
    const { data } = await api.put<ApiResponse<Product>>(`/products/${id}`, payload);
    return data.data;
  },
  async changeStatus(id: number, active: boolean): Promise<Product> {
    const { data } = await api.patch<ApiResponse<Product>>(`/products/${id}/status`, { active });
    return data.data;
  },
  async remove(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};
