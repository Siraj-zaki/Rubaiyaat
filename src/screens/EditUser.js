import { Button } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import Select from 'react-select';
import BasicTextFields from '../components/Input';
import '../css/Dashboard.css';
import api from '../services/api';
export class EditUser extends Component {
    state = {
        filterName: this.props.location?.state?.name,
        filterUsername: this.props.location?.state?.userName,
        status: this.props.location?.state?.status,
        role: this.props.location?.state?.roleId?.role_name,
        store: this.props.location?.state?.siteId?._id,
        editUserData: '',
        Role: [],
        Site: [],
        filterPassword: '',
        preData: '',
    }
    async componentDidMount() {
        const Role = await api.getRole()
        this.setState({ Role })
        // console.log(Role);
        // console.log();
        const Site = await api.getAllSite()
        this.setState({ Site })
        // console.log(Site);
        this.setState({ preData: this.props.location.state })
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
        let editUserData = {
            name: this.state.filterName,
            userName: this.state.filterUsername,
            // password: this.state.filterPassword === '' ? this.state.preData.password : this.state.filterPassword,
            roleId: this.state.role,
            siteId: this.state?.store,
            status: this.state.status?.label,
            last_login: "",
            // id:this.state.preData._id
        }
        this.EditUser(editUserData)
        // this.setState({ editUserData: editUserData })
        console.log(editUserData, "ADSASDAS")
    }
    async EditUser(editUserData) {
        try {
            const userEdited = await api.editUser(this.state.preData._id, editUserData)
            console.log(userEdited, "editUserData")
            console.log(editUserData);
        } catch (err) {
            //    return  toast.error(JSON.stringify(err))
            console.log(err, 'asdfdsf');
        }
    }
    handleChangeStatus = (e) => {
        this.setState({ status: e })
    }
    handleChangeRole = (e) => {
        console.log(e.value);
        this.setState({ role: e.value })
    }
    handleChangeStore = (e) => {
        console.log(e.value);
        this.setState({ store: e.value })
    }

    render() {
        // console.log(this.props.location.state, "props")
        // console.log(this.state, "props")

        const UserData = this.props.location.state
        console.log(UserData);
        const status = [
            { label: 'Active' },
            { label: 'DeActivate' },
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
                                    <BasicTextFields type={"text"} placeholder={this.state.filterName} require name={'Name'} value={this.state.filterName === '' ? UserData.name : this.state.filterName} onChangeEvent={(e) => this.filterNameEvent(e)} />
                                    <BasicTextFields type={"text"} placeholder={this.state.filterUsername} require name={'User Name'} value={this.state.filterUsername === '' ? UserData.userName : this.state.filterUsername} onChangeEvent={(e) => this.filterUsernameEvent(e)} />
                                    {/* <BasicTextFields secure={"password"} type={"password"} placeholder={"Passowrd"} r   equire name={"Password"} value={this.state.filterPassword === '' ? UserData.password : this.state.filterPassword} onChangeEvent={(e) => this.filterPasswordEvent(e)} /> */}
                                    {/* <BasicTextFields require name="Status" value={this.state.filterUsername} onChangeEvent={(e) => this.filterUsernameEvent(e)} /> */}
                                    <div style={{ width: '100%', margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', rowGap: 20, columnGap: 70 }}>
                                        <Select
                                            value={this.state.status}
                                            // styles={{ width: '200px' }}
                                            onChange={(e) => this.handleChangeStatus(e)}
                                            options={status}
                                            isSearchable={true}
                                            placeholder={UserData.status}
                                            className="last-scan-select-2"
                                            styles={customStyles}
                                        />
                                        <Select
                                            value={this.state.role}
                                            onChange={(e) => this.handleChangeRole(e)}
                                            options={this.state.Role.filter((item => item.role_name)).map((role => {
                                                return { label: role.role_name, value: role._id }
                                            }))}
                                            isSearchable={true}
                                            placeholder={UserData?.roleId.role_name}
                                            className="last-scan-select-2 black"
                                            styles={customStyles}
                                        />
                                        <Select
                                            value={this.state.store}
                                            onChange={(e) => this.handleChangeStore(e)}
                                            options={this.state.Site.filter((item => item.site_name)).map((role => {
                                                return { label: role.site_name, value: role._id }
                                            }))}
                                            isSearchable={true}
                                            placeholder={UserData?.siteId?.site_name}
                                            className="last-scan-select-2"
                                            styles={customStyles}
                                        />
                                    </div>

                                    <Button type="submit" variant="contained">Update User</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default EditUser
