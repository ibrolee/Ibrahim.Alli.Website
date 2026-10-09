import { createFileRoute } from '@tanstack/react-router';
import { MimsWebsite } from '@/components/mims/website';
export const Route = createFileRoute('/mims/$')({
  head: () => ({ meta: [{ title: 'Explore MIMS Schools · Design preview' }, { name: 'robots', content: 'noindex, nofollow' }] }),
  component: MimsPage,
});
function MimsPage() { const { _splat } = Route.useParams(); return <MimsWebsite page={_splat || ''} />; }
