import { Button, IconButton } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import Select from 'react-select';
import ClipLoader from "react-spinners/ClipLoader";
import Logo from '../assets/logo.png';
import CustomModal from '../components/CustomModal';
import StickyHeadTable from '../components/DeviceTable';
import '../css/Dashboard.css';
import api from '../services/api';
export class Devices extends Component {
    state = {
        location: '',
        device: '',
        openModal: false,
        HandHeld: [],
        QrCode: {},
        open: true,
        loading: false,
        allData: [],
        searchData: [],
    }

    runFunction = async () => {
        this.setState({ loading: true })
        const HandHeld = await api.getHandHeld()
        this.setState({ HandHeld, allData: HandHeld, searchData: HandHeld })
        console.log(HandHeld);
        if (HandHeld) {
            this.setState({ loading: false })
            // this.searchFunction()
        }
    }
    async deleteDevice(id) {
        const handheldDeleted = await api.deleteHandHeld(id)
        console.log(handheldDeleted, "handheldDeleted");
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }
    searchFunction = () => {
        this.setState({ HandHeld: this.dateFilter() })
        // alert(this.state.device.label)
    }
    dateFilter = () => {
        return this.state.allData.filter(x => x.server.includes(this.state.location?.label) || x?.uuid.includes(this.state.device?.label))
    }
    handleChangeDevice = (selectedOption) => {
        this.setState({ device: selectedOption });
        console.log(`Option selected:`, selectedOption);
    }
    handleChangeLocation = (selectedOption) => {
        this.setState({ location: selectedOption });
        console.log(`Option selected:`, selectedOption);
    }
    handleClickOpen = (device) => {
        this.setState({ openModal: true })
        // console.log(device);
        this.setState({ QrCode: device })
    }
    handleClose = () => {
        this.setState({ openModal: false })
    }

    render() {
        const lochandheld = this.state.searchData.map((item => {
            return { value: item.server, label: item.server }
        }))
        const devices = this.state.searchData.map((item => {
            return { value: item.server, label: item.uuid }
        }))
        const customStyles = {
            control: (base, state) => ({
                ...base,
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
                <CustomModal QrCode={this.state.QrCode} open={this.state.openModal} handleClose={() => this.handleClose()} handleClickOpen={() => this.handleClickOpen} data={Logo} />
                <div>
                    <div className="main-dashboard">
                        {
                            this.state.loading ? <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', width: '100%', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', height: '100%', backgroundColor: 'rgba(28, 28, 28, 0.6)', zIndex: 10, top: 0, left: 0 }}>
                                <ClipLoader color={'white'} loading={this.state.loading} size={100} />
                            </div> : null
                        }
                        <div className="dashboard ">
                            <div className="dashboard-header" style={{ position: 'relative' }}>
                                <IconButton className="ml-2" aria-label="expand row" size="small" onClick={() => this.setState({ open: !this.state.open })}>
                                    {this.state.open ? <KeyboardArrowUpIcon htmlColor="black" /> : <KeyboardArrowDownIcon htmlColor="black" />}
                                </IconButton>
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">HandHeld Devices</h1>
                                <Button onClick={() => this.runFunction()} type="submit" color={'secondary'} variant="contained" style={{ position: 'absolute', right: '10px' }}>Run</Button>
                            </div>
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
 
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transparent',minHeight:50,marginTop:10,position:'relative' }}>
                                    {/* <form style={{ width: '50%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', marginBottom: 0 }}  >
                                    <Select
                                            value={this.state.location}
                                            // styles={{ width: '200px' }}
                                            onChange={(e) => this.handleChangeLocation(e)}
                                            options={lochandheld}
                                            isSearchable={true}
                                            placeholder={"Locations"}
                                            className="last-scan-select-2"
                                            styles={customStyles}
                                        />
                                    </form>
                                    <div style={{width:'1px',height:'100%',backgroundColor:'white',position:'absolute'}}></div>
                                    <form style={{ width: '50%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', marginBottom: 0 }}  >
                                    <Select
                                            value={this.state.device}
                                            onChange={(e) => this.handleChangeDevice(e)}
                                            options={devices}
                                            isSearchable={true}
                                            placeholder={"UUID"}
                                            className="last-scan-select-2 black"
                                            styles={customStyles}
                                        />
                                    </form> */}
                                </div>
                            </Collapse>
                            <div style={{ display: 'flex', width: '200px', justifyContent: 'flex-end', alignSelf: 'flex-end', margin: '10px' }}>
                                {/* <Button type="submit" variant="contained" onClick={(e) => this.searchFunction(e)}>Search</Button> */}
                                <Button onClick={() => window.location.href = "Devices/AddDevice"} variant="contained" color="secondary">Add Devices</Button>
                            </div>
                            <StickyHeadTable deleteDevice={(id) => this.deleteDevice(id)} Devices={this.state.HandHeld} openModal={(device) => this.handleClickOpen(device)} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Devices
