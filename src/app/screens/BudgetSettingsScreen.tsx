import { useNavigate } from 'react-router';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export default function BudgetSettingsScreen() {
  const navigate = useNavigate();

  const budgetItems = [
    { label: 'Monthly Budget', value: '$8,000' },
    { label: 'Shopping', value: '$2,000' },
    { label: 'Food', value: '$1,500' },
    { label: 'Transport', value: '$1,000' },
    { label: 'Health', value: '$800' },
    { label: 'Education', value: '$1,200' },
    { label: 'Entertainment', value: '$500' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center">
          <button onClick={() => navigate('/budget')} className="mr-3">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Budget Settings</h1>
        </div>
      </div>

      {/* Budget Items List */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          {budgetItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">{item.value}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
