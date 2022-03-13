import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import { Button, Modal } from '@material-ui/core';
import BasicTextFields from './Input';
import { Typography } from 'antd';
import api from '../services/api';
import { toast } from 'react-toastify';
const useRowStyles = makeStyles({
    root: {
        backgroundColor: 'rgba(92, 92, 92, 1)',
        '& > *': {
            borderBottom: 'unset',
        },
    },

});
function Row(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const { row } = props
    const { openModal } = props
    return (
        <React.Fragment>
            <TableRow className={`counted-class-${row?.Matched === true ? 'green' : row.Matched === false ? 'gray' : row?.OversCounted === true ? 'red' : ''}`}>
                <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{new Date(row?.createdAt).toLocaleString('en-Us', "Asia/Muscat")}</TableCell>
                <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.assetDetail[0].assetName || "----"}</TableCell>
                {/* <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.assetDetail[0].assetType || "----"}</TableCell> */}
                <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.assetDetail[0].EPCID || "----"}</TableCell>
                <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.assetDetail[0].department || "----"}</TableCell>
                <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.assetDetail[0].location || "----"}</TableCell>
                <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.assetDetail[0].inventoryDate || "----"}</TableCell>
                <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{new Date(row?.updatedAt).toLocaleString('en-Us', "Asia/Muscat") || "----"}</TableCell>
                <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.assetDetail[0].assetStatus || "----"}</TableCell>
                <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.assetDetail[0].assetValue || "----"}</TableCell>
                <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.assetDetail[0].site?.site_name || "----"}</TableCell>
                <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.assetDetail[0].description || "----"}</TableCell>
                <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">
                    <Button style={{ minWidth: 20, height: 20 }} onClick={() => openModal(row?.assetDetail[0].imageLink)} variant="contained" className="m-1" color="primary"  >Image</Button>
                </TableCell>
                <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">
                    <Button style={{ minWidth: 20, height: 20 }} onClick={() => openModal(row?.assetDetail[0].EPCID)} variant="contained" className="m-1" color="primary"  >Barcode</Button>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}
export default function StockOnHandTable({ asn, openModal, edit, runFunction, zoneName, matched, overs, unders }) {
    const useStyles = makeStyles({
        root: {
            width: '100%',
        },
        container: {
            maxHeight: 440,
        },
        backgroundColorfix: {
            backgroundColor: "#263238",
        },
    });
    // const { row } = props;
    const [open, setOpen] = React.useState(false);
    // const classes = useRowStyles();
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [data, setData] = React.useState([]);
    const [rowData, setRowData] = React.useState('');
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [state, setState] = React.useState({
        serialNumber: '',
        asset_EPC: '',
        category_code: '',
        category_name: '',
        sub_category_code: '',
        sub_category_name: '',
        ownerName: '',
        assetStatus: '',
        DEPRECIATION: '',
        NBV: '',
        REMARKS: '',
        site: '',
        zone: '',
        department: '',
    })
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChange = (evt) => {
        console.log(evt.target.value);
        console.log(evt.target.name);
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    const handleEditApi = async () => {
        let editData = {
            serialNumber: rowData.serialNumber || state.serialNumber,
            asset_EPC: rowData.asset_EPC || state.asset_EPC,
            category_code: rowData.category_code || state.category_code,
            category_name: rowData.category_name || state.category_name,
            sub_category_code: rowData.sub_category_code || state.sub_category_code,
            sub_category_name: rowData.sub_category_name || state.sub_category_name,
            ownerName: rowData.ownerName || state.ownerName,
            assetStatus: rowData.assetStatus || state.assetStatus,
            DEPRECIATION: rowData.DEPRECIATION || state.DEPRECIATION,
            NBV: rowData.NBV || state.NBV,
            REMARKS: rowData.REMARKS || state.REMARKS,
        }
        const apiReq = await api.editSohByParams(editData, rowData?._id).then(res => {
            setOpen(false)
            toast.success("Asset Edit SuccessFully")
            setTimeout(() => {
                runFunction()
            }, 500);
        })
        console.log(apiReq);
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const editHandler = (row) => {
        setOpen(!open)
        setRowData(row)
    }

    const handleClose = () => {
        setOpen(!open)
    }

    return (

        <Paper className={classes.root}  >
            {!!asn.length ?
                <React.Fragment>
                    <TableContainer  >
                        <Table size="small" aria-label="collapsible table">
                            <TableHead style={{ backgroundColor: "#263238" }}  >
                                <TableRow  >
                                    {/* <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Zone Name</TableCell> */}
                                    {/* <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Creation_Date</TableCell> */}
                                    <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Matched</TableCell>
                                    <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Overs</TableCell>
                                    <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Unders </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {asn.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <Row openModal={(device) => openModal(device)} key={row.Odoo_Tag} row={row} />
                        ))} */}

                                <TableRow hover role="checkbox" tabIndex={-1} >
                                    <React.Fragment>
                                        {/* <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{zoneName}</TableCell> */}
                                        <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{matched || 0}</TableCell>
                                        <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{overs || 0}</TableCell>
                                        <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{unders || 0}</TableCell>
                                    </React.Fragment>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={1}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        className={classes.backgroundColorfix}
                        style={{ backgroundColor: "#263238", color: 'white' }}
                    />
                </React.Fragment> :
                <div style={{ width: '100%', height: '200px', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h1>No Data</h1>
                </div>
            }
        </Paper>
    );
}
