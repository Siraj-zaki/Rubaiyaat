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
import _ from 'lodash'
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
                    {row.createdAt ? moment(row.createdAt).format("YYYY/MM/DD/HH:MM:A") : '---'}
                </TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center">
                    {row.updatedAt ? moment(row.createdAt).format("YYYY/MM/DD/HH:MM:A") : '---'}
                </TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center">
                    {row.zoneId ? row.zoneId.zone_name : '----'}
                </TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center">
                    {row?.siteId?.site_name}
                </TableCell>
                {/* <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center">
                    {row.inputNote ? row.inputNote : '----'}
                </TableCell> */}
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center">
                    {row.operation_name ? row.operation_name : '----'}
                </TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center">
                    {row.destination ? row.destination?.site_name : '----'}
                </TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center">
                    {row.destinationZone ? row.destinationZone?.zone_name : '----'}
                </TableCell>
                {/* <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center">
                    <Link to={{
                        pathname: "/EPCDetailMovement", state: {
                            row: { row },
                            data: { zone: row.zoneId ? row.zoneId.zone_name : null }
                        }
                    }}
                    >{row.epc ? row.epc.length : '----'}</Link>
                </TableCell> */}
            </TableRow>
        </React.Fragment>
    );
}
export default function AnalyticsMovementHistoryTable({ data }) {
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
    // const groups = _.groupBy(data, 'division');
    // var results = data.reduce(function (results, org) {
    //     (results[org?.asn?.asn] = results[org?.asn?.asn] || []).push(org);
    //     return results;
    // }, {})

    // console.log('asdfasf', results);
    // let newRes = Object.entries(results).map(([asn, data]) => ({ asn, data }))
    return (
        <Paper className={classes.root}  >
            {
                data.map(({ epc, changing }) =>

                    <TableContainer key={epc} >
                        {/* <h1 style={{ color: "white", margin: 10, fontSize: 15 }}>ASN: {asn}</h1> */}
                        
                        {/* <Button variant="contained" color="primary" style={{ padding: 10, margin: 10 }} > */}
                        <TableCell
                                    colSpan={3}
                                        style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center"
                                    >
                                     EPC:  {epc}
                                    </TableCell>
                        {/* </Button> */}
                        <Table size="small" aria-label="collapsible table">
                            <TableHead   >
                                <TableRow >
                                    <TableCell
                                        style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center"
                                    >
                                       Created Date
                                    </TableCell>
                                    <TableCell
                                        style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center"
                                    >
                                       Updated Date
                                    </TableCell>
                                    <TableCell
                                        style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center"
                                    >
                                        Zone Name
                                    </TableCell>
                                    <TableCell
                                        style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center"
                                    >
                                        Site Name
                                    </TableCell>
                                    {/* <TableCell
                                        style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center"
                                    >
                                        Input Note
                                    </TableCell> */}
                                    <TableCell
                                        style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center"
                                    >
                                        Operation
                                    </TableCell>
                                    <TableCell
                                        style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center"
                                    >
                                        Destination Zone
                                    </TableCell>
                                    <TableCell
                                        style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center"
                                    >
                                        Destination Site
                                    </TableCell>
                                    {/* <TableCell
                                        style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center"
                                    >
                                        Total Epc
                                    </TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {changing
                                    .map((row) => (
                                        <Row key={row} asn={data} row={row} />
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
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
