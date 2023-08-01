import AdminLinks from '@/app/components/admin/projectLinks';
import CreateProjectLinkForm from '@/app/components/admin/createProjectLinkForm';
import CreateRepoLinkForm from '@/app/components/admin/createRepoLinkForm';

export default function Links() {
  return (
    <section className='flex flex-col min-h-full w-full items-center'>
      <CreateProjectLinkForm />
      <AdminLinks />
      <CreateRepoLinkForm />
    </section>
  );
}
