import React, { Component } from 'react'
import PeopleIcon from '@material-ui/icons/People';
import '../css/Dashboard.css'
import BasicTextFields from '../components/Input'
import { Button, Typography } from '@material-ui/core';
import Select from 'react-select';
import Logo from '../assets/logo.png'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CustomModal from '../components/CustomModal';
import ZPLImage from '../assets/zplPrinterImagepng.png'
import api from '../services/api'
import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper';
const browserPrint = new ZebraBrowserPrintWrapper();
export class ZPLPrinter extends Component {
    state = {
        location: '',
        device: '',
        openModal: false,
        EPC: '',
        loading: false,
        assetDetail: [],
        thingName: "",
        Brand: '',
        Item_Category: '',
        Manufacturer: '',
        Asset_Location: '',
        Device_Type: '',
        print: [],
        sePrint: ''
    }

    onSubmitEvent = () => {
        console.log("User")
    }
    handleChangeLocation = (e) => {
        this.setState({ sePrint: e.data, location: e.location, printerIp: e.data.uid })
        console.log(e)
    }
    handleChangeDevice = (e) => {
        this.setState({ device: e })
    }
    handleClickOpen = () => {
        this.setState({ openModal: true })
    }
    handleClose = () => {
        this.setState({ openModal: false })
    }
    CheckboxHandler = (e) => {
        this.setState({ [e.target.name]: e.target.checked })
        console.log(e.target.name + ":" + e.target.checked);
        console.log(this.state);
    }
    handleEPC = async () => {
        this.setState({ loading: true })
        const assetDetail = await api.getAssetsByEPC(this.state.EPC)
        console.log(assetDetail)
        if (assetDetail) {
            this.setState({ loading: false })
            this.setState({
                thingName: assetDetail?.["Thing Name"],
                Brand: assetDetail?.Brand,
                Item_Category: assetDetail?.Item_Category,
                Manufacturer: assetDetail?.Manufacturer,
                Asset_Location: assetDetail?.Asset_Location,
                Device_Type: assetDetail?.Device_Type,
                assetDetail
            })
        }
    }
    printBarcode = async () => {
        if (this.state.printerIp) {
            try {
                let sePrint = this.state.sePrint
                browserPrint.setPrinter(this.state.sePrint);
                console.log(this.state.location)
                let myBody =
                    `{\"device\":{\"name\":\"${sePrint.name}\",\"uid\":\"${this.state.printerIp}\",\"connection\":\"${sePrint.connection}\",\"deviceType\":\"printer\",\"version\":${sePrint.version},\"provider\":\"${sePrint.provider}\",\"manufacturer\":\"${sePrint.manufacturer}\"},\"data\":\"CT~CD,~CC^~CT\n^XA\n~TA000\n~JSN\n^LT0\n^MNW\n^MTT\n^PON\n^PMN\n^LH0,0\n^JMA\n^PR2,2\n~SD25\n^JUS\n^LRN\n^CI27\n^PA0,1,1,0\n^XZ\n^XA\n^MMT\n^PW467\n^LL223\n^LS0\n^FT178,98^A0N,28,28^FH\\^CI28^FDSQCCCRC^FS^CI27\n^FO181,104^GB104,0,4^FS\n^FT22,141^A@N,25,25,TT0003M_^FH\\^CI28^FD SN:^FS^CI27\n^FT27,177^A@N,25,25,TT0003M_^FH\\^CI28^FDASSET ID:^FS^CI27\n^FT75,142^A@N,25,25,TT0003M_^FH\\^CI28^FD${this.state.Item_Category}^FS^CI27\n^FT147,177^A@N,28,27,TT0003M_^FH\\^CI28^FD${this.state.EPC}^FS^CI27\n^FT360,204^BQN,2,4\n^FH\\^FDLA,${this.state.EPC}^FS\n^FT27,211^A@N,25,25,TT0003M_^FH\\^CI28^FDDESC:^FS^CI27\n^FT112,211^A@N,25,25,TT0003M_^FH\\^CI28^FD${this.state.Brand}^FS^CI27\n^PQ1,0,1,Y\n^XZ\"}`
                let myBody1 =
                    `{\"device\":{\"name\":\"${sePrint.name}\",\"uid\":\"${this.state.printerIp}\",\"connection\":\"${sePrint.connection}\",\"deviceType\":\"printer\",\"version\":${sePrint.version},\"provider\":\"${sePrint.provider}\",\"manufacturer\":\"${sePrint.manufacturer}\"},\"data\":\"^XA\\n~TA000\\n~JSN\\n^LT0\\n^MNW\\n^MTT\\n^PON\\n^PMN\\n^LH0,0\\n^JMA\\n^PR2,2\\n~SD25\\n^JUS\\n^LRN\\n^CI27\\n^PA0,1,1,0\\n^XZ\\n^XA\\n^MMT\\n^PW831\\n^LL203\\n^LS0\\n^FT327,76^A0N,28,28^FH^CI28^FDSQCCCRC^FS^CI27\\n^FO336,74^GB107,0,4^FS\\n^FT190,118^A@N,28,27,TT0003M_^FH^CI28^FD SN:^FS^CI27\\n^FT195,152^A@N,28,27,TT0003M_^FH^CI28^FDASSET ID:^FS^CI27\\n^FT195,185^A@N,28,27,TT0003M_^FH^CI28^FDDESC:^FS^CI27\\n^FT244,118^A@N,28,27,TT0003M_^FH^CI28^FD${this.state.Item_Category}^FS^CI27\\n^FT329,153^A@N,28,27,TT0003M_^FH^CI28^FD${this.state.EPC}^FS^CI27\\n^FT587,208^BQN,2,6\\n^FH^FDLA,${this.state.Brand}^FS\\n^FT59,208^BQN,2,6\\n^FH^FDLA,${this.state.thingName}^FS\\n^FT282,185^A@N,28,27,TT0003M_^FH^CI28^FD${this.state.thingName}^FS^CI27\\n^PQ1,0,1,Y\\n^XZ\"}`
                fetch("http://127.0.0.1:9100/write", {
                    "headers": {
                        "accept": "/",
                        "accept-language": "en-US,en;q=0.9",
                        "content-type": "text/plain;charset=UTF-8",
                        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "cross-site"
                    },
                    "referrerPolicy": "no-referrer",
                    "body": this.state.zpl ? myBody : myBody1,
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "omit"
                }).then((res) => {
                    alert("Done")
                }).catch(err => {
                    alert(JSON.stringify(err))
                })

            } catch (error) {
                throw new Error(error);
            }
        } else {
            alert("please enter printer ip")
        }

    };
    handleChangeZpl = (e) => {
        this.setState({ zpl: e.value, zplName: e })
    }
    async componentDidMount() {
        const printers = await browserPrint.getAvailablePrinters()
        console.log(printers,'printers');
        let print = []
        if (printers.length) {
            for (let i = 0; i < printers.length; i++) {
                print.push({ label: printers[i].name, data: printers[i] })
            }
        }
        this.setState({
            print
        })
        console.log(print, "ASd")
    }
    render() {
        const location = [
            { label: 'RFFID' },
            { label: 'DUMMY-Data' },
            { label: 'RFFID' },
            { label: 'DUMMY-Data' },
            { label: 'RFFID' },
            { label: 'DUMMY-Data' },
            { label: 'RFFID' },
            { label: 'DUMMY-Data' },
            { label: 'RFFID' },
            { label: 'DUMMY-Data' },
        ];

        const customStyles = {
            control: (base, state) => ({
                ...base,
                height: 33,
                marginTop: 10,
                backgroundColor: 'transparent',
            }),
            menu: base => ({
                ...base,
                zIndex: 30
            }),
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';
                return { ...provided, opacity, transition, color: "white" };
            },
        };
        return (
            <React.Fragment>
                <CustomModal ZPLData open={this.state.openModal} handleClose={() => this.handleClose()} handleClickOpen={() => this.handleClickOpen} />
                <form>
                    <div className="main-dashboard">
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">ZPL Printer</h1>
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: 'transparent', flexWrap: 'wrap', backgroundColor: "#37474f" }}>
                                <div style={{ flex: 2, margin: 10, padding: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: 'column' }} >
                                    <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', }}>
                                        <BasicTextFields disabled={true} name="Thing Name" value={this.state.thingName} onChangeEvent={(e) => this.setState({ thingName: e.target.value })} />
                                        <BasicTextFields disabled={true} name="Brand" value={this.state.Brand} onChangeEvent={(e) => this.setState({ Brand: e.target.value })} />
                                    </div>
                                    <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', }}>
                                        <BasicTextFields disabled={true} name="Device Type" value={this.state.Device_Type} onChangeEvent={(e) => this.setState({ Device_Type: e.target.value })} />
                                        <BasicTextFields disabled={true} name="Item Category" value={this.state.Item_Category} onChangeEvent={(e) => this.setState({ Item_Category: e.target.value })} />
                                    </div>
                                    <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', }}>
                                        <BasicTextFields disabled={true} name="Asset Location" value={this.state.Asset_Location} onChangeEvent={(e) => this.setState({ Asset_Location: e.target.value })} />
                                        <BasicTextFields disabled={true} name="Manufacturer" value={this.state.Manufacturer} onChangeEvent={(e) => this.setState({ Manufacturer: e.target.value })} />
                                    </div>
                                    <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', }}>
                                        <Button onClick={() => this.printBarcode()} color="secondary" variant="contained">Print</Button>
                                    </div>

                                </div>
                                <div style={{ flex: 1, margin: 10, padding: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: 'column' }} >
                                    <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', }}>
                                        <BasicTextFields name="Odoo Tag" value={this.state.EPC} onChangeEvent={(e) => this.setState({ EPC: e.target.value })} />
                                        <Button style={{ marginTop: 20 }} onClick={() => this.handleEPC()} color="secondary" variant="contained">{this.state.loading ? "Loading" : "Search"}</Button>
                                    </div>
                                    <Select value={this.state.location} onChange={(e) => this.handleChangeLocation(e)} options={this.state.print} isSearchable={true} placeholder={"Select Printer"} className="last-scan-select-2" styles={customStyles} />
                                    <Select value={this.state.zplName} onChange={(e) => this.handleChangeZpl(e)} options={[{ label: "BIG LABEL NONE METAL", value: 0 }, { label: "Metal tags", value: 1 }]} isSearchable={true} placeholder={"Select Zpl"} className="last-scan-select-2" styles={customStyles} />
                                </div>
                                <div style={{ flex: 1, margin: 10, padding: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: 'column' }} >
                                    <div style={{ width: '100%', margin: 10, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: 'coloumn' }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

export default ZPLPrinter