import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Container } from "@material-ui/core";
import { Formik } from "formik";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import ValidationDamagesSchema from "./ValidationDamagesSchema";
import LocationForm from "./Form";
import { newCollection } from "../../actions/common";
import { notifySuccess, notifyError } from "../toast/Toast";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  paperTitleBand: {
    width: "100%",
    padding: "30px 20px 5px 20px",
    marginBottom: "50px"
  }
}));

const LocationEdit = props => {
  const classes = useStyles();
  const carID = props.match.params.carid;
  const [locationData, setLocationData] = useState({});
  const handleSubmit = values => {
    console.log('values: ', values);
    console.log('carID: ', carID);
    newCollection(values, "api/cars/"+carID+"/damages")
      .then(result => {
        notifySuccess("Successfully update location");
        props.history.push("/");
      })
      .catch(error => {
        notifyError("Error when trying update location");
      });
  };

    return (
      <div>
        <Container>
          <Formik
            render={props => <LocationForm {...props} />}
             //initialValues={locationData}
            //validationSchema={ValidationLocationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log('values: ', values);
              handleSubmit(values);
              setSubmitting(false);
            }}
          />
        </Container>
      </div>
    );

};

export default LocationEdit;
