import { Link, Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Search from './modules/search';

function App() {
  const location = useLocation();

  const back = location.pathname !== '/';

  return (
    <div id="app">
      <header className="app-header">
        <div className="app-header-left">
          {back && (
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="chevron"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </Link>
          )}

          <h1 className="app-title">Serli Wine</h1>
        </div>
        <Search />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
