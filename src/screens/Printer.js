import React, { Component } from 'react'
import Card from '../components/Card'
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import PeopleIcon from '@material-ui/icons/People';
import '../css/Dashboard.css'
import ActivityCard from '../components/ActivityCard';
// import StickyHeadTable from '../components/Table';
import { Button, Typography } from '@material-ui/core';
import PrinterTable from '../components/PrinterTable';

export class Printer extends Component {
    state = {
        filterName: '',
        filterUsername: '',

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
    render() {

        return (
            <React.Fragment>
                <div>
                    <div className="main-dashboard">
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">Printers</h1>
                            </div>
                            <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between', alignSelf: 'flex-end', margin: '10px' }}>
                                <Button type="submit" color="secondary" variant="contained">Add Printer</Button>
                            </div>
                            <PrinterTable />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Printer
