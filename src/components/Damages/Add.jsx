import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Formik } from "formik";
import LocationForm from "./Form";
import { newCollection } from "../../actions/common";
import { notifySuccess, notifyError } from "../toast/Toast";
import Notify from '../../utils/Notification'

const LocationEdit = props => {
  const carID = props.match.params.carid;
  const handleSubmit = values => {

    newCollection(values, "cars/"+carID+"/damages")
      .then(result => {
          // Let's check if the browser supports notifications
        Notify("Successfully created new damage", notifySuccess)
        props.history.push("/cars");

      })
      .catch(error => {
        Notify("Error when trying to add new damage", notifyError)
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
