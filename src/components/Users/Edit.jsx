import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Formik } from "formik";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";
import LocationForm from "./Form";
import { prepareHeaders } from "../../actions/common"

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
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const result = await axios({
        method: "GET",
        url:`${PWA_API}/api/users/me`,
        headers: prepareHeaders("GET"),
        });
        setUserData(result.data);
      } catch (error) {
      }
    };
    fetchLocationData();
  }, [locationID]);

  if (userData._id) {
    return (
      <div>
        <Container>
          <Formik
            render={props => <LocationForm {...props} />}
            initialValues={userData}
            //validationSchema={ValidationLocationSchema}
          />
        </Container>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default LocationEdit;
