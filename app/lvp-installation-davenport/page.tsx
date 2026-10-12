import CityPage, { cityMetadata } from '@/components/CityPage';

export const metadata = cityMetadata('davenport');

export default function Page() {
  return <CityPage slug="davenport" />;
}
