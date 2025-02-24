// src/services/TenantService.ts

import axios from '@/axiosConfig'
import type { RegisterTenantPayload } from '@/types/TenantTypes'

export const registerTenant = async (
  payload: RegisterTenantPayload,
): Promise<{ frontend_url: string }> => {
  const response = await axios.post('/tenants/register', payload)
  return response.data
}
