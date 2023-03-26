import CarouselSilder from '../../components/Carousel';
import OrgChart from '../../components/OrgChart';
import DefaultLayout from '../../layout/DefaultLayout';

function Home() {
  return (
    <DefaultLayout>
      <CarouselSilder />
      <h1>Organizational Chart</h1>
      <OrgChart />
    </DefaultLayout>
  );
}

export default Home;
