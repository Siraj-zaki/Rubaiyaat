import React, { Component } from 'react'
import Card from '../components/Card'
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import PeopleIcon from '@material-ui/icons/People';
import '../css/Dashboard.css'
import ActivityCard from '../components/ActivityCard';
// import StickyHeadTable from '../components/Table';
import CollapsibleTable from '../components/Table';
import BasicTextFields from '../components/Input'
import { Button, Typography } from '@material-ui/core';
import RolesTable from '../components/RolesTable';
import Select from 'react-select';
import Logo from '../assets/logo.png'
import CustomModal from '../components/CustomModal';
import { Link } from 'react-router-dom';
import api from '../services/api';
export class Roles extends Component {
    state = {
        location: '',
        device: '',
        openModal: false,
        Role: [],
        permissions: '',
    }
    async deleteRole(id) {
        try {
            const RoleDeleted = await api.deleteRole(id)
            console.log(RoleDeleted, "RoleDeleted")
            // console.log(User);
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }
        catch (err) {
            console.log(err);
        }
    }
    runFunction = async () => {
        const Role = await api.getRole()
        this.setState({ Role })
        console.log(Role);
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
    handleClickOpen = (permissions) => {
        this.setState({ openModal: true })
        this.setState({ permissions: permissions })
    }
    handleClose = () => {
        this.setState({ openModal: false })
    }
    filterNameEvent = (e) => {
        this.setState({ filterName: e.target.value })
    }
    filterUsernameEvent = (e) => {
        this.setState({ filterUsername: e.target.value })
    }
    render() {
        return (
            <React.Fragment>
                <CustomModal permissions={this.state.permissions} open={this.state.openModal} handleClose={() => this.handleClose()} handleClickOpen={() => this.handleClickOpen} data={Logo} />
                <div>
                    <div className="main-dashboard">
                        <div className="dashboard ">
                            <div className="dashboard-header" style={{ position: 'relative' }} >
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">Roles</h1>
                                <Button onClick={() => this.runFunction()} type="submit" color={'secondary'} variant="contained" style={{ position: 'absolute', right: '10px' }}>Run</Button>
                            </div>

                            <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between', alignSelf: 'flex-end', margin: '10px' }}>
                                <Link to={'/Roles/AddRole'} style={{ color: 'black' }} type="submit" color="primary" variant="contained"><Button type="submit" variant="contained">Add Role</Button></Link>
                            </div>
                            <RolesTable deleteRole={(id) => this.deleteRole(id)} RoleData={this.state.Role} openModal={(permissions) => this.handleClickOpen(permissions)} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Roles
