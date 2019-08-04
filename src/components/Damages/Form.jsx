import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { updateCollection } from "../../actions/common";
import { notifySuccess, notifyError } from "../toast/Toast";import {

  Grid,
  Paper,
  Box,
  Fab,
  Button,
  InputAdornment
} from "@material-ui/core";
import {
  Send,
  Delete,
  Code,
  Store,
  Language,
  Phone,
  LocationOn,
  Home,
  LocationCity,
  LocalPostOffice,
  Flag,
  Link,
  Title
} from "@material-ui/icons";
import { Field, FieldArray } from "formik";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '10px',
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1)
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    width: "100%"
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
    borderRadius: "0px",
    marginBottom: "50px"
  },
  fab: {
    margin: theme.spacing(1)
  },
  fabSize: {
    width: "80px",
    height: "80px"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  divIcon: {
    width: "100%",
    textAlign: "right",
    bottom: "-60px",
    position: "relative"
  }
}));

const LocationForm = props => {
  const classes = useStyles();
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
      } = props;

  return (
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
                    value={values.damageDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    helperText={touched.damageDescription ? errors.damageDescription : ""}
                    error={errors.damageDescription && touched.damageDescription}
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
                        id="raised-button-file"
                        multiple
                        type="file"
                      />
                      <label htmlFor="raised-button-file">
                        <Button variant="raised" component="span" className={classes.button}>
                          Upload
                        </Button>
                      </label> 
                  </Grid>
                </Grid>
          

              {/*********************************** Additional Image Resources *****************************/}

              <Grid item xs={12} md={6}>
                <Box xs={12}>
                  <h2 style={{ fontWeight: "lighter" }}>
                    Image resources
                  </h2>
                </Box>
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <Grid container spacing={3}>
                    <FieldArray
                    name="additionalImageResources"
                    render={arrayHelpers => (
                      <div>
                        <Box pt={4}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              arrayHelpers.push({
                                title: undefined,
                                href: undefined
                              })
                            }
                          >
                            + Add image
                          </Button>
                        </Box>
                      </div>
                    )}
                  />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.divIcon}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                aria-label="Add"
                disabled={isSubmitting}
              >
               Add Damage
              </Button>
            </div>
          </form>
        </Box>
      </Paper>
    </div>
  );
};

export default LocationForm;
