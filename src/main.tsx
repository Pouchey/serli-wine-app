import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './global.css';

import App from './App';
import Resolver from './modules/resolver';
import Results from './modules/results';

// setting axios
import axios from 'axios';
import Wine from './modules/wine';

if(import.meta.env.MODE === 'prod') 
  axios.defaults.baseURL = 'https://serli-wine-api.cleverapps.io/';
else
  axios.defaults.baseURL = 'http://localhost:8080/';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Resolver />,
      },
      {
        path: 'results',
        element: <Results />,
      },
      {
        path: 'wine/:id',
        element: <Wine />,
      },
      {
        path: '*',
        element: <div>404</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
