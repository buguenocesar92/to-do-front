// src/services/CashRegisterService.ts
import axiosInstance from '@/axiosConfig';

/**
 * Consulta el estado actual de la caja.
 */
export async function getCashRegisterStatus(): Promise<{ is_open: boolean }> {
  const response = await axiosInstance.get('/cash-register/status');
  return response.data;
}

/**
 * Abrir caja registradora con el monto inicial.
 */
export async function openCashRegister(payload: { opening_amount: number }): Promise<void> {
  await axiosInstance.post('/cash-register/open', payload);
}

/**
 * Cerrar caja registradora con el monto final.
 */
export async function closeCashRegister(payload: { closing_amount: number }): Promise<void> {
  await axiosInstance.post('/cash-register/close', payload);
}
