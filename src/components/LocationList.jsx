import React, { Component, useState, useEffect } from 'react'

import axios from 'axios'
import Locations from './Locations'
import './pagination.css'

const handlePageClick = data => {
  let selected = data.selected;
  let offset = Math.ceil(selected * this.props.perPage);

  this.setState({ offset: offset }, () => {
    this.loadCommentsFromServer();
  });
};

function CarList() {
  const [locations, setLocations] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  
  useEffect(()=> {
  const fetchCarData = async () => { 
  try {
      const result = await axios('https://api.avant2go.com/api/locations')
      console.log('const result : ', result );
      setLocations(result.data);
  } catch (error) {
  //notifyError("Error when getting cars. Please refresh the page");
  }

  };
  fetchCarData();
  }, []);
  
    if(locations.length > 0){
      console.log('cars: ', locations);
      console.log(pageCount)
    return(
        <Locations locations={locations}></Locations>
    ) } else {
    return(
      <div>
      </div>
    )}
}

export default CarList;
