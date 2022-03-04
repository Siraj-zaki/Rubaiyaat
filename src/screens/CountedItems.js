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
import { FilterFunction } from "../components/filterFunction";
import Filters from "../components/Filters";
import _ from 'lodash'
import ItemMasterTable from "../components/ItemMasterTable";
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
        sitesOption: [{ label: "all", value: '' }],
        zoneOption: [{ label: "all", value: '' }],
        departmentOption: [{ label: "all", value: '' }],
        site_Value: '',
        zone_Value: '',
        department_Value: '',
        assetEPC_Value: '',
        Odoo_Tag_Value: '',
        ownerName_Value: '',
        description_Value: '',
        assetStatus_Value: '',
        creationDate_Value: '',
        modificationDate_Value: '',
        locations: [],
        locationsDepartments: [],
    };
    async componentDidMount() {
        this.setState({ loading: true })
        const locations = await api.getLocations()
        let sites = locations?.result?.map((item => { return { label: item.site_name, value: item._id } }))
        if (locations) {
            console.log(sites?.reverse());
            console.log(locations);
            this.setState({ loading: false, sitesOption: this.state.sitesOption.concat(sites), locations: locations.result })
        }
    }
    //////////////////////////////
    site_changeHandler = (e) => {
        console.log(e?.value);
        this.setState({ site_Value: e })
        let departs = this.state.locations.map((site => site?.departments.filter((department => department.site.includes(e?.value)))))
        departs = _.filter(departs, _.size)
        departs = departs[0] ? departs[0] : departs
        console.log(departs);
        let departments = departs?.map((item => { return { label: item?.departement_name, value: item?._id } }))
        departments = [...departments, { label: 'all', value: '' }]
        console.log(departments);
        this.setState({ departmentOption: departments, locationsDepartments: departs })
        console.log(departments);
    }
    department_changeHandler = (e) => {
        console.log(e?.value);
        this.setState({ department_Value: e })
        let zone = this.state.locationsDepartments?.map((department => department?.zones?.filter((zone => zone.departement.includes(e?.value)))))
        zone = _.filter(zone, _.size)
        zone = zone[0] ? zone[0] : zone
        // zone = zone.length > 0 ? zone : [{ label: 'all', value: '' }]
        let zones = zone?.map((item => { return { label: item.zone_name, value: item._id } }))
        // zones = zones.length > 0 ? zones : [{ label: 'all', value: '' }]
        console.log(zones);
        zones = [...zones, { label: 'all', value: '' }]
        console.log(zones);
        this.setState({ zoneOption: zones })
        console.log(zones);
    }
    zone_changeHandler = (e) => {
        console.log(e?.value);
        this.setState({ zone_Value: e })
    }

    assetEPC_changeHandler = (e) => {
        console.log(e.target.value);
        this.setState({ assetEPC_Value: e.target.value })
    }
    Odoo_Tag_changeHandler = (e) => {
        console.log(e.target.value);
        this.setState({ Odoo_Tag_Value: e.target.value })
    }
    ownerName_changeHandler = (e) => {
        console.log(e.target.value);
        this.setState({ ownerName_Value: e.target.value })
    }
    description_changeHandler = (e) => {
        console.log(e.target.value);
        this.setState({ description_Value: e.target.value })
    }
    assetStatus_changeHandler = (e) => {
        console.log(e.target.value);
        this.setState({ assetStatus_Value: e.target.value })
    }
    creationDate_changeHandler = (e) => {
        console.log(e);
        this.setState({ creationDate_Value: e })
    }
    modificationDate_changeHandler = (e) => {
        console.log(e);
        this.setState({ modificationDate_Value: e })
    }
    //////////////////////////////////
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
    searchFunction = () => {

        this.setState({
            assetsDetails:
                FilterFunction({
                    data: this.state.assetsDetailsNew,
                    filters: {
                        site_Value: this.state.site_Value?.label === 'all' ? '' : this.state.site_Value?.label,
                        zone_Value: this.state.zone_Value?.label === 'all' ? '' : this.state.zone_Value?.label,
                        department_Value: this.state.department_Value.label === 'all' ? '' : this.state.department_Value.label,
                        assetEPC_Value: this.state.assetEPC_Value || '',
                        Odoo_Tag_Value: this.state.Odoo_Tag_Value || '',
                        ownerName_Value: this.state.ownerName_Value || '',
                        description_Value: this.state.description_Value || '',
                        assetStatus_Value: this.state.assetStatus_Value || '',
                        createdAt: this.state.creationDate_Value || '',
                        updatedAt: this.state.modificationDate_Value || '',
                        // onlyDepartment: this.state.site_Value?.label === 'all' ? '' : this.state.site_Value?.label,
                        // onlySite: this.state.zone_Value?.label === 'all' ? '' : this.state.zone_Value?.label,
                        // onlyZone: this.state.department_Value.label === 'all' ? '' : this.state.department_Value.label,
                        // zoneFilter: ''
                    }
                })
        });
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
        return this.state.assetsDetailsNew.filter(
            (x) =>
                x?.asset_EPC?.includes(this.state?.epc)
            // x?.asset_name?.assetStatus.includes(this.state.asset_status)
            // &&
            // this.dateCompareCreation(x?.createdAt, x?.createdAt)
            // &&
            // this.dateCompareUpdated(x?.updatedAt, x?.updatedAt)
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
        if (this.state.site_Value && this.state.zoneOption === '') {
            return toast.error("Please Select Zite and Zone")
        } else {
            const CountedItems = await api.getCountedItemsByParams(this.state.site_Value?.value, this.state.zone_Value?.value);
            const assetBySOH = await api.getAssetsBySohWithParam(this.state.site_Value?.value, this.state.zone_Value?.value);
            if (CountedItems && assetBySOH) {
                let newArray = []
                newArray = await newArray.concat(CountedItems, assetBySOH)
                await this.setState({ assetsDetails: newArray, assetsDetailsNew: newArray })
                this.runFunctionSearch(CountedItems, assetBySOH)
                this.setState({ loading: false });
            }
        }
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
        // var matched = []
        // var newData = []
        // for (var j = 0; j < counted.length; j++) {
        //     for (var i = 0; i < allSoh.length; i++) {
        //         if (allSoh[i].asset_EPC === counted[j].asset_EPC) {
        //             matched.push(allSoh[i])
        //         }
        //         else {
        //             allSoh[i].status = "unders"
        //             counted[j].status = "overs"
        //             newData = newData.concat(allSoh, counted)
        //         }
        //     }
        // }
        // let gropasdf = _.groupBy(newData, 'status')
        // console.log(gropasdf, 'asd');
        let Solutuion = allSoh.map(f => ({
            ...f,
            Matched: counted.find(item => item?.asset_EPC === f.asset_EPC) ? true : false,
            // MatchedColor: counted.some(item => item?.asset_EPC === f.asset_EPC) ? 'green' : 'gray',
        }));

        console.log(allSoh.filter((item => item.asset_EPC === "E2000016170F00310900BD16")), "soh");
        console.log(counted.filter((item => item.asset_EPC === "E2000016170F00310900BD16")), "counted");
        let SolutuionTwo = counted.map(f => ({
            ...f,
            OversCounted: allSoh.find(item => item?.asset_EPC === f.asset_EPC) ? false : true,
            // MatchedColor: allSoh.some(item => item?.asset_EPC !== f.asset_EPC) ? '' : 'red',
        }));

        SolutuionTwo = SolutuionTwo.filter((item => item?.OversCounted === true))
        newArray = await newArray.concat(Solutuion, SolutuionTwo)
        newArray = newArray.filter((item => item.Matched === true || item.Matched === false || item.OversCounted === true))
        // let shuffled = newArray
        //     .map(value => ({ value, sort: Math.random() }))
        //     .sort((a, b) => a.sort - b.sort)
        //     .map(({ value }) => value)
        // console.log(shuffled, "newArray-new");
        await this.setState({
            assetsDetails: newArray,
            assetsDetailsNew: newArray,

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
    handleChangeSite = async (e) => {
        this.setState({ loading: true })
        this.setState({ site: e })
        let { value } = e
        const zones = await api.getZoneBySite(value)
        if (zones) {
            this.setState({ zones })
            this.setState({ loading: false })
            console.log(value);

        }
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
                label: "serialNumber",
                key: "serialNumber",
            },
            {
                label: "departementId",
                key: "departementId",
            },
            {
                label: "zoneId",
                key: "zoneId",
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
                label: "assetValue",
                key: "assetValue",
            },
            {
                label: "siteId",
                key: "siteId",
            },
            {
                label: "description",
                key: "description",
            },
            {
                label: "sub_category_code",
                key: "sub_category_code",
            },
            {
                label: "sub_category_name",
                key: "sub_category_name",
            },
            {
                label: "category_code",
                key: "category_code",
            },
            {
                label: "category_name",
                key: "category_name",
            },
            {
                label: "imageLink",
                key: "imageLink",
            },
        ];
        let arr = []


        const data = this.state.assetsDetails !== true ?
            this.state.assetsDetails.map((item) => {
                return {
                    createdAt: new Date(item?.createdAt).toLocaleString('en-Us', "Asia/Muscat") || "----",
                    ownerName: item?.ownerName || "----",
                    asset_EPC: item?.asset_EPC || "----",
                    serialNumber: item?.serialNumber || "----",
                    departementId: item?.departementId?.departement_name || "----",
                    zoneId: item?.zoneId?.zone_name || "----",
                    location: item?.location || "----",
                    inventoryDate: new Date(item?.inventoryDate).toLocaleString('en-Us', "Asia/Muscat") || "----",
                    updatedAt: new Date(item?.updatedAt).toLocaleString('en-Us', "Asia/Muscat") || "----",
                    assetStatus: item?.assetStatus || "----",
                    assetValue: item?.assetValue || "----",
                    siteId: item?.siteId?.site_name || "----",
                    description: item?.description || "----",
                    sub_category_code: item?.sub_category_code || "----",
                    sub_category_name: item?.sub_category_name || "----",
                    category_code: item?.category_code || "----",
                    category_name: item?.category_name || "----",
                    imageLink: item?.imageLink || "----",
                    // Asset_Image: item?.image,
                }
            }) : arr
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

                                {/* <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transparent', minHeight: 50, marginTop: 10, position: 'relative' }}>
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

                                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                            <Button color={"primary"} variant="contained" onClick={() => this.matchedFunction()} >Matched</Button>
                                            <Button color={"primary"} variant="contained" onClick={() => this.oversFunction()} >Overs</Button>
                                            <Button color={"primary"} variant="contained" onClick={() => this.undersFunction()} >Unders</Button>
                                        </div>
                                        <DatePicker value={this.state.creation_date} placeholder={"Creation Date"} className="input-mat-1" style={{ border: '1px solid white', borderRadius: 5, height: 37, marginTop: 10, fontWeight: 'lighter' }} size={'large'} format={"YYYY-MM-DD"} onChange={(e) => this.setState({ creation_date: e })} />
                                        <DatePicker value={this.state.modification_date} placeholder={"Modification Date"} className="input-mat-1" style={{ border: '1px solid white', borderRadius: 5, height: 37, marginTop: 10, fontWeight: 'lighter' }} size={'large'} format={"YYYY-MM-DD"} onChange={(e) => this.setState({ modification_date: e })} />
                                    </form>
                                </div> */}
                                <Filters
                                    site_Value={this.state.site_Value}
                                    zone_Value={this.state.zone_Value}
                                    department_Value={this.state.department_Value}
                                    assetEPC_Value={this.state.assetEPC_Value}
                                    Odoo_Tag_Value={this.state.Odoo_Tag_Value}
                                    ownerName_Value={this.state.ownerName_Value}
                                    description_Value={this.state.description_Value}
                                    assetStatus_Value={this.state.assetStatus_Value}
                                    creationDate_Value={this.state.creationDate_Value}
                                    modificationDate_Value={this.state.modificationDate_Value}
                                    site_changeHandler={this.site_changeHandler}
                                    zone_changeHandler={this.zone_changeHandler}
                                    department_changeHandler={this.department_changeHandler}
                                    assetEPC_changeHandler={this.assetEPC_changeHandler}
                                    Odoo_Tag_changeHandler={this.Odoo_Tag_changeHandler}
                                    ownerName_changeHandler={this.ownerName_changeHandler}
                                    description_changeHandler={this.description_changeHandler}
                                    assetStatus_changeHandler={this.assetStatus_changeHandler}
                                    creationDate_changeHandler={this.creationDate_changeHandler}
                                    modificationDate_changeHandler={this.modificationDate_changeHandler}
                                    sitesOption={this.state.sitesOption}
                                    zoneOption={this.state.zoneOption}
                                    departmentOption={this.state.departmentOption}
                                    siteFilter
                                    zoneFilter
                                    departmentFilter
                                    assetEPCFilter
                                    Odoo_TagFilter
                                    ownerNameFilter
                                    descriptionFilter
                                    assetStatusFilter
                                    creationDateFilter
                                    modificationDateFilter
                                >
                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <Button color={"primary"} variant="contained" onClick={() => this.matchedFunction()} >Matched</Button>
                                        <Button color={"primary"} variant="contained" onClick={() => this.oversFunction()} >Overs</Button>
                                        <Button color={"primary"} variant="contained" onClick={() => this.undersFunction()} >Unders</Button>
                                    </div>
                                </Filters>
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
                            {/* <CountedTable openModal={(device) => this.handleClickOpen(device)} asn={this.state.assetsDetails} /> */}
                            <ItemMasterTable openModal={(device) => this.handleClickOpen(device)} asn={this.state.assetsDetails} />
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default CountedItems;
