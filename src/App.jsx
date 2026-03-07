import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const About = lazy(() => import('./pages/About'));
const Team = lazy(() => import('./pages/Team'));
const Funding = lazy(() => import('./pages/Funding'));
const Research = lazy(() => import('./pages/Research'));
const Policy = lazy(() => import('./pages/Policy'));
const DataAccess = lazy(() => import('./pages/DataAccess'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter basename="/g3o-website/">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-primary-600 text-lg font-medium">Loading...</div>
          </div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="about" element={<About />} />
            <Route path="team" element={<Team />} />
            <Route path="funding" element={<Funding />} />
            <Route path="research" element={<Research />} />
            <Route path="policy" element={<Policy />} />
            <Route path="data-access" element={<DataAccess />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
