import ShowcaseDetail from '@site/src/components/showcase/ShowcaseDetail';
import {showcaseBySlug} from '@site/src/data/showcase';

export default function CollectThe10sPage(): JSX.Element {
  return <ShowcaseDetail entry={showcaseBySlug['collect-the-10s']} />;
}
