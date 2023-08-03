import AdminPanelSidebar from '../components/admin/adminPanelSidebar';
import Header from '../components/header';

export default function SetUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='min-h-screen'>
      <Header />
      <div className='flex min-h-full'>
        <AdminPanelSidebar />
        <div className='flex-1 min-h-full bg-gray-50 pt-8'>{children}</div>
      </div>
    </section>
  );
}
