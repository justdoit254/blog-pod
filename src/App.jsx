import { Outlet } from "react-router";
import Header from "./components/Header";
import NewsletterSubscription from "./components/NewsletterSubscription";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import Credits from "./components/Credits";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <NewsletterSubscription />
      <FaqSection />
      <Footer />
      <Credits />
    </>
  );
}

export default App;
