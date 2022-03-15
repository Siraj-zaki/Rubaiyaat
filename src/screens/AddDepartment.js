import { Button } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import Select from 'react-select';

import { ToastContainer, toast } from 'react-toastify';
import BasicTextFields from '../components/Input';
import '../css/Dashboard.css';
import api from '../services/api';
export class AddDepartment extends Component {
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
        departement_name: "",
        level: "",
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
        this.setState({ filterName: e.target.value })
    }
    filterUsernameEvent = (e) => {
        this.setState({ filterUsername: e.target.value })
    }
    filterPasswordEvent = (e) => {
        this.setState({ filterPassword: e.target.value })
    }
    onSubmitEvent(e) {
        e.preventDefault()
        let User = {
            departement_name: this.state.filterName,
            level: this.state.filterUsername,
            site: this.state.Site.filter((item => item.site_name === this.state.site.label)).map((site => {
                return site._id
            })).reduce((data => {
                return data
            })),
        }
        this.AddUser(User)
    }
    async AddUser(User) {
        try {

            const userAdded = await api.addDepartment(User)
            // console.log(User, "userAdded")
            if (userAdded) {
                toast.success("Department Added")
                setTimeout(() => {
                    window.location.href = '/'
                }, 500);
            }

        } catch (err) {
            return toast.error('Department Already exist')
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
                                <h1 className="dashboard-heading">Edit User Info</h1>
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent' }}>
                                <form style={{ width: '80%', margin: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', rowGap: 20, columnGap: 70 }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">
                                    <BasicTextFields type={"text"} placeholder={"Department Name"} require name={"Department Name"} value={this.state.filterName} onChangeEvent={(e) => this.filterNameEvent(e)} />
                                    <BasicTextFields type={"text"} placeholder={"Level"} require name={"Level"} value={this.state.filterUsername} onChangeEvent={(e) => this.filterUsernameEvent(e)} />
                                    <div style={{ width: '100%', margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', rowGap: 20, columnGap: 70 }}>
                                        <Select
                                            value={this.state.store}
                                            onChange={(e) => this.handleChangeStore(e)}
                                            options={this.state.Site.filter((item => item.site_name)).map((role => {
                                                return { label: role.site_name }
                                            }))}
                                            isSearchable={true}
                                            placeholder={"Site"}
                                            className="last-scan-select-2"
                                            styles={customStyles}
                                        />
                                    </div>

                                    <Button type="submit" variant="contained">Add Department</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default AddDepartment
