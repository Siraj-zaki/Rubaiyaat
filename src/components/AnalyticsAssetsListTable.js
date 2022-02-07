import React, { useState } from 'react';
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

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 640,
    },
});

export default function AnalyticsAssetsListTable({ openModal, Site, EpcData }) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [DevicesData, setDevicesData] = useState([
        {
            storeID: '1',
            storeName: "Store Name",
            storeLocation: "Store Location",
            latLong: 'Latitude and Longitude',
            countryName: 'pakistan',
            company: 'Multiware Solution',
            storeType: 'Store Type',
            status: 'Status',
            QrCode: 'Image',
        },
        {
            storeID: '2',
            storeName: "Store Name 2",
            storeLocation: "Store Location 2",
            latLong: 'Latitude and Longitude 2',
            countryName: 'pakistan 2',
            company: 'Multiware Solution 2',
            storeType: 'Store Type 2',
            status: 'Status 2',
            QrCode: 'Image',
        }
    ])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const deleteFunction = (roleName) => {
        let value = roleName

        let arr = DevicesData

        arr = arr.filter(item => item.storeID !== value)
        setDevicesData(arr)
        console.log(arr)
    }
    // moment(device.createdAt).valueOf()
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table size="small" style={{ color: 'whitesmoke' }} stickyHeader aria-label="sticky table">
                    <TableHead style={{ color: 'whitesmoke' }}>
                        <TableRow >
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}
                                align='center'
                            >
                                Epc
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}
                                align='center'
                            >
                                Id
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}
                                align='center'
                            >
                                Date
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}
                                align='center'
                            >
                                Asn
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}
                                align='center'
                            >
                                InputNote
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}
                                align='center'
                            >
                                Operation
                            </TableCell>
                            {/* <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}
                                align='center'
                            >
                                Zone
                            </TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Site.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((device) => {
                            return (
                                device.epc.map(item => {
                                    return <TableRow hover role="checkbox" tabIndex={-1} key={device.storeID}>
                                        <TableCell
                                            style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}
                                            align='center'
                                        >
                                            {item}
                                        </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}>
                                            {device._id}
                                        </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}>
                                            {device.createdAt}
                                        </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}>
                                            {device.asn ? device.asn.asn : '----'}
                                        </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}>
                                            {device.inputNote ? device.inputNote : "Empty"}
                                        </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}>
                                            {device.operation ? device.operation : "Empty"}
                                        </TableCell>
                                    </TableRow>
                                }
                                )
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                style={{ color: 'white' }}
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={Site.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
