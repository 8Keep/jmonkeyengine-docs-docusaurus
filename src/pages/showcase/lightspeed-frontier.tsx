import ShowcaseDetail from '@site/src/components/showcase/ShowcaseDetail';
import {showcaseBySlug} from '@site/src/data/showcase';

export default function LightspeedFrontierPage(): JSX.Element {
  return <ShowcaseDetail entry={showcaseBySlug['lightspeed-frontier']} />;
}
