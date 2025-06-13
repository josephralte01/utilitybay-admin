'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingCart, Tags, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/products', label: 'Products', icon: ShoppingCart },
  { href: '/admin/coupons', label: 'Coupons', icon: Tags },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-white dark:bg-gray-900 h-screen w-[260px] border-r dark:border-gray-800 flex flex-col px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-10 text-blue-700 dark:text-blue-400">
        UtilityBay Admin
      </h1>

      <nav className="space-y-2 flex-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition',
              pathname === href
                ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300'
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <button
        className="mt-auto flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
        onClick={() => {
          localStorage.removeItem('admin_token');
          window.location.href = '/admin/login';
        }}
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
