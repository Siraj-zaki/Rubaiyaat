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
export default function ZplTable({ openModal }) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [DevicesData, setDevicesData] = useState([
        {
            id: 'id-1',
            name: "name_siraj",
            ZPL: 'A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,',
            storeName: 'store_name',
            status: 'Active',
            remarks: 'remarks',
            QrCode: 'Image',
        },
        {
            id: 'id-2',
            name: "name_siraj",
            ZPL: 'A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,A^D&SA%SDd6as,',
            storeName: 'store_name',
            status: 'Active',
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

        arr = arr.filter(item => item.id !== value)
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
                                align='center'
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1 }}
                            >
                                ID
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1 }}
                            >
                                Name
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1 }}
                            >
                                ZPL
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1 }}
                            >
                                Store Name
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1 }}
                            >
                                Status
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1 }}
                            >
                                Remarks
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1 }}
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {DevicesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((device) => {
                            return (
                                <TableRow style={{ backgroundColor: '#263238' }} hover role="checkbox" tabIndex={-1} key={device.UUID}>
                                    <React.Fragment>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }} align='center'>
                                            {device.id}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }} align='center'>
                                            {device.name}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }} align='center'>
                                            <Button style={{ minWidth: 20, height: 20 }} onClick={openModal} variant="contained" className="m-1" color="primary" >ZPL Detail</Button>
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }} align='center'>
                                            {device.storeName}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }} align='center'>
                                            {device.status}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }} align='center'>
                                            {device.remarks}
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }} align='center'>
                                            <React.Fragment>
                                                <Link to={{ pathname: "/ZPL/EditZPL", state: DevicesData }}>
                                                    <Button style={{ width: 20, height: 20 }} variant="contained" className="m-1" color="primary" >Edit</Button>
                                                </Link>
                                                <Button style={{ width: 20, height: 20 }} onClick={() => deleteFunction(device.id)} variant="contained" className="m-1" color="secondary">Delete</Button>
                                            </React.Fragment>
                                        </TableCell>
                                    </React.Fragment>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                style={{ backgroundColor: "#263238 ", color: 'white' }}
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
