import CityPage, { cityMetadata } from '@/components/CityPage';

export const metadata = cityMetadata('lakeland');

export default function Page() {
  return <CityPage slug="lakeland" />;
}
