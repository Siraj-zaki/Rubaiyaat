import { Button } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import BasicTextFields from '../components/Input';
import '../css/Dashboard.css';
export class EditZPL extends Component {
    state = {
        name: '',
        storeName: '',
        ZPL: '',
        remarks: '',
        status: '',
    }
    storeName = (e) => {
        this.setState({ storeName: e })
    }
    handleChangeStatus = (e) => {
        this.setState({ status: e })
    }
    name = (e) => {
        this.setState({ name: e.target.value })
    }
    ZPL = (e) => {
        this.setState({ ZPL: e.target.value })
    }
    remarks = (e) => {
        this.setState({ remarks: e.target.value })
    }
    onSubmitEvent = (e) => {
        e.preventDefault()
        if (this.state.name === "" && this.state.storeName === "" && this.state.status === "" && this.state.ZPL === "" && this.state.remarks === "") {
            toast.error("Please Enter All data in the given fields")
        }
        else if (this.state.name === "") {
            toast.error("Please Fill Name ")
        }
        else if (this.state.ZPL === "") {
            toast.error("Please Fill ZPL")
        }
        else if (this.state.storeName === "") {
            toast.error("Please Fill Store Name")
        }

        else if (this.state.status === "") {
            toast.error("Please Fill Status")
        }

        else if (this.state.remarks === "") {
            toast.error("Please Fill Remarks")
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
            const { storeName, name, ZPL, status, remarks } = this.state
            let updatedDevice = {
                storeName,
                status,
                name,
                ZPL,
                remarks,
            }
            this.setState({ filterSearch: updatedDevice })
            // toast.error(JSON.stringify(updatedDevice))
        }
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
                                <h1 className="dashboard-heading">Edit ZPL</h1>
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent' }}>
                                <form style={{ width: '80%', margin: 20,display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', rowGap: 20, columnGap: 70 }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">
                                    {/* <BasicTextFields require name="Status" value={this.state.filterstoreName} onChangeEvent={(e) => this.filterstoreNameEvent(e)} /> */}
                                    <div style={{ width: '100%', margin: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', rowGap: 20, columnGap: 70 }}>
                                        <BasicTextFields
                                            type={"text"}
                                            placeholder={"Name"}
                                            // require
                                            name={"Name"}

                                            value={this.state.name}
                                            onChangeEvent={(e) => this.name(e)}
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

                                        <BasicTextFields
                                            // secure={"storeLocation"}
                                            type={"text"}
                                            placeholder={"ZPL"}
                                            // require 
                                            name={"ZPL"}
                                            textarea
                                            rows={10}
                                            width={"45%"}
                                            value={this.state.ZPL}
                                            onChangeEvent={(e) => this.ZPL(e)}
                                        />
                                        <BasicTextFields
                                            type={'text'}
                                            placeholder={"Remarks"}
                                            // require
                                            name={"Remarks"}
                                            value={this.state.remarks}
                                            textarea
                                            rows={10}
                                            width={"45%"}
                                            onChangeEvent={(e) => this.remarks(e)}
                                        />
                                        <Select
                                            value={this.state.storeName}
                                            // styles={{ width: '200px' }}
                                            onChange={(e) => this.storeName(e)}
                                            options={status}
                                            isSearchable={true}
                                            placeholder={"Store Name"}
                                            className="last-scan-select-2"
                                            styles={customStyles}
                                        />
                                    </div>
                                    <Button type="submit" variant="contained">Update ZPL</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default EditZPL
