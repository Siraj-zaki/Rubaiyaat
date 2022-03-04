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
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const { row } = props
    const { openModal } = props
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
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
export default function ItemMasterTable({ asn, openModal, edit }) {
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
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
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

    const handleClose = () => {
        setOpen(!open)
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
            >
                <div style={{ width: '60%', minHeight: "80%", background: 'lightgray', display: 'flex', justifyContent: 'space-evenly', alignItems: 'space-evenly', flexDirection: 'column' }}>
                    <div style={{ width: '100%', minHeight: "100%", background: 'lightgray', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>

                        <div style={{ minWidth: 300, width: '45%', height: '85%', minHeight: '300px', flexDirection: 'column' }}>
                            <Typography colo>Current Values</Typography>
                            <BasicTextFields
                                margin={10}
                                placeholder="Category"
                                name="Category"
                                value={"asset Details"}
                            // onChangeEvent={(e) =>
                            //     this.setState({ Item_Category: e.target.value })
                            // }
                            />
                        </div>
                        <div style={{ minWidth: 300, width: '45%', height: '85%', minHeight: '300px', flexDirection: 'column' }}>
                            <Typography colo>New  Values</Typography>
                        </div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', minHeight: 150 }}>
                        sdf
                    </div>
                </div>

            </Modal>
            <Paper className={classes.root}  >
                <TableContainer  >
                    <Table size="small" aria-label="collapsible table">
                        <TableHead style={{ backgroundColor: "#263238" }}  >
                            <TableRow >
                                {edit &&
                                    <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">action</TableCell>
                                }
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Creation_Date</TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Owner_Name</TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">EPC</TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Serial Number</TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Department</TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Zone</TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Asset_Location</TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Inventory_Date</TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Modification_Date</TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Asset_Status</TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Asset_Value </TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Site </TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Description </TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Sub_category_code </TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Sub_category_name </TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Category_name </TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Category_code </TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Image</TableCell>
                                <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Barcode </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {asn.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <Row openModal={(device) => openModal(device)} key={row.Odoo_Tag} row={row} />
                        ))} */}
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow style={{ backgroundColor: '#263238' }} hover role="checkbox" tabIndex={-1} key={index}>
                                        <React.Fragment>
                                            {edit &&
                                                <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">
                                                    <Button
                                                        type="submit"
                                                        color={"primary"}
                                                        onClick={() => setOpen(true)}
                                                        variant="contained"

                                                    >
                                                        Edit
                                                    </Button>
                                                </TableCell>
                                            }
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{new Date(row?.createdAt).toLocaleString('en-Us', "Asia/Muscat")}</TableCell>
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.ownerName || "----"}</TableCell>
                                            {/* <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.assetType || "----"}</TableCell> */}
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.asset_EPC || "----"}</TableCell>
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.serialNumber || "----"}</TableCell>
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.departementId?.departement_name || "----"}</TableCell>
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.zoneId?.zone_name || "----"}</TableCell>
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.location || "----"}</TableCell>
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.inventoryDate || "----"}</TableCell>
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{new Date(row?.updatedAt).toLocaleString('en-Us', "Asia/Muscat") || "----"}</TableCell>
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.assetStatus || "----"}</TableCell>
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.assetValue || "----"}</TableCell>
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.siteId?.site_name || "----"}</TableCell>
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.description || "----"}</TableCell>
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.sub_category_code || "----"}</TableCell>
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.sub_category_name || "----"}</TableCell>
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.category_code || "----"}</TableCell>
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">{row?.category_name || "----"}</TableCell>
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">
                                                <Button style={{ minWidth: 20, height: 20 }} onClick={() => openModal(row?.imageLink)} variant="contained" className="m-1" color="primary"  >Image</Button>
                                            </TableCell>
                                            <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, minWidth: "200px", }} align="center">
                                                <Button style={{ minWidth: 20, height: 20 }} onClick={() => openModal(row?.asset_EPC)} variant="contained" className="m-1" color="primary"  >Barcode</Button>
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
            </Paper>
        </>
    );
}
