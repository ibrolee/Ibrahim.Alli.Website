import conceptCss from "../../mims.css?url";
import { createFileRoute } from '@tanstack/react-router';
import { MimsWebsite } from '@/components/mims/website';
export const Route = createFileRoute('/mims/')({
  head: () => ({
    links:[{ rel: "stylesheet", href: conceptCss }], meta: [{ title: 'MIMS Schools · A foundation for life' }, { name: 'robots', content: 'noindex, nofollow' }] }),
  component: () => <MimsWebsite page="" />,
});
