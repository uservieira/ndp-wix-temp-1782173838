import CityPage, { cityMetadata } from '@/components/CityPage';

export const metadata = cityMetadata('winter-haven');

export default function Page() {
  return <CityPage slug="winter-haven" />;
}
