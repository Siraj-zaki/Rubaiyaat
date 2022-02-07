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
        backgroundColor: '#373E43',
        '& > *': {
            borderBottom: 'unset',
        },
    },
    backgroundColorfix: {
        backgroundColor: "#373E43",
    },
});
function Row(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const { row } = props
    return (
        <React.Fragment>
            <TableRow >
                {/* <TableCell  >
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon htmlColor="white" /> : <KeyboardArrowDownIcon htmlColor="white" />}
                    </IconButton>
                </TableCell> */}
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}  align="center">{row.packed_items ? moment(row.packed_items.date).format("YYYY-MM-DD") : "----"}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}  align="center">{row.asn ? row.asn : "----"}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}  align="center">{row.siteId ? row.siteId.site_name : '----'}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}  align="center">{row.destination ? row.destination.site_name : '----'}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}  align="center"> <Link to={{ pathname: "/EPCDetail", state: { row: { operation: 'packing', asn: row._id }, data: { zone: row.zoneId && row.zoneId.zone_name } } }}>{row.packed_items ? row.packed_items.qt : '----'}</Link></TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}  align="center"><Link to={{ pathname: "/EPCDetail", state: { row: { operation: 'packing', asn: row._id }, data: { zone: row.zoneId && row.zoneId.zone_name } } }}>{row.transfer_items ? row.transfer_items.qt : '----'}</Link></TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}  align="center"><Link to={{ pathname: "/EPCDetail", state: { row: { operation: 'packing', asn: row._id }, data: { zone: row.zoneId && row.zoneId.zone_name } } }}>{row.received_items ? row.received_items.qt : '----'} </Link></TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}  align="center">{row ? row.operation_name : "----"}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}
export default function TransferCancelationTable({ asn }) {
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
    // const { row } = props;
    const [open, setOpen] = React.useState(false);
    // const classes = useRowStyles();
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
                    <TableHead style={{ backgroundColor: "#373E43" }}  >
                        <TableRow >
                            {/* <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} /> */}
                            <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} align="center" >Date</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} align="center">IBT</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} align="center">Source</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} align="center">Destination</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} align="center">Packed Items</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} align="center">Transfer Items</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} align="center">Received Items</TableCell>
                            <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} align="center">Status</TableCell>
                            {/* <TableCell align="center">Protein&nbsp;(g)</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {asn.map((row) => (
                            <Row key={row.name} row={row} />

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={asn.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                
                style={{ backgroundColor: "#263238", color: 'white' }}
            />
        </Paper>
    );
}
