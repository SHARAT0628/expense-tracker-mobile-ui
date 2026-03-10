import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ShoppingBag, Utensils, Smartphone, Film, Home, Car, GraduationCap, Heart, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { api } from '../../lib/api';

export default function AddTransactionScreen() {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Shopping');
  const [date, setDate] = useState('2026-02-22');
  const [notes, setNotes] = useState('');

  const categories = [
    { name: 'Shopping', icon: ShoppingBag },
    { name: 'Food', icon: Utensils },
    { name: 'Phone', icon: Smartphone },
    { name: 'Entertainment', icon: Film },
    { name: 'Home', icon: Home },
    { name: 'Transport', icon: Car },
    { name: 'Education', icon: GraduationCap },
    { name: 'Health', icon: Heart },
  ];

  const handleSave = async () => {
    try {
      const userId = parseInt(localStorage.getItem('user_id') || '0', 10);
      const fileId = parseInt(localStorage.getItem('file_id') || '0', 10);
      
      await api.addExpense({
        user_id: userId,
        file_id: fileId,
        category_id: 1, // Hack for rapid integration: Using default ID 1
        title: selectedCategory,
        description: notes,
        amount: parseFloat(amount),
        payment_mode: 'Cash',
        expense_date: date
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert("Failed to save transaction");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center">
          <button onClick={() => navigate('/dashboard')} className="mr-3">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Add Transaction</h1>
        </div>
      </div>

      {/* Toggle Tabs */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setTransactionType('expense')}
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
              transactionType === 'expense'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500'
            }`}
          >
            Expense
          </button>
          <button
            onClick={() => setTransactionType('income')}
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
              transactionType === 'income'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500'
            }`}
          >
            Income
          </button>
        </div>
      </div>

      {/* Amount Input */}
      <div className="px-4 pb-6">
        <label className="text-gray-600 text-sm mb-2 block">Amount</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-900">$</span>
          <Input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-12 h-16 text-3xl font-bold rounded-xl border-gray-200"
          />
        </div>
      </div>

      {/* Category Grid */}
      <div className="px-4 pb-6">
        <label className="text-gray-600 text-sm mb-3 block">Category</label>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.name;
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-colors ${
                  isSelected
                    ? 'border-[#009688] bg-teal-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <Icon
                  className={`w-6 h-6 mb-2 ${
                    isSelected ? 'text-[#009688]' : 'text-gray-600'
                  }`}
                />
                <span
                  className={`text-xs ${
                    isSelected ? 'text-[#009688] font-medium' : 'text-gray-600'
                  }`}
                >
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Date Picker */}
      <div className="px-4 pb-6">
        <label className="text-gray-600 text-sm mb-2 block">Date</label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="pl-12 h-14 rounded-xl border-gray-200"
          />
        </div>
      </div>

      {/* Notes Field */}
      <div className="px-4 pb-6">
        <label className="text-gray-600 text-sm mb-2 block">Notes</label>
        <Textarea
          placeholder="Add notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="rounded-xl border-gray-200 min-h-[100px]"
        />
      </div>

      {/* Save Button */}
      <div className="px-4 pb-6">
        <Button
          onClick={handleSave}
          className="w-full h-14 bg-[#009688] hover:bg-[#00796B] text-white rounded-xl font-semibold shadow-sm"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
