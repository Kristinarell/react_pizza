import { Route, Routes, useLocation } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import SingleItem from './components/SingleItem';

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes location={previousLocation || location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>

          {previousLocation && (
            <Routes>
              <Route path="/pizza/:id" element={<SingleItem />} />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
