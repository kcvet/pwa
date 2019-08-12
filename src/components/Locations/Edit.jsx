import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Formik } from "formik";
import Spinner from "../../components/spinner/Spinner";
import ValidationLocationSchema from "./ValidationLocationSchema";
import LocationForm from "./Form";
import { updateCollection } from "../../actions/common";

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
