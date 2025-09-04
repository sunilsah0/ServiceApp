import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [bookings, setBookings] = useState([]);

  const handleBooking = (e) => {
    e.preventDefault();
    if (name && service) {
      const newBooking = { name, service };
      setBookings([...bookings, newBooking]);
      setName('');
      setService('');
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Service Booking App</h1>
      <form onSubmit={handleBooking}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br /><br />
        <input
          type="text"
          placeholder="Service (e.g., Cleaning)"
          value={service}
          onChange={(e) => setService(e.target.value)}
        /><br /><br />
        <button type="submit">Book Service</button>
      </form>

      <h2>Bookings</h2>
      <ul>
        {bookings.map((b, index) => (
          <li key={index}>{b.name} booked {b.service}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
