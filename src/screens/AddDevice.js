import { Button } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import BasicTextFields from '../components/Input';
import '../css/Dashboard.css';
import api from '../services/api';
export class AddDevice extends Component {
    state = {
        password: '',
        userName: '',
        status: '',
        deviceID: '',
        partyServerIP: '',
        partyServerProtocolIP: '',
        serverIP: '',
        innoventProtocalIP: '',
        description: '',
        storeName: '',
        editDeviceData: '',
        deviceUniqueId: '',
        Role: [],
        Site: [],
        siteId: '',
        uuid: '',
    }
    userName = (e) => {
        this.setState({ userName: e.target.value })
    }
    password = (e) => {
        this.setState({ password: e.target.value })
    }
    DeviceUniqueId = (e) => {
        this.setState({ deviceUniqueId: e.target.value })
    }
    description = (e) => {
        this.setState({ description: e.target.value })
    }
    serverIP = (e) => {
        this.setState({ serverIP: e.target.value })
    }
    deviceID = (e) => {
        this.setState({ uuid: e.target.value })
    }
    partyServerIP = (e) => {
        this.setState({ partyServerIP: e.target.value })
    }
    onSubmitEvent(e) {
        e.preventDefault()
        let AddDeviceData = {
            password: this.state.password,
            userName: this.state.userName,
            // active: this.state.status.label,
            uuid: this.state.uuid,
            // partyServerIP: this.partyServerIP,
            // partyServerProtocolIP: this.state.partyServerProtocolIP,
            server: this.state.serverIP,
            // innoventProtocalIP: this.state.innoventProtocalIP,
            // description: this.state.description,
            deviceUniqueId: this.state.deviceUniqueId,
            siteId: this.state.Site.filter((item => item.site_name === this.state.siteId.label)).map((site => {
                return site._id
            })).reduce((data => {
                return data
            })),
        }

        if (this.state.serverIP !== "") {
            this.AddDevice(AddDeviceData)
        } else {
            return toast.error("Please fill serverIP")
        }
    }
    async AddDevice(Data) {
        try {
            const deviceAdded = await api.addHandHeld(Data)
            toast.success(JSON.stringify(deviceAdded))
        } catch (error) {
            toast.error(JSON.stringify(error))
        }
    }
    handleChangeStoreName = (e) => {
        this.setState({ siteId: e })
    }
    handleChangeStatus = (e) => {
        this.setState({ status: e })
    }
    handleChangeInnoventProtocalIP = (e) => {
        this.setState({ innoventProtocalIP: e })
    }
    handleChangePartyServerProtocolIP = (e) => {
        this.setState({ partyServerProtocolIP: e })
    }
    async componentDidMount() {
        const Site = await api.getAllSite()
        this.setState({ Site })
        console.log(Site);
    }
    render() {
        // console.log(this.props.location.state, "props")
        // console.log(this.state, "props")
        const store = [
            { label: 'INNOVENT' },
            { label: 'INNOVENT2' },
            { label: 'INNOVENT3' },
        ];
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

                background: 'transparent',
                zIndex: 200
            }),
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition, color: "white" };
            },
            menuList: base => ({
                ...base,
                // kill the white space on first and last option
                padding: 0,
                background: 'gray',


            }),
            option: provided => ({
                ...provided,
                color: 'black',

            }),
            singleValue: (provided) => ({
                ...provided,
                color: 'whitesmoke'
            }),
        };
        return (
            <React.Fragment>
                <div>
                    <div className="main-dashboard">
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">Edit Hand-Held Device</h1>
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent' }}>
                                <form style={{ width: '80%', margin: 20, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', rowGap: 20, columnGap: 70 }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">
                                    <Select
                                        value={this.state.status}
                                        // styles={{ width: '200px' }}
                                        onChange={(e) => this.handleChangeStatus(e)}
                                        options={status}
                                        isSearchable={true}
                                        placeholder={"Status"}
                                        className="last-scan-select-2"
                                        styles={customStyles}
                                    />
                                    {/* <Select
                                        value={this.state.partyServerProtocolIP}
                                        onChange={(e) => this.handleChangePartyServerProtocolIP(e)}
                                        options={role}
                                        isSearchable={true}
                                        placeholder={"partyServerProtocolIP"}
                                        className="last-scan-select-2 black"
                                        styles={customStyles}
                                    /> */}
                                    {/* <Select
                                        value={this.state.innoventProtocalIP}
                                        onChange={(e) => this.handleChangeInnoventProtocalIP(e)}
                                        options={role}
                                        isSearchable={true}
                                        placeholder={"innoventProtocalIP"}
                                        className="last-scan-select-2"
                                        styles={customStyles}
                                    /> */}
                                    <Select
                                        value={this.state.siteId}
                                        onChange={(e) => this.handleChangeStoreName(e)}
                                        options={this.state.Site.filter((item => item.site_name)).map((role => {
                                            return { label: role.site_name }
                                        }))}
                                        isSearchable={true}
                                        placeholder={"Site ID"}
                                        className="last-scan-select-2"
                                        styles={customStyles}
                                    />
                                    {/* <BasicTextFields require name="Status" value={this.state.filterUsername} onChangeEvent={(e) => this.filterUsernameEvent(e)} /> */}
                                    <div style={{ width: '100%', margin: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', rowGap: 20, columnGap: 70 }}>
                                        <BasicTextFields
                                            type={"text"}
                                            placeholder={"User Name"}
                                            // require
                                            name={"User Name"}
                                            value={this.state.userName}
                                            onChangeEvent={(e) => this.userName(e)}
                                        />
                                        <BasicTextFields
                                            type={"text"}
                                            placeholder={"Device Unique ID"}
                                            // require
                                            name={"Device Unique ID"}
                                            value={this.state.deviceUniqueId}
                                            onChangeEvent={(e) => this.DeviceUniqueId(e)}
                                        />
                                        <BasicTextFields
                                            secure={"password"}
                                            type={"text"}
                                            placeholder={"Password"}
                                            // require 
                                            name={"Password"}
                                            value={this.state.password}
                                            onChangeEvent={(e) => this.password(e)}
                                        />
                                        <BasicTextFields
                                            type={'text'}
                                            placeholder={"UUID"}
                                            // require
                                            name={"Device ID"}
                                            value={this.state.uuid}
                                            onChangeEvent={(e) => this.deviceID(e)}
                                        />
                                        {/* <BasicTextFields
                                            type={"text"}
                                            placeholder={"3rd Party Server IP *"}
                                            // require
                                            name={"3rd Party Server IP *"}
                                            value={this.state.partyServerIP}
                                            onChangeEvent={(e) => this.partyServerIP(e)}
                                        /> */}
                                        <BasicTextFields
                                            type={"text"}
                                            placeholder={"Server IP *"}
                                            // require
                                            name={"Server IP *"}
                                            value={this.state.serverIP}
                                            onChangeEvent={(e) => this.serverIP(e)}
                                        />
                                        {/* <BasicTextFields
                                            type={'text'}
                                            placeholder={"Description *"}
                                            // require
                                            name={"Description *"}
                                            value={this.state.description}
                                            textarea
                                            width={400}
                                            rows={8}
                                            onChangeEvent={(e) => this.description(e)}
                                        /> */}

                                    </div>
                                    <Button type="submit" variant="contained">Add Device</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default AddDevice