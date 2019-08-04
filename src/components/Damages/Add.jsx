import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Formik } from "formik";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import ValidationDamagesSchema from "./ValidationDamagesSchema";
import { newCollection } from "../../actions/common";
import { notifySuccess, notifyError } from "../toast/Toast";
import {
  Grid,
  Paper,
  Box,
  Button,
  InputAdornment,
  TextField,
  Form
} from "@material-ui/core";
import {
  Store,
} from "@material-ui/icons";

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
          <div className={classes.root}>
      <Paper>
        <Box p={2} mb={5}>
          <form
            className={classes.container}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={3}>
              {/*********************************** Info ************************************/}

            
              <Grid item xs={12} md={6}>
                <Box xs={12}>
                  <h2 style={{ fontWeight: "lighter" }}>Info</h2>
                </Box>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="damageDescription"
                    name="damageDescription"
                    label="damage Description"
                    placeholder="e.g. left front door is scratched"
                    className={classes.textField}
                    multiline
                    rowsMax="4"
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Store />
                        </InputAdornment>
                      )
                    }}
                    required
                  />
                </Grid>
              </Grid>

              {/*********************************** Main Image Resource ************************************/}

            
                <Grid item xs={12} md={6}>
                  <Box xs={12}>
                    <h2 style={{ fontWeight: "lighter" }}>
                      Main Image Resource
                    </h2>
                  </Box>
                  <Grid item xs={12} md={6}>
                  <input
                        accept="image/*"
                        className={classes.input}
                        style={{ display: 'none' }}
                        id="images.content"
                        name="images.content"
                        label="images.content"
                        multiple
                        base-sixty-four-input
                        type="file"
                      />
                      <label htmlFor="images.content">
                        <Button variant="outlined" component="span" className={classes.button}>
                          Upload
                        </Button>
                      </label> 
                  </Grid>
                </Grid>
          
            </Grid>
            <div className={classes.divIcon}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                aria-label="Add"
              >
               Add Damage
              </Button>
            </div>
          </form>
        </Box>
      </Paper>
    </div> 
        </Container>
      </div>
    );

};

export default LocationEdit;

         /*<Formik
            render={props => <Form {...props} />}
             //initialValues={locationData}
            //validationSchema={ValidationLocationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log('values: ', values);
              handleSubmit(values);
              setSubmitting(false);
            }}
          /> */