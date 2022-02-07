import { Button } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import BasicTextFields from '../components/Input';
import '../css/Dashboard.css';
export class EditStoreInformation extends Component {
    state = {
        storeLocation: '',
        storeName: '',
        status: '',
        statusType: '',
        latLong: '',
        countryName: '',
        company: '',
        editDeviceData: '',
    }
    onSubmitEvent = (e) => {
        e.preventDefault()
        if (this.state.storeName === "" && this.state.storeLocation === "" && this.state.latLong === "" && this.state.countryName === "" && this.state.company === "" && this.state.status === "" && this.state.statusType === "") {
            toast.error("Please Enter All data in the given fields")
        }
        else if (this.state.storeName === "") {
            toast.error("Please Fill Store Name ")
        }
        else if (this.state.storeLocation === "") {
            toast.error("Please Fill Store Location")
        }
        else if (this.state.latLong === "") {
            toast.error("Please Fill Lat Long")
        }
        else if (this.state.countryName === "") {
            toast.error("Please Fill Country Name")
        }
        else if (this.state.company === "") {
            toast.error("Please Fill Company")
        }
        else if (this.state.status === "") {
            toast.error("Please Fill Status")
        }
        else if (this.state.statusType === "") {
            toast.error("Please Fill Status Type")
        }
        else {
            // const searching = toast.loading("Searching")
            const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
            const searching = toast.promise(
                resolveAfter3Sec,
                {
                    pending: 'Updating Device',
                    success: 'Device Updated 👌',
                    error: 'Promise rejected 🤯'
                }
            )
            setTimeout(() => {
                return toast.update(searching, { render: "All is good", type: "success", isLoading: false })
            }, 3000);
            const { storeName, storeLocation, latLong, countryName, company, statusType, status } = this.state
            let updatedDevice = {
                storeName,
                storeLocation,
                latLong,
                countryName,
                company,
                status,
                statusType,
            }
            this.setState({ filterSearch: updatedDevice })
            // toast.error(JSON.stringify(updatedDevice))
        }
    }
    handleChangeStatus = (e) => {
        this.setState({ status: e })
    }
    handleChangeStatusType = (e) => {
        this.setState({ statusType: e })
    }
    render() {
        // console.log(this.props.location.state, "props")
        // console.log(this.state, "props")
        const UserData = this.props.location.state
        console.log(UserData);
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
                                <h1 className="dashboard-heading">Edit Hand-Held Device</h1>
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent' }}>
                                <form style={{ width: '80%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', rowGap: 20, columnGap: 70 }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">

                                    {/* <BasicTextFields require name="Status" value={this.state.filterstoreName} onChangeEvent={(e) => this.filterstoreNameEvent(e)} /> */}
                                    <div style={{ width: '100%', margin: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', rowGap: 20, columnGap: 70 }}>
                                        <BasicTextFields
                                            type={"text"}
                                            placeholder={"Store Name"}
                                            // require
                                            name={"Store Name"}
                                            value={this.state.storeName}
                                            onChangeEvent={(e) => this.setState({ storeName: e.target.value })}
                                        />

                                        <BasicTextFields
                                            // secure={"storeLocation"}
                                            type={"text"}
                                            placeholder={"Store Location"}
                                            // require 
                                            name={"Store Location"}
                                            value={this.state.storeLocation}
                                            onChangeEvent={(e) => this.setState({ storeLocation: e.target.value })}
                                        />
                                        <BasicTextFields
                                            type={'text'}
                                            placeholder={"Lat Long"}
                                            // require
                                            name={"Lat Long"}
                                            value={this.state.latLong}
                                            onChangeEvent={(e) => this.setState({ latLong: e.target.value })}
                                        />
                                        <BasicTextFields
                                            type={"text"}
                                            placeholder={"Country Name"}
                                            // require
                                            name={"Country Name"}
                                            value={this.state.countryName}
                                            onChangeEvent={(e) => this.setState({ countryName: e.target.value })}
                                        />
                                        <BasicTextFields
                                            type={"text"}
                                            placeholder={"Company *"}
                                            // require
                                            name={"Company *"}
                                            value={this.state.company}
                                            onChangeEvent={(e) => this.setState({ company: e.target.value })}
                                        />
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
                                        <Select
                                            value={this.state.statusType}
                                            // styles={{ width: '200px' }}
                                            onChange={(e) => this.handleChangeStatusType(e)}
                                            options={status}
                                            isSearchable={true}
                                            placeholder={"Status Type"}
                                            className="last-scan-select-2"
                                            styles={customStyles}
                                        />
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

export default EditStoreInformation
