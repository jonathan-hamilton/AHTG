import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import { Hospital } from '../models/hospital';

function App() {

  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    axios.get<Hospital[]>('https://localhost:7142/api/Hospitals').then(response => {      
      setHospitals(response.data);
    })
  }, []);

  return (
    <div>
      <Header as='h2' icon='hospital' content='Hospitals' />

        <List>
          {hospitals.map(hospital => (
            <List.Item key={hospital.id}>
              {hospital.name}
            </List.Item>
          ))}
        </List>

    </div>
  );
}

export default App;
