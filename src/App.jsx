import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layout with Navbar + Footer
import MainLayout from "./components/layouts/MainLayout";

// Pages using MainLayout
import Landing from "./components/Landing";
import Courses from "./components/Courses";
import UserDashboard from "./pages/Users/UserDashboard";
import Payment from "./pages/Users/Payment";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Cart from "./stores/Cart";
import ProceedToCheckout from "./stores/ProceedToCheckout"

// Admin-only page (no layout)
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  return (
    <Router>
      {/* Toast container */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 3000 }}
      />

      <Routes>
        {/* Pages that use Navbar + Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/course" element={<Courses />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<ProceedToCheckout />} />
        </Route>

        {/* Pages that don't use Navbar/Footer */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
