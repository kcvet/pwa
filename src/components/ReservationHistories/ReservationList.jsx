import React, { useState, useEffect } from 'react'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
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
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import axios from 'axios'
import screen from '../../utils/windowsDimensions'

import ReservationView from "./ModalDetailView";


const { PWA_API } = require("../../utils/PWA_API");


function desc(a, b, orderBy) {
  const nested = orderBy.split(".")
  if(nested.length === 2) {
    if (b[nested[0]][nested[1]] < a[nested[0]][nested[1]]) {
      return -1;
    }
    if (b[nested[0]][nested[1]] > a[nested[0]][nested[1]]) {
      return 1;
    }
    return 0;
  } else {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
  }
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
  { id: 'carID.plateNumber', numeric: false, disablePadding: false, label: 'car' },
  { id: 'pickUpLocationID.name', numeric: false, disablePadding: true, label: 'pickUpLocation' },
  { id: 'dropOffLocationID.name', numeric: false, disablePadding: false, label: 'dropOffLocation' },
  { id: 'userID', numeric: false, disablePadding: false, label: 'user' },
  { id: 'status', numeric: false, disablePadding: false, label: 'status' },
  { id: 'pricing.total', numeric: true, disablePadding: false, label: 'total [€]' },
  { id: 'travelPurpose', numeric: false, disablePadding: false, label: 'travelPurpose' },

  
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const { height, width } = screen();

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headRows.map(row => (
          ['dropOffLocationID.name','status', 'pickUpLocationID.name'].includes(row.id) && width < 769 ? null : 
          <TableCell
            key={row.id}
            align={row.numeric ? 'center' : 'left'}
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
  redBackGround: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  }
}));


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 200,
  },
  tableWrapper: {
    overflowX: 'auto',
  },

}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('licencePlate');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setReservations] = useState([]);
  const {width } = screen();
  const [open, setOpen] = React.useState(false);
  const [reservation, setReservation] = useState({});
  const key = localStorage.getItem("token");

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(()=> {
  const fetchCarData = async () => { 
  try {
      const result = await axios(`${PWA_API}/api/reservationHistories?populate=["carID", "carModelID", "userID", "pickUpLocationID", "dropOffLocationID"]`, {
        headers: {
          authorization: `Bearer ${key}`
        }
      })
      setReservations(result.data.results);
  } catch (error) {
  //notifyError("Error when getting cars. Please refresh the page");
  }

  };
  fetchCarData();
  }, []);


  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }
  function handleClick(event, name, row) {
    setReservation(row);
    setOpen(true)
    let newSelected = [];
    newSelected[0] = name;
    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function handleChangeDense(event) {
    setDense(event.target.checked);
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            style={{tableLayout: 'fixed'}}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      onClick={event => handleClick(event, row._id, row)}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                     <TableCell align="center">{row.carID.plateNumber}</TableCell>
                     {width > 768 ?  <TableCell component="th" id={row._id} scope="row" padding="default" size="small">
                        {row.pickUpLocationID.name}
                      </TableCell>: null}
                      {width > 768 ?  <TableCell align="center">{row.dropOffLocationID.name}</TableCell> : null}
                     <TableCell align="center">{row.userID ? row.userID.firstName : null} {row.userID ? row.userID.lastName : null}</TableCell>
                      {width > 768 ? <TableCell align="center">{row.status}</TableCell> : null}
                      <TableCell align="center">{row.pricing.totalWithDiscount}</TableCell>
                    <TableCell align="center">{row.travelPurpose}</TableCell> 


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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage = { width > 768 ? "number of items to show" : ""}
          labelDisplayedRows = { width > 768 ? ({ from, to, count }) => `${from} - ${to} total:${count}` : ({ from, to, count }) => `${from} - ${to}`  }
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <ReservationView open={open} reservation={reservation} onClose={handleClose} />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
