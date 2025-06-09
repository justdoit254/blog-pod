import { Outlet } from "react-router";
import Header from "./components/Header";
import NewsletterSubscription from "./components/NewsletterSubscription";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import Credits from "./components/Credits";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <Header />
      <Outlet />
      {isLoggedIn && <NewsletterSubscription />}
      <FaqSection />
      <Footer />
      <Credits />
    </>
  );
}

export default App;
