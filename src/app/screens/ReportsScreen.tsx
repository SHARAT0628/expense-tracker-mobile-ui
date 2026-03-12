import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { BottomNavigation } from '../components/BottomNavigation';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { api } from '../../lib/api';

const COLORS = ['#F44336', '#FF9800', '#2196F3', '#4CAF50', '#9C27B0', '#009688', '#FF5722', '#607D8B'];

export default function ReportsScreen() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        const fileId = localStorage.getItem('file_id');
        if (!userId) { navigate('/'); return; }
        if (!fileId || fileId === '0') { setLoading(false); return; }
        const data = await api.getExpenses(userId, fileId);
        setExpenses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  // Filter based on selected time range
  const now = new Date();
  const filtered = expenses.filter((e) => {
    const d = new Date(e.date);
    if (timeRange === 'weekly') {
      const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7);
      return d >= weekAgo;
    } else if (timeRange === 'monthly') {
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    } else {
      return d.getFullYear() === now.getFullYear();
    }
  });

  const totalSpend = filtered.reduce((sum: number, e: any) => sum + e.amount, 0);

  // Group by title (category name)
  const categoryMap: Record<string, number> = {};
  filtered.forEach((e: any) => {
    const key = e.title || 'Other';
    categoryMap[key] = (categoryMap[key] || 0) + e.amount;
  });
  const pieData = Object.entries(categoryMap).map(([name, value], i) => ({
    name, value, color: COLORS[i % COLORS.length]
  }));

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-lg font-semibold text-gray-900 text-center">Reports & Analytics</h1>
      </div>

      {/* Segmented Control */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex bg-gray-100 rounded-xl p-1">
          {(['weekly', 'monthly', 'yearly'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`flex-1 py-2 rounded-lg font-medium text-sm capitalize transition-colors ${
                timeRange === range ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-gray-700 font-semibold text-lg mb-1">No transactions yet</h3>
            <p className="text-gray-400 text-sm">Add some transactions to see your reports here.</p>
          </div>
        ) : (
          <>
            {/* Total Spend */}
            <div className="bg-gradient-to-br from-[#009688] to-[#00796B] rounded-xl p-5 text-white">
              <p className="text-sm opacity-80 mb-1">Total Spend ({timeRange})</p>
              <p className="text-3xl font-bold">₹{totalSpend.toFixed(2)}</p>
              <p className="text-sm opacity-70 mt-1">{filtered.length} transaction{filtered.length !== 1 ? 's' : ''}</p>
            </div>

            {/* Pie Chart */}
            {pieData.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Category Breakdown</h2>
                <div className="flex items-center justify-between">
                  <ResponsiveContainer width="50%" height={150}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value">
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `₹${value.toFixed(2)}`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-2 pl-2">
                    {pieData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-gray-600 flex-1 truncate">{item.name}</span>
                        <span className="text-xs font-semibold">₹{item.value.toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Transaction List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Transactions</h2>
              <div className="divide-y divide-gray-100">
                {filtered.map((e: any, i: number) => (
                  <div key={i} className="flex justify-between items-center py-3">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{e.title}</p>
                      <p className="text-xs text-gray-400">{e.date}</p>
                    </div>
                    <span className="font-semibold text-[#F44336]">-₹{parseFloat(e.amount).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
