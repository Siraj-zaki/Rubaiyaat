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
        backgroundColor: "#263238",
    },
});
function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    return (
        <React.Fragment>
            <TableRow style={{ backgroundColor: '#263238' }} className={classes.root}>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,border:'1px solid white' }} className={classes.backgroundColorfix} align="center">{row.Date}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,border:'1px solid white' }} className={classes.backgroundColorfix} align="center">{row.store}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,border:'1px solid white' }} className={classes.backgroundColorfix} align="center">{row.department}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,border:'1px solid white' }} className={classes.backgroundColorfix} align="center">{row.Accuracy}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,border:'1px solid white' }} className={classes.backgroundColorfix} align="center">{row.UIA}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,border:'1px solid white' }} className={classes.backgroundColorfix} align="center">{row.expected}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}
const userData = [
    {
        Date: "21/10/2021", store: "store", department: "department", Accuracy: "Accuracy", UIA: "Packed Items", expected: "Transfer items", viewDetailData: {
            countedSF: "countedSF", countedSR: "countedSR", scanned: "scanned",
        },
    },
    {
        Date: "21/10/2021", store: "store", department: "department", Accuracy: "Accuracy", UIA: "Packed Items", expected: "Transfer items", viewDetailData: {
            countedSF: "countedSF", countedSR: "countedSR", scanned: "scanned",
        },
    },
]
const userInformation = userData
export default function CountOperationOver20Table() {
    const useStyles = makeStyles({
        root: {
            width: '100%',
        },
        container: {
            maxHeight: 540,
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
            <TableContainer className={classes.backgroundColorfix} >
                <Table size="small" aria-label="collapsible table">
                    <TableHead style={{ backgroundColor: "#263238" }}  >
                        <TableRow >
                            <TableCell>Date</TableCell>
                            <TableCell align="center">Store</TableCell>
                            <TableCell align="center">Department</TableCell>
                            <TableCell align="center">Accuracy</TableCell>
                            <TableCell align="center">UiA</TableCell>
                            <TableCell align="center">Expected</TableCell>
                            {/* <TableCell align="center">Protein&nbsp;(g)</TableCell> */}
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
                className={classes.backgroundColorfix}
                style={{ backgroundColor: "#263238" }}
            />
        </Paper>
    );
}
