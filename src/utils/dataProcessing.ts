import { User, Transaction, UserWithTransactions, TransactionSummary } from '../types';

export const processUserTransactions = (users: User[], transactions: Transaction[]): UserWithTransactions[] => {
  return users.map(user => {
    const userTransactions = transactions.filter(t => t.user_id === user.id);
    const totalAmount = userTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    return {
      ...user,
      transactions: userTransactions,
      totalAmount,
      transactionCount: userTransactions.length
    };
  }).filter(user => user.transactionCount > 0); // Only show users with transactions
};

export const calculateTransactionSummary = (transactions: Transaction[]): TransactionSummary => {
  const totalTransactions = transactions.length;
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const completedTransactions = transactions.filter(t => t.status === 'completed').length;
  const pendingTransactions = transactions.filter(t => t.status === 'pending').length;
  const averageAmount = totalTransactions > 0 ? totalAmount / totalTransactions : 0;

  return {
    totalTransactions,
    totalAmount,
    completedTransactions,
    pendingTransactions,
    averageAmount
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

