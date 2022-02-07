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
                <TableCell className={classes.backgroundColorfix} >
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon htmlColor="white" /> : <KeyboardArrowDownIcon htmlColor="white" />}
                    </IconButton>
                </TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,border:'1px solid white' }} className={classes.backgroundColorfix} align="center">{row.SKU}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,border:'1px solid white' }} className={classes.backgroundColorfix} align="center">{row.deptName}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,border:'1px solid white' }} className={classes.backgroundColorfix} align="center">{row.Brand}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,border:'1px solid white' }} className={classes.backgroundColorfix} align="center">{row.Size}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,border:'1px solid white' }} className={classes.backgroundColorfix} align="center">{row.Color}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,border:'1px solid white' }} className={classes.backgroundColorfix} align="center">{row.expected}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,border:'1px solid white' }} className={classes.backgroundColorfix} align="center">{row.counted}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,border:'1px solid white' }} className={classes.backgroundColorfix} align="center">{row.countedSF}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,border:'1px solid white' }} className={classes.backgroundColorfix} align="center">{row.countedSR}</TableCell>
            </TableRow>
            <TableRow style={{ width: '100%' }}>
                <TableCell className={classes.backgroundColorfix} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse style={{ width: '100%' }} in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Actions
                            </Typography>
                            <Table style={{ width: '100%' }} size="small" aria-label="purchases">
                                <TableHead style={{ width: '100%' }} className={classes.backgroundColorfix}>
                                    <TableRow>
                                        <TableCell>Counted SF : {row.viewDetailData.countedSF}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell >Counted SR : {row.viewDetailData.countedSR}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell >Scanned : {row.viewDetailData.scanned}</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
const userData = [
    {
        SKU: "SKU", deptName: "deptName", Brand: "Brand", Size: "Size", Color: "Packed Items", delta: "delta", expected: "expected", counted: "counted", countedSF: '  countedSF', countedSR: "expectedSR", viewDetailData: {
            countedSF: "countedSF", countedSR: "countedSR", scanned: "scanned",
        },
    },
    {
        SKU: "SKU", deptName: "deptName", Brand: "Brand", Size: "Size", Color: "Packed Items", delta: "delta", expected: "expected", counted: "counted", countedSF: '  countedSF', countedSR: "expectedSR", viewDetailData: {
            countedSF: "countedSF", countedSR: "countedSR", scanned: "scanned",
        },
    },
]
const userInformation = userData
export default function CountOperationRealtimeTable() {
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
                                                        <TableCell align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }}/>
                            <TableCell>SKU</TableCell>
                            <TableCell align="center">deptName</TableCell>
                            <TableCell align="center">Brand</TableCell>
                            <TableCell align="center">Size</TableCell>
                            <TableCell align="center">Color</TableCell>
                            <TableCell align="center">Expected</TableCell>
                            <TableCell align="center">Counted</TableCell>
                            <TableCell align="center">CountedSF</TableCell>
                            <TableCell align="center">CountedSR</TableCell>
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
