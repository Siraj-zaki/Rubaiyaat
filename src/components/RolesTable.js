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
// const DevicesData = [
//     {
//         id: 0,
//         roleName: "roleName",
//         createdName: "createdName",
//         permissions: 'permissions',
//         QrCode: 'Image',
//     },
//     {
//         id: 1,
//         roleName: "roleName",
//         createdName: "createdName",
//         permissions: 'permissions',
//         QrCode: 'Image',
//     }
// ];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 640,
    },
});

export default function RolesTable({ openModal, RoleData, deleteRole }) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [Devicesdata, setDevicesdata] = React.useState([
        {
            id: 0,
            roleName: "roleNameNew",
            createdName: "createdName",
            permissions: 'permissions',
            QrCode: 'Image',
        },
        {
            id: 1,
            roleName: "roleNameOld",
            createdName: "createdName",
            permissions: 'permissions',
            QrCode: 'Image',
        }
    ]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

        // arr = arr.filter(item => item.roleName !== value)
        // setDevicesdata(arr)
        // console.log(arr)
    }
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table size="small" style={{  color: 'whitesmoke' }} stickyHeader aria-label="sticky table">
                    <TableHead style={{  color: 'whitesmoke' }}>
                        <TableRow >
                            <TableCell
                                align='center'
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, border: "1px solid white" }}
                            >
                                Roles Name
                            </TableCell>
                            {/* <TableCell
                                align='center'
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1,border:"1px solid white" }}
                            >
                                Created Data
                            </TableCell> */}
                            <TableCell
                                align='center'
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, border: "1px solid white" }}
                            >
                                Permissions
                            </TableCell>
                            <TableCell
                                align='center'
                                style={{  color: 'white', fontWeight: 'bold', letterSpacing: 1, border: "1px solid white" }}
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {RoleData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((device, index) => {
                            return (
                                <TableRow  hover role="checkbox" tabIndex={-1} key={device.storeID}>
                                    <React.Fragment>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }} align='center'>
                                            {device.role_name}
                                        </TableCell>
                                        {/* <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1,border:'1px solid white' }}>
                                            {device.createdName}
                                        </TableCell> */}
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }} align='center'>
                                            <Button style={{ minWidth: 20, height: 20 }} onClick={() => openModal(device.permissions)} variant="contained" className="m-1" color="primary" >View</Button>
                                        </TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, border: '1px solid white' }} align='center'>
                                            <div style={{display:'flex',justifyContent:'center'}}>
                                                <Link to={{ pathname: "/Roles/EditRoles", state: device }}>
                                                    <Button style={{ width: 20, height: 20 }} variant="contained" className="m-1" color="primary" >Edit</Button>
                                                </Link>
                                                <Button style={{ minWidth: 20, height: 20 }} variant="contained" className="m-1" onClick={() => deleteRole(device._id)} color="secondary">Delete</Button>
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
                style={{ backgroundColor: "#263238 ", color: 'whitesmoke' }}
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={RoleData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
