import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { notifySuccess, notifyError } from "../../components/toast/Toast";
import {

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
import { nullLiteral } from "@babel/types";

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
                    id="firstName"
                    name="firstName"
                    label="firstName"
                    placeholder="e.g. Miha"
                    className={classes.textField}
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Store />
                        </InputAdornment>
                      )
                    }}
                    helperText={touched.firstName ? errors.firstName : ""}
                    error={errors.firstName && touched.firstName}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="lastName"
                    placeholder="e.g. Novak"
                    className={classes.textField}
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Store />
                        </InputAdornment>
                      )
                    }}
                    helperText={touched.lastName ? errors.lastName : ""}
                    error={errors.lastName && touched.lastName}
                    required
                  />
                </Grid>
              </Grid>

              {/*********************************** Contact ************************************/}

                    
              {/*********************************** Contact ************************************/}

              <Grid item xs={12} md={6}>
                <Box xs={12}>
                  <h2 style={{ fontWeight: "lighter" }}>Contact</h2>
                </Box>
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <Grid container spacing={3}>
                      <Grid item md={4}>
                        <TextField
                          id="mobile.countryCode"
                          name="mobile.countryCode"
                          label="Country Code"
                          placeholder="e.g. +386"
                          className={classes.textField}
                          value={values.mobile ? values.mobile.countryCode : null}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Language />
                              </InputAdornment>
                            )
                          }}
                          helperText={
                            touched.mobile &&
                            errors.mobile &&
                            touched.mobile.countryCode
                              ? errors.mobile.countryCode
                              : ""
                          }
                          error={
                            touched.mobile &&
                            errors.mobile &&
                            touched.mobile.countryCode &&
                            Boolean(errors.mobile.countryCode)
                          }
                          required
                        />
                      </Grid>
                      <Grid item md={8}>
                        <TextField
                          id="mobile.subscriberNumber"
                          name="mobile.subscriberNumber"
                          label="Phone subscriberNumber"
                          placeholder="e.g. 31444555"
                          className={classes.textField}
                          value={values.mobile ? values.mobile.subscriberNumber : null}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Phone />
                              </InputAdornment>
                            )
                          }}
                          helperText={
                            touched.mobile &&
                            touched.mobile.subscriberNumber &&
                            errors.mobile
                              ? errors.mobile.subscriberNumber
                              : ""
                          }
                          error={
                            touched.mobile &&
                            touched.mobile.subscriberNumber &&
                            errors.mobile &&
                            Boolean(errors.mobile.subscriberNumber)
                          }
                          required
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box xs={12}>
                  <h2 style={{ fontWeight: "lighter" }}>Credentials</h2>
                </Box>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="email"
                    name="email"
                    label="email"
                    placeholder="e.g. miha.novak@gmail.com"
                    className={classes.textField}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Store />
                        </InputAdornment>
                      )
                    }}
                    helperText={touched.email ? errors.email : ""}
                    error={errors.email && touched.email}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="password"
                    name="password"
                    label="password"
                    className={classes.textField}
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Store />
                        </InputAdornment>
                      )
                    }}
                    helperText={touched.password ? errors.password : ""}
                    error={errors.password && touched.password}
                    required
                  />
                </Grid>
              </Grid>

              {/*********************************** Address ************************************/}

              <Grid item xs={12} md={6}>
                <Box xs={12}>
                  <h2 style={{ fontWeight: "lighter" }}>Address</h2>
                </Box>
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <Grid container spacing={3}>
                      <Grid item md={6}>
                        <TextField
                          id="address.address1"
                          name="address.address1"
                          label="Address"
                          className={classes.textField}
                          value={values.address ? values.address.address1 : null}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Home />
                              </InputAdornment>
                            )
                          }}
                          helperText={
                            touched.address &&
                            errors.address &&
                            touched.address.address1
                              ? errors.address.address1
                              : ""
                          }
                          error={
                            touched.address &&
                            errors.address &&
                            touched.address.address1 &&
                            Boolean(errors.address.address1)
                          }
                          required
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          id="address.city"
                          name="address.city"
                          label="City"
                          className={classes.textField}
                          value={values.address ? values.address.city : null}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationCity />
                              </InputAdornment>
                            )
                          }}
                          helperText={
                            touched.address &&
                            errors.address &&
                            touched.address.city
                              ? errors.address.city
                              : ""
                          }
                          error={
                            touched.address &&
                            errors.address &&
                            touched.address.city &&
                            Boolean(errors.address.city)
                          }
                          required
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Grid container spacing={3}>
                      <Grid item md={6}>
                        <TextField
                          id="address.zipCode"
                          name="address.zipCode"
                          label="Zip Code"
                          className={classes.textField}
                          value={values.address ? values.address.zipCode : null}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocalPostOffice />
                              </InputAdornment>
                            )
                          }}
                          helperText={
                            touched.address &&
                            errors.address &&
                            touched.address.zipCode
                              ? errors.address.zipCode
                              : ""
                          }
                          error={
                            touched.address &&
                            errors.address &&
                            touched.address.zipCode &&
                            Boolean(errors.address.zipCode)
                          }
                          required
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          id="address.country"
                          name="address.country"
                          label="Country"
                          placeholder="e.g. SI"
                          className={classes.textField}
                          value={values.address ? values.address.country : null}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Flag />
                              </InputAdornment>
                            )
                          }}
                          helperText={
                            touched.address &&
                            errors.address &&
                            touched.address.country
                              ? errors.address.country
                              : ""
                          }
                          error={
                            touched.address &&
                            errors.address &&
                            touched.address.country &&
                            Boolean(errors.address.country)
                          }
                          required
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            { !values.firstName ? 
            <div className={classes.divIcon}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                aria-label="Add"
                disabled={isSubmitting}
              >
                Add
              </Button>
            </div> : null }
          </form>
        </Box>
      </Paper>
    </div>
  );
};

export default LocationForm;
