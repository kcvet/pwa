import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
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
                    id="name"
                    name="name"
                    label="Name"
                    placeholder="e.g. Bled Downtown"
                    className={classes.textField}
                    value={values.name}
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
                    helperText={touched.name ? errors.name : ""}
                    error={errors.name && touched.name}
                    required
                  />
                </Grid>
              </Grid>

              {/*********************************** Contact ************************************/}

              {/*********************************** Geolocation ************************************/}

              <Grid item xs={12} md={6}>
                <Box xs={12}>
                  <h2 style={{ fontWeight: "lighter" }}>Geolocation</h2>
                </Box>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="geoLocation.lng"
                    name="geoLocation.lng"
                    label="Longitude"
                    type="number"
                    placeholder="e.g. 14,112162"
                    className={classes.textField}
                    value={values.geoLocation.lng}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      )
                    }}
                    helperText={
                      touched.geoLocation &&
                      errors.geoLocation &&
                      touched.geoLocation.lng
                        ? errors.geoLocation.lng
                        : ""
                    }
                    error={
                      touched.geoLocation &&
                      errors.geoLocation &&
                      touched.geoLocation.lng &&
                      Boolean(errors.geoLocation.lng)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="geoLocation.lat"
                    name="geoLocation.lat"
                    label="Latitude"
                    type="number"
                    placeholder="e.g. 46,368144"
                    className={classes.textField}
                    value={values.geoLocation.lat}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      )
                    }}
                    helperText={
                      touched.geoLocation &&
                      errors.geoLocation &&
                      touched.geoLocation.lat
                        ? errors.geoLocation.lat
                        : ""
                    }
                    error={
                      touched.geoLocation &&
                      errors.geoLocation &&
                      touched.geoLocation.lat &&
                      Boolean(errors.geoLocation.lat)
                    }
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
                          value={values.address.address1}
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
                          value={values.address.city}
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
                          value={values.address.zipCode}
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
                          value={values.address.country}
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

              {/*********************************** Main Image Resource ************************************/}

              {values.mainImageResource && (
                <Grid item xs={12} md={6}>
                  <Box xs={12}>
                    <h2 style={{ fontWeight: "lighter" }}>
                      Main Image Resource
                    </h2>
                  </Box>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="mainImageResource.title"
                      name="mainImageResource.title"
                      label="Title"
                      className={classes.textField}
                      value={values.mainImageResource.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Title />
                          </InputAdornment>
                        )
                      }}
                      helperText={
                        touched.mainImageResource &&
                        errors.mainImageResource &&
                        touched.mainImageResource.title
                          ? errors.mainImageResource.title
                          : ""
                      }
                      error={
                        touched.mainImageResource &&
                        errors.mainImageResource &&
                        touched.mainImageResource.title &&
                        Boolean(errors.mainImageResource.title)
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="mainImageResource.href"
                      name="mainImageResource.href"
                      label="Href"
                      className={classes.textField}
                      value={values.mainImageResource.href}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Link />
                          </InputAdornment>
                        )
                      }}
                      helperText={
                        touched.mainImageResource &&
                        errors.mainImageResource &&
                        touched.mainImageResource.href
                          ? errors.mainImageResource.href
                          : ""
                      }
                      error={
                        touched.mainImageResource &&
                        errors.mainImageResource &&
                        touched.mainImageResource.href &&
                        Boolean(errors.mainImageResource.href)
                      }
                      required
                    />
                  </Grid>
                </Grid>
              )}

              {/*********************************** Additional Image Resources *****************************/}

              <Grid item xs={12} md={6}>
                <Box xs={12}>
                  <h2 style={{ fontWeight: "lighter" }}>
                    Additionl Image Resources
                  </h2>
                </Box>
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <Grid container spacing={3}>
                    <FieldArray
                    name="additionalImageResources"
                    render={arrayHelpers => (
                      <div>
                        {values.additionalImageResources.map((image, index) => (
                          <Fragment key={index}>
                            <div>
                              <h5>Image {index + 1}</h5>
                            </div>
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={4}>
                                <Field
                                  name={`additionalImageResources.${index}.title`}
                                  render={() => (
                                    <TextField
                                      id={`additionalImageResources.${index}.title`}
                                      name={`additionalImageResources.${index}.title`}
                                      label="Title"
                                      className={classes.textField}
                                      value={image.title}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      margin="normal"
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <Title />
                                          </InputAdornment>
                                        )
                                      }}
                                      helperText={
                                        touched.additionalImageResources &&
                                        touched.additionalImageResources[index] &&
                                        touched.additionalImageResources[index].title &&
                                        errors.additionalImageResources &&
                                        errors.additionalImageResources[index] && 
                                        errors.additionalImageResources[index].title
                                          ? errors.additionalImageResources[index]
                                              .title
                                          : ""
                                      }
                                      error={
                                        touched.additionalImageResources &&
                                        touched.additionalImageResources[index] &&
                                        touched.additionalImageResources[index].title &&
                                        errors.additionalImageResources &&
                                        errors.additionalImageResources[index] &&
                                        Boolean(
                                          errors.additionalImageResources[index]
                                            .title
                                        )
                                      }
                                      required
                                    />
                                  )}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Field
                                  name={`additionalImageResources.${index}.href`}
                                  render={() => (
                                    <TextField
                                      id={`additionalImageResources.${index}.href`}
                                      name={`additionalImageResources.${index}.href`}
                                      label="URL/href"
                                      placeholder="e.g. https://res.cloudinary.com/carsguide/image/Volkswagen-Polo.png"
                                      className={classes.textField}
                                      value={image.href}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      margin="normal"
                                      type="url"
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <Link />
                                          </InputAdornment>
                                        )
                                      }}
                                      helperText={
                                        touched.additionalImageResources &&
                                        touched.additionalImageResources[index] &&
                                        touched.additionalImageResources[index].href &&
                                        errors.additionalImageResources &&
                                        errors.additionalImageResources[index] && 
                                        errors.additionalImageResources[index].href
                                          ? errors.additionalImageResources[index]
                                              .href
                                          : ""
                                      }
                                      error={
                                        touched.additionalImageResources &&
                                        touched.additionalImageResources[index] &&
                                        touched.additionalImageResources[index].href &&
                                        errors.additionalImageResources &&
                                        errors.additionalImageResources[index] &&
                                        Boolean(
                                          errors.additionalImageResources[index]
                                            .href
                                        )
                                      }
                                      required
                                    />
                                  )}
                                />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                md={2}
                                style={{ margin: "auto" }}
                              >
                                <Fab
                                  size="small"
                                  color="secondary"
                                  aria-label="Remove"
                                  className={classes.fab}
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <Delete />
                                </Fab>
                              </Grid>
                            </Grid>
                          </Fragment>
                        ))}
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
               Edit
              </Button>
            </div>
          </form>
        </Box>
      </Paper>
    </div>
  );
};

export default LocationForm;
