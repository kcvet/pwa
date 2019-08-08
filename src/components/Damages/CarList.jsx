import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CardList from './CardList'

const { PWA_API } = require("../../utils/PWA_API");

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
    console.log("props", props)
      let api = `${PWA_API}/api/cars/${carID}/damages`
      if (props.all) api = `${PWA_API}/api/cars/damages`
      const result = await axios(api,{
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
  
    return(
        <CardList cars={damages} carID={carID}></CardList>
    )
}

export default DamagesList;
