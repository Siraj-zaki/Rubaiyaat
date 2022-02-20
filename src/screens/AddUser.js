import { Button } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import Select from 'react-select';

import { ToastContainer, toast } from 'react-toastify';
import BasicTextFields from '../components/Input';
import '../css/Dashboard.css';
import api from '../services/api';
export class AddUser extends Component {
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
            name: this.state.filterName,
            userName: this.state.filterUsername,
            password: this.state.filterPassword,
            roleId: this.state.Role.filter((item => item.role_name === this.state.role.label)).map((role => {
                return role._id
            })).reduce((data => {
                return data
            })),
            siteId: this.state.Site.filter((item => item.site_name === this.state.site.label)).map((site => {
                return site._id
            })).reduce((data => {
                return data
            })),
            status: this.state.status.label,
        }
        this.AddUser(User)
    }
    async AddUser(User) {
        try {
            if (User.name === '') {
                return toast.error('Please Enter Name')
            } else if (User.userName === '') {
                return toast.error('Please Enter User Name')
            } else if (User.password === '') {
                return toast.error('Please Enter Password')
            } else if (User.role === '') {
                return toast.error('Please Enter Role')
            } else if (User.site === '') {
                return toast.error('Please Enter Site')
            } else if (User.status === '') {
                return toast.error('Please Enter Status')
            }
            else {
                const userAdded = await api.addUser(User)
                // console.log(User, "userAdded")
                if (userAdded) {
                    toast.success("User Added")
                    setTimeout(() => {
                        window.location.href = '/Users'
                    }, 500);
                }
            }
        } catch (err) {
            return toast.error('User Already exist')
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
                                    <BasicTextFields type={"text"} placeholder={"Name"} require name={"Name"} value={this.state.filterName} onChangeEvent={(e) => this.filterNameEvent(e)} />
                                    <BasicTextFields type={"text"} placeholder={"User Name"} require name={"User Name"} value={this.state.filterUsername} onChangeEvent={(e) => this.filterUsernameEvent(e)} />
                                    <BasicTextFields secure={"password"} type={"password"} placeholder={"Passowrd"} require name={"Password"} value={this.state.filterPassword} onChangeEvent={(e) => this.filterPasswordEvent(e)} />
                                    <div style={{ width: '100%', margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', rowGap: 20, columnGap: 70 }}>
                                        <Select
                                            value={this.state.status}
                                            onChange={(e) => this.handleChangeStatus(e)}
                                            options={status}
                                            isSearchable={true}
                                            placeholder={"Status"}
                                            className="last-scan-select-2"
                                            styles={customStyles}
                                        />
                                        <Select
                                            value={this.state.role}
                                            onChange={(e) => this.handleChangeRole(e)}
                                            options={this.state.Role.filter((item => item.role_name)).map((role => {
                                                return { label: role.role_name }
                                            }))}
                                            isSearchable={true}
                                            placeholder={"Role"}
                                            className="last-scan-select-2 black"
                                            styles={customStyles}
                                        />
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

                                    <Button type="submit" variant="contained">Add User</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default AddUser
