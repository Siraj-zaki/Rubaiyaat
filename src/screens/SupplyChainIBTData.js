import React, { Component } from 'react'
import Card from '../components/Card'
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import PeopleIcon from '@material-ui/icons/People';
import '../css/Dashboard.css'
import ActivityCard from '../components/ActivityCard';
// import StickyHeadTable from '../components/Table';
import CollapsibleTable from '../components/Table';
import BasicTextFields from '../components/Input'
import { Button, Typography, IconButton } from '@material-ui/core';
import StickyHeadTable from '../components/StoreInformationTable';
import Select from 'react-select';
import Logo from '../assets/logo.png'
import CustomModal from '../components/CustomModal';
import CountInventoryTable from '../components/CountInventoryTable';
import TransferCancelationTable from '../components/TransferCancelationTable';
import api from '../services/api';
import SupplyChainASNTable from '../components/SupplyChainASNTable';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ClipLoader from "react-spinners/ClipLoader";
import moment from 'moment'
import { DatePicker, Radio, Space } from 'antd';
const { RangePicker } = DatePicker;
export class SupplyChainIBTData extends Component {
    state = {
        location: '',
        ASN: [],
        device: '',
        openModal: false,
        open: true,
        loading: false,
        startingDate: "",
        endingDate: "",
        ibt: "",
        allData: [],
        remarks: '',
    }

    onSubmitEvent = () => {
        console.log("User")
    }
    searchFunction = () => {
        this.setState({ ASN: this.dateFilter() })
    }
    dateCompare = (sDate, eDate) => {
        let { startingDate, endingDate } = this.state
        if (!startingDate && !endingDate) {
            return true
        }
        startingDate = moment(startingDate)
        endingDate = moment(endingDate)
        let sDiff = moment(sDate).diff(startingDate, "days");
        let eDiff = !eDate ? -1 : moment(eDate).diff(endingDate, "days");
        if (sDiff >= 0 && eDiff <= 0)
            return true
        return false
    }
    dateFilter = () => {
        return this.state.allData.filter(x => this.dateCompare(
            x?.received_items?.date, x?.received_items?.date)
            &&
            x.asn.toLowerCase().includes(this.state.ibt.toLowerCase())
            &&
            x?.received_items?.remarks.toLowerCase().includes(this.state.remarks.toLowerCase()))
    }
    handleChangeLocation = (e) => {
        this.setState({ location: e })
    }
    handleChangeIBT = (e) => {
        this.setState({ ibt: e })
    }
    handleClickOpen = () => {
        this.setState({ openModal: true })
    }
    handleClose = () => {
        this.setState({ openModal: false })
    }
    // async componentDidMount() {
    // }
    runFunction = async () => {
        this.setState({ loading: true })
        const ASN = await api.getASN()
        // let filtering = ASN.filter((item => item.operation_name === "receiving"))
        this.setState({ ASN: ASN, allData: ASN })
        console.log(ASN);
        if (ASN) {
            this.setState({ loading: false })
            this.searchFunction()
        }
    }
    render() {
        const customStyles = {
            control: (base, state) => ({
                ...base,
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
                <CustomModal image open={this.state.openModal} handleClose={() => this.handleClose()} handleClickOpen={() => this.handleClickOpen} data={Logo} />
                <div>
                    <div className="main-dashboard">
                        {
                            this.state.loading ? <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', width: '100%', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', height: '100%', backgroundColor: 'rgba(28, 28, 28, 0.6)', zIndex: 10, left: 0, top: 0 }}>
                                <ClipLoader color={'white'} loading={this.state.loading} size={100} />
                            </div> : null
                        }
                        <div className="dashboard">
                            <div className="dashboard-header" style={{ position: 'relative' }}>
                                <IconButton className="ml-2" aria-label="expand row" size="small" onClick={() => this.setState({ open: !this.state.open })}>
                                    {this.state.open ? <KeyboardArrowUpIcon htmlColor="black" /> : <KeyboardArrowDownIcon htmlColor="black" />}
                                </IconButton>
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">IBT Data (Receiving)</h1>
                                <Button onClick={() => this.runFunction()} type="submit" color={'secondary'} variant="contained" style={{ position: 'absolute', right: '10px' }}>Run</Button>
                            </div>
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{ width: '100%' }}>

                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transparent', minHeight: 50, marginTop: 10, position: 'relative' }}>
                                    <form style={{ width: '50%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 0, flexDirection: 'column' }}  >
                                        <BasicTextFields margin={10} name="IBT" value={this.state.ibt} onChangeEvent={(e) => this.setState({ ibt: e.target.value })} />
                                        <BasicTextFields margin={10} name="Remarks" value={this.state.remarks} onChangeEvent={(e) => this.setState({ remarks: e.target.value })} />
                                    </form>
                                    <div style={{ width: '1px', height: '100%', backgroundColor: 'white', position: 'absolute' }}></div>
                                    <form style={{ width: '50%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 0, flexDirection: 'column' }}  >
                                        <DatePicker value={this.state.startingDate} placeholder={"starting-date"} className="input-mat-1" style={{ border: '1px solid white', borderRadius: 5, height: 37, marginTop: 10, fontWeight: 'lighter' }} size={'large'} format={"YYYY-MM-DD"} onChange={(e) => this.setState({ startingDate: e })} />
                                        <DatePicker value={this.state.endingDate} placeholder={"ending-date"} className="input-mat-1" style={{ border: '1px solid white', borderRadius: 5, height: 37, marginTop: 10, fontWeight: 'lighter' }} size={'large'} format={"YYYY-MM-DD"} onChange={(e) => this.setState({ endingDate: e })} />
                                    </form>
                                </div>
                            </Collapse>
                            <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between', alignSelf: 'flex-end', margin: '10px' }}>
                                {/* <Button onClick={(e) => this.searchFunction(e)} type="submit" variant="contained">Search</Button> */}
                            </div>
                            <SupplyChainASNTable asn={this.state.ASN} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SupplyChainIBTData
