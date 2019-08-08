import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Container } from "@material-ui/core";
import { Formik } from "formik";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";
import ValidationLocationSchema from "./ValidationLocationSchema";
import LocationForm from "./Form";
import { updateCollection } from "../../actions/common";


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

  const handleSubmit = values => {
    updateCollection(values._id, values, "locations")
      .then(result => {
        props.history.push("/locations");
      })
      .catch(error => {
      });
  };

  if (props.location.state.row._id) {
    return (
      <div>
        <Container>
          <Formik
            render={props => <LocationForm {...props} />}
            initialValues={props.location.state.row}
            validationSchema={ValidationLocationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
          />
        </Container>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default LocationEdit;
