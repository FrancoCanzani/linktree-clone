import useFetchLinks from '@/utils/hooks/useFetchLinks';

export default function Links() {
  const { links, repositories, fetchingStatus } = useFetchLinks();

  return <section>Hola</section>;
}
