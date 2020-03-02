import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "axios";
import Package from './components/Package';

const App = () => {
  const [packages, setPackages] = useState([])
  const [len, setLength] = useState(0)
  useEffect(()=>{

    axios.get('/allPackages')
      .then(response => response.data)
      .then(res => res.allPackages)
      .then(pack => {
        const allPackages = Object.values(pack[0])
        const allPackagesCount = allPackages.length
        setPackages(allPackages)
        setLength(allPackagesCount)
      })
      .catch(err => err)

    }, [])

    console.log("AllPackages", packages)
  return (
    <div className="App">
      <h1>All {len === 0 ? '...' : len} packages</h1>
      {packages.map((p, i) => <Package key={i} p={p} name={p.name}/>)}
    </div>
  );
}

export default App;
