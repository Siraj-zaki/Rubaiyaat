import { Button, IconButton } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import Logo from '../assets/logo.png';
import AuditTable from '../components/AuditTable';
import CustomModal from '../components/CustomModal';
import BasicTextFields from '../components/Input';
import '../css/Dashboard.css';
export class Audit extends Component {
    state = {
        openModal: false,
        store: '',
        company: '',
        name: '',
        username: '',
        open: true,
    }
    onSubmitEvent(e) {
        e.preventDefault()
        if (this.state.store === "" && this.state.company === "" && this.state.name === "" && this.state.username === "") {
            toast.error("Please Enter Store,Company and Country to Search")
        }
        else if (this.state.store === "") {
            toast.error("Please Enter Store")
        }
        else if (this.state.company === "") {
            toast.error("Please Enter Company")
        }
        else if (this.state.name === "") {
            toast.error("Please Enter Name")
        }
        else if (this.state.username === "") {
            toast.error("Please Enter User Name")
        }
        else {
            // const searching = toast.loading("Searching")
            const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
            const searching = toast.promise(
                resolveAfter3Sec,
                {
                    pending: 'Searching',
                    success: 'Data Searched 👌',
                    error: 'Promise rejected 🤯'
                }
            )
            setTimeout(() => {
                return toast.update(searching, { render: "All is good", type: "success", isLoading: false })
            }, 3000);
            const { name, company, store, username } = this.state
            let search = {
                name,
                company,
                store,
                username
            }
            this.setState({ filterSearch: search })
            toast.error(JSON.stringify(this.state.filterSearch))
        }
    }
    handleChangeStore = (e) => {
        this.setState({ store: e })
    }
    handleChangeCompany = (e) => {
        this.setState({ company: e })
    }
    handleChangeName = (e) => {
        this.setState({ name: e.target.value })
    }
    handleChangeUserName = (e) => {
        this.setState({ username: e.target.value })
    }
    handleClickOpen = () => {
        this.setState({ openModal: true })
    }
    handleClose = () => {
        this.setState({ openModal: false })
    }

    render() {
        const location = [
            { label: 'Pakistan' },
            { label: 'India' },
        ];
        const devices = [
            { label: 'Zerbra Device' },
            { label: 'BarCode Device' },
            { label: 'QrCode Device' },
        ];
        const customStyles = {
            control: (base, state) => ({
                ...base,
                backgroundColor: 'transparent',
                marginTop: 10,
                width: 300,
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
            <React.Fragment>
                <CustomModal image open={this.state.openModal} handleClose={() => this.handleClose()} handleClickOpen={() => this.handleClickOpen} data={Logo} />
                <div>
                    <div className="main-dashboard">
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <IconButton className="ml-2" aria-label="expand row" size="small" onClick={() => this.setState({ open: !this.state.open })}>
                                    {this.state.open ? <KeyboardArrowUpIcon htmlColor="black" /> : <KeyboardArrowDownIcon htmlColor="black" />}
                                </IconButton>
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">Audit</h1>
                            </div>
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <form style={{ width: '30%', margin: 20,marginBottom:0, display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-end', flexWrap: 'wrap', flexDirection: 'column' }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">
                                        <BasicTextFields margin={10} name="Username" value={this.state.username} onChangeEvent={(e) => this.handleChangeUserName(e)} />
                                        <Select
                                            value={this.state.company}
                                            onChange={(e) => this.handleChangeCompany(e)}
                                            options={devices}
                                            isSearchable={true}
                                            placeholder={"Company"}
                                            className="last-scan-select-2"
                                            styles={customStyles}
                                        />
                                    </form>
                                    <form style={{ width: '30%', margin: 20,marginBottom:0, display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: 'column' }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">
                                        <BasicTextFields margin={10} name="Name" value={this.state.name} onChangeEvent={(e) => this.handleChangeName(e)} />
                                        <Select
                                            value={this.state.store}
                                            // styles={{ width: '200px' }}
                                            onChange={(e) => this.handleChangeStore(e)}
                                            options={location}
                                            isSearchable={true}
                                            placeholder={"Stores"}
                                            className="last-scan-select-2"
                                            styles={customStyles}
                                        />
                                    </form>
                                </div>
                            </Collapse>
                            <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between', alignSelf: 'flex-end', margin: '10px' }}>
                                <Button type="submit" variant="contained">Search</Button>
                            </div>
                            <AuditTable openModal={() => this.handleClickOpen()} />
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default Audit
