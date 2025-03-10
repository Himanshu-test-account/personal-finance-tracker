import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const ExpensesChart = ({ transactions }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  
  // Extract available years from transactions
  useEffect(() => {
    if (transactions.length > 0) {
      const years = [...new Set(transactions.map(t => 
        new Date(t.date).getFullYear()
      ))].sort((a, b) => b - a); // Sort descending
      
      setAvailableYears(years);
      
      // Set default year to most recent
      if (years.length > 0 && !years.includes(year)) {
        setYear(years[0]);
      }
    }
  }, [transactions]);
  
  // Process data for the chart
  useEffect(() => {
    if (transactions.length === 0) {
      setChartData([]);
      return;
    }
    
    // Initialize data for all months
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const initialData = monthNames.map((name, index) => ({
      name,
      month: index,
      expenses: 0,
      income: 0
    }));
    
    // Filter transactions for selected year and aggregate by month
    transactions
      .filter(t => new Date(t.date).getFullYear() === year)
      .forEach(transaction => {
        const month = new Date(transaction.date).getMonth();
        const amount = parseFloat(transaction.amount);
        
        if (amount < 0) {
          // Negative amount = expense (make positive for display)
          initialData[month].expenses += Math.abs(amount);
        } else {
          // Positive amount = income
          initialData[month].income += amount;
        }
      });
    
    setChartData(initialData);
  }, [transactions, year]);
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <Card className="w-full rounded-lg shadow-lg bg-white p-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-900">Monthly Expenses</CardTitle>
        
        {availableYears.length > 0 && (
          <div className="flex items-center space-x-2">
            <Label htmlFor="year-select" className="text-sm text-gray-700">Year:</Label>
            <Select value={year.toString()} onValueChange={(val) => setYear(parseInt(val))}>
              <SelectTrigger id="year-select" className="w-24 bg-gray-100 text-gray-700 border border-gray-300 rounded-md p-2">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md">
                {availableYears.map(y => (
                  <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="h-80">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), '']}
                  labelFormatter={(label) => `${label} ${year}`}
                />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                <Bar dataKey="income" fill="#22c55e" name="Income" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500">
              No data available for the selected year
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesChart;
