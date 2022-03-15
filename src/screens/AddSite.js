import { Button } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import Select from 'react-select';

import { ToastContainer, toast } from 'react-toastify';
import BasicTextFields from '../components/Input';
import '../css/Dashboard.css';
import api from '../services/api';
export class AddSite extends Component {
    state = {
        filterName: '',
        filterUsername: '',
        status: '',
        role: '',
        site: '',
        editUserData: '',
        filterPassword: '',
        Role: [],
        Site: [],
        User: {},
        site_name: '',
        mapViewImage: '',
        location: '',
        objectType: 'String',
        zoom: '',
        fillColor: ''
        // locationID: { type: Schema.Types.ObjectId, ref: "Location" },
    }
    async componentDidMount() {
        const Role = await api.getRole()
        this.setState({ Role })
        console.log(Role);
        // console.log();
        const Site = await api.getAllSite()
        this.setState({ Site })
        console.log(Site);
    }
    filterNameEvent = (e) => {
        this.setState({ site_name: e.target.value })
    }
    filterUsernameEvent = (e) => {
        this.setState({ location: e.target.value })
    }
    filterPasswordEvent = (e) => {
        this.setState({ filterPassword: e.target.value })
    }
    onSubmitEvent(e) {
        e.preventDefault()
        let User = {
            site_name: this.state.site_name,
            location: this.state.location,
        }
        this.AddUser(User)
    }
    async AddUser(User) {
        try {
            const userAdded = await api.addSite(User)
            // console.log(User, "userAdded")
            if (userAdded) {
                toast.success("Site Added")
                setTimeout(() => {
                    window.location.href = '/StoreInformation'
                }, 500);
            }

        } catch (err) {
            return toast.error('Site already exist')
            // console.log(err);
        }
    }
    handleChangeStatus = (e) => {
        this.setState({ status: e })
    }
    handleChangeRole = (e) => {
        this.setState({ role: e })
    }
    handleChangeStore = (e) => {
        this.setState({ site: e })
    }

    render() {
        // console.log(this.props.location.state, "props")
        // console.log(this.state, "props")
        const UserData = this.props.location.state
        // console.log(UserData);
        const status = [
            { label: 'Active' },
            { label: 'DeActivate' },
        ];
        const role = [
            { label: 'Single' },
            { label: 'User' },
            { label: 'Super-Admin' },
        ];
        const customStyles = {
            control: (base, state) => ({
                ...base,
                background: "transparent",
                backgroundColor: 'transparent',
                height: 33,
            }),
            menu: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0,
                // kill the gap
                marginTop: 0,
                background: 'transparent'
            }),
            menuList: base => ({
                ...base,
                // kill the white space on first and last option
                padding: 0,
                background: 'gray'
            }),
            option: provided => ({
                ...provided,
                color: 'black'
            }),
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition, color: "white" };
            },
        };

        return (
            <React.Fragment>
                <div>
                    <div className="main-dashboard">
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">Add Site Info</h1>
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent' }}>
                                <form style={{ width: '80%', margin: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', rowGap: 20, columnGap: 70 }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">
                                    <BasicTextFields type={"text"} placeholder={"Site Name"} require name={"Site Name"} value={this.state.site_name} onChangeEvent={(e) => this.filterNameEvent(e)} />
                                    <BasicTextFields type={"text"} placeholder={"Location"} require name={"Location"} value={this.state.location} onChangeEvent={(e) => this.filterUsernameEvent(e)} />
                                    <div style={{ width: '100%', margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', rowGap: 20, columnGap: 70 }}>
                                    </div>
                                    <Button type="submit" variant="contained">Add Site</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default AddSite
