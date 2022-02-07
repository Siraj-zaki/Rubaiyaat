import { Button } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import BasicTextFields from '../components/Input';
import '../css/Dashboard.css';
import api from '../services/api';
export class EditDevice extends Component {
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
        Site: [],
        siteId: '',
        deviceUniqueID: '',
        pervD: '',
    }
    userName = (e) => {
        this.setState({ userName: e.target.value })
    }
    password = (e) => {
        this.setState({ password: e.target.value })
    }
    description = (e) => {
        this.setState({ description: e.target.value })
    }
    serverIP = (e) => {
        this.setState({ serverIP: e.target.value })
    }
    deviceID = (e) => {
        this.setState({ deviceID: e.target.value })
    }
    deviceUniqueID = (e) => {
        this.setState({ deviceUniqueID: e.target.value })
    }
    partyServerIP = (e) => {
        this.setState({ partyServerIP: e.target.value })
    }
    async componentDidMount() {
        const Site = await api.getAllSite()
        this.setState({ Site })
        console.log(Site);
        this.setState({ pervD: this.props.location.state })
    }
    onSubmitEvent(e) {
        e.preventDefault()
        let editDeviceData = {
            // password: this.state.password,
            userName: this.state.userName === '' ? this.state.pervD.userName : this.state.userName,
            active: this.state.status.label === '' ? this.state.pervD.active : this.state.status.label,
            uuid: this.state.deviceID === '' ? this.state.pervD.uuid : this.state.deviceID,
            // partyServerIP: this.partyServerIP,
            // partyServerProtocolIP: this.state.partyServerProtocolIP,
            server: this.state.serverIP === '' ? this.state.pervD.server : this.state.serverIP,
            siteId: this.state.siteId === '' ? this.state.pervD.siteId : this.state.Site.filter((item => item.site_name === this.state.siteId.label)).map((site => {
                return site._id
            })).reduce((data => {
                return data
            })),
            // innoventProtocalIP: this.state.innoventProtocalIP,
            // description: this.state.description,
            deviceUniqueID: this.state.deviceUniqueID === '' ? this.state.pervD.deviceUniqueID : this.state.deviceUniqueID
        }
        // this.setState({ editDeviceData: editDeviceData })
        // alert(JSON.stringify(this.state.editDeviceData))
        this.editDevice(editDeviceData)
    }
    async editDevice(Data) {
        try {
            console.log(this.state.pervD._id);
            const deviceEdited = await api.editHandHeld(this.state.pervD._id, Data)
            toast.success(JSON.stringify(deviceEdited))
        } catch (error) {
            console.log(JSON.stringify(error));
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
    render() {
        // console.log(this.props.location.state, "props")
        // console.log(this.state, "props")
        // const UserData = this.props.location.state
        // console.log(UserData);
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
                background: 'transparent',
                zIndex: 200
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
        const prevData = this.props.location.state
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
                                <form style={{ width: '80%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', rowGap: 20, columnGap: 70 }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">
                                    <Select
                                        value={this.state.status}
                                        // styles={{ width: '200px' }}
                                        onChange={(e) => this.handleChangeStatus(e)}
                                        options={status}
                                        isSearchable={true}
                                        placeholder={prevData.status}
                                        className="last-scan-select-2"
                                        styles={customStyles}
                                    />
                                    {/* <Select
                                        value={this.state.partyServerProtocolIP}
                                        onChange={(e) => this.handleChangePartyServerProtocolIP(e)}
                                        options={role}
                                        isSearchable={true}
                                        placeholder={this.state.partyServerProtocolIP}
                                        className="last-scan-select-2 black"
                                        styles={customStyles}
                                    /> */}
                                    {/* <Select
                                        value={this.state.innoventProtocalIP}
                                        onChange={(e) => this.handleChangeInnoventProtocalIP(e)}
                                        options={store}
                                        isSearchable={true}
                                        placeholder={this.state.innoventProtocalIP}
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
                                        placeholder={prevData.siteId}
                                        className="last-scan-select-2"
                                        styles={customStyles}
                                    />
                                    {/* <BasicTextFields require name="Status" value={this.state.filterUsername} onChangeEvent={(e) => this.filterUsernameEvent(e)} /> */}
                                    <div style={{ width: '100%', margin: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', rowGap: 20, columnGap: 70 }}>
                                        <BasicTextFields
                                            type={"text"}
                                            placeholder={prevData.userName}
                                            // require
                                            name={"User Name"}
                                            value={this.state.userName}
                                            onChangeEvent={(e) => this.userName(e)}
                                        />
                                        {/* <BasicTextFields
                                            secure={"password"}
                                            type={"text"}
                                            placeholder={"Password"}
                                            // require 
                                            name={"Password"}
                                            value={this.state.password}
                                            onChangeEvent={(e) => this.password(e)}
                                        /> */}
                                        <BasicTextFields
                                            type={'text'}
                                            placeholder={prevData.uuid}
                                            // require
                                            name={"Device ID"}
                                            value={this.state.deviceID}
                                            onChangeEvent={(e) => this.deviceID(e)}
                                        />
                                        <BasicTextFields
                                            type={'text'}
                                            placeholder={prevData.deviceUniqueID}
                                            // require
                                            name={"Device Unique ID"}
                                            value={this.state.deviceUniqueID}
                                            onChangeEvent={(e) => this.deviceUniqueID(e)}
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
                                            placeholder={prevData.server}
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
                                    <Button type="submit" variant="contained">Update Device</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default EditDevice
