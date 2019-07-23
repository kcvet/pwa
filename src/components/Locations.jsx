import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

/*
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Row(props) {
    console.log('props: ', props);
  const { locations } = props;
  console.log('locations: ', locations);

  return (
        <ListItem button  key={locations._id}>
            <ListItemText primary={locations.name} />
         </ListItem>
      )
  
}

Row.propTypes = {
  index: PropTypes.number,
  style: PropTypes.object,
};

export default function VirtualizedList(locations) {
    console.log('locations: ', locations);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FixedSizeList height={400} width={360} itemSize={46} itemCount={200}>
        {Row(locations)}
      </FixedSizeList>
    </div>
  );
}
*/


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '75%',
    width:'50%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '300px',
  },
}));

export default function CheckboxListSecondary(locations) {
  locations = locations.locations
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List dense className={classes.root}>
      {locations.map(location => {
        const labelId = `checkbox-list-secondary-label-${location.name}`;
        return (
          <ListItem key={location.name} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${location.name + 1}`}
                src={`/static/images/avatar/${location.name + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={` ${location.name }`} />
            <ListItemText id={labelId} primary={` ${location.name }`} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(location.name)}
                checked={checked.indexOf(location.name) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}