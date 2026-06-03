import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnnouncementBar } from "./components/layout/AnnouncementBar";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { CartDrawer } from "./components/cart/CartDrawer";
import { ToastProvider } from "./components/ui/Toast";

import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { SuccessPage } from "./pages/SuccessPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    
    <BrowserRouter>
    
      <ToastProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white">
          <AnnouncementBar />
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/:handle" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}
