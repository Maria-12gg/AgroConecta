import { api } from '../lib/api';
import type {
  ActivityRequest,
  AgriculturalActivity,
  ApiResponse,
  PageResponse,
} from '../types';

export const activityService = {
  async list(cropId?: number, page = 0, size = 50): Promise<PageResponse<AgriculturalActivity>> {
    const { data } = await api.get<ApiResponse<PageResponse<AgriculturalActivity>>>('/activities', {
      params: { page, size, ...(cropId ? { cropId } : {}) },
    });
    return data.data;
  },
  async create(payload: ActivityRequest): Promise<AgriculturalActivity> {
    const { data } = await api.post<ApiResponse<AgriculturalActivity>>('/activities', payload);
    return data.data;
  },
  async update(id: number, payload: ActivityRequest): Promise<AgriculturalActivity> {
    const { data } = await api.put<ApiResponse<AgriculturalActivity>>(`/activities/${id}`, payload);
    return data.data;
  },
  async remove(id: number): Promise<void> {
    await api.delete(`/activities/${id}`);
  },
};
