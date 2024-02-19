import React from 'react';
import '../pages/pagesCss/Events.css';

const UpcomingEvents = () => {
  // Sample data for upcoming events
  const upcomingEvents = [
    { name: 'Art Auction', date: 'February 25, 2024', time: '10:00 AM - 2:00 PM', description: 'Join us for our annual art auction featuring works from renowned artists.', type: 'Art' },
    { name: 'Antique Collectibles Sale', date: 'March 10, 2024', time: '9:00 AM - 5:00 PM', description: 'Browse through a wide selection of antique collectibles and find hidden treasures.', type: 'Antiques' },
    { name: 'Real Estate Auction', date: 'March 18, 2024', time: '12:00 PM - 4:00 PM', description: 'Discover your dream home at our real estate auction with properties across the city.', type: 'Real-Estate' },
    { name: 'Real Estate Auction', date: 'March 18, 2024', time: '12:00 PM - 4:00 PM', description: 'Discover your dream home at our real estate auction with properties across the city.', type: 'Real-Estate' },
    { name: 'Real Estate Auction', date: 'March 18, 2024', time: '12:00 PM - 4:00 PM', description: 'Discover your dream home at our real estate auction with properties across the city.', type: 'Real-Estate' },
    { name: 'Real Estate Auction', date: 'March 18, 2024', time: '12:00 PM - 4:00 PM', description: 'Discover your dream home at our real estate auction with properties across the city.', type: 'Real-Estate' },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Upcoming Events</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event, index) => (
            <div key={index} className={`bg-white flex flex-col justify-between rounded-lg shadow-md p-6 ${event.type}`}>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.name}</h3>
                <p className="text-gray-600 mb-2"><strong>Date:</strong> {event.date}</p>
                <p className="text-gray-600 mb-2"><strong>Time:</strong> {event.time}</p>
                <p className="text-gray-600 mb-4">{event.description}</p>
              </div>
              <div>
                <button className="bg-primary text-white px-4 py-2 rounded-md">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
