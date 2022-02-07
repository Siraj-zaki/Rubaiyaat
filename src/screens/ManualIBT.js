import React, { Component } from 'react'
import Card from '../components/Card'
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import PeopleIcon from '@material-ui/icons/People';
import '../css/Dashboard.css'
import ActivityCard from '../components/ActivityCard';
// import StickyHeadTable from '../components/Table';
import CollapsibleTable from '../components/Table';
import BasicTextFields from '../components/Input'
import { Button, Typography } from '@material-ui/core';
import { toast } from 'react-toastify'
import Select from 'react-select';
export class ManualIBT extends Component {
    state = {
        IBT: '',
        retailBizlocation: '',
        retailOriginal: '',
        remarks: '',
    }
    IBTFunction = (e) => {
        this.setState({ IBT: e.target.value })
    }
    remarksFunction = (e) => {
        this.setState({ remarks: e.target.value })
    }
    retailBizlocationFunction = (e) => {
        this.setState({ retailBizlocation: e })
    }
    retailOriginalFunction = (e) => {
        this.setState({ retailOriginal: e })
    }
    onSubmitEvent = (e) => {
        e.preventDefault()
        if (this.state.IBT === "" && this.state.retailBizlocation === "" && this.state.retailOriginal === "" && this.state.remarks === "") {
            toast.error("Please Enter All data in the given fields")
        }
        else if (this.state.IBT === "") {
            toast.error("Please Fill IBT ")
        }
        else if (this.state.retailBizlocation === "") {
            toast.error("Please Fill Retail Bizlocation")
        }
        else if (this.state.retailOriginal === "") {
            toast.error("Please Fill Retail Original")
        }
        else if (this.state.remarks === "") {
            toast.error("Please Fill remarks")
        }
        else {
            // const searching = toast.loading("Searching")
            const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
            const searching = toast.promise(
                resolveAfter3Sec,
                {
                    pending: 'Recieving',
                    success: 'Recieved 👌',
                    error: 'Promise rejected 🤯'
                }
            )
            setTimeout(() => {
                return toast.update(searching, { render: "All is good", type: "success", isLoading: false })
            }, 3000);
            let recieved = {
                name: this.state.date,
                userName: this.state.IBT,
                status: this.state.status
            }
            this.setState({ filterSearch: recieved })
        }
    }
    handleChangeStatus = (e) => {
        this.setState({ status: e })
    }
    handleChangeRole = (e) => {
        this.setState({ role: e })
    }
    handleChangeStore = (e) => {
        this.setState({ store: e })
    }

    render() {
        // console.log(this.props.location.state, "props")
        // console.log(this.state, "props")
        const UserData = {
            id: 1, name: "Siraj", userName: "Siraj-Zaki", role: "Super-Admin", userHistory: {
                store: "INNOVENT", status: "Active", lastLogin: "Today", Action: 'edit',
            }
        }
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
                backgroundColor: 'transparent',
            }),
            menu: base => ({
                ...base,
                zIndex: 30
            }),
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition, color: "white" };
            },
        };

        return (
            <React.Fragment >
                <div>
                    <div className="main-dashboard">
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading"> Receive IBT</h1>
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent' }}>
                                <form style={{ width: '80%', margin: 20,marginBottom:0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', rowGap: 20, columnGap: 70 }} onSubmit={(e) => this.onSubmitEvent(e)}>
                                    <BasicTextFields type={"text"} placeholder={UserData.name} name={"IBT"} value={this.state.IBT} onChangeEvent={(e) => this.IBTFunction(e)} />
                                    <Select
                                        value={this.state.retailBizlocation}
                                        onChange={(e) => this.retailBizlocationFunction(e)}
                                        options={role}
                                        isSearchable={true}
                                        placeholder={"Retail Bizlocation *"}
                                        className="last-scan-select-2 black w-50"
                                        styles={customStyles}
                                    />
                                    {/* <BasicTextFields  name="Status" value={this.state.filterUsername} onChangeEvent={(e) => this.filterUsernameEvent(e)} /> */}
                                    <Select
                                        value={this.state.retailOriginal}
                                        // styles={{ width: '200px' }}
                                        onChange={(e) => this.retailOriginalFunction(e)}
                                        options={status}
                                        isSearchable={true}
                                        placeholder={"Retail Bizlocation Original *"}
                                        className="last-scan-select-2 w-50"
                                        styles={customStyles}
                                    />

                                    <div style={{ width: '100%', margin: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', rowGap: 20, columnGap: 70 }}>
                                        <BasicTextFields textarea rows={11} width={'52%'} type={"text"} placeholder={UserData.userName} name={"Remarks"} value={this.state.remarks} onChangeEvent={(e) => this.remarksFunction(e)} />
                                    </div>

                                    <Button type="submit" color="primary" variant="contained">Recieve</Button>
                                    <Button type="button" color="secondary" variant="contained">Get Details</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default ManualIBT
