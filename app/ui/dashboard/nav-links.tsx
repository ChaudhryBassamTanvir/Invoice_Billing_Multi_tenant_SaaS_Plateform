"use client"

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserIcon,
  
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import darkTheme from '@/app/lib/dark-theme';
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'My Account', href: '/dashboard/user-profile', icon: UserIcon }
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link:any) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              `flex h-[48px] grow items-center justify-center gap-2 rounded-md 
                bg-gray-50 p-3 text-sm font-medium hover:bg-violet-600 hover:text-white 
                md:flex-none md:justify-start md:p-2 md:px-3
                ${pathname !== link.href && `${darkTheme.container} ${darkTheme.title} ${darkTheme.hoverBg}`}
                ${pathname === link.href && `${darkTheme.activeLink}`}
                `,
              {
                'bg-violet-200 text-violet-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
