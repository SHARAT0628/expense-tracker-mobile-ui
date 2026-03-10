import { useState } from 'react';
import { BottomNavigation } from '../components/BottomNavigation';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function ReportsScreen() {
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  const lineData = [
    { name: 'Jan', value: 4200 },
    { name: 'Feb', value: 5200 },
    { name: 'Mar', value: 4800 },
    { name: 'Apr', value: 6100 },
    { name: 'May', value: 5500 },
    { name: 'Jun', value: 4900 },
  ];

  const pieData = [
    { name: 'Food', value: 1200, color: '#F44336' },
    { name: 'Shopping', value: 1800, color: '#FF9800' },
    { name: 'Transport', value: 800, color: '#2196F3' },
    { name: 'Health', value: 600, color: '#4CAF50' },
    { name: 'Other', value: 800, color: '#9C27B0' },
  ];

  const monthlyStats = [
    { label: 'Expense', value: '$5,200', color: 'text-[#F44336]' },
    { label: 'Income', value: '$8,500', color: 'text-[#4CAF50]' },
    { label: 'Total Balance', value: '$3,300', color: 'text-[#009688]' },
  ];

  const budgetPercentage = 65;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-lg font-semibold text-gray-900 text-center">Reports & Analytics</h1>
      </div>

      {/* Segmented Control */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setTimeRange('weekly')}
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
              timeRange === 'weekly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeRange('monthly')}
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
              timeRange === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeRange('yearly')}
            className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
              timeRange === 'yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="px-4 space-y-6">
        {/* Line Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Spending Trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#999" style={{ fontSize: '12px' }} />
              <YAxis stroke="#999" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#009688" strokeWidth={2} dot={{ fill: '#009688' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Category Breakdown</h2>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="50%" height={150}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-gray-600">{item.name}</span>
                  <span className="text-xs font-semibold ml-auto">${item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Statistics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Monthly Statistics</h2>
          <div className="space-y-3">
            {monthlyStats.map((stat) => (
              <div key={stat.label} className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">{stat.label}</span>
                <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Budget Overview</h2>
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#f0f0f0"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#009688"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${budgetPercentage * 3.51} 351`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{budgetPercentage}%</span>
              </div>
            </div>
            <div className="w-full space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Budget</span>
                <span className="font-semibold">$8,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Expenses</span>
                <span className="font-semibold text-[#F44336]">$5,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Remaining</span>
                <span className="font-semibold text-[#4CAF50]">$2,800</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
