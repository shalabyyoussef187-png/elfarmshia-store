import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { LanguageProvider } from "./context/LanguageContext";
import ScrollToTop from "./components/common/ScrollToTop";
import PageTransition from "./components/common/PageTransition";
import Preloader from "./components/common/Preloader";
import Navbar from "./components/layout/Navbar";
import Wishlist from "./pages/Wishlist";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Browse from "./pages/Browse";
import FreeShippingBar from "./components/common/FreeShippingBar";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Offers from "./pages/Offers";
import Pharmacies from "./pages/Pharmacies";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WhatsAppButton from "./components/common/WhatsAppButton";

function AppContent() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!isAuthPage && <FreeShippingBar />}
      {!isAuthPage && <Navbar />}
      <main className={`flex-1 ${isAuthPage ? "pt-24" : "pt-32"}`}>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/category/:slug" element={<Products />} />
            <Route path="/browse/*" element={<Browse />} />
            <Route path="/health-need/:slug" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/pharmacies" element={<Pharmacies />} />

            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Company Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />

            {/* Help Pages */}
            <Route path="/faq" element={<FAQ />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </PageTransition>
      </main>
      {!isAuthPage && <Footer />}
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <LanguageProvider>
          <Preloader>
            <Router>
              <ScrollToTop />
              <AppContent />
            </Router>
          </Preloader>
        </LanguageProvider>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
