import ShowcaseDetail from '@site/src/components/showcase/ShowcaseDetail';
import {showcaseBySlug} from '@site/src/data/showcase';

export default function DepthrisPage(): JSX.Element {
  return <ShowcaseDetail entry={showcaseBySlug.depthris} />;
}
