import { create } from 'zustand';
import type { Sale, SalesStats } from '@/domain/entities/Sale';

interface SalesState {
  sales: Sale[];
  addSale: (sale: Omit<Sale, 'id' | 'createdAt'>) => void;
  deleteSale: (id: string) => void;
  getSalesStats: () => SalesStats;
  clearSales: () => void;
}

export const useSalesStore = create<SalesState>((set, get) => ({
  sales: [],

  addSale: (sale) => {
    const newSale: Sale = {
      ...sale,
      id: `sale-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    set((state) => ({
      sales: [newSale, ...state.sales]
    }));
  },

  deleteSale: (id: string) => {
    set((state) => ({
      sales: state.sales.filter((sale) => sale.id !== id)
    }));
  },

  getSalesStats: () => {
    const { sales } = get();
    const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);

    return {
      totalSales,
      transactionCount: sales.length
    };
  },
  clearSales: () => {
    set({ sales: [] });
  }
}));

