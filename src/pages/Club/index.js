import Banner from "../../components/Banner";
import { motion } from "framer-motion";
import Btn from "../../components/webButton";
import "./index.css"
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <Banner text="Luxury Club" img={require("../../images/image.png")} />
      <section id="club-container">
        <h1>
          Welcome to Meraviglia Luxury Club,</h1> <p>the premier destination for luxury
          travel packages that promise to take you on a journey of a lifetime.
          Our company is dedicated to providing you with the ultimate travel
          experience, tailored to your unique tastes and preferences. At
          Meraviglia Luxury Club, we understand that luxury travel is more than
          just booking a five-star hotel or resort. It's about crafting a
          bespoke itinerary that takes you on a journey of discovery, creating
          unforgettable memories that will last a lifetime. Our team of
          experienced travel advisors is committed to providing you with
          personalized service, ensuring that every aspect of your trip is taken
          care of, from start to finish. Our portfolio of luxury travel packages
          is carefully curated to include some of the most sought-after
          destinations in the world.
        </p>
      <p>Whether you're looking to explore the
          vibrant culture of Europe, soak up the sun on a tropical island, or
          embark on an adventure in the great outdoors, we have the perfect
          package for you. Our packages include luxury accommodation, private
          transportation, exclusive tours, and unique experiences that are
          tailored to your interests.</p>
        <p>At Meraviglia Luxury Club, we understand
          that your time is precious, which is why we take care of all the
          details, so you don't have to. From booking your flights to organizing
          your itinerary, we ensure that every aspect of your trip is taken care
          of, leaving you free to relax and enjoy your journey. Our commitment
          to excellence is reflected in the feedback we receive from our
          clients. We pride ourselves on delivering exceptional service and
          unforgettable experiences that exceed our clients' expectations. In
          summary, Meraviglia Luxury Club offers bespoke luxury travel packages
          that promise to take you on a journey of a lifetime. Our experienced
          travel advisors are dedicated to providing personalized service,
          ensuring that every aspect of your trip is taken care of, from start
          to finish. We invite you to explore our portfolio of luxury travel
          packages and discover the ultimate travel experience.
        </p>

      <Btn>
        <Link to="/login">Join</Link>
      </Btn>      </section>

    </motion.div>
  );
}
