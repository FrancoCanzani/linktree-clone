import AdminPanelSidebar from '../components/admin/adminPanelSidebar';
import Header from '../components/header';

export default function SetUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='h-screen'>
      <Header />
      <div className='flex'>
        <AdminPanelSidebar />
        <div className='flex-1 bg-gray-50 pt-8'>{children}</div>
      </div>
    </main>
  );
}
