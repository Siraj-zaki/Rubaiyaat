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

// const DevicesData = ;

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 640,
    },
});


export default function StickyHeadTable({ openModal, Devices, deleteDevice }) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // const [Devicesdata, setDevicesdata] = useState([
    //     {
    //         userName: 'Siraj',
    //         description: "this is my Device",
    //         status: 'Active',
    //         location: 'pakistan',
    //         UUID: '039482304s-sdfsd23123-dsfs',
    //         QrCode: 'Image',
    //     },
    //     {
    //         userName: 'Siraj',
    //         description: "this is my Device",
    //         status: 'Active',
    //         location: 'india',
    //         UUID: '039482304s-sdfsd2311223-dsfs',
    //         QrCode: 'Image',
    //     }
    // ])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteFunction = (roleName) => {
        // let value = roleName

        // let arr = Devicesdata

        // arr = arr.filter(item => item.UUID !== value)
        // setDevicesdata(arr)
        // console.log(arr)
    }
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table size="small" style={{ backgroundColor: "#373E43", color: 'whitesmoke' }} stickyHeader aria-label="sticky table">
                    <TableHead style={{ backgroundColor: "#373E43", color: 'whitesmoke' }}>
                        <TableRow >

                            <TableCell
                                style={{ backgroundColor: "#373E43", color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}
                                align="center"
                            >
                                User Name
                            </TableCell>
                            <TableCell
                                style={{ backgroundColor: "#373E43", color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}
                                align="center"
                            >
                                Description
                            </TableCell>
                            <TableCell
                                style={{ backgroundColor: "#373E43", color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}
                                align="center"
                            >
                                Status
                            </TableCell>
                            <TableCell
                                style={{ backgroundColor: "#373E43", color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}
                                align="center"
                            >
                                Location
                            </TableCell>
                            <TableCell
                                style={{ backgroundColor: "#373E43", color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}
                                align="center"
                            >
                                UUID
                            </TableCell>
                            <TableCell
                                style={{ backgroundColor: "#373E43", color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}
                                align="center"
                            >
                                Qr Code
                            </TableCell>
                            <TableCell
                                style={{ backgroundColor: "#373E43", color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}
                                align="center"
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Devices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((device) => {
                            return (
                                <TableRow style={{ backgroundColor: '#263238' }} hover role="checkbox" tabIndex={-1} key={device.UUID}>
                                    <React.Fragment>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}>
                                            {device.userName ? device.userName : '----'}
                                        </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}>
                                            {device.description ? device.description : '---'}
                                        </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}>
                                            {JSON.stringify(device.active)}
                                        </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}>
                                            {device.server ? device.server : "----"}
                                        </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}>
                                            {device.uuid ? device.uuid : "----"}
                                        </TableCell>
                                        
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}>
                                            <Button style={{ minWidth: 20, height: 20 }} onClick={() => openModal(device)} variant="contained" className="m-1" color="primary"  >Qr Code</Button>
                                        </TableCell>
                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center' }} >
                                                <Link to={{ pathname: "/Devices/EditDevice", state: device }}>
                                                    <Button style={{ width: 20, height: 20 }} variant="contained" className="m-1" color="primary"  >Edit</Button>
                                                </Link>
                                                <Button style={{ width: 20, height: 20 }} onClick={() => deleteDevice(device._id)} variant="contained" className="m-1" color="secondary" >Delete</Button>
                                            </div >
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
                count={Devices.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
