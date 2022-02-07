import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import Logo from '../assets/logo.png';
import CustomModal from '../components/CustomModal';
import ViewASNDetailByEPCTable from '../components/ViewASNDetailByEPCTable';
import '../css/Dashboard.css';
import api from '../services/api';

export class ASNDetailByMovement extends Component {
    state = {
        filterName: '',
        filterUsername: '',
        IBTDetail: [],
        loader: true,
        openModal: false,
        loading: true,
    }
    filterNameEvent = (e) => {
        this.setState({ filterName: e.target.value })
    }
    filterUsernameEvent = (e) => {
        this.setState({ filterUsername: e.target.value })
    }
    async componentDidMount() {
        const IBTDetail = await api.getASNbyEPC(this.props.location.state)
        this.setState({ IBTDetail, loader: false })
        if (IBTDetail) {
            this.setState({ loading: false })
        }
        console.log(IBTDetail, 'asdfasdf');
    }

    handleClickOpen = (permissions) => {
        this.setState({ openModal: true })
        this.setState({ permissions: permissions })
    }
    handleClose = () => {
        this.setState({ openModal: false })
    }
    onSubmitEvent = (e) => {
        e.preventDefault()
        let search = {
            date: this.state.filterName,
            serialNumber: this.state.filterUsername,
        }
        const { date, serialNumber } = search
        if (date && serialNumber !== "") {
            this.setState({ filterSearch: search })
        } else {
            alert("Please Enter Data First")
        }
    }
    render() {

        return (
            <React.Fragment>
                <CustomModal permissions={this.state.permissions} open={this.state.openModal} handleClose={() => this.handleClose()} handleClickOpen={() => this.handleClickOpen} data={Logo} />
                <div>
                    <div className="main-dashboard">
                        {
this.state.loading ? <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', width: '100%', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', height: '100%', backgroundColor: 'rgba(28, 28, 28, 0.6)', zIndex: 10,left:0,top:0 }}>
                                <ClipLoader color={'white'} loading={this.state.loading} size={100} />
                            </div> : null
                        }
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">ASN by Epc</h1>
                            </div>
                            {/* <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent' }}>
                                <form style={{ width: '80%', margin: 20, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">
                                    <BasicTextFields name={"Date"} placeholder={"Date"} secure={"date"} value={this.state.filterName} onChangeEvent={(e) => this.filterNameEvent(e)} />
                                    <BasicTextFields name="Serial Number" value={this.state.filterUsername} onChangeEvent={(e) => this.filterUsernameEvent(e)} />
                                </form>
                            </div>
                            <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between', alignSelf: 'flex-end', margin: '10px' }}>
                                <Button type="submit" variant="contained">Search</Button>
                            </div> */}
                            <ViewASNDetailByEPCTable deleteRole={(id) => this.deleteRole(id)} openModal={(permissions) => this.handleClickOpen(permissions)} loader={this.state.loader} ibt={this.state.IBTDetail} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ASNDetailByMovement
