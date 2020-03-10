import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Package from './components/Package';
import Description from './components/Description';

const App = () => {
  const [packages, setPackages] = useState([]);
  const [description, setDescription] = useState('');
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

  const sortAZ = () => {
    setPackages(prevState => [...prevState].sort((a, b)=> ascCompare(a, b)));
  };

  /* --- Descending order sorting --- */
  const sortZA = () => {
    setPackages(prevState => [...prevState].sort((a, b)=>ascCompare(b, a)));
  };

  const displayDescription = description => {
    console.log(description);
    setDescription(description);
  };

  return (
    <div className='App'>
      <h1>All {len === 0 ? '...' : len} packages</h1>
      <button className='App-sortAZ' onClick={sortAZ}>
        Sort A-Z
      </button>
      <button className='App-sortZA' onClick={sortZA}>
        Sort Z-A
      </button>
      <Description description={description} />
      {packages.map((p, i) => (
        <Package
          key={i}
          p={p}
          name={p.name}
          onClick={() => displayDescription(p.allInfo['Description:'])}
        />
      ))}
    </div>
  );
};

export default App;
