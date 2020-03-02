import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Package from './components/Package';

const App = () => {
  const [packages, setPackages] = useState([]);
  const [len, setLength] = useState(0);
  useEffect(() => {
    axios
      .get('/allPackages')
      .then(response => response.data)
      .then(res => res.allPackages)
      .then(pack => {
        const allPackages = Object.values(pack[0]);
        const allPackagesCount = allPackages.length;
        setPackages(allPackages);
        setLength(allPackagesCount);
      })
      .catch(err => err);
  }, []);
  console.log('AllPackages names: ', packages);

  //Sort package names
    /* --- Ascending order sorting --- */
    const sortAZ = () => {
      const ascCompare = (first, second) => {
        const a = first.name;
        const b = second.name;

        if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        } else {
          return 0;
        }
      };
      setPackages(prevState => [...prevState].sort(ascCompare));
    };

    /* --- Descending order sorting --- */
    const sortZA = () => {
      const dscCompare = (first, second) => {
        const a = first.name;
        const b = second.name;

        if (a < b) {
          return 1;
        } else if (a > b) {
          return -1;
        } else {
          return 0;
        }
      };
      setPackages(prevState => [...prevState].sort(dscCompare));

    };

  return (
    <div className='App'>
      <h1>All {len === 0 ? '...' : len} packages</h1>
      <button className="App-sortAZ" onClick={sortAZ}>Sort A-Z</button>
      <button className="App-sortZA"onClick={sortZA}>Sort Z-A</button>
      {packages.map((p, i) => (
        <Package key={i} p={p} name={p.name} />
      ))}
    </div>
  );
};

export default App;
