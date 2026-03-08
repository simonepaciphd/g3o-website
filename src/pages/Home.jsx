import Hero from '../components/home/Hero';
import StatsAndMap from '../components/home/StatsAndMap';
import ProjectOverview from '../components/home/ProjectOverview';
import FeaturedCards from '../components/home/FeaturedCards';
import CallForContributions from '../components/home/CallForContributions';
import NewsStrip from '../components/home/NewsStrip';

function Home() {
  return (
    <>
      <Hero />
      <StatsAndMap />
      <ProjectOverview />
      <FeaturedCards />
      <CallForContributions />
      <NewsStrip />
    </>
  );
}

export default Home;
