import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import Layout from './components/Layout';
import ShowDetailsPage from './components/show/ShowDetailsPage';
import ShowListPage from './components/show/ShowListPage';
import reportWebVitals from './reportWebVitals';
import ScrollToTop from './ScrollToTop';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ShowListPage />} />
            <Route path="/:id" element={<ShowDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
