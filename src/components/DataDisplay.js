import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dataDisplay.css';
function DataDisplay() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3005/api/items')
    .then( (response)=>{
      console.log(response.data);
      setData(response.data)
    })
    .catch(function (error) {
      alert(error.response.data)
      console.log(error);
    });
  }, []);
  const handleDownload = (abs,fileName) => {
    const blob = new Blob([data]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName; 
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <>
    <h1>Ministry Of Ayush</h1>
    <div className='cont'>
      <h1>Approvals:</h1>
      <ul type='none'>
        {data.map((item) => (
          <li key={item._id}>
            {/* <h2>{item.abstract}</h2> */}
            <p>{item.rat}</p>
            <p>{item.dom}</p>
            <button onClick={()=>handleDownload(item.file.data,item.dom)}>Download File</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default DataDisplay;