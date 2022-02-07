import { Button, IconButton } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import Select from 'react-select';
import Logo from '../assets/logo.png';
import CountOperationOver20Table from '../components/CountOperationOver20Table';
import CountOperationRealtimeTable from '../components/CountOperationRealtimeTable';
import CountOperationTable from '../components/CountOperationTable';
import CountOperationTop20Table from '../components/CountOperationTop20Table';
import CustomModal from '../components/CustomModal';
import BasicTextFields from '../components/Input';
import '../css/Dashboard.css';
// import Chat from '../components/Chat';
export class CountOperation extends Component {
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

        const devices = [
            { label: 'Zerbra Device' },
            { label: 'BarCode Device' },
            { label: 'QrCode Device' },
        ];
        const customStyles = {
            control: (base, state) => ({
                ...base,
                height: 33,
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
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <IconButton className="ml-2" aria-label="expand row" size="small" onClick={() => this.setState({ open: !this.state.open })}>
                                    {this.state.open ? <KeyboardArrowUpIcon htmlColor="black" /> : <KeyboardArrowDownIcon htmlColor="black" />}
                                </IconButton>
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">Count Operation</h1>
                            </div>
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <form style={{ width: '60%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' ,marginBottom:0}} onSubmit={this.onSubmitEvent} noValidate={false} autoComplete="off">
                                    {/* <BasicTextFields require name="Name" value={this.state.filterName} onChangeEvent={(e) => this.filterNameEvent(e)} />
                                    <BasicTextFields require name="Username" value={this.state.filterUsername} onChangeEvent={(e) => this.filterUsernameEvent(e)} /> */}
                                    <Select
                                        value={this.state.device}
                                        onChange={(e) => this.handleChangeDevice(e)}
                                        options={devices}
                                        isSearchable={true}
                                        placeholder={"All Store"}
                                        className="last-scan-select-2 black"
                                        styles={customStyles}
                                    />
                                    <BasicTextFields onChangeEvent={(e) => this.setState({ date: e.target.value })} name="Date" value={this.state.date} />
                                </form>
                        </div>
                    </Collapse>
                    <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between', alignSelf: 'flex-end', margin: '10px' }}>
                        <Button type="submit" variant="contained">Search</Button>
                    </div>
                    <CountOperationTable />
                    {/* <Chat /> */}
                </div>
            </div>
                </div >
                <div style={{ width: '100%', justifyContent: 'space-evenly', alignItems: 'center', display: 'flex', flexWrap: 'wrap' }}>
                    <div className="main-dashboard w-50">
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">Top 20 Under</h1>
                            </div>
                            <CountOperationTop20Table />
                            {/* <Chat /> */}
                        </div>
                    </div>
                    <div className="main-dashboard w-50">
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">Top 20 Over</h1>
                            </div>
                            <CountOperationOver20Table />
                            {/* <Chat /> */}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="main-dashboard">
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">Realtime Discrepancy</h1>
                            </div>
                            <CountOperationRealtimeTable />
                            {/* <Chat /> */}
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default CountOperation
