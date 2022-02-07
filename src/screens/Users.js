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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../services/api';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ClipLoader from "react-spinners/ClipLoader";
export class Users extends Component {
    state = {
        filterName: '',
        filterUsername: '',
        Users: [],
        open: true,
        allData: [],
        loading: false,
    }

    runFunction = async () => {
        this.setState({ loading: true })
        const Users = await api.getAllUsers()
        this.setState({ Users, allData: Users })
        console.log(Users, "dasdasdasdad");
        if (Users) {
            this.setState({ loading: false })
            this.searchFunction()
        }
    }
    searchFunction = () => {
        this.setState({ Users: this.dateFilter() })
    }
    dateFilter = () => {
        return this.state.allData.filter(x => x.name.toLowerCase().includes(this.state.filterName.toLowerCase()) && x.userName.toLowerCase().includes(this.state.filterUsername.toLowerCase()))
    }
    async deleteUser(id) {
        try {
            const UserDeleted = await api.deleteUser(id)
            toast.success(JSON.stringify(UserDeleted))
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } catch (error) {
            console.log(JSON.stringify(error));
        }
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
                                <h1 className="dashboard-heading">Users Information</h1>
                                <Button onClick={() => this.runFunction()} type="submit" color={'secondary'} variant="contained" style={{ position: 'absolute', right: '10px' }}>Run</Button>
                            </div>
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transparent',minHeight:50,marginTop:10,position:'relative' }}>
                                    <form style={{ width: '50%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', marginBottom: 0 }}  >
                                        <BasicTextFields  name="Name" value={this.state.filterName} onChangeEvent={(e) => this.filterNameEvent(e)} />
                                    </form>
                                    <div style={{width:'1px',height:'100%',backgroundColor:'white',position:'absolute'}}></div>
                                    <form style={{ width: '50%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', marginBottom: 0 }}  >
                                    <BasicTextFields name="Username" value={this.state.filterUsername} onChangeEvent={(e) => this.filterUsernameEvent(e)} />
                                    </form>
                                </div>
                            </Collapse>
                            <div style={{ display: 'flex', width: '200px', justifyContent: 'flex-end', alignSelf: 'flex-end', margin: '10px' }}>
                                {/* <Button type="submit" variant="contained" onClick={(e) => this.searchFunction(e)}>Search</Button> */}
                                <Button onClick={() => window.location.href = "/User/AddUser"} variant="contained" color="secondary">Add User</Button>
                            </div>
                            <CollapsibleTable deleteUser={(id) => this.deleteUser(id)} Users={this.state.Users} userData />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Users
