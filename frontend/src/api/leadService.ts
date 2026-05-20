import api from './axios';
import type { GetLeadsResponse, ILead, GetLeadStatsResponse } from '../types';

export interface FetchLeadsParams {
  page?: number;
  limit?: number;
  status?: string;
  source?: string;
  search?: string;
  sort?: 'latest' | 'oldest';
}

export const leadService = {
  fetchLeads: async (params: FetchLeadsParams): Promise<GetLeadsResponse> => {
    const response = await api.get<GetLeadsResponse>('/api/leads', { params });
    return response.data;
  },

  fetchLeadStats: async (): Promise<GetLeadStatsResponse> => {
    const response = await api.get<GetLeadStatsResponse>('/api/leads/stats');
    return response.data;
  },

  createLead: async (data: Partial<ILead>): Promise<{ data: { lead: ILead } }> => {
    const response = await api.post('/api/leads', data);
    return response.data;
  },

  updateLead: async (id: string, data: Partial<ILead>): Promise<{ data: { lead: ILead } }> => {
    const response = await api.patch(`/api/leads/${id}`, data);
    return response.data;
  },

  deleteLead: async (id: string): Promise<void> => {
    await api.delete(`/api/leads/${id}`);
  },

  exportLeadsCSV: async (params: FetchLeadsParams): Promise<void> => {
    // Generate a temporary anchor to trigger browser download of the CSV stream
    const response = await api.get('/api/leads/export', { 
      params,
      responseType: 'blob' // Tell Axios to parse the response as a file blob
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }
};
