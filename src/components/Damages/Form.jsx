import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Grid,
  Paper,
  Box,
  Button,
  InputAdornment
} from "@material-ui/core";
import {
  Store,
} from "@material-ui/icons";
import FileBase64 from 'react-file-base64';


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
  
  const [files, setFiles] = React.useState('');

  const classes = useStyles();
  const {
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
      } = props;

  const getBase64 = file => {
    setFiles(file.base64);
    props.values.images = [{content: file.base64}];
  }
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
                    //value={values.damageDescription}
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
                  <FileBase64
                        type="file"
                        onDone={ getBase64.bind(this)}
                         />
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
