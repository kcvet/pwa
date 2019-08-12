import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    height: 0
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  button: {
    paddingTop: '5em',
  },
  green: {
    backgroundColor: '#08b539',
  }
}));


const Album = (damages) =>  {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar  className={classes.green} >
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Car damages
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {damages.cars.map(card => (
              <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                { card.images.length !== 0 ? 
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.images[0].href}
                /> :  
                <CardMedia
                    className={classes.cardMedia}
                    image
                /> }
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.severity}
                    </Typography>
                    <Typography>
                     {card.damageDescription}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Link key="new" to={'/cars/'+damages.carID+'/newDamage'}>
          <Button
              type="button"
              variant="contained"
              color="primary"
              aria-label="Add"
              >
               Add Damage
              </Button>
             </Link>
        </Container>
      </main>
      {/* Footer */}
      {/* End footer */}
    </React.Fragment>
  );
}

export default Album;