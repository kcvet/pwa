import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CardList from './CardList'

const { PWA_API } = require("../../utils/PWA_API");

const DamagesList = props => {
  const [damages, setDamages] = useState([]);
  const key = localStorage.getItem("token");
  const carID = props.match.params.carid;

  
  
  useEffect(()=> {
    const fetchCarData = async () => { 
    try {
      let api = `${PWA_API}/api/cars/${carID}/damages`
      if (props.all) api = `${PWA_API}/api/cars/damages`
      const result = await axios(api,{
        headers: {
          authorization: `Bearer ${key}`
        }
      });
        setDamages(result.data);
    } catch (error) {
    //notifyError("Error when getting cars. Please refresh the page");
    }
  
    };
    fetchCarData();
    }, []);
  
    return(
        <CardList cars={damages} carID={carID}></CardList>
    )
}

export default DamagesList;
