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
import ClipLoader from "react-spinners/ClipLoader";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button } from '@material-ui/core';
export default function ViewBatchDetailTable({ ibt, perData, loader }) {
    console.log(perData, 'asdada');
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
    const [open, setOpen] = React.useState(false);
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

            <TableContainer className={classes.backgroundColorfix} >
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%', flexDirection: 'column', alignItems: 'center', alignSelf: 'center' }}>
                    <ClipLoader color={'blue'} loading={loader} size={100} />
                </div>
                <Table size="small" aria-label="collapsible table">
                    <TableHead   >
                        <TableRow >
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">IBT</TableCell>
                            <TableCell align="center">Tag</TableCell>
                            <TableCell align="center">SKU</TableCell>
                            <TableCell align="center">Department</TableCell>
                            <TableCell align="center">Source</TableCell>
                            <TableCell align="center">Process Status</TableCell>
                            <TableCell align="center">Brand</TableCell>
                            {/* <TableCell align="center">Protein&nbsp;(g)</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {ibt.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <React.Fragment>
                                <TableRow >
                                    {/* <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,}} align="center">{row.Date}</TableCell> */}
                                    <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,}} align="center">{perData.packed_items ? perData.packed_items.date : '----'}</TableCell>
                                    <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,}} align="center">{perData ? perData.asn : "----"}</TableCell>
                                    <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,}} align="center">{row.tag ? row.tag : '----'}</TableCell>
                                    <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,}} align="center">{row.sku ? row.sku : '----'}</TableCell>
                                    <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,}} align="center">{row.department ? row.department : '----'}</TableCell>
                                    <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,}} align="center">{row.source ? row.locationId : '----'}</TableCell>
                                    <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,}} align="center">{row.proces_status ? row.proces_status : '----'}</TableCell>
                                    <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,}} align="center">{row.brand ? row.brand : '----'}</TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={ibt.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className={classes.backgroundColorfix}
                style={{ backgroundColor: "#263238" }}
            />
        </Paper>
    );
}
