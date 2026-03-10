import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Moon, Lock, Info, MessageSquare, Key, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function SettingsScreen() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const settingsItems = [
    { icon: Lock, label: 'Privacy & Security', action: () => {} },
    { icon: Info, label: 'About Us', action: () => {} },
    { icon: MessageSquare, label: 'Feedback', action: () => {} },
    { icon: Key, label: 'Change Password', action: () => {} },
  ];

  const handleLogout = () => {
    // Handle logout logic
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center">
          <button onClick={() => navigate('/profile')} className="mr-3">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Theme Toggle */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Theme</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Light</span>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isDarkMode ? 'bg-[#009688]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-600">Dark</span>
            </div>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          {settingsItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
              >
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-left font-medium text-gray-900">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          className="w-full h-14 bg-white hover:bg-red-50 text-[#F44336] border border-gray-200 rounded-xl font-semibold"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
