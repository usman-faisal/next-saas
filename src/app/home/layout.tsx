'use client';
// Layout components
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import routes from 'routes';
import {
  getActiveNavbar,
  getActiveRoute,
  isWindowAvailable,
} from 'utils/navigation';
import React from 'react';
import { Portal } from '@chakra-ui/portal';
import Navbar from 'components/navbar';
import Sidebar from 'components/sidebar';
import Footer from 'components/footer/Footer';
import { getUser } from 'utils/auth';
export default function Admin({ children }: { children: React.ReactNode }) {
  // states and functions
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  if (isWindowAvailable()) document.documentElement.dir = 'ltr';

  const currentUser = getUser();
  if (!currentUser) {
    router.push('/auth/sign-in');
  }

  return (
    currentUser && (
      <div className="flex h-full w-full bg-background-100 dark:bg-background-900">
        <Sidebar
          routes={routes}
          open={open}
          setOpen={setOpen}
          variant="admin"
        />
        {/* Navbar & Main Content */}
        <div className="h-full w-full font-dm dark:bg-navy-900">
          {/* Main Content */}
          <main
            className={`mx-2.5  flex-none transition-all dark:bg-navy-900 
              md:pr-2 xl:ml-[323px]`}
          >
            {/* Routes */}
            <div>
              <Navbar
                onOpenSidenav={() => setOpen(!open)}
                brandText={getActiveRoute(routes, pathname)}
                secondary={getActiveNavbar(routes, pathname)}
                user={currentUser}
              />
              <div
                className={`mx-auto p-2 !pt-[10px] md:p-2 ${
                  pathname !== '/home/chat' && 'min-h-screen'
                }`}
              >
                {children}
              </div>
              {pathname !== '/home/chat' && (
                <div className="p-3">
                  <Footer />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    )
  );
}
