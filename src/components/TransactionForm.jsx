import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const TransactionForm = ({ onSubmit, initialData = null, onCancel = null }) => {
  const [transaction, setTransaction] = useState({
    amount: initialData?.amount || '',
    date: initialData?.date ? new Date(initialData.date) : new Date(),
    description: initialData?.description || '',
  });
  
  const [errors, setErrors] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!transaction.amount) newErrors.amount = 'Amount is required';
    if (isNaN(parseFloat(transaction.amount))) newErrors.amount = 'Amount must be a number';
    if (!transaction.description) newErrors.description = 'Description is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit({
      ...transaction,
      amount: parseFloat(transaction.amount),
    });
    
    // Reset form if not editing
    if (!initialData) {
      setTransaction({
        amount: '',
        date: new Date(),
        description: '',
      });
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-900">{initialData ? 'Edit Transaction' : 'Add New Transaction'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="text"
              placeholder="0.00"
              value={transaction.amount}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.amount && <p className="text-xs text-red-500">{errors.amount}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal py-2 px-4 border",
                    errors.date ? "border-red-500" : "border-gray-300"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {transaction.date ? format(transaction.date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={transaction.date}
                  onSelect={(date) => setTransaction(prev => ({ ...prev, date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="e.g., Groceries"
              value={transaction.description}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between p-6">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} className="py-2 px-4 text-gray-700">
              Cancel
            </Button>
          )}
          <Button type="submit" className="py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 rounded-md">
            {initialData ? 'Update' : 'Add'} Transaction
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TransactionForm;
