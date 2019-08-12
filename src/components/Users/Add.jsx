import React from "react";
import { Container } from "@material-ui/core";
import { Formik } from "formik";
import UserForm from "./Form";
import { newCollection} from "../../actions/common";
import { notifySuccess, notifyError } from "../toast/Toast";
import Notify from '../../utils/Notification'


const LocationEdit = props => {
  const handleSubmit = values => {
    newCollection(values, "users")
      .then(result => {
        Notify("Successfully created new user", notifySuccess)
        props.history.push("/login");
      })
      .catch(error => {
        Notify("Error when trying to create a new user", notifyError)
      });
  };

    return (
      <div>
        <Container>
          <Formik
            render={props => <UserForm {...props} />}
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
