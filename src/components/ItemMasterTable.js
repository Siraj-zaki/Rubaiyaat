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
export default function ItemMasterTable({ asn, openModal, edit, runFunction }) {
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
    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
        // return console.log([year, month, day].join('-'))
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    useEffect(() => {
        let asd = state
    }, [state])

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
    const handleDeleteApi = async () => {
        const apiReq = await api.deleteItemMaster(data, rowData?._id).then(res => {
            setOpen(false)
            toast.success("Asset Deleted SuccessFully")
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
    useEffect(() => {
        // setData(asn)
        if (asn === true) {
            setData([])
            setPage(0);
        } else {
            setData(asn)
            setPage(0);
        }
    }, [asn]);
    const editHandler = (row) => {
        setOpen(!open)
        setRowData(row)
    }

    const handleClose = () => {
        setOpen(!open)
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                fullScr
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
            >
                <div style={{ width: '80%', height: "80%", background: "#2c2b2b", boxShadow: "0px 1px 5px 1px lightGray", borderRadius: 10, display: 'flex', justifyContent: 'space-evenly', alignItems: 'space-evenly', flexDirection: 'column', overflowY: 'scroll' }}>
                    <div style={{ width: '100%', minHeight: "80%", display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', overflowY: 'scroll', paddingTop: 300 }}>
                        <div style={{ minWidth: 300, width: '45%', minHeight: '300px', flexDirection: 'column', paddingBottom: 30, paddingTop: 30 }}>
                            <Typography colo>Current Values</Typography>
                            <BasicTextFields
                                margin={10}
                                disabled={true}
                                placeholder="Serial Number"
                                name="Serial Number"
                                value={rowData.serialNumber}
                            />
                            <BasicTextFields
                                margin={10}
                                disabled={true}
                                placeholder="asset_EPC"
                                name="asset_EPC"
                                value={rowData.asset_EPC}
                            />
                            {/* <BasicTextFields
                                margin={10}
                                disabled={true}
                                placeholder="Site"
                                name="Site"
                                value={rowData.siteId?.site_name}
                            /> */}
                            <BasicTextFields
                                margin={10}
                                disabled={true}
                                placeholder="category_code"
                                name="category_code"
                                value={rowData.category_code}
                            />
                            <BasicTextFields
                                margin={10}
                                disabled={true}
                                placeholder="category_name"
                                name="category_name"
                                value={rowData.category_name}
                            />
                            <BasicTextFields
                                margin={10}
                                disabled={true}
                                placeholder="sub_category_code"
                                name="sub_category_code"
                                value={rowData.sub_category_code}
                            />
                            <BasicTextFields
                                margin={10}
                                disabled={true}
                                placeholder="sub_category_name"
                                name="sub_category_name"
                                value={rowData.sub_category_name}
                            />
                            {/* <BasicTextFields
                                margin={10}
                                disabled={true}
                                placeholder="Department"
                                name="Department"
                                value={rowData.departementId?.departement_name}
                            />
                            <BasicTextFields
                                margin={10}
                                disabled={true}
                                placeholder="Location"
                                name="Location"
                                value={rowData.zoneId?.zone_name}
                            /> */}
                            <BasicTextFields
                                margin={10}
                                disabled={true}
                                placeholder="ownerName (Custodian)"
                                name="ownerName (Custodian)"
                                value={rowData.ownerName}
                            />
                            <BasicTextFields
                                margin={10}
                                disabled={true}
                                placeholder="assetStatus"
                                name="assetStatus"
                                value={rowData.assetStatus}
                            />
                            <BasicTextFields
                                margin={10}
                                disabled={true}
                                placeholder="DEPRECIATION"
                                name="DEPRECIATION"
                                value={rowData.DEPRECIATION}
                            />
                            <BasicTextFields
                                margin={10}
                                disabled={true}
                                placeholder="NBV"
                                name="NBV"
                                value={rowData.NBV}
                            />
                            <BasicTextFields
                                margin={10}
                                disabled={true}
                                placeholder="REMARKS"
                                name="REMARKS"
                                value={rowData.REMARKS}
                            />
                        </div>
                        <div style={{ minWidth: 300, width: '45%', minHeight: '300px', flexDirection: 'column', paddingBottom: 30, paddingTop: 30 }}>
                            <Typography colo>New  Values</Typography>
                            <BasicTextFields
                                margin={10}
                                customName={"serialNumber"}
                                placeholder="serialNumber"
                                name="serialNumber"
                                value={state.serialNumber}
                                onChangeEvent={(e) => handleChange(e)}
                            />
                            <BasicTextFields
                                margin={10}
                                onChangeEvent={(e) => handleChange(e)}

                                placeholder="asset_EPC"
                                name="asset_EPC"
                                value={state.asset_EPC}
                            />
                            {/* <BasicTextFields
                                margin={10}
                                onChangeEvent={(e) => handleChange(e)}

                                placeholder="site"
                                name="site"
                                value={state.site}
                            /> */}
                            <BasicTextFields
                                margin={10}
                                onChangeEvent={(e) => handleChange(e)}

                                placeholder="category_code"
                                name="category_code"
                                value={state.category_code}
                            />
                            <BasicTextFields
                                margin={10}
                                onChangeEvent={(e) => handleChange(e)}

                                placeholder="category_name"
                                name="category_name"
                                value={state.category_name}
                            />
                            <BasicTextFields
                                margin={10}
                                onChangeEvent={(e) => handleChange(e)}

                                placeholder="sub_category_code"
                                name="sub_category_code"
                                value={state.sub_category_code}
                            />
                            <BasicTextFields
                                margin={10}
                                onChangeEvent={(e) => handleChange(e)}

                                placeholder="sub_category_name"
                                name="sub_category_name"
                                value={state.sub_category_name}
                            />
                            {/* <BasicTextFields
                                margin={10}
                                onChangeEvent={(e) => handleChange(e)}

                                placeholder="department"
                                name="department"
                                value={state.department}
                            />
                            <BasicTextFields
                                margin={10}
                                onChangeEvent={(e) => handleChange(e)}

                                placeholder="zone"
                                name="zone"
                                value={state.zone}
                            /> */}
                            <BasicTextFields
                                margin={10}
                                onChangeEvent={(e) => handleChange(e)}

                                placeholder="ownerName"
                                name="ownerName"
                                value={state.ownerName}
                            />
                            <BasicTextFields
                                margin={10}
                                onChangeEvent={(e) => handleChange(e)}

                                placeholder="assetStatus"
                                name="assetStatus"
                                value={state.assetStatus}
                            />
                            <BasicTextFields
                                margin={10}
                                onChangeEvent={(e) => handleChange(e)}

                                placeholder="DEPRECIATION"
                                name="DEPRECIATION"
                                value={state.DEPRECIATION}
                            />
                            <BasicTextFields
                                margin={10}
                                onChangeEvent={(e) => handleChange(e)}

                                placeholder="NBV"
                                name="NBV"
                                value={state.NBV}
                            />
                            <BasicTextFields
                                margin={10}
                                onChangeEvent={(e) => handleChange(e)}

                                placeholder="REMARKS"
                                name="REMARKS"
                                value={state.REMARKS}
                            />
                        </div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', minHeight: 80, marginTop: 10 }}>
                        <Button style={{ width: '70px', height: '40px' }} variant='contained' onClick={() => handleEditApi()} >Save</Button>
                        <Button style={{ width: '70px', height: '40px' }} variant='contained' onClick={() => setOpen(!open)} >Cancel</Button>
                        <Button style={{ width: '70px', height: '40px' }} variant='contained'  onClick={() => handleDeleteApi()} >Delete</Button>
                    </div>

                </div>

            </Modal>
            <Paper className={classes.root}  >
                {!!asn.length ?
                    <React.Fragment>
                        <TableContainer  >
                            <Table size="small" aria-label="collapsible table">
                                <TableHead style={{ backgroundColor: "#263238" }}  >
                                    <TableRow  >
                                        {edit &&
                                            <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">action</TableCell>
                                        }
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Image</TableCell>
                                        {/* <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Creation_Date</TableCell> */}
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">EPC</TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Serial Number</TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Site </TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Category_code </TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Category_name </TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Sub_category_code </TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Sub_category_name </TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Department</TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Location</TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Custodian</TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Description </TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Asset_Status</TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">ACQUISITION_DATE</TableCell>
                                        {/* <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">DEPRECIATION</TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">NBV</TableCell> */}
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">createdAt</TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">updatedAt</TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">DEPRECIATION</TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">NBV</TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">REMARKS</TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">maintenanceDate</TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">EPC Barcode </TableCell>
                                        <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Serial Barcode </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {asn.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <Row openModal={(device) => openModal(device)} key={row.Odoo_Tag} row={row} />
                        ))} */}
                                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        return (
                                            <TableRow className={`counted-class-${row?.Matched === true ? 'green' : row.Matched === false ? 'gray' : row?.OversCounted === true ? 'red' : ''}`} hover role="checkbox" tabIndex={-1} key={index}>
                                                <React.Fragment>
                                                    {edit &&
                                                        <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">
                                                            <Button
                                                                type="submit"
                                                                color={"primary"}
                                                                onClick={() => editHandler(row)}
                                                                variant="contained"

                                                            >
                                                                Edit
                                                            </Button>
                                                        </TableCell>
                                                    }
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">
                                                        {/* <Button style={{ minWidth: 20, height: 20 }} onClick={() => openModal(row?.imageLink)} variant="contained" className="m-1" color="primary"  > */}
                                                        {
                                                            row?.imageLink ?
                                                                <img onClick={() => openModal(row?.imageLink)} src={row?.imageLink} height="50px" width='50px' style={{ objectFit: 'contain', cursor: 'pointer' }} />
                                                                :
                                                                <Button style={{ minWidth: 20, height: 20 }} onClick={() => openModal(row?.imageLink)} variant="contained" className="m-1" color="primary"  >No Image</Button>
                                                        }
                                                        {/* </Button> */}
                                                    </TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.asset_EPC || "----"}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.serialNumber || "----"}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.siteId?.site_name || "----"}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.category_code || "----"}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.category_name || "----"}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.sub_category_code || "----"}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.sub_category_name || "----"}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.departementId?.departement_name || "----"}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.zoneId?.zone_name || "----"}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.ownerName || "----"}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.description || "----"}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.assetStatus || "----"}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.ACQUISITION_DATE || "----"}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{new Date(row?.createdAt).toLocaleString('en-Us', "Asia/Muscat")}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{new Date(row?.updatedAt).toLocaleString('en-Us', "Asia/Muscat") || "----"}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.DEPRECIATION || "----"}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.NBV || "----"}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.REMARKS || "----"}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{formatDate(row?.maintenanceDate) === 'NaN-NaN-NaN' ? "----" : formatDate(row?.maintenanceDate)}</TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">
                                                        <Button style={{ minWidth: 20, height: 20 }} onClick={() => openModal(row?.asset_EPC)} variant="contained" className="m-1" color="primary"  >EPC Barcode</Button>
                                                    </TableCell>
                                                    <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">
                                                        <Button style={{ minWidth: 20, height: 20 }} onClick={() => openModal(row?.serialNumber)} variant="contained" className="m-1" color="primary"  >Serial Barcode</Button>
                                                    </TableCell>
                                                </React.Fragment>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={asn.length}
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
        </>
    );
}
