export interface User {
  id: number;
  email: string;
  name: string;
  created_at?: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

export interface UserWithTransactions extends User {
  transactions: Transaction[];
  totalAmount: number;
  transactionCount: number;
}

export interface TransactionSummary {
  totalTransactions: number;
  totalAmount: number;
  completedTransactions: number;
  pendingTransactions: number;
  averageAmount: number;
}

