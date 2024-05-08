'use client';
// Layout components
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
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
import useAuthStore from 'store/authStore';
export default function Admin({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (isWindowAvailable()) document.documentElement.dir = 'ltr';
  const [loading, setLoading] = useState(true);

  const authStore = useAuthStore();
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      const user = await authStore.getUser();
      setUser(user);
      setLoading(false);
    })();
  }, []);
  if (loading) return <p>Loading</p>;
  if (!user) return <p>Not authorized</p>;
  return (
    user && (
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
                user={user}
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
