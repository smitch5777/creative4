import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import ForSale from './pages/ForSale';
import Favorites from './pages/Favorites';
import SellDuck from './pages/SellDuck';
import Layout from './pages/Layout';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ForSale" element={<ForSale />} />
          <Route path="Favorites" element={<Favorites />} />
          <Route path="SellDuck" element={<SellDuck />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;