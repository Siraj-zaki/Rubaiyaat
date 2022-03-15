import React, { Component } from 'react'
import Card from '../components/Card'
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import PeopleIcon from '@material-ui/icons/People';
import '../css/Dashboard.css'
import ActivityCard from '../components/ActivityCard';
// import StickyHeadTable from '../components/Table';
import CollapsibleTable from '../components/Table';
import BasicTextFields from '../components/Input'
import { Button, Typography, IconButton } from '@material-ui/core';
import StickyHeadTable from '../components/StoreInformationTable';
import Select from 'react-select';
import Logo from '../assets/logo.png'
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify'
import api from '../services/api';
import { NavLink } from 'react-router-dom';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ClipLoader from "react-spinners/ClipLoader";
export class StoreInformation extends Component {
    state = {
        store: '',
        company: '',
        country: "",
        Site: [],
        open: true,
        loading: false,
        store: '',
        allData: [],
        sites: [],
    }
    runFunction = async () => {
        this.setState({ loading: true })
        const Site = await api.getAllSite()
        this.setState({ Site, allData: Site, sites: Site })
        console.log(Site);
        if (Site) {
            this.setState({ loading: false })
        }
    }
    searchFunction = (e) => {
        e.preventDefault()
        // if (!this.state.filterName) {
        //     return alert("PLease Filter Name")
        // } else if (!this.state.filterUsername) {
        //     return alert('Please Select Filter Username')
        // } else {
        this.setState({ Site: this.dateFilter() })
        // }
    }
    dateFilter = () => {
        return this.state.allData.filter(x => x?.site_name?.toLowerCase().includes(this.state?.store?.toLowerCase()))
    }
    onSubmitEvent = (e) => {
        e.preventDefault()
        if (this.state.store === "" && this.state.company === "" && this.state.country === "") {
            toast.error("Please Enter Store,Company and Country to Search")
        }
        else if (this.state.store === "") {
            toast.error("Please Enter Store")
        }
        else if (this.state.company === "") {
            toast.error("Please Enter Company")
        }
        else if (this.state.country === "") {
            toast.error("Please Enter Country")
        }
        else {
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
            let search = {
                store: this.state.store,
                company: this.state.company,
                country: this.state.country
            }
            this.setState({ filterSearch: search })
        }
    }
    handleChangeStore = (e) => {
        this.setState({ store: e.target.value })
    }
    handleChangeCountry = (e) => {
        this.setState({ country: e })
    }
    handleChangeCompany = (e) => {
        this.setState({ company: e })
    }
    handleClickOpen = () => {
        this.setState({ openModal: true })
    }
    handleClose = () => {
        this.setState({ openModal: false })
    }
    render() {
        const store = this.state.sites.map((item => { return { label: item.site_name, value: item.site_name } }))
        const customStyles = {
            control: (base, state) => ({
                ...base,
                backgroundColor: 'transparent',
            }),
            menu: base => ({
                ...base,
                zIndex: 30,

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
                        {
                            this.state.loading ? <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', width: '100%', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', height: '100%', backgroundColor: 'rgba(28, 28, 28, 0.6)', zIndex: 10, top: 0, left: 0 }}>
                                <ClipLoader color={'white'} loading={this.state.loading} size={100} />
                            </div> : null
                        }
                        <div className="dashboard ">
                            <div className="dashboard-header" style={{ position: 'relative' }}>
                                <IconButton className="ml-2" aria-label="expand row" size="small" onClick={() => this.setState({ open: !this.state.open })}>
                                    {this.state.open ? <KeyboardArrowUpIcon htmlColor="black" /> : <KeyboardArrowDownIcon htmlColor="black" />}
                                </IconButton>
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">Site Information</h1>
                                <Button onClick={() => this.runFunction()} type="submit" color={'secondary'} variant="contained" style={{ position: 'absolute', right: '10px' }}>Run</Button>
                            </div>
                            {/* <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{ width: '100%' }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <form style={{ width: '80%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }} onSubmit={(e) => this.searchFunction(e)} noValidate={false} autoComplete="off">
                                        <BasicTextFields name="Site" placeholder={"Search"} value={this.state.store} onChangeEvent={(e) => this.handleChangeStore(e)} />
                                    </form>
                                </div>
                            </Collapse> */}

                            <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between', alignSelf: 'flex-end', margin: '10px' }}>
                                {/* <Button type="submit" variant="contained" onClick={(e) => this.searchFunction(e)}>Search</Button> */}
                                <NavLink to={'/Site/AddSite'}>
                                    <Button variant="contained" type='button' color="secondary">Add Sites</Button>
                                </NavLink>
                            </div>
                            <StickyHeadTable Site={this.state.Site} openModal={() => this.handleClickOpen()} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default StoreInformation
