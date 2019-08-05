import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Container } from "@material-ui/core";
import { Formik } from "formik";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";
import ValidationLocationSchema from "./ValidationLocationSchema";
import LocationForm from "./Form";
import { updateCollection } from "../../actions/common";
import { notifySuccess, notifyError } from "../../components/toast/Toast";

const { PWA_API } = require("../../utils/PWA_API")

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
  const locationID = props.match.params.id;
  const [locationData, setLocationData] = useState({});

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const result = await axios(`${PWA_API}/api/locations/${locationID}`);
        setLocationData(result.data);
      } catch (error) {
        notifyError("Error when getting location");
      }
    };
    fetchLocationData();
  }, [locationID]);

  const handleSubmit = values => {
    updateCollection(values._id, values, "locations")
      .then(result => {
        notifySuccess("Successfully update location");
        props.history.push("/locations");
      })
      .catch(error => {
        notifyError("Error when trying update location");
      });
  };

  if (locationData._id) {
    console.log('locationData: ', locationData);
    return (
      <div>
        <Container>
          <Formik
            render={props => <LocationForm {...props} />}
            initialValues={locationData}
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
  } else {
    return <Spinner />;
  }
};

export default LocationEdit;
