import { Outlet, ScrollRestoration, useLocation } from "react-router";
import Header from "./components/Header";
import NewsletterSubscription from "./components/NewsletterSubscription";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import Credits from "./components/Credits";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  const isAddBlogPage = location?.pathname === "/add-blog";

  return (
    <>
      <ScrollRestoration />
      <Header />
      <Outlet />
      {isLoggedIn && !isAddBlogPage && <NewsletterSubscription />}
      <FaqSection />
      {isAddBlogPage && <NewsletterSubscription />}
      <Footer />
      <Credits />
    </>
  );
}

export default App;
