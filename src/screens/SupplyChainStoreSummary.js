import React, { Component } from 'react'
import Card from '../components/Card'
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import PeopleIcon from '@material-ui/icons/People';
import '../css/Dashboard.css'
import ActivityCard from '../components/ActivityCard';
// import StickyHeadTable from '../components/Table';
import CollapsibleTable from '../components/Table';
import BasicTextFields from '../components/Input'
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button, Typography, IconButton } from '@material-ui/core';
import StickyHeadTable from '../components/StoreInformationTable';
import Select from 'react-select';
import Logo from '../assets/logo.png'
import CustomModal from '../components/CustomModal';
import SupplyChainStoreSummaryTable from '../components/SupplyChainStoreSummaryTable';
export class SupplyChainStoreSummary extends Component {
    state = {
        location: '',
        device: '',
        openModal: false,
        open: true,
    }
    onSubmitEvent = () => {
        console.log("User")
    }
    handleChangeLocation = (e) => {
        this.setState({ location: e })
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
    render() {
        const location = [
            { label: 'Pakistan' },
            { label: 'India' },
        ];
        const devices = [
            { label: 'Zerbra Device' },
            { label: 'BarCode Device' },
            { label: 'QrCode Device' },
        ];
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
            }
        };
        return (
            <React.Fragment>
                <CustomModal image open={this.state.openModal} handleClose={() => this.handleClose()} handleClickOpen={() => this.handleClickOpen} data={Logo} />
                <div>
                    <div className="main-dashboard">
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <IconButton className="ml-2" aria-label="expand row" size="small" onClick={() => this.setState({ open: !this.state.open })}>
                                    {this.state.open ? <KeyboardArrowUpIcon htmlColor="black" /> : <KeyboardArrowDownIcon htmlColor="black" />}
                                </IconButton>
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">Goods Stock Warehouse</h1>
                            </div>
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <form style={{ width: '30%', margin: 20, marginBottom:0,display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-end', flexWrap: 'wrap', flexDirection: 'column' }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">
                                        <BasicTextFields name={"Starting Date"} width={190} margin={10} secure={"date"} name="Starting Date" value={this.state.startingDate} onChangeEvent={(e) => this.setState({ startingDate: e.target.value })} />
                                        <BasicTextFields name={"Ending Date"} width={190} margin={10} secure={"date"} name="Ending Date" value={this.state.endingDate} onChangeEvent={(e) => this.setState({ endingDate: e.target.value })} />
                                        <Select value={this.state.location} onChange={(e) => this.handleChangeLocation(e)} options={location} isSearchable={true} placeholder={"All Destination"} className="last-scan-select-2" styles={customStyles} />

                                    </form>
                                    <form style={{ width: '30%', margin: 20,marginBottom:0, display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-end', flexWrap: 'wrap', flexDirection: 'column' }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">
                                        <BasicTextFields margin={10} name="EPC" value={this.state.EPC} onChangeEvent={(e) => this.setState({ EPC: e.target.value })} />
                                        <BasicTextFields margin={10} name="Retail Item Batch ID" value={this.state.RetailItemBatchID} onChangeEvent={(e) => this.setState({ RetailItemBatchID: e.target.value })} />
                                        <BasicTextFields margin={10} name="Shipment Number" value={this.state.ShipmentNumber} onChangeEvent={(e) => this.setState({ ShipmentNumber: e.target.value })} />
                                    </form>
                                    <form style={{ width: '30%', margin: 20,marginBottom:0, display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: 'column' }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">
                                        <BasicTextFields margin={10} name="SKU" value={this.state.SKU} onChangeEvent={(e) => this.setState({ SKU: e.target.value })} />
                                        <BasicTextFields margin={10} name="Supplier Number" value={this.state.SupplierNumber} onChangeEvent={(e) => this.setState({ SupplierNumber: e.target.value })} />
                                    </form>
                                </div>
                            </Collapse>
                            <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between', alignSelf: 'flex-end', margin: '10px' }}>
                                <Button type="submit" variant="contained">Search</Button>
                            </div>
                            <SupplyChainStoreSummaryTable openModal={() => this.handleClickOpen()} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SupplyChainStoreSummary
