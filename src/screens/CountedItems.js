import React, { Component } from "react";
import Card from "../components/Card";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import PeopleIcon from "@material-ui/icons/People";
import "../css/Dashboard.css";
import ActivityCard from "../components/ActivityCard";
// import StickyHeadTable from '../components/Table';
import CollapsibleTable from "../components/Table";
import BasicTextFields from "../components/Input";
import { Button, Typography, IconButton } from "@material-ui/core";
import StickyHeadTable from "../components/StoreInformationTable";
import Select from "react-select";
import Logo from "../assets/logo.png";
import CustomModal from "../components/CustomModal";
import CountInventoryTable from "../components/CountInventoryTable";
import TransferCancelationTable from "../components/TransferCancelationTable";
import api from "../services/api";
import SupplyChainASNTable from "../components/SupplyChainASNTable";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment";
import Papa from "papaparse";
import FirstReportTable from "../components/FirstReportTable";
import { CSVLink } from "react-csv";
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import { DatePicker, Radio, Space, Checkbox, Divider } from 'antd';
import { toast } from "react-toastify";
import CountedTable from "../components/CountedTable";
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Unders', 'Overs', "Matched"];
const defaultCheckedList = [];
const { RangePicker } = DatePicker;
export class CountedItems extends Component {
    state = {
        location: "",
        ASN: [],
        device: "",
        openModal: false,
        open: true,
        loading: false,
        startingDate: "",
        endingDate: "",
        ibt: "",
        allData: [],
        assetsDetails: true,
        remarks: "",
        assetsDetailsNew: [],
        epc: '',
        asset_name: '',
        asset_status: '',
        creation_date: '',
        modification_date: '',
        image: '',
        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false,
        overs: false,
        unders: false,
        matched: false,
        sites: [],
        zones: [],
        zone: '',
        site: '',
        counted: [],
        allSoh: [],
    };
    async componentDidMount() {
        this.setState({ loading: true });
        const sites = await api.getAllSite()
        const zones = await api.getAllZone()
        this.setState({ zones, sites })
        console.log(sites, 'sites');
        console.log(zones, 'zones');
        if (sites && zones) {
            this.setState({ loading: false });
        }
    }
    onChange = list => {
        this.setState({ checkedList: list });
        this.setState({ indeterminate: !!list.length && list.length < plainOptions.length });
        this.setState({ checkAll: list.length === plainOptions.length });
    };

    onCheckAllChange = e => {
        this.setState({ checkedList: e.target.checked ? plainOptions : [] })
        this.setState({ indeterminate: false });
        this.setState({ checkAll: e.target.checked });

    };

    onSubmitEvent = () => {
        console.log("User");
    };
    searchFunction = async () => {

        await this.setState({ assetsDetails: this.dateFilter() });
    };
    dateCompareCreation = (sDate, eDate) => {
        let { creation_date } = this.state;
        let endingDate = this.state.creation_date;
        if (!creation_date && !endingDate) {
            return true;
        }
        creation_date = moment(creation_date);
        let sDiff = moment(sDate).diff(creation_date, "days");
        let eDiff = !eDate ? -1 : moment(eDate).diff(endingDate, "days");
        if (sDiff >= 0 && eDiff <= 0) return true;
        return false;
    };
    dateCompareUpdated = (sDate, eDate) => {
        let { modification_date } = this.state;
        let endingDate = this.state.modification_date;
        if (!modification_date && !endingDate) {
            return true;
        }
        modification_date = moment(modification_date);
        let sDiff = moment(sDate).diff(modification_date, "days");
        let eDiff = !eDate ? -1 : moment(eDate).diff(endingDate, "days");
        if (sDiff >= 0 && eDiff <= 0) return true;
        return false;
    };
    dateFilter = () => {
        return this.state.assetsDetails.filter(
            (x) =>
                x?.asset_EPC?.includes(this.state?.epc)
                // x?.asset_name?.assetStatus.includes(this.state.asset_status)
                &&
                this.dateCompareCreation(x?.createdAt, x?.createdAt)
                &&
                this.dateCompareUpdated(x?.updatedAt, x?.updatedAt)
        );
    };
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    runFunction = async () => {
        this.setState({ loading: true });
        // if (this.state.assetsDetails === true) {
        const CountedItems = await api.getCountedItemsByParams(this.state.site === '' ? this.state.sites[0]?._id : this.state.site?.value, this.state.zone === '' ? this.state.zones[0]?._id : this.state.zone?.value);
        const assetBySOH = await api.getAssetsBySohWithParam(this.state.site === '' ? this.state.sites[0]?._id : this.state.site?.value, this.state.zone === '' ? this.state.zones[0]?._id : this.state.zone?.value);
        // const assetBySOH = await api.getAssetsBySoh();
        if (CountedItems && assetBySOH) {
            let newArray = []
            newArray = await newArray.concat(CountedItems, assetBySOH)
            await this.setState({ assetsDetails: newArray, assetsDetailsNew: newArray })
            this.runFunctionSearch(CountedItems, assetBySOH)
            this.setState({ loading: false });
        }
        // }
    }
    matchedFunction = () => {
        let newData = this.state.assetsDetailsNew?.filter((item =>
            item.Matched === true
        ))
        this.setState({
            assetsDetails: newData,
        });
    }
    oversFunction = () => {
        let newData = this.state.assetsDetailsNew?.filter((item =>
            item.OversCounted == true
        ))
        this.setState({
            assetsDetails: newData,
        });
    }
    undersFunction = () => {
        let newData = this.state.assetsDetailsNew?.filter((item =>
            item.Matched === false
        ))
        this.setState({
            assetsDetails: newData,
        });
    }

    runFunctionSearch = async (counted, allSoh) => {
        this.setState({ loading: true });
        let newArray = []
        let Solutuion = allSoh.map(f => ({
            ...f,
            Matched: counted.find(item => item?.asset_EPC === f.asset_EPC) ? true : false,
            MatchedColor: counted.find(item => item?.asset_EPC === f.asset_EPC) ? 'green' : 'gray',
        }));
        let SolutuionTwo = counted.map(f => ({
            ...f,
            OversCounted: allSoh.find(item => item?.asset_EPC !== f.asset_EPC) ? true : false,
            MatchedColor: allSoh.find(item => item?.asset_EPC !== f.asset_EPC) ? 'red' : '',

        }));
        newArray = await newArray.concat(Solutuion, SolutuionTwo)
        newArray = newArray.filter((item => item.Matched === true || item.Matched === false || item.OversCounted === true))
        let shuffled = newArray
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
        console.log(shuffled, "newArray-new");
        await this.setState({
            assetsDetails: shuffled,
            assetsDetailsNew: shuffled,

        });
        this.setState({ loading: false });
    };
    handleClickOpen = (device) => {
        this.setState({ openModal: true })
        this.setState({ QrCode: device })
    }
    handleClose = () => {
        this.setState({ openModal: false })
    }
    handleChangeZone = (e) => {
        this.setState({ zone: e })
    }
    handleChangeSite = (e) => {
        this.setState({ site: e })
    }

    render() {
        const headers = [
            {
                label: "createdAt",
                key: "createdAt",
            },
            {
                label: "ownerName",
                key: "ownerName",
            },
            {
                label: "asset_EPC",
                key: "asset_EPC",
            },
            {
                label: "department",
                key: "department",
            },
            {
                label: "location",
                key: "location",
            },
            {
                label: "inventoryDate",
                key: "inventoryDate",
            },
            {
                label: "updatedAt",
                key: "updatedAt",
            },
            {
                label: "assetStatus",
                key: "assetStatus",
            },
            {
                label: "VALUE",
                key: "VALUE",
            },
            {
                label: "SITE",
                key: "SITE",
            },
            {
                label: "description",
                key: "description",
            },
            {
                label: "SUB_CATEGORY_CODE",
                key: "SUB_CATEGORY_CODE",
            },
            {
                label: "SUB_CATEGORY_NAME",
                key: "SUB_CATEGORY_NAME",
            },

        ];
        let arr = []
        const data = this.state.assetsDetails !== true ? this.state.assetsDetails.map((item) => {
            return {
                createdAt: new Date(item?.createdAt).toLocaleString('en-Us', "Asia/Muscat") || "----",
                ownerName: item?.asset_name?.ownerName || "----",
                // assetType: item?.asset_name?.assetType || "----",
                asset_EPC: item?.asset_EPC || "----",
                department: item?.asset_name?.department || "----",
                location: item?.asset_name?.location || "----",
                inventoryDate: item?.asset_name?.inventoryDate || "----",
                updatedAt: new Date(item?.updatedAt).toLocaleString('en-Us', "Asia/Muscat") || "----",
                assetStatus: item?.asset_name?.assetStatus || "----",
                VALUE: item?.asset_name?.VALUE || "----",
                SITE: item?.asset_name?.SITE || "----",
                description: item?.asset_name?.description || "----",
                SUB_CATEGORY_CODE: item?.asset_name?.SUB_CATEGORY_CODE || "----",
                SUB_CATEGORY_NAME: item?.asset_name?.SUB_CATEGORY_NAME || "----",
                CATEGORY_NAME: item?.asset_name?.SUB_CATEGORY_NAME || "----",
                CATEGORY_CODE: item?.asset_name?.SUB_CATEGORY_CODE || "----",
                // Asset_Image: item?.asset_name?.image,
            }
        }) : arr
        const customStyles = {
            control: (base, state) => ({
                ...base,
                background: "transparent",
                backgroundColor: 'transparent',
                height: 33,
                marginTop: 10,

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
                color: 'black',
                zIndex: 312312312312312
            }),
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition, color: "white" };
            },
        };

        let sites = this.state?.sites?.map((item => {
            return { label: item?.site_name, value: item?._id }
        }))

        const zones = this.state?.zones?.map((item => {
            return { label: item?.zone_name, value: item?._id }
        }))
        return (
            <React.Fragment>
                <CustomModal data={this.state.QrCode} brcode={true} image={true} open={this.state.openModal} handleClose={() => this.handleClose()} handleClickOpen={() => this.handleClickOpen} />
                <div>
                    <div className="main-dashboard">
                        {this.state.loading ? (
                            <div
                                style={{
                                    position: "absolute",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    alignSelf: "center",
                                    height: "100%",
                                    backgroundColor: "rgba(28, 28, 28, 0.6)",
                                    zIndex: 10,
                                    left: 0,
                                    top: 0,
                                }}
                            >
                                <ClipLoader
                                    color={"white"}
                                    loading={this.state.loading}
                                    size={100}
                                />
                            </div>
                        ) : null}
                        <div className="dashboard ">
                            <div
                                className="dashboard-header"
                                style={{ position: "relative" }}
                            >
                                <IconButton
                                    className="ml-2"
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => this.setState({ open: !this.state.open })}
                                >
                                    {this.state.open ? (
                                        <KeyboardArrowUpIcon htmlColor="black" />
                                    ) : (
                                        <KeyboardArrowDownIcon htmlColor="black" />
                                    )}
                                </IconButton>
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">Counted Item (Report)</h1>
                                <Button
                                    onClick={() => this.searchFunction()}
                                    type="submit"
                                    color={"secondary"}
                                    variant="contained"
                                    style={{ position: "absolute", right: "90px" }}
                                >
                                    Search
                                </Button>
                                <Button
                                    onClick={() => this.runFunction()}
                                    type="submit"
                                    color={"secondary"}
                                    variant="contained"
                                    style={{ position: "absolute", right: "10px" }}
                                >
                                    Run
                                </Button>
                                {/* <CSVReader /> */}
                                <IconButton style={{ position: "absolute", right: "170px", cursor: 'pointer' }}>
                                    <CSVLink filename="Counted Report" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 60 }} data={data} headers={headers}>
                                        <SystemUpdateAltIcon fontSize="large" htmlColor="black" />
                                        <h1 className="dashboard-heading" style={{ fontSize: '15px' }} >CSV</h1>
                                    </CSVLink>
                                </IconButton>
                            </div>
                            <Collapse
                                in={this.state.open}
                                timeout="auto"
                                unmountOnExit
                                style={{ width: "100%" }}
                            >

                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transparent', minHeight: 50, marginTop: 10, position: 'relative' }}>
                                    <form style={{ width: '50%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 0, flexDirection: 'column' }}  >
                                        <Select
                                            value={this.state.site}
                                            onChange={(e) => this.handleChangeSite(e)}
                                            options={sites}
                                            isSearchable={true}
                                            placeholder={"Site"}
                                            className="last-scan-select-2"
                                            styles={customStyles}
                                        />
                                        <Select
                                            value={this.state.zone}
                                            onChange={(e) => this.handleChangeZone(e)}
                                            options={zones}
                                            isSearchable={true}
                                            placeholder={"Zone"}
                                            className="last-scan-select-2"
                                            styles={customStyles}
                                        />
                                        <BasicTextFields
                                            margin={10}
                                            placeholder="EPC"
                                            name="EPC"
                                            value={this.state.epc}
                                            onChangeEvent={(e) =>
                                                this.setState({ epc: e.target.value })
                                            }
                                        />
                                    </form>
                                    <div style={{ width: '1px', height: '100%', backgroundColor: 'white', position: 'absolute' }}></div>
                                    <form style={{ width: '50%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 0, flexDirection: 'column' }}  >
                                        {/* <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} /> */}
                                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                            <Button color={"primary"} variant="contained" onClick={() => this.matchedFunction()} >Matched</Button>
                                            <Button color={"primary"} variant="contained" onClick={() => this.oversFunction()} >Overs</Button>
                                            <Button color={"primary"} variant="contained" onClick={() => this.undersFunction()} >Unders</Button>
                                        </div>
                                        <DatePicker value={this.state.creation_date} placeholder={"Creation Date"} className="input-mat-1" style={{ border: '1px solid white', borderRadius: 5, height: 37, marginTop: 10, fontWeight: 'lighter' }} size={'large'} format={"YYYY-MM-DD"} onChange={(e) => this.setState({ creation_date: e })} />
                                        <DatePicker value={this.state.modification_date} placeholder={"Modification Date"} className="input-mat-1" style={{ border: '1px solid white', borderRadius: 5, height: 37, marginTop: 10, fontWeight: 'lighter' }} size={'large'} format={"YYYY-MM-DD"} onChange={(e) => this.setState({ modification_date: e })} />
                                    </form>
                                </div>
                            </Collapse>
                            <div
                                style={{
                                    display: "flex",
                                    width: "200px",
                                    justifyContent: "space-between",
                                    alignSelf: "flex-end",
                                    margin: "10px",
                                }}
                            >
                            </div>
                            <CountedTable openModal={(device) => this.handleClickOpen(device)} asn={this.state.assetsDetails} />
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default CountedItems;
