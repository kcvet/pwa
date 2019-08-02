import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CardList from './CardList'

const handlePageClick = data => {
  let selected = data.selected;
  let offset = Math.ceil(selected * this.props.perPage);

  this.setState({ offset: offset }, () => {
    this.loadCommentsFromServer();
  });
};

const DamagesList = props => {
  const [damages, setDamages] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const key = localStorage.getItem("token");
  const carID = props.match.params.carid;

  
  
  useEffect(()=> {
    const fetchCarData = async () => { 
    try {
        const result = await axios(`http://localhost:9000/api/cars/${carID}/damages`,{
          headers: {
            authorization: `Bearer ${key}`
          }
        });
        
        setDamages(result.data);
    } catch (error) {
      console.log('error: ', error);
    //notifyError("Error when getting cars. Please refresh the page");
    }
  
    };
    fetchCarData();
    }, []);
  
    if(damages.length > 0){
      console.log('cars: ', damages);
      console.log(pageCount)
    return(
        <CardList cars={damages} carID={carID}></CardList>
    ) } else {
    return(
      <div>
      </div>
    )}
}

export default DamagesList;
