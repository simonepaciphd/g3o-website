import Hero from '../components/home/Hero';
import StatCounters from '../components/home/StatCounters';
import GlobalMap from '../components/home/GlobalMap';
import ProjectOverview from '../components/home/ProjectOverview';
import FeaturedCards from '../components/home/FeaturedCards';
import CallForContributions from '../components/home/CallForContributions';
import NewsStrip from '../components/home/NewsStrip';

function Home() {
  return (
    <>
      <Hero />
      <StatCounters />
      <GlobalMap />
      <ProjectOverview />
      <FeaturedCards />
      <CallForContributions />
      <NewsStrip />
    </>
  );
}

export default Home;
