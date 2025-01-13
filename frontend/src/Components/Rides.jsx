import React, { useRef } from 'react';
import './Rides.css';

const Rides = () => {
  const scrollContainer = useRef(null);

  const scrollLeft = () => {
    scrollContainer.current.scrollBy({
      left: -300, // Adjust scroll distance as needed
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollContainer.current.scrollBy({
      left: 300, // Adjust scroll distance as needed
      behavior: 'smooth',
    });
  };

  const cars = [
    {
      id: 1,
      name: "TATA Nano",
      price: "Rs. 4,500.00 / Day",
      km: "100 KM / Day",
      location: "Nugegoda",
      rating: 0,
      reviews: 0,
      image: "tata-nano.jpg",
    },
    {
      id: 2,
      name: "Suzuki Alto",
      price: "Rs. 6,500.00 / Day",
      km: "100 KM / Day",
      location: "Nugegoda",
      rating: 0,
      reviews: 0,
      image: "suzuki-alto1.jpg",
    },
    {
      id: 3,
      name: "Suzuki Alto",
      price: "Rs. 6,500.00 / Day",
      km: "100 KM / Day",
      location: "Nugegoda",
      rating: 0,
      reviews: 0,
      image: "suzuki-alto2.jpg",
    },
    {
      id: 4,
      name: "Suzuki Alto",
      price: "Rs. 7,000.00 / Day",
      km: "100 KM / Day",
      location: "Mulleriya",
      rating: 5,
      reviews: 1,
      image: "suzuki-alto3.jpg",
    },
    {
        id: 1,
        name: "TATA Nano",
        price: "Rs. 4,500.00 / Day",
        km: "100 KM / Day",
        location: "Nugegoda",
        rating: 0,
        reviews: 0,
        image: "tata-nano.jpg",
      },
      {
        id: 2,
        name: "Suzuki Alto",
        price: "Rs. 6,500.00 / Day",
        km: "100 KM / Day",
        location: "Nugegoda",
        rating: 0,
        reviews: 0,
        image: "suzuki-alto1.jpg",
      },
      {
        id: 3,
        name: "Suzuki Alto",
        price: "Rs. 6,500.00 / Day",
        km: "100 KM / Day",
        location: "Nugegoda",
        rating: 0,
        reviews: 0,
        image: "suzuki-alto2.jpg",
      },
      {
        id: 4,
        name: "Suzuki Alto",
        price: "Rs. 7,000.00 / Day",
        km: "100 KM / Day",
        location: "Mulleriya",
        rating: 5,
        reviews: 1,
        image: "suzuki-alto3.jpg",
      },
    // Add more car objects for a total of 10
  ];

  return (
    <div className="rides-container">
      <h1>Find your next ride</h1>
        <div className="scroll-buttons">
            <button className="arrow-button" onClick={scrollLeft}>
            &#8249;
            </button>
            <div className="rides-scroll" ref={scrollContainer}>
            {cars.map((car) => (
                <div className="card" key={car.id}>
                <div className="card-image">
                    <img src={car.image} alt={car.name} />
                    <div className="price-tag">{car.price}</div>
                </div>
                <div className="card-content">
                    <h3>{car.name}</h3>
                    <p>
                    {car.location}
                    </p>
                    <p className="km">{car.km}</p>
                    <div className="ratings">
                    {Array(car.rating)
                        .fill()
                        .map((_, index) => (
                        <span key={index} className="star filled">★</span>
                        ))}
                    {Array(5 - car.rating)
                        .fill()
                        .map((_, index) => (
                        <span key={index} className="star">☆</span>
                        ))}
                    <span className="reviews">({car.reviews})</span>
                    </div>
                    <button className="book-now">Book Now</button>
                </div>
                </div>
            ))}
            </div>
            <button className="arrow-button" onClick={scrollRight}>
            &#8250;
            </button>
        </div>
    </div>
  );
};

export default Rides;
