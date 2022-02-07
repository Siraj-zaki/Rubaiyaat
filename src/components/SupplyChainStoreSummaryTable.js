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
        Date: '1',
        SKU: "SKU",
        RetailItemBatchId: "Retail Item Batch Id",
        SupplierNumber: 'Supplier Number',
        ShipmentNumber: 'Shipment Number',
        Store: 'Store',
        PurchaseOrder: 'Purchase Order',
        EPC: 'EPC',
        Remarks: 'Remarks',
        ID: 'ID',
        ShipingRemarks: 'Shiping Remarks',
    },
    {
        Date: '2',
        SKU: "SKU 2",
        RetailItemBatchId: "Retail Item Batch Id 2",
        SupplierNumber: 'Supplier Number 2',
        ShipmentNumber: 'Shipment Number 2',
        Store: 'Store 2',
        PurchaseOrder: 'PurchaseOrder 2',
        EPC: 'EPC',
        Remarks: 'Remarks',
        ID: 'ID',
        ShipingRemarks: 'Remarks',
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

export default function SupplyChainStoreSummaryTable({ openModal }) {
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
                <Table size='small' Store="small" style={{ color: 'whitesmoke' }} stickyHeader aria-label="sticky table">
                    <TableHead style={{ color: 'whitesmoke' }}>
                        <TableRow >
                            <TableCell
                                align='center'
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }}
                            >
                                Date
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }}
                            >
                                SKU
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }}
                            >
                                Retail Item Batch Id
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }}
                            >
                                Suppliers Numbers
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }}
                            >
                                Shippment Numbers
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }}
                            >
                                Store
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }}
                            >
                                Purchase Order
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }}
                            >
                                EPC
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }}
                            >
                                Remarks
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }}
                            >
                                ID
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {DevicesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((device) => {
                            return (
                                <TableRow style={{ backgroundColor: '#263238' }} hover role="checkbox" tabIndex={-1} key={device.Date}>
                                    <React.Fragment>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }} align='center'>
                                            {device.Date}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }} align='center'>
                                            {device.SKU}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }} align='center'>
                                            {device.RetailItemBatchId}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }} align='center'>
                                            {device.SupplierNumber}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }} align='center'>
                                            {device.ShipmentNumber}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }} align='center'>
                                            {device.Store}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }} align='center'>
                                            {device.PurchaseOrder}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }} align='center'>
                                            {device.EPC}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }} align='center'>
                                            {device.Remarks}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 13, }} align='center'>
                                            {device.ID}
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
