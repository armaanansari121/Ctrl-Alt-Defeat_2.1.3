import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';

  
const EventPage = () => {

  const { eventId } = useParams();

  // Sample event details
 
  const [eventDetails, setEventDetails] = useState({})
  // Sample data for items being sold at the event
  const [eventItems,setEventItems] = useState([]);
  // const  GetRequest = async () => {
  //   const response = await fetch("http://localhost:3000/event",{
  //     method:'GET',
  //     headers:{
  //       'Content-Type':'application/json'
  //     } 
  //   })
  //   const data = await response.json();
  //   setEvents([...events, ...data]);
  // }
  //   useEffect(() => {
  //     GetRequest();
  //   },[])

const GetEventDetails = async () => {
  const response = await fetch(`http://localhost:3000/event/get/${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    setEventDetails(data);
}
   
  const GetItems = async () => {
    const response = await fetch(`http://localhost:3000/item/event/${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    setEventItems(data);
  }
  // console.log(eventItems);
  
  useEffect(() => {
    GetItems();
    GetEventDetails();
  }, [])
 
 
  // Function to render the table rows for event items
  const renderEventItems = () => {
    return eventItems.map(item => (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td><img src={item.imagePic} alt={item.name} /></td>
        <td>{item.startingPrice}</td>
        <td>{item.description}</td>
        <td>{item.seller}</td>
      </tr>
    ));
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Event Details */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">{eventDetails.name}</h2>
          <p className="text-gray-600 mt-2">{eventDetails.date} | {eventDetails.time}</p>
          <p className="text-gray-700 mt-4">{eventDetails.description}</p>
          {/* Add rating rendering if needed */}
        </div>

        {/* Event Items */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Items for Auction</h3>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Item Name</th>
                <th className="px-4 py-2">Item Pic</th>
                <th className="px-4 py-2">Item Min Bid Price</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Seller</th>
              </tr>
            </thead>
            <tbody>
              {renderEventItems()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
