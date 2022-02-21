import { Button, IconButton } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import Select from 'react-select';
import ClipLoader from "react-spinners/ClipLoader";
import Logo from '../assets/logo.png';
import AnalyticsMovementHistoryTable from '../components/AnalyticsMovementHistoryTable';
import CustomModal from '../components/CustomModal';
import BasicTextFields from '../components/Input';
import '../css/Dashboard.css';
import api from '../services/api';
export class AnalyticsMovementHistory extends Component {
    state = {
        location: '',
        device: '',
        openModal: false,
        open: true,
        Batches: [],
        loading: false,
        allData: [],
        searchData: [],
        asnName: "",
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

    runFunction = async () => {
        this.setState({ loading: true })
        const Batches = await api.getMovementHistory()
        await this.setState({ Batches: Batches, allData: Batches, searchData: Batches })
        console.log(this.state.Batches);
        if (Batches) {
            this.setState({ loading: false })
            this.searchFunction()
        }
    }
    searchFunction = () => {
        this.setState({ Batches: this.dateFilter() })
        // alert(this.state.device.label)
    }
    dateFilter = () => {
        return this.state.allData.filter(x => x.epc && x.epc.includes(this.state.asnName)
            // && x.operation && x.operation.toLowerCase().includes(this.state.device.value.toLowerCase())
        )
    }
    render() {
        const location = [
            { label: 'Pakistan' },
            { label: 'India' },
        ];
        const devices = Array.from(new Set(this.state.Batches.map(item => ({
            label: item.operation, value: item.operation
        }))))
        console.log(devices, "-------s")
        // { label: 'Zerbra Device' },
        // { label: 'BarCode Device' },
        // { label: 'QrCode Device' },
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
                        <div className="dashboard ">
                            <div className="dashboard-header" style={{ position: 'relative' }}>
                                <IconButton className="ml-2" aria-label="expand row" size="small" onClick={() => this.setState({ open: !this.state.open })}>
                                    {this.state.open ? <KeyboardArrowUpIcon htmlColor="black" /> : <KeyboardArrowDownIcon htmlColor="black" />}
                                </IconButton>
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">Movement History</h1>
                                <Button onClick={() => this.runFunction()} type="submit" color={'secondary'} variant="contained" style={{ position: 'absolute', right: '10px' }}>Run</Button>
                            </div>
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transparent', minHeight: 50, marginTop: 10, position: 'relative' }}>
                                    <form style={{ width: '50%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', marginBottom: 0 }}  >
                                    <BasicTextFields name="EPC" value={this.state.asnName} onChangeEvent={(e) => this.setState({ asnName: e.target.value })} />
                                    </form>
                                    <div style={{ width: '1px', height: '100%', backgroundColor: 'white', position: 'absolute' }}></div>
                                    <form style={{ width: '50%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', marginBottom: 0 }}  >
                                        {/* <BasicTextFields name="Username" value={this.state.filterUsername} onChangeEvent={(e) => this.filterUsernameEvent(e)} /> */}
                                    </form>
                                </div>
                            </Collapse>
                            <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between', alignSelf: 'flex-end', margin: '10px' }}>
                                {/* <Button type="submit" variant="contained" onClick={this.searchFunction}>Search</Button> */}
                            </div>
                            <AnalyticsMovementHistoryTable data={this.state.Batches} openModal={() => this.handleClickOpen()} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default AnalyticsMovementHistory

