import { useState } from 'react';
import { LayoutDashboard, TrendingUp, LogOut, Menu, X } from 'lucide-react';
import { Pages } from '@/domain/entities/Pages';

interface NavigationProps {
  currentPage: Pages;
  onPageChange: (page: Pages) => void;
  onLogout: () => void;
}

export const Navigation = ({
  currentPage,
  onPageChange,
  onLogout,
}: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: Pages.Dashboard, label: 'Dashboard', icon: LayoutDashboard },
    { id: Pages.Sales, label: 'Libro de Ventas', icon: TrendingUp }
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-2 rounded-lg"> */}
              {/* <Store className="w-6 h-6 text-white" /> */}
            {/* </div> */}
            <img src="https://www.elanet-se.org/wp-content/uploads/2020/11/logo-U-Continental.png" alt="logo" className="h-10" />
            {/* <h2 className="text-xl font-bold text-gray-900 hidden sm:block"> */}
              {/* FormalízaTe */}
            {/* </h2> */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={onLogout}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium"
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5" />
              Salir
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-200 animate-slideDown">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}

            <button
              onClick={() => {
                onLogout();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium"
            >
              <LogOut className="w-5 h-5" />
              Salir
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

