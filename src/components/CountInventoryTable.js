import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
const DevicesData = [
    {
        IBT: '1',
        Source: "Source",
        Destination: "Destination",
        PackedItems: 'PackedItems',
        TransferItems: 'TransferItems',
        ReceivedItems: 'ReceivedItems',
        Status: 'Status',
        PackingDate: 'Packing Date',
        PackingRemarks: 'Packing Remarks',
        ShipingDate: 'Shiping Date',
        ShipingRemarks: 'Shiping Remarks',
    },
    {
        IBT: '2',
        Source: "Source 2",
        Destination: "Destination 2",
        PackedItems: 'PackedItems 2',
        TransferItems: 'TransferItems 2',
        ReceivedItems: 'ReceivedItems 2',
        Status: 'Status 2',
        PackingDate: 'Packing Date',
        PackingRemarks: 'Packing Remarks',
        ShipingDate: 'Shiping Date',
        ShipingRemarks: 'Shiping Remarks',
    }
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 640,
    },
});

export default function CountInventoryTable({ openModal }) {
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
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table size='small' ReceivedItems="small" style={{  color: 'whitesmoke' }} stickyHeader aria-label="sticky table">
                    <TableHead style={{  color: 'whitesmoke' }}>
                        <TableRow >
                            <TableCell
                                align='center'
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}
                            >
                                IBT
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}
                            >
                                Source
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}
                            >
                                Destination
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}
                            >
                                Packed Items
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}
                            >
                                Transfer Items
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}
                            >
                                Received Items
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}
                            >
                                Status
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}
                            >
                                Packing Date
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}
                            >
                                Packing Remarks
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}
                            >
                                Shiping Date
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}
                            >
                                Shipping Remarks
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {DevicesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((device) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={device.IBT}>
                                    <React.Fragment>
                                        <TableCell
                                            align='center'
                                            style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}>
                                            {device.IBT}
                                        </TableCell>
                                        <TableCell
                                            align='center'
                                            style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}>
                                            {device.Source}
                                        </TableCell>
                                        <TableCell
                                            align='center'
                                            style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}>
                                            {device.Destination}
                                        </TableCell>
                                        <TableCell
                                            align='center'
                                            style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}>
                                            {device.PackedItems}
                                        </TableCell>
                                        <TableCell
                                            align='center'
                                            style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}>
                                            {device.TransferItems}
                                        </TableCell>
                                        <TableCell
                                            align='center'
                                            style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}>
                                            {device.ReceivedItems}
                                        </TableCell>
                                        <TableCell
                                            align='center'
                                            style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}>
                                            {device.Status}
                                        </TableCell>
                                        <TableCell
                                            align='center'
                                            style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}>
                                            {device.PackingDate}
                                        </TableCell>
                                        <TableCell
                                            align='center'
                                            style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}>
                                            {device.PackingRemarks}
                                        </TableCell>
                                        <TableCell
                                            align='center'
                                            style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}>
                                            {device.ShipingDate}
                                        </TableCell>
                                        <TableCell
                                            align='center'
                                            style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, border: '1px solid white' }}>
                                            {device.ShipingRemarks}
                                        </TableCell>
                                    </React.Fragment>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                style={{ backgroundColor: "#263238 ", color: 'whitesmoke' }}
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={DevicesData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
