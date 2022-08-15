import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7142/api/Hospitals').then(response => {      
      setHospitals(response.data);
      console.log(response.data);
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {hospitals.map((hospital: any) => (
            <li key={hospital.id}>
              {hospital.name}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
