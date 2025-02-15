import React, { useState, useEffect } from 'react';
import NavSpace from '../components/NavSpace';
import item1 from '../pages/images/artBackground.png';
import item2 from '../pages/images/antiquesBackground.png';
import item3 from '../pages/images/realEstateBackground.png';
import item4 from '../pages/images/carsBackground.png';
import item5 from '../pages/images/jewellaryBackground.png';
import { Link } from 'react-router-dom';

const BrowsingPage = () => {
  const sampleItems = [
    {
      _id: "sample_id_1",
      name: "Artwork 1",
      seller: "sample_seller_1",
      description: "Sample description for artwork 1",
      sold: false,
      itemPic: item1,
      buyer: "",
      startingPrice: 200,
      soldPrice: null,
      category: "art",
      eventName: "event123",
      startTime: 1634514000 // Sample start time for event123 (current time in Unix timestamp format)
    },
    {
      _id: "sample_id_2",
      name: "Antique Vase",
      seller: "sample_seller_2",
      description: "Sample description for antique vase",
      sold: true,
      itemPic: item2,
      buyer: "",
      startingPrice: 150,
      soldPrice: null,
      category: "antiques",
      eventName: "event124",
      startTime: 1634517600 // Sample start time for event124 (current time in Unix timestamp format)
    },
    // Add more sample items
  ];

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch items from the server
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/item');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        // Combine fetched items with sample items
        console.log('Fetched items:', data);
        setItems([...sampleItems, ...data]);
        setFilteredItems([...sampleItems, ...data]);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    // Filter and sort items
    let filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || item.category === selectedCategory)
    );

    switch (sortOption) {
      case 'lowToHigh':
        filtered = filtered.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case 'highToLow':
        filtered = filtered.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case 'AtoZ':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory, sortOption, items]);

  const handleViewDetails = (itemId) => {
    const selectedItem = items.find(item => item._id === itemId);
    setSelectedItem(selectedItem);
  };

  const getCurrentTime = () => {
    return Math.floor(Date.now() / 1000); // Current time in Unix timestamp format (seconds)
  };
  const getCurrentTimeInFormat = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    // Pad single-digit hours and minutes with leading zeros
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    // Combine hours and minutes to form the time representation
    return `${formattedHours}${formattedMinutes}`;
  };
  
  

  const calculateTimeStatus = (startTime, sold) => {
    const currentTime = getCurrentTimeInFormat();
    console.log("Current time:", currentTime);

    if (sold) {
      return "Closed";
    } else if (currentTime < startTime) {
      return "About To Commence";
    } else if (currentTime >= startTime && currentTime <= startTime + 10800) {
      return "Online";
    } else {
      return "Closed";
    }
  };

  return (
    <div>
      <NavSpace />
      <div className="container mx-auto mt-8 p-4">
        {/* <Link to="/AddItemForm" className='font-bold text-xl mx-20 border-4 bg-slate-200 p-2 round-xl'>Add Item</Link> */}
        <Link to="/AddItemForm" className=" inline-block bg-primary text-white px-4 py-2 rounded-md h-10 mr-4 mb-2">Add Item</Link>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by item name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mr-2"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="all">All Categories</option>
          <option value="art">Art</option>
          <option value="antiques">Antiques</option>
          <option value="realEstate">Real Estate</option>
          <option value="cars">Cars</option>
          <option value="jewelry">Jewelry</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2"
        >
          <option value="default">Default Sorting</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="AtoZ">A-Z</option>
        </select>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {filteredItems.map(item => (
            <div key={item._id} className="border p-4">
              <img src={item.itemPic} alt={item.name} className="w-full h-auto" />
              <h2 className="text-xl font-bold mt-2">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-600">Seller: {item.seller}</p>
              <p className="text-gray-600">Starting Price: {item.startingPrice}</p>
              <p className="text-gray-600">Item Status: {calculateTimeStatus(item.startTime, item.sold)}</p>
              <Link to="/Chat" className=' inline-block bg-primary text-white px-4 py-2 rounded-md my-2 h-10 mr-4 mb-2'>Chat With Seller</Link>
              {/* <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded" onClick={() => handleViewDetails(item._id)}>View Availability</button>
              {selectedItem && selectedItem._id === item._id && (
                <div className="mt-4">
                  <p className="text-gray-600">Item Status: {selectedItem.sold ? 'Sold' : 'Available'}</p>
                  <p className="text-gray-600">Event Start Time: {selectedItem.startTime}</p>
                  {/* Add more details here */}
                {/* </div> */}
              {/* )}  */}
            </div>
          ))}
        </div>
      </div>
      
</div>

);
};

export default BrowsingPage;

