import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { motion } from 'framer-motion'; // For smooth animations

const BalanceSummary = ({ transactions, currency = 'USD' }) => {
  const summary = useMemo(() => {
    // Default values if no transactions
    const defaultSummary = {
      income: 0,
      expenses: 0,
      balance: 0
    };

    // Return default if no transactions
    if (!transactions || transactions.length === 0) {
      return defaultSummary;
    }

    // Calculate summary from transactions
    return transactions.reduce((acc, transaction) => {
      // Ensure the amount is a valid number
      const amount = parseFloat(transaction.amount);
      if (isNaN(amount)) return acc; // Skip invalid transactions

      // Assuming positive amounts are income, negative are expenses
      if (amount >= 0) {
        acc.income += amount;
      } else {
        acc.expenses += Math.abs(amount);
      }

      acc.balance += amount;
      return acc;
    }, { ...defaultSummary });
  }, [transactions]);

  // Helper to format currency
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  // If no transactions, show a message
  if (!transactions || transactions.length === 0) {
    return <div>No transactions available</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Balance Card */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">Current Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(summary.balance, currency)}
              </span>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Income Card */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ArrowUpCircle className="h-5 w-5 mr-2 text-green-500" />
            <span className="text-2xl font-bold text-green-600">
              {formatCurrency(summary.income, currency)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Expenses Card */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ArrowDownCircle className="h-5 w-5 mr-2 text-red-500" />
            <span className="text-2xl font-bold text-red-600">
              {formatCurrency(summary.expenses, currency)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceSummary;
