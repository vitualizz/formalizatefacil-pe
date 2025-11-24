export interface Sale {
  id: string;
  date: string;
  description: string;
  amount: number;
  createdAt: string;
}

export interface SalesStats {
  totalSales: number;
  transactionCount: number;
}
