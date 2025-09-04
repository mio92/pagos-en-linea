import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/dataProcessing';

interface TransactionChartProps {
  transactions: Transaction[];
}

const TransactionChart: React.FC<TransactionChartProps> = ({ transactions }) => {
  // Group transactions by date for chart visualization
  const chartData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.created_at).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    
    if (existing) {
      existing.amount += transaction.amount;
      existing.count += 1;
    } else {
      acc.push({
        date,
        amount: transaction.amount,
        count: 1
      });
    }
    
    return acc;
  }, [] as Array<{ date: string; amount: number; count: number }>);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{`Date: ${label}`}</p>
          <p className="tooltip-amount">
            {`Amount: ${formatCurrency(payload[0].value)}`}
          </p>
          <p className="tooltip-count">
            {`Transactions: ${payload[0].payload.count}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="transaction-chart">
      <h3>Transaction Overview</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionChart;

