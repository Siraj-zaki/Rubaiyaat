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
const useRowStyles = makeStyles({
    root: {
        backgroundColor: 'rgba(92, 92, 92, 1)',
        '& > *': {
            borderBottom: 'unset',
        },
    },
    backgroundColorfix: {
            },
});
function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    return (
        <React.Fragment>
            <TableRow >
                <TableCell width={200} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}  align="center">{row.id}</TableCell>
                <TableCell width={200} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}  align="center">{row.name}</TableCell>
                <TableCell width={200} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}  align="center">{row.ip}</TableCell>
                <TableCell width={200} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}  align="center">{row.port}</TableCell>
                <TableCell width={200} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}  align="center">{row.viewDetailData.printerDetail}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}
const userData = [
    {
        id: "1", name: "name", ip: "ip", port: "port", viewDetailData: {
            printerDetail: "details",
        },
    },
    {
        id: "1", name: "name", ip: "ip", port: "port", viewDetailData: {
            printerDetail: "details",
        },
    },
]
const userInformation = userData
export default function PrinterTable() {
    const useStyles = makeStyles({
        root: {
            width: '100%',
        },
        container: {
            maxHeight: 440,
        },
    });
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
                    <TableHead style={{ backgroundColor: "#263238" }}  >
                        <TableRow >
                            <TableCell width={200} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>ID</TableCell>
                            <TableCell width={200} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>Name</TableCell>
                            <TableCell width={200} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>IP</TableCell>
                            <TableCell width={200} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>Port</TableCell>
                            <TableCell width={200} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }}>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userInformation.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={userInformation.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                
                style={{ color: 'white' }}
            />
        </Paper>
    );
}
