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
        EPC: '1',
        SKU: "SKU",
        Store: "Store",
        BrandName: 'BrandName',
        Color: 'Color',
        Size: 'Size',
        ItemDescription: 'ItemDescription',
        // status: 'Status',
        QrCode: 'Image',
    },
    {
        EPC: '2',
        SKU: "SKU 2",
        Store: "Store 2",
        BrandName: 'BrandName 2',
        Color: 'Color 2',
        Size: 'Size 2',
        ItemDescription: 'ItemDescription 2',
        // status: 'Status 2',
        QrCode: 'Image',
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

export default function SupplyChainIBTDateTable({ openModal }) {
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
                <Table size="small" style={{  color: 'whitesmoke' }} stickyHeader aria-label="sticky table">
                    <TableHead style={{  color: 'whitesmoke' }}>
                        <TableRow >
                            <TableCell
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1 }}
                            >
                                EPC
                            </TableCell>
                            <TableCell
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1 }}
                            >
                                SKU
                            </TableCell>
                            <TableCell
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1 }}
                            >
                                Store
                            </TableCell>
                            <TableCell
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1 }}
                            >
                                Brand Name
                            </TableCell>
                            <TableCell
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1 }}
                            >
                                Color
                            </TableCell>
                            <TableCell
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1 }}
                            >
                                Size
                            </TableCell>
                            <TableCell
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1 }}
                            >
                                Item Disposition
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {DevicesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((device) => {
                            return (
                                <TableRow style={{ backgroundColor: '#263238' }} hover role="checkbox" tabIndex={-1} key={device.EPC}>
                                    <React.Fragment>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.EPC}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.SKU}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.Store}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.BrandName}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.Color}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.Size}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.ItemDescription}
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
