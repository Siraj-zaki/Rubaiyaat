import { Button, IconButton } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import AnalyticsAssetsListTable from '../components/AnalyticsAssetsListTable';
import CustomModal from '../components/CustomModal';
import BasicTextFields from '../components/Input';
import '../css/Dashboard.css';
import api from '../services/api';
export class AnalyticsAssetList extends Component {
    state = {
        zone: '',
        date: '',
        site: "",
        Site: [],
        open: true,
        loading: false,
        epc: '',
        asn: "",
        operation: '',
        EPC: '',
        allData: [],
    }

    runFunction = async () => {
        this.setState({ loading: true })
        const Site = await api.getAssets()
        this.setState({ Site, allData: Site, searchData: Site })
        console.log(Site);
        if (Site) {
            this.setState({ loading: false })
            this.searchFunction()
        }
    }
    searchFunction = () => {

        this.setState({ Site: this.dateFilter() })
        // alert(this.state.device.label)
    }
    dateFilter = () => {
        return this.state.allData.filter(x => x.asn && x.asn.asn.toLowerCase().includes(this.state.asn.toLowerCase()) && x.operation.toLowerCase().includes(this.state.operation.toLowerCase()))
    }

    handleChangeASN = (e) => {
        this.setState({ asn: e.target.value })
    }
    handleChangeOperation = (e) => {
        this.setState({ operation: e.target.value })

    }
    handleChangeEPC = (e) => {
        this.setState({ epc: e.target.value })
    }

    handleClickOpen = (device) => {
        this.setState({ openModal: true })
        this.setState({ EPC: device.epc })
    }
    handleClose = () => {
        this.setState({ openModal: false })
    }
    render() {
        const customStyles = {
            control: (base, state) => ({
                ...base,
                backgroundColor: 'transparent',
                marginTop: 10,
            }),
            menu: base => ({
                ...base,
                zIndex: 30,
                color: 'black',
            }),
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition, color: "white" };
            }
        };
        return (
            <React.Fragment>
                <CustomModal open={this.state.openModal} handleClose={() => this.handleClose()} handleClickOpen={() => this.handleClickOpen} EpcData={this.state.EPC} />
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
                                <h1 className="dashboard-heading">Asset List</h1>
                                <Button onClick={() => this.runFunction()} type="submit" color={'secondary'} variant="contained" style={{ position: 'absolute', right: '10px' }}>Run</Button>
                            </div>
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <form style={{ width: '80%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">
                                        <BasicTextFields
                                            type={"text"}
                                            secure={"Operation"}
                                            name={"Operation"}
                                            value={this.state.operation}
                                            onChangeEvent={(e) => this.handleChangeOperation(e)}
                                        />
                                        <BasicTextFields
                                            type={"text"}
                                            secure={"text"}
                                            name={"Asn"}
                                            value={this.state.asn}
                                            onChangeEvent={(e) => this.handleChangeASN(e)}
                                        />
                                    </form>
                                </div>
                            </Collapse>

                            <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between', alignSelf: 'flex-end', margin: '10px' }}>
                                {/* <Button type="submit" variant="contained" onClick={(e) => this.searchFunction(e)}>Search</Button> */}
                            </div>
                            <AnalyticsAssetsListTable Site={this.state.Site} openModal={(device) => this.handleClickOpen(device)} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default AnalyticsAssetList
