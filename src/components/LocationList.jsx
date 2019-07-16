import React, { Component, useState, useEffect } from 'react'

import axios from 'axios'
import CardList from './CardList'
import './pagination.css'

const handlePageClick = data => {
  let selected = data.selected;
  let offset = Math.ceil(selected * this.props.perPage);

  this.setState({ offset: offset }, () => {
    this.loadCommentsFromServer();
  });
};

function CarList() {
  const [cars, setCars] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  
  useEffect(()=> {
  const fetchCarData = async () => { 
  try {
      const result = await axios('https://api.avant2go.com/api/cars?populate=["carModelID"]')
      console.log('const result : ', result );
      setCars(result.data);
  } catch (error) {
  //notifyError("Error when getting cars. Please refresh the page");
  }

  };
  fetchCarData();
  }, []);
  
    if(cars.length > 0){
      console.log('cars: ', cars);
      console.log(pageCount)
    return(
        <CardList locations={locations}></CardList>
    ) } else {
    return(
      <div>
      </div>
    )}
}

export default CarList;
