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
        backgroundColor: '#263238',
        '& > *': {
            borderBottom: 'unset',
        },
    },
    backgroundColorfix: {
        backgroundColor: '#263238',
    },
});
function Row(props) {
    const { row } = props;
    const { deleteu } = props
    console.log(row);
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    // console.log(row);
    return (
        <React.Fragment>
            <TableRow className={'td-td'}>
                <TableCell style={{ color: 'white', fontWeight: 'normal', letterSpacing: 1, }} align="center">{row?.name}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'normal', letterSpacing: 1, }} align="center">{row?.userName}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'normal', letterSpacing: 1, }} align="center">{row?.roleId?.role_name}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'normal', letterSpacing: 1, }} align="center">
                    {row.siteId ? row.siteId.site_name : "Empty"}
                </TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'normal', letterSpacing: 1, }} align="center"> { row?.status}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'normal', letterSpacing: 1, }} align="center" >{ row?.last_login}</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'normal', letterSpacing: 1, }} align="center" >
                    <Link to={{ pathname: "/Users/EditUser", state: row }}>
                        <Button style={{ width: 20, height: 20 }} variant="contained" className="m-1" color='primary'>Edit</Button>
                    </Link>
                    <Button style={{ width: 20, height: 20 }} variant="contained" className="m-1" color="secondary" onClick={() => deleteu(row._id)}>Delete</Button>
                </TableCell>

            </TableRow>
        </React.Fragment>
    );
}
export default function CollapsibleTable({ Users, deleteUser }) {
    const useStyles = makeStyles({
        root: {
            width: '100%',
            backgroundColor: '#373E43'
        },
        container: {
            maxHeight: 440,
        },
    });
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [open, setOpen] = React.useState(false);
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
                    <TableHead   >
                        <TableRow  >
                            <TableCell  style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} align="center">Name</TableCell>
                            <TableCell  style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} align="center">UserName</TableCell>
                            <TableCell  style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} align="center">Roles(g)</TableCell>
                            <TableCell  style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} align="center">Site ID</TableCell>
                            <TableCell  style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} align="center">Status</TableCell>
                            <TableCell  style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} align="center">Last Login</TableCell>
                            <TableCell  style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Users.map((row) => (
                            <Row deleteu={(id) => deleteUser(id)} row={row} key={row.name} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={Users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ backgroundColor: "#373E43", color: 'white' }}
            />
        </Paper>
    );
}
