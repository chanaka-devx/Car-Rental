import React from 'react';
import './Features.css';
import Plan from '../Images/Plan.jpg';
import Different from '../Images/Different.jpeg';
import Protect from '../Images/Protect.jpg';

const Features = () => {
  return (
    <div className="covered-container">
      <h1>Comfortable Journey</h1>
      <p className="covered-description">
        Book, collect and drive. Enjoy your peace of mind while we take care of the rest.
      </p>
      <div className="covered-features">
        {/* Feature 1 */}
        <div className="feature">
          <div className="feature-image">
            <img src={Protect} alt="100% Cover" />
          </div>
          <h3>100% Protected</h3>
          <p>We offer a range of protection options that protects RentRide hirers and hosts.</p>
        </div>
        {/* Feature 2 */}
        <div className="feature">
          <div className="feature-image">
            <img src={Plan} alt="Change of Plan" />
          </div>
          <h3>Change of Plan? Sure!</h3>
          <p>Whether you need to reschedule or cancel a booking, we ensure your booking is as flexible as your plan!</p>
        </div>
        {/* Feature 3 */}
        <div className="feature">
          <div className="feature-image">
            <img src={Different} alt="Impeccable Experience" />
          </div>
          <h3>Different Experience</h3>
          <p>Self-drive or with drivers, you are served an experience that beats driving your own vehicle back home.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
