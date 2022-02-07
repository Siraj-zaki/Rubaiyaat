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

export default function StickyHeadTable({ openModal, Site }) {
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
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table size="small" style={{ color: 'whitesmoke' }} stickyHeader aria-label="sticky table">
                    <TableHead style={{ color: 'whitesmoke' }}>
                        <TableRow >
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}
                                align='center'
                            >
                                Store Name
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}
                                align='center'
                            >
                                Store Location
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}
                                align='center'
                            >
                                Country Code
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}
                                align='center'
                            >
                                Company
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}
                                align='center'
                            >
                                Store Type
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}
                                align='center'
                            >
                                Status
                            </TableCell>
                            <TableCell
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}
                                align='center'
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Site.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((device) => {
                            return (
                                <TableRow style={{ backgroundColor: '#263238' }} hover role="checkbox" tabIndex={-1} key={device.storeID}>
                                    <React.Fragment>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.site_name}
                                        </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.storeLocation ? device.storeLocation : '----'}
                                        </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.countryName ? device.countryName : "Empty"}
                                        </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.company ? device.company : "Empty"}
                                        </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.storeType ? device.storeType : "Empty"}
                                        </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.status ? device.status : "Empty"}
                                        </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                                                <Link to={{ pathname: "/StoreInformation/EditStoreInformation", state: Site }}>
                                                    <Button style={{ height: 20, width: 20 }} variant="contained" className="m-1" color="primary"  >Edit</Button>
                                                </Link>
                                                <Button onClick={() => deleteFunction(device.storeID)} variant="contained" className="m-1" color="secondary" style={{ height: 20, minWidth: 20 }}>Delete</Button>
                                            </div>
                                        </TableCell>
                                    </React.Fragment>
                                </TableRow>
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
