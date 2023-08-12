import Sidebar from '../components/admin/sidebar';
import { Suspense } from 'react';
import Profile from '../components/admin/profile';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar>
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      </Sidebar>
      <div className='min-h-screen sm:pl-60'>{children}</div>
    </div>
  );
}
