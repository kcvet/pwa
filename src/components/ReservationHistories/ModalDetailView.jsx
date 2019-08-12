import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import moment from 'moment'

import {
  Fab,
  DialogTitle,
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

const LocationView = ({ reservation, onClose, open }) => {
  const classes = useStyles();
  const [maxWidth] = useState("md");

  function handleClose() {
    onClose();
  }

  if (reservation._id) {
    return (
      <div key={reservation._id}>
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
          <div className={classes.container}>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
            <span className={classes.fontItem}><b>plate number:</b>  {reservation.carID.plateNumber}</span>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span className={classes.fontItem}><b>Status:</b> {reservation.status}</span>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span className={classes.fontItem}><b>drop off location:</b> {reservation.dropOffLocationID.name}</span>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span className={classes.fontItem}><b>pick up location:</b>  {reservation.pickUpLocationID.name}</span>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span className={classes.fontItem}><b>travelPurpose:</b> {reservation.travelPurpose}</span>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span className={classes.fontItem}><b>check in odometer:</b> {reservation.checkOutOdometer} </span>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span className={classes.fontItem}><b>check out odometer:</b> {reservation.checkInOdometer} </span>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span className={classes.fontItem}><b>distance traveled:</b> {reservation.drivenKilometers} km</span>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span className={classes.fontItem}><b>check in time:</b> {moment(reservation.checkInTime).format('YYYY-MM-DD HH:mm:ss')}</span>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span className={classes.fontItem}><b>check out time:</b> {moment(reservation.checkOutTime).format('YYYY-MM-DD HH:mm:ss')}</span>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
              <h2>Pricing</h2>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span className={classes.fontItem}><b>tax rate:</b> {reservation.pricing.taxRate} </span>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span className={classes.fontItem}><b>total:</b> {reservation.pricing.total} EUR</span>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span className={classes.fontItem}><b>total discount:</b> {reservation.pricing.totalDiscount} EUR</span>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span className={classes.fontItem}><b>total with discount:</b> {reservation.pricing.totalWithDiscount} EUR</span>
              </Grid>
            </Grid>
            </div>
        </Dialog>
      </div>
    );
  } else {
    return true;
  }
};

export default withMobileDialog()(LocationView);
