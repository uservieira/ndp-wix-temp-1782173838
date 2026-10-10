import CityPage, { cityMetadata } from '@/components/CityPage';

export const metadata = cityMetadata('clermont');

export default function Page() {
  return <CityPage slug="clermont" />;
}
