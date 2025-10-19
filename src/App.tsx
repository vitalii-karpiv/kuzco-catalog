import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/laptop/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;