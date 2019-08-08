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
import Notify from '../../utils/Notification'

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
  const carID = props.match.params.carid;
  const handleSubmit = values => {

    newCollection(values, "cars/"+carID+"/damages")
      .then(result => {
          // Let's check if the browser supports notifications
        Notify("Successfully created new damage", notifySuccess("Successfully created new damage"))
        props.history.push("/cars");

      })
      .catch(error => {
        Notify("Error when trying to add new damage", notifyError("Error when trying to add new damage"))
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
              handleSubmit(values);
              setSubmitting(false);
            }}
          />
        </Container>
      </div>
    );

};

export default LocationEdit;
