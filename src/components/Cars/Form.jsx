import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import classnames from "classnames";
import {
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Box,
  Fab,
  Button,
  InputAdornment
} from "@material-ui/core";
import { Send, Delete, Title, Ballot, Flag, AccessTime, Code, FormatListBulleted, Link } from "@material-ui/icons";
import { Field, FieldArray } from "formik";
import Spinner from "../../components/spinner/Spinner";

const useStyles = makeStyles(theme => ({
  root: {
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

const CarForm = props => {
  const classes = useStyles();
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    countryList,
  } = props;

  if(values._id){
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
                <Grid item xs={12} md={4}>
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Title />
                        </InputAdornment>
                      )
                    }}
                    helperText={touched.name ? errors.name : ""}
                    error={touched.name && Boolean(errors.name)}
                    required
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="doors"
                    name="doors"
                    label="Doors"
                    placeholder="e.g. 2/3"
                    className={classes.textField}
                    value={values.doors}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Ballot />
                        </InputAdornment>
                      )
                    }}
                    helperText={
                      errors.doors &&
                      touched.doors && (
                        <div className="input-feedback">{errors.doors}</div>
                      )
                    }
                    error={errors.doors && touched.doors}
                    required
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="countryIso2"
                    select
                    name="countryIso2"
                    label="Country"
                    className={classes.textField}
                    value={values.countryIso2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Flag />
                        </InputAdornment>
                      )
                    }}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    helperText="Please select country"
                    margin="normal"
                    variant="outlined"
                    disabled
                  >
                    {countryList.map(
                      option => (
                        (
                          <MenuItem key={option._id} value={option.countryIso2}>
                            {option.countryIso2}
                          </MenuItem>
                        )
                      )
                    )}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="advanceBooking"
                    name="advanceBooking"
                    label="Advanced booking"
                    placeholder="e.g. 01:00:00"
                    className={classes.textField}
                    value={values.advanceBooking}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccessTime />
                        </InputAdornment>
                      )
                    }}
                    helperText={
                      touched.advanceBooking ? errors.advanceBooking : ""
                    }
                    error={
                      touched.advanceBooking && Boolean(errors.advanceBooking)
                    }
                    required
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="acrissCode"
                    name="acrissCode"
                    label="Code"
                    placeholder="e.g. EDMA"
                    className={classes.textField}
                    value={values.acrissCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Code />
                        </InputAdornment>
                      )
                    }}
                    helperText={touched.acrissCode ? errors.acrissCode : ""}
                    error={touched.acrissCode && Boolean(errors.acrissCode)}
                    required
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="status"
                    select
                    name="status"
                    label="Status"
                    className={classes.textField}
                    value={"InActive"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FormatListBulleted />
                        </InputAdornment>
                      )
                    }}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    margin="normal"
                    variant="outlined"

                  >
                    {[{_id: "0", status: "Active"}, {_id: "1", status: "InActive"}].map(
                      option => (
                        (
                          <MenuItem key={option._id} value={option.status}>
                            {option.status}
                          </MenuItem>
                        )
                      )
                    )}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="guaranteedModel"
                          name="guaranteedModel"
                          type="checkbox"
                          checked={values.guaranteedModel}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.guaranteedModel}
                          color="primary"
                          disabled
                        />
                      }
                      label="Guaranteed"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="airCondition"
                          name="airCondition"
                          type="checkbox"
                          checked={values.airCondition}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.airCondition}
                          color="primary"
                          disabled
                        />
                      }
                      label="Air condition"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={12}>
                  <h4>Main image resource</h4>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <TextField
                        id="mainImageResource.title"
                        name="mainImageResource.title"
                        label="Title"
                        className={classes.textField}
                        value={values.mainImageResource.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Title />
                            </InputAdornment>
                          )
                        }}
                        helperText={
                          touched.mainImageResource &&
                          touched.mainImageResource.title &&
                          errors.mainImageResource &&
                          errors.mainImageResource.title
                            ? errors.mainImageResource.title
                            : ""
                        }
                        error={
                          touched.mainImageResource &&
                          touched.mainImageResource.title &&
                          errors.mainImageResource && 
                          Boolean(errors.mainImageResource.title)
                        }
                        required
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        id="mainImageResource.href"
                        name="mainImageResource.href"
                        label="URL/href"
                        placeholder="e.g. https://res.cloudinary.com/carsguide/image/Volkswagen-Polo.png"
                        className={classes.textField}
                        value={values.mainImageResource.href}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        variant="outlined"
                        type="url"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Link />
                            </InputAdornment>
                          )
                        }}
                        helperText={
                          touched.mainImageResource &&
                          touched.mainImageResource.href &&
                          errors.mainImageResource &&
                          errors.mainImageResource.href
                            ? errors.mainImageResource.href
                            : ""
                        }
                        error={
                          touched.mainImageResource &&
                          touched.mainImageResource.href &&
                          errors.mainImageResource &&
                          Boolean(errors.mainImageResource.href)
                        }
                        required
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} md={2} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={12}>
                  <h4>Additional image resources</h4>
                </Grid>
                <Grid item xs={12} md={12}>
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
                                  render={({ field, form }) => (
                                    <TextField
                                      id={`additionalImageResources.${index}.title`}
                                      name={`additionalImageResources.${index}.title`}
                                      label="Title"
                                      className={classes.textField}
                                      value={image.title}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      margin="normal"
                                      variant="outlined"
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
                                      variant="outlined"
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
              <div className={classes.divIcon}>
                <Fab
                  type="submit"
                  color="primary"
                  aria-label="Add"
                  className={classnames(classes.fab, classes.fabSize)}
                  disabled={isSubmitting}
                >
                  <Send className="material-icons md-36" />
                </Fab>
              </div>
            </form>
          </Box>
        </Paper>
      </div>
    );
  }
  else {
    return <Spinner />;
  }
};

export default CarForm;
