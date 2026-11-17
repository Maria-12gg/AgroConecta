import { api } from '../lib/api';
import type {
  ApiResponse,
  PageResponse,
  ProductionRecord,
  ProductionRequest,
} from '../types';

export const productionService = {
  async list(page = 0, size = 50): Promise<PageResponse<ProductionRecord>> {
    const { data } = await api.get<ApiResponse<PageResponse<ProductionRecord>>>('/production', {
      params: { page, size },
    });
    return data.data;
  },
  async create(payload: ProductionRequest): Promise<ProductionRecord> {
    const { data } = await api.post<ApiResponse<ProductionRecord>>('/production', payload);
    return data.data;
  },
  async update(id: number, payload: ProductionRequest): Promise<ProductionRecord> {
    const { data } = await api.put<ApiResponse<ProductionRecord>>(`/production/${id}`, payload);
    return data.data;
  },
  async remove(id: number): Promise<void> {
    await api.delete(`/production/${id}`);
  },
};
