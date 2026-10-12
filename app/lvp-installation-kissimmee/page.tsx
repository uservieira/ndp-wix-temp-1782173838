import CityPage, { cityMetadata } from '@/components/CityPage';

export const metadata = cityMetadata('kissimmee');

export default function Page() {
  return <CityPage slug="kissimmee" />;
}
