import CityPage, { cityMetadata } from '@/components/CityPage';

export const metadata = cityMetadata('haines-city');

export default function Page() {
  return <CityPage slug="haines-city" />;
}
