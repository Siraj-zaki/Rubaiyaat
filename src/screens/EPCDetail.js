import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import Logo from '../assets/logo.png';
import CustomModal from '../components/CustomModal';
import ViewEPCDetailTable from '../components/ViewEPCDetailTable';
import '../css/Dashboard.css';
import api from '../services/api';

export class EPCDetail extends Component {
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
        // alert(JSON.stringify(this.props.location.state.row.asn));
        // alert(this.props.location.state._id)
        let ASN_id = this.props.location.state.row._id
        let data = {
            asn: this.props.location.state.row.asn,
            operation: this.props.location.state.row.operation
        }
        const IBTDetail = await api.EPCDetail(this.props.location.state.row.asn, this.props.location.state.row.operation)
        this.setState({ IBTDetail, loader: false })
        console.log(this.state.IBTDetail, 'sdfasdfasdfasdfsdfdsf');
        if (IBTDetail) {
            this.setState({ loading: false })
        }
        // alert(JSON.stringify(this.props.location.state), 'asdfasdfsd')
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
                                <h1 className="dashboard-heading">View IBT Details</h1>
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
                            <ViewEPCDetailTable deleteRole={(id) => this.deleteRole(id)} openModal={(permissions) => this.handleClickOpen(permissions)} loader={this.state.loader} zone={this.props.location.state.data.zone} perData={this.props.location.state} ibt={this.state.IBTDetail} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default EPCDetail
