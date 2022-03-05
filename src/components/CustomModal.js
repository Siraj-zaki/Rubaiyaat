import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import BasicTextFields from './Input';
import Barcode from 'react-barcode'
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: 20,
        top: -3,
        color: "white",
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle style={{ backgroundColor: '#212121' }} disableTypography className={classes.root} {...other}>
            <Typography style={{ color: 'whitesmoke' }} variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function CustomModal({ handleClickOpen, open, handleClose, data, image, ZplDetail, permissions, ZPLData, QrCode, EpcData, mapData }) {
    return (
        <Dialog fullWidth={320} color="secondary" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle style={{ backgroundColor: QrCode ? "gray" : '#212121' }} id="customized-dialog-title" onClose={handleClose}>
                {image ? "Image" : ""}
                {ZplDetail ? "ZIP DETAIL" : ""}
                {permissions ? "Permissions" : ""}
                {ZPLData ? "Details" : ""}
                {EpcData ? "EPC" : ""}
            </DialogTitle>
            <DialogContent style={{ backgroundColor: QrCode ? "gray " : '#212121', color: "whitesmoke", wordBreak: 'break-word', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', flexDirection: 'column' }} dividers>
                {image ? data?.includes('profilePics') ? <img src={data} height={300} width={'400px'} style={{ objectFit: 'contain' }} /> : <Barcode value={data} /> : null}
                {QrCode ? <QRCode renderAs='svg' width="60%" height="60%" size={200} value={`${QrCode.userName}|${QrCode.password}|${QrCode.siteId ? QrCode.siteId._id : null}|${QrCode.server}`} /> : ""}
                {ZplDetail ? "^XA ^LL430 ^PW431 ^XZ ^XA ^FO30,130^A0B,32,32,^FDStyle no:${Retail_Product_style}^FS ^FO80,90^A0B,32,32,^FD${Retail_Product_SKUOriginal}^FS ^FO140,180^A0B,32,32,^FDSize:${Retail_Product_Size}^FS ^FO140,140^A0B,32,32,^FDS^FS ^FO180,90^GB3,150,3^FS ^FO200,195^A0B,32,32,^FDSR.^FS ^FO200,80^A0B,32,32,^FD${Retail_Product_Price}^FS ^FO260,17^BY2,2,70,^BCB,100,Y,N,Y,A^FD${Retail_Product_item_code}^FS ^RFW,H^FD${serialNumber}^FS ^FO20,20^A0N,16,18,^FH^FD${serialNumber}^FS ^XZ " : ""}
                {permissions ? Object.entries(permissions).map((item => {
                    return <p>{item}</p>
                })) : ""}
                {EpcData ? Object.entries(EpcData).map((item => {
                    return <p>{item}</p>
                })) : ""}
                {ZPLData ? <React.Fragment>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, margin: 10, padding: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: 'column' }} >
                            <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', }}>
                                <BasicTextFields name="UUID" onChangeEvent={(e) => this.setState({ UUID: e.target.value })} />
                                <BasicTextFields name="QTY" onChangeEvent={(e) => this.setState({ QTY: e.target.value })} />
                            </div>
                            <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', }}>
                                <BasicTextFields name="Product Name" onChangeEvent={(e) => this.setState({ productName: e.target.value })} />
                                <BasicTextFields name="SKU" onChangeEvent={(e) => this.setState({ SKU: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </React.Fragment> : ""}
                {mapData ? <React.Fragment>
                    {/* {mapData.map((item => { */}
                    <p> id: {mapData._id}</p>
                    <p> asn: {mapData.asn}</p>
                    <p> asset name: {mapData.asset_name}</p>
                    <p> operation: {mapData.operation}</p>
                    <p> input note: {mapData.inputNote}</p>
                    {/* }))} */}
                </React.Fragment> : ""}

                {/*{console.log(mapData, "dfasfsdfsdfs")}*/}
            </DialogContent>
            <DialogActions style={{ backgroundColor: QrCode ? "gray" : '#212121' }}>
                {/* <Link to={{ pathname: "/Analytics/AnalyticsMovementReport", state:  mapData?.asset_EPC }} style={{ color: 'whitesmoke' }} autoFocus color="primary">
                    See Movement Report
                </Link> */}
                <Button style={{ color: 'whitesmoke' }} autoFocus onClick={handleClose} color="primary">
                    Close
                </Button>

            </DialogActions>
        </Dialog>
    );
}
