import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import MapView from '../../utils/GoogleMap'
import {
  Fab,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
  Box,
  Grid,
  Card,
  CardContent
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    marginLeft: '10px',
  },
  margin: {
    margin: theme.spacing(1)
  },
  marginBottom: {
    marginBottom: theme.spacing(1)
  },
  marginTop5: {
    marginTop: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  paperTitleBand: {
    width: "100%",
    padding: "15px 5px 5px 5px",
    marginBottom: "10px"
  },
  paperTable: {
    width: "100%",
    padding: "5px"
  },
  table: {
    borderRadius: "4px"
  },
  fab: {
    margin: theme.spacing(1),
    padding: "0px 15px !important"
  },
  paper: {
    position: "absolute",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2),
    outline: "none"
  },
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    margin: 'auto'
  },
  gridList: {
    width: "100%",
    height: "100%"
  },
  fontItem: {
      fontSize: "20px",
      fontWeight: "light"
  }
}));

const CarView = ({ car, onClose, open }) => {
  const classes = useStyles();
  const [maxWidth] = useState("md");

  function handleClose() {
    onClose();
  }

  if (car._id) {
    return (
      <div key={car._id}>
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth={maxWidth}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogActions>
            <Box mt={3}>
              <Fab
                onClick={handleClose}
                size="small"
                color="primary"
                variant="extended"
                aria-label="Delete"
                className={classes.fab}
              >
                <Close className={classes.extendedIcon} />
                Close
              </Fab>
            </Box>
          </DialogActions>
          <DialogTitle id="responsive-dialog-title">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={6} style={{ margin: "auto" }}>
                <h2>{car.plateNumber}</h2>
              </Grid>
              <Grid item xs={12} sm={8} md={6}>
                {car.carModelID.mainImageResource && car.carModelID.mainImageResource.href && (
                  <img
                    alt={"Car"}
                    src={car.carModelID.mainImageResource.href}
                    style={{
                      width: "150px"
                      // height: "150px",
                      // borderRadius: "50%",
                      // backgroundSize: "cover"
                    }}
                  />
                )}
              </Grid>
            </Grid>
          </DialogTitle>
          <div className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12}>
                <span className={classes.fontItem}>Status: {car.status}</span>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span className={classes.fontItem}>Battery charge level: {car.batteryChargeLevel}</span>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span className={classes.fontItem}>Condition: {car.condition}</span>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span className={classes.fontItem}>Odometer: {car.odometer}</span>
              </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.marginTop5}>
              {car.carModelID.additionalImageResources.map((tile, i) => (
                <Grid item md={4} key={i}>
                  <Card>
                    <CardContent>
                      <img src={tile.href} alt={tile.title} style={{
                        width: "150px",
                        height: "auto",
                        marginLeft: "auto",
                        marginRight: "auto",
                        backgroundSize: "cover"
                      }}/>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <MapView lng={car.geoLocation.lng} lat={car.geoLocation.lat}></MapView>
            </div>
        </Dialog>
      </div>
    );
  } else {
    return true;
  }
};

export default withMobileDialog()(CarView);
