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
        UID: '1',
        EPC: "EPC",
        SKU: "SKU",
        ProductName: "ProductName",
        PO: 'PO',
        SupplierID: 'SupplierID',
        ShipmentID: 'ShipmentID',
        Comment: 'Comment',
        StoreID: 'Packing Date',
        Status: 'Packing Remarks',
        ShipingDate: 'Shiping Date',
        ShipingRemarks: 'Shiping Remarks',
    },
    {
        UID: '2',
        EPC: "EPC 2",
        SKU: "SKU 2",
        ProductName: "ProductName 2",
        PO: 'PO 2',
        SupplierID: 'SupplierID 2',
        ShipmentID: 'ShipmentID 2',
        Comment: 'Comment 2',
        StoreID: 'Packing Date',
        Status: 'Packing Remarks',
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

export default function ZPLReportSKUTable({ openModal }) {
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
                <Table ShipmentID="small" style={{ color: 'whitesmoke' }} stickyHeader aria-label="sticky table">
                    <TableHead style={{ color: 'whitesmoke' }}>
                        <TableRow >
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}
                            >
                                U_ID
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}
                            >
                                EPC
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}
                            >
                                SKU
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}
                            >
                                Product Name
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}
                            >
                                PO #
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}
                            >
                                Supplier ID
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}
                            >
                                Shipment No
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}
                            >
                                Comment
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}
                            >
                                Store ID
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}
                            >
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {DevicesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((device) => {
                            return (
                                <TableRow  hover role="checkbox" tabIndex={-1} key={device.UID}>
                                    <React.Fragment>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}>
                                            {device.UID}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}>
                                            {device.EPC}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}>
                                            {device.SKU}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}>
                                            {device.ProductName}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}>
                                            {device.PO}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}>
                                            {device.SupplierID}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}>
                                            {device.ShipmentID}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}>
                                            {device.Comment}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}>
                                            {device.StoreID}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }}>
                                            {device.Status}
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
