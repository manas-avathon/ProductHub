import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";

import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import { useWishlist, WishlistProvider } from "./components/WishlistContext";
import ProductDetail from "./components/ProductDetail/ProductDetail";

function AppLayout() {

  const { wishlistItems } = useWishlist();

  return (
    <Router>
      <div className="min-h-screen bg-gray-200 font-sans">
        <header className="sticky top-0 z-10 bg-white p-4 shadow-md flex flex-row w-full">
          <nav className="container mx-auto flex items-center justify-between pl-[60px] pr-[80px]">
            <div className="font-semibold">
              <NavLink to="/">ProductHub</NavLink>
            </div>
            <ul className="font-semibold flex space-x-8">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "text-blue-500" : "")}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) => (isActive ? "text-blue-500" : "")}
                >
                  Wishlist
                  {wishlistItems.length > 0 && <span className="ml-1 text-xs font-bold align-super">{wishlistItems.length}</span>}
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Products/>} />
            <Route path="/wishlist" element={<Wishlist/>} />
            <Route path="/products/:id" element={<ProductDetail/>} />
          </Routes>
        </main>
        <footer className="bg-white mt-4 p-4 shadow-md">
          <p className="text-center font-semibold">
            &copy; 2025 ProductHub All Right Reserved
          </p>
        </footer>
      </div>
    </Router>
  );
}

function App() {
  return (
    <WishlistProvider>
      <AppLayout />
    </WishlistProvider>
  );
}

export default App;