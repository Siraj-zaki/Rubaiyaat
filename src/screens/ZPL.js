import React, { Component } from 'react'
import Card from '../components/Card'
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import PeopleIcon from '@material-ui/icons/People';
import '../css/Dashboard.css'
import ActivityCard from '../components/ActivityCard';
// import StickyHeadTable from '../components/Table';
import { Button, Typography } from '@material-ui/core';
import PrinterTable from '../components/PrinterTable';
import Logo from '../assets/logo.png'
import CustomModal from '../components/CustomModal';
import ZplTable from '../components/ZPLTable';

export class ZPL extends Component {
    state = {
        filterName: '',
        filterUsername: '',
        openModal: false,

    }
    filterNameEvent = (e) => {
        this.setState({ filterName: e.target.value })
    }
    filterUsernameEvent = (e) => {
        this.setState({ filterUsername: e.target.value })
    }

    onSubmitEvent = () => {
        console.log("User")
    }
    handleClickOpen = () => {
        this.setState({ openModal: true })
    }
    handleClose = () => {
        this.setState({ openModal: false })
    }
    render() {

        return (
            <React.Fragment>
                <CustomModal ZplDetail open={this.state.openModal} handleClose={() => this.handleClose()} handleClickOpen={() => this.handleClickOpen} />
                <div>
                    <div className="main-dashboard">
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">ZPL</h1>
                            </div>
                            <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between', alignSelf: 'flex-end', margin: '10px' }}>
                                <Button type="submit" color="secondary" variant="contained">Add ZPL</Button>
                            </div>
                            <ZplTable openModal={() => this.handleClickOpen()} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ZPL
