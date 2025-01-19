import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import FaqImage from "../Images/Faq.png";
import "./FAQ.css";

const FAQ = () => {
  return (
    <div>
      <Navbar />
      <div className="faq-container">
        <div className="faq-box">
          <div className="faq-left">
            <h2 className="faq-title">RentRide <br/>FAQs</h2>
            <p className="faq-description">
              Have questions? We’ve got answers.
            </p>
            <img
              src={FaqImage}
              alt="Illustration"
              className="faq-image"
            />
          </div>
          <div className="faq-right">
            <div className="faq-questions">
              <h3>What is a car rental service?</h3>
              <p>
                A car rental service allows you to rent a car for a short period, typically ranging from a few hours to several days, for personal or business use.
              </p>

              <h3>How do I book a car?</h3>
              <p>
                To book a car, simply browse through our available cars, select the one that fits your needs, and click the "Book Now" button. Follow the instructions to confirm your booking.
              </p>

              <h3>What payment methods are accepted?</h3>
              <p>
                We accept credit cards, debit cards, and digital wallets. Payment details can be provided securely during the booking process.
              </p>

              <h3>What documents are required to rent a car?</h3>
              <p>
                You’ll need a valid driver’s license, government-issued ID, and a valid credit or debit card for payment.
              </p>

              <h3>Can I cancel or modify my booking?</h3>
              <p>
                Yes, bookings can be modified or canceled up to 24 hours before the pick-up time. Cancellation fees may apply depending on the time of cancellation.
              </p>

              <h3>What happens if the car breaks down?</h3>
              <p>
                In case of a breakdown, our 24/7 roadside assistance team will assist you. Contact details will be provided in your rental agreement.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
