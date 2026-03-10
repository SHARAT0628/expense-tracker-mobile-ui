import { useNavigate } from 'react-router';
import { ArrowLeft, User, Hash, Users, HelpCircle, Palette, Settings, ChevronRight } from 'lucide-react';
import { BottomNavigation } from '../components/BottomNavigation';

export default function ProfileScreen() {
  const navigate = useNavigate();

  const profileItems = [
    { icon: Hash, label: 'User ID', value: 'USR-2026-001' },
    { icon: User, label: 'Nickname', value: 'John Doe' },
    { icon: Users, label: 'Gender', value: 'Male' },
  ];

  const menuItems = [
    { icon: HelpCircle, label: 'Help', action: () => {} },
    { icon: Palette, label: 'Customize', action: () => {} },
    { icon: Settings, label: 'Settings', action: () => navigate('/settings') },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center">
          <button onClick={() => navigate('/dashboard')} className="mr-3">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
        </div>
      </div>

      {/* Profile Avatar */}
      <div className="flex flex-col items-center pt-8 pb-6">
        <div className="w-24 h-24 rounded-full bg-[#009688] flex items-center justify-center mb-4">
          <User className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
        <p className="text-gray-500 text-sm">johndoe@example.com</p>
      </div>

      <div className="px-4 space-y-4">
        {/* Profile Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          {profileItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-3 p-4">
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-gray-600 text-sm">{item.label}</span>
                <span className="font-medium text-gray-900">{item.value}</span>
              </div>
            );
          })}
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
              >
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-left font-medium text-gray-900">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
