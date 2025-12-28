import Navbar from "@/components/Navbar";
import Jumbotron from "./components/Jumbotron";
import Footer from "@/components/Footer";
import BlogHome from "./components/BlogHome";
import HeroBanner from "./components/HeroBanner";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <BlogHome />
      <Footer />
    </div>
  );
};

export default Home;
