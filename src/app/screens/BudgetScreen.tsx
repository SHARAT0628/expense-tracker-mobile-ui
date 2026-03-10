import { ChevronDown, Edit } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BottomNavigation } from '../components/BottomNavigation';
import { Button } from '../components/ui/button';

export default function BudgetScreen() {
  const navigate = useNavigate();

  const monthlyBudget = {
    total: 8000,
    expenses: 5200,
    remaining: 2800,
  };

  const categoryBudgets = [
    { category: 'Shopping', budget: 2000, expenses: 1800, color: '#FF9800' },
    { category: 'Food', budget: 1500, expenses: 1200, color: '#F44336' },
    { category: 'Transport', budget: 1000, expenses: 800, color: '#2196F3' },
  ];

  const getProgressPercentage = (expenses: number, budget: number) => {
    return Math.min((expenses / budget) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-1 text-gray-700 font-medium">
            February 2026
            <ChevronDown className="w-4 h-4" />
          </button>
          <button onClick={() => navigate('/budget-settings')}>
            <Edit className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Monthly Budget Card */}
        <div className="bg-gradient-to-br from-[#009688] to-[#00796B] rounded-xl shadow-md p-6 text-white">
          <h2 className="text-sm font-medium opacity-90 mb-2">Monthly Budget</h2>
          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs opacity-75">Remaining</span>
              <span className="text-2xl font-bold">${monthlyBudget.remaining.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs opacity-75">
              <span>Budget: ${monthlyBudget.total.toLocaleString()}</span>
              <span>Expenses: ${monthlyBudget.expenses.toLocaleString()}</span>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${getProgressPercentage(monthlyBudget.expenses, monthlyBudget.total)}%` }}
            />
          </div>
        </div>

        {/* Category Budgets */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-gray-900">Category Budgets</h3>
          {categoryBudgets.map((item) => {
            const percentage = getProgressPercentage(item.expenses, item.budget);
            const remaining = item.budget - item.expenses;
            return (
              <div key={item.category} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{item.category}</h4>
                  <span className="text-xs text-gray-500">
                    ${item.expenses} / ${item.budget}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Remaining</span>
                    <span className="font-semibold" style={{ color: item.color }}>
                      ${remaining}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${percentage}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Budget: ${item.budget}</span>
                  <span>Expenses: ${item.expenses}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Budget Settings Button */}
        <Button
          onClick={() => navigate('/budget-settings')}
          className="w-full h-14 bg-white hover:bg-gray-50 text-[#009688] border-2 border-[#009688] rounded-xl font-semibold"
        >
          + Budget Settings
        </Button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
