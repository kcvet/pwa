import React, { Component, useState, useEffect } from 'react'
import { lighten, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import axios from 'axios'
import PropTypes from 'prop-types';
import CardList from './CardList'
import { loadPartialConfig } from '@babel/core';
import ReactPaginate from 'react-paginate';
import './pagination.css'
import InfiniteScroll from 'react-infinite-scroller';
/*
const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
      color: 'white',
    },
    table: {
      minWidth: 400,
    },
  }));

  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
  }
  
  const headRows = [
    { id: 'id', numeric: false, disablePadding: true, label: 'id' },
    { id: 'plateNumber', numeric: true, disablePadding: false, label: 'plate number' },
    { id: 'status', numeric: false, disablePadding: false, label: 'status' },
    { id: 'condition', numeric: false, disablePadding: false, label: 'condition' },
    { id: 'vins', numeric: false, disablePadding: false, label: 'vins' },
  ];

  
function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'Select all desserts' }}
          />
        </TableCell>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Nutrition
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


function CarList() {
    const classes = useStyles();
    const [cars, setCars] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
    
  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = cars.map(n => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  function handleChangeDense(event) {
    setDense(event.target.checked);
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, cars.length - page * rowsPerPage);


    useEffect(()=> {
        const fetchCarData = async () => { 
            setIsLoading(true);
        try {
            const result = await axios("https://api.avant2go.com/api/cars/")
            setCars(result.data);
        } catch (error) {
        //notifyError("Error when getting cars. Please refresh the page");
        }
        setIsLoading(false);

        };
        fetchCarData();
        }, []) 

    // const getCars = () => {
    //     axios.get('https://api.avant2go.com/api/cars?limit=10')
    //         .then((response) => {
    //             this.setState({cars: response.data.results})
    //         })
    //         .catch((err) => {
    //         })
    // }
        if (cars.length > 0) {
          return (
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                  <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                  >
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={cars.length}
                    />
                    <TableBody>
                      {stableSort(cars, getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const isItemSelected = isSelected(row._id);
                          const labelId = `enhanced-table-checkbox-${index}`;
        
                          return (
                            <TableRow
                              hover
                              onClick={event => handleClick(event, row._id)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row._id}
                              selected={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </TableCell>
                              <TableCell display='block' align="right">
                                {row._id}
                              </TableCell>
                              <TableCell display='block' align="right">{row.plateNumber}</TableCell>
                              <TableCell display='block' align="right">{row.status}</TableCell>
                              <TableCell display='block' align="right">{row.condition}</TableCell>
                              <TableCell display='block' align="right">{row.vin}</TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={cars.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
              <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
              />
            </div>
          );
        } else return ( <div> loading {React.version} <button onClick={() => {setCount(count + 1); console.log(cars.length )}}>
        Click me {count}
      </button></div> )
}
*/
const handlePageClick = data => {
  let selected = data.selected;
  let offset = Math.ceil(selected * this.props.perPage);

  this.setState({ offset: offset }, () => {
    this.loadCommentsFromServer();
  });
};

function CarList() {
  const [cars, setCars] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  
  useEffect(()=> {
  const fetchCarData = async () => { 
  try {
      const result = await axios('https://api.avant2go.com/api/cars?populate=["carModelID"]')
      console.log('const result : ', result );
      setCars(result.data);
  } catch (error) {
  //notifyError("Error when getting cars. Please refresh the page");
  }

  };
  fetchCarData();
  }, []);
  
    if(cars.length > 0){
      console.log('cars: ', cars);
      console.log(pageCount)
    return(
        <CardList cars={cars}></CardList>
    ) } else {
    return(
      <div>
      </div>
    )}
}

export default CarList;
