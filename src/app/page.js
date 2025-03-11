// app/page.js
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X, AlertCircle } from 'lucide-react';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import BalanceSummary from '@/components/BalanceSummary';
import ExpensesChart from '@/components/ExpensesChart';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [activeTab, setActiveTab] = useState('transactions');

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/transactions');
        
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (transaction) => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }
      
      const newTransaction = await response.json();
      setTransactions([...transactions, newTransaction]);
      setFormOpen(false);
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError(err.message);
    }
  };

  const handleUpdateTransaction = async (transaction) => {
    try {
      const response = await fetch(`/api/transactions/${editingTransaction._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }
      
      const updatedTransaction = await response.json();
      setTransactions(transactions.map(t => 
        t._id === updatedTransaction._id ? updatedTransaction : t
      ));
      
      setEditingTransaction(null);
      setFormOpen(false);
    } catch (err) {
      console.error('Error updating transaction:', err);
      setError(err.message);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }
      
      setTransactions(transactions.filter(t => t._id !== id));
    } catch (err) {
      console.error('Error deleting transaction:', err);
      setError(err.message);
    }
  };

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setFormOpen(true);
  };

  const handleFormSubmit = (transaction) => {
    if (editingTransaction) {
      handleUpdateTransaction(transaction);
    } else {
      handleAddTransaction(transaction);
    }
  };

  // Dismiss error message
  const dismissError = () => {
    setError(null);
  };

  return (
    <main className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Personal Finance Tracker</h1>
          <Button onClick={() => {
            setEditingTransaction(null);
            setFormOpen(true);
          }}>
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
              <span>{error}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={dismissError}
              className="h-8 px-2 text-xs text-red-600 hover:bg-red-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Balance Summary Section */}
        {!loading && <BalanceSummary transactions={transactions} />}

        {/* Main Content */}
        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="charts">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transactions" className="p-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p>Loading transactions...</p>
                  </div>
                ) : (
                  <TransactionList 
                    transactions={transactions} 
                    onEdit={handleEditClick} 
                    onDelete={handleDeleteTransaction} 
                  />
                )}
              </TabsContent>
              
              <TabsContent value="charts" className="p-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p>Loading data...</p>
                  </div>
                ) : (
                  <ExpensesChart transactions={transactions} />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Form Dialog */}
      <Dialog open={formOpen} onOpenChange={(open) => {
        if (!open) {
          setEditingTransaction(null);
        }
        setFormOpen(open);
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
            </DialogTitle>
          </DialogHeader>
          <TransactionForm 
            onSubmit={handleFormSubmit}
            initialData={editingTransaction}
            onCancel={() => {
              setFormOpen(false);
              setEditingTransaction(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </main>
  );
}