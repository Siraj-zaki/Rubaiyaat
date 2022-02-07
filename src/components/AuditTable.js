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
        auditID: 'auditID',
        auditText: "auditText",
        date: "date",
        logType: 'logType',
        storeName: 'storeName',
        retailCycleCount: 'retailCycleCount',
        auditJSON: 'auditJSON',
        deviceID: 'deviceID',
        QrCode: 'Image',
    },
    {
        auditID: 'auditID',
        auditText: "auditText",
        date: "date",
        logType: 'logType',
        storeName: 'storeName',
        retailCycleCount: 'retailCycleCount',
        auditJSON: 'auditJSON',
        deviceID: 'deviceID',
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

export default function AuditTable({ openModal }) {
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
                <Table size="small" style={{ color: 'whitesmoke' }} stickyHeader aria-label="sticky table">
                    <TableHead style={{ color: 'whitesmoke' }}>
                        <TableRow >
                            <TableCell
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, }}
                                align='center'
                            >
                                Audit ID
                            </TableCell>
                            <TableCell
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, }}
                                align='center'
                            >
                                Audit Text
                            </TableCell>
                            <TableCell
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, }}
                                align='center'
                            >
                                Date
                            </TableCell>
                            <TableCell
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, }}
                                align='center'
                            >
                                Log Type
                            </TableCell>
                            <TableCell
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, }}
                                align='center'
                            >
                                Store Name
                            </TableCell>
                            <TableCell
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, }}
                                align='center'
                            >
                                Retail Cycle Count
                            </TableCell>
                            <TableCell
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, }}
                                align='center'
                            >
                                Audit JSON
                            </TableCell>
                            <TableCell
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, }}
                                align='center'
                            >
                                Device ID
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {DevicesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((device) => {
                            return (
                                <TableRow style={{ backgroundColor: '#263238' }} hover role="checkbox" tabIndex={-1} key={device.storeID}>
                                    <React.Fragment>
                                        <TableCell align='center' style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.auditID}
                                        </TableCell>
                                        <TableCell align='center' style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.auditText}
                                        </TableCell>
                                        <TableCell align='center' style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.date}
                                        </TableCell>
                                        <TableCell align='center' style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.logType}
                                        </TableCell>
                                        <TableCell align='center' style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.storeName}
                                        </TableCell>
                                        <TableCell align='center' style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.retailCycleCount}
                                        </TableCell>
                                        <TableCell align='center' style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.auditJSON}
                                        </TableCell>
                                        <TableCell align='center' style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>
                                            {device.deviceID}
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
