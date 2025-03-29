
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { 
  Menu, 
  X, 
  Search, 
  Home, 
  Building2, 
  Calculator, 
  MessagesSquare, 
  User,
  LogIn
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Properties', path: '/properties', icon: <Building2 size={18} /> },
    { name: 'Calculator', path: '/calculator', icon: <Calculator size={18} /> },
    { name: 'Chat', path: '/chat', icon: <MessagesSquare size={18} /> },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-teal-700 dark:text-teal-400 font-heading font-bold text-xl">
                DwellDynamo
              </span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 text-sm font-medium flex items-center space-x-1"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            {isLoggedIn ? (
              <Link to="/dashboard">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User size={18} />
                  <span>Dashboard</span>
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="default" className="flex items-center space-x-2">
                  <LogIn size={18} />
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <span className="sr-only">Open menu</span>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-teal-700 dark:text-teal-400 font-heading font-bold text-xl">
                    DwellDynamo
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    {isLoggedIn ? (
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 text-base font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <User size={18} />
                        <span>Dashboard</span>
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 text-base font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <LogIn size={18} />
                        <span>Login</span>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
