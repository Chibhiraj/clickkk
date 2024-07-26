import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://clickhouse-hzph.onrender.com/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { id, name };
    setData((prevData) => [...prevData, newEntry]);

  
    axios
      .post('https://clickhouse-hzph.onrender.com/insert', newEntry)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });

    setId('');
    setName('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button type="submit">Post Data</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
