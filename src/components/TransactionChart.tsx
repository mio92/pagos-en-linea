import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/dataProcessing';

interface TransactionChartProps {
  transactions: Transaction[];
}

const TransactionChart: React.FC<TransactionChartProps> = ({ transactions }) => {
  // Agrupar transacciones por fecha para visualización en el gráfico
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
          <p className="tooltip-label">{`Fecha: ${label}`}</p>
          <p className="tooltip-amount">
            {`Monto: ${formatCurrency(payload[0].value)}`}
          </p>
          <p className="tooltip-count">
            {`Transacciones: ${payload[0].payload.count}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="transaction-chart">
      <h3>Resumen de Transacciones</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0066cc" />
                <stop offset="100%" stopColor="#003366" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 51, 102, 0.1)" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis tickFormatter={(value) => `$${value.toLocaleString('es-MX')}`} stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionChart;

