import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button } from '@material-ui/core';
import moment from 'moment';
const useRowStyles = makeStyles({
    root: {
        backgroundColor: 'rgba(92, 92, 92, 1)',
        '& > *': {
            borderBottom: 'unset',
        },
    },
    backgroundColorfix: {
        backgroundColor: "#263238",
    },
});
function Row(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const { row } = props
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center">
                    {row.batch ? moment(row.batch * 1000).format("dd MMM hh:mm a") : '---'}
                </TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center">
                    {row.batch ? row.batch : '----'}
                </TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center">
                    {row.item_count ? row.item_count : '----'}
                </TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center">
                    {row.zone ? row.zone.zone_name : '----'}
                </TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center" >
                    <React.Fragment>
                        <Link to={{ pathname: "/BatchDetail", state: row, data: { zone: row.zone && row.zone.zone_name } }}>
                            <Button style={{ width: 20, height: 20 }} variant="contained" className="m-1" color="primary" >View</Button>
                        </Link>
                    </React.Fragment>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
export default function SupplyChainGoodSummaryTable({ data }) {
    const useStyles = makeStyles({
        root: {
            width: '100%',
        },
        container: {
            maxHeight: 440,
        },
        backgroundColorfix: {
            backgroundColor: "#263238",
        },
    });
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper className={classes.root}  >
            <TableContainer  >
                <Table size="small" aria-label="collapsible table">
                    <TableHead   >
                        <TableRow >
                            {/* <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }} /> */}
                            {/* <TableCell>Date</TableCell> */}
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center"
                            >
                                Date
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center"
                            >
                                Retail Item Batch Id
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center"
                            >
                                Item Count
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center"
                            >
                                Zone Name
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center"
                            >
                                IBT Details
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className={classes.backgroundColorfix}
                style={{ backgroundColor: "#263238", color: 'white' }}
            />
        </Paper>
    );
}
