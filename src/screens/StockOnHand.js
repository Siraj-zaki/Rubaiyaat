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
import StockOnHandTable from "../components/StockOnHandTable";
import axios from "axios";
import { BASE_URL } from "../config/Path";
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
        site_Value: [],
        zone_Value: [],
        department_Value: [],
        assetEPC_Value: '',
        Odoo_Tag_Value: '',
        ownerName_Value: '',
        description_Value: '',
        assetStatus_Value: '',
        creationDate_Value: '',
        modificationDate_Value: '',
        locations: [],
        locationsDepartments: [],
        categoryCode_Value: [],
        categoryName_Value: [],
        subCategoryCode_Value: [],
        subCategoryName_Value: [],
        categoryCodeOptions: [],
        categoryNameOptions: [],
        subCategoryCodeOptions: [],
        subCategoryNameOptions: [],
        mainData: []
    };
    async componentDidMount() {

        // console.log(datadata?.data, 'asdf')
        const locations = await api.getLocations()
        let sites = locations?.result?.map((item => { return { label: item.site_name, value: item._id } }))
        if (locations) {
            console.log(sites?.reverse());
            console.log(locations);
            this.setState({ loading: false, sitesOption: this.state.sitesOption.concat(sites), locations: locations.result })
        }

    }
    site_changeHandler = (e) => {
        // console.log(e, 'values');
        this.setState({ site_Value: e })
        let departs = this.state.locations.map((site => site?.departments.filter((department => e.find((val => department.site.includes(val?.value)))))))
        // console.log(departs, 'beforeFilter');
        departs = _.filter(departs, _.size)
        let merge = []
        for (let index = 0; index < departs.length; index++) {
            merge = merge.concat(departs[index])
            // console.log(merge, 'afterFilter-loop');
        }
        // console.log(merge);
        departs = merge
        // console.log(departs, 'afterFilter');
        let departments = departs?.map((item => { return { label: item?.departement_name, value: item?._id } }))
        departments = [...departments, { label: 'all', value: '' }]
        console.log(departments);
        this.setState({ departmentOption: departments, locationsDepartments: departs })
        // console.log(departments, "departments");
    }
    department_changeHandler = (e) => {
        console.log(e);
        this.setState({ department_Value: e })
        let zone = this.state.locationsDepartments?.map((department => department?.zones?.filter((zone => zone.departement.includes(e.map((data => data?.value)))))))
        zone = _.filter(zone, _.size)
        let merge = []
        for (let index = 0; index < zone.length; index++) {
            merge = merge.concat(zone[index])
            // console.log(merge, 'afterFilter-loop');
        }
        // console.log(merge);
        zone = merge
        let zones = zone?.map((item => { return { label: item.zone_name, value: item._id } }))
        // zones = zones.length > 0 ? zones : [{ label: 'all', value: '' }]
        console.log(zones);
        zones = [...zones, { label: 'all', value: '' }]
        console.log(zones);
        this.setState({ zoneOption: zones })
        console.log(zones);
    }
    zone_changeHandler = (e) => {
        console.log(e);
        this.setState({ zone_Value: e })
    }
    categoryCode_changeHandler = (e) => {
        console.log(e);
        this.setState({ categoryCode_Value: e })
    }
    categoryName_changeHandler = (e) => {
        console.log(e);
        this.setState({ categoryName_Value: e })
    }
    subCategoryCode_changeHandler = (e) => {
        console.log(e);
        this.setState({ subCategoryCode_Value: e })
    }
    subCategoryName_changeHandler = (e) => {
        console.log(e);
        this.setState({ subCategoryName_Value: e })
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
            assetsDetails: this.dateFilter()
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
        this.setState({ loading: true })
        const datadata = await axios.get(`${BASE_URL}/site/detail`)
        this.setState({ assetsDetails: datadata?.data, assetsDetailsNew: datadata?.data })
        if (datadata) {
            this.setState({ loading: false })
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
        let Solutuion = allSoh.map(f => ({
            ...f,
            Matched: counted.find(item => item?.asset_EPC === f.asset_EPC) ? true : false,
            // MatchedColor: counted.some(item => item?.asset_EPC === f.asset_EPC) ? 'green' : 'gray',
        }));
        let SolutuionTwo = counted.map(f => ({
            ...f,
            OversCounted: allSoh.find(item => item?.asset_EPC === f.asset_EPC) ? false : true,
        }));

        SolutuionTwo = SolutuionTwo.filter((item => item?.OversCounted === true))
        newArray = await newArray.concat(Solutuion, SolutuionTwo)
        newArray = newArray.filter((item => item.Matched === true || item.Matched === false || item.OversCounted === true))
        await this.setState({
            assetsDetails: newArray,
            assetsDetailsNew: newArray,

        });
        this.searchFunction()
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
                label: "Photo",
                key: "imageLink",
            },
            {
                label: "EPC",
                key: "asset_EPC",
            },
            {
                label: "Asset Code - M365",
                key: "category_code",
            },
            {
                label: "Area",
                key: "category_cod",
            },
            {
                label: "SITE",
                key: "site",
            },
            {
                label: "CATEGORY CODE",
                key: "category_code",
            },
            {
                label: "CATEGORY NAME",
                key: "category_name",
            },
            {
                label: "SUB CATEGORY CODE",
                key: "sub_category_code",
            },
            {
                label: "SUB CATEGORY NAME",
                key: "sub_category_name",
            },

            {
                label: "Departement",
                key: "departement_name",
            },
            {
                label: "LOCATION",
                key: "zone",
            },
            {
                label: "Custodian",
                key: "ownerName",
            },
            {
                label: "Description",
                key: "description",
            },
            {
                label: "Serial No.",
                key: "serialNumber",
            },
            {
                label: "Asset Status",
                key: "assetStatus",
            },
            {
                label: "Acquisition Date",
                key: "ACQUISITION_DATE",
            },
            {
                label: "Depreciation",
                key: "DEPRECIATION",
            },
            {
                label: "NBV",
                key: "NBV",
            },
            {
                label: "Creation Date",
                key: "createdAt",
            },
            {
                label: "Modification Date",
                key: "updatedAt",
            },
            {
                label: "REMARKS",
                key: "REMARKS",
            },
            {
                label: "Maintenance",
                key: "maintenanceDate",
            },
        ];

        console.log(this.state.assetsDetails, "asdfasdf");
        let arr = []


        const data = this.state.assetsDetails !== true ?
            this.state.assetsDetails.map((item) => {
                return {
                    asset_EPC: item?.asset_EPC || "----",
                    serialNumber: item?.serialNumber || "----",
                    site: item?.siteId?.site_name || "----",
                    category_code: item?.category_code || "----",
                    category_name: item?.category_name || "----",
                    sub_category_code: item?.sub_category_code || "----",
                    sub_category_name: item?.sub_category_name || "----",
                    departement_name: item?.departementId?.departement_name || "----",
                    zone: item?.zoneId?.zone_name || "----",
                    ownerName: item?.ownerName || "----",
                    description: item?.description || "----",
                    assetStatus: item?.assetStatus || "----",
                    ACQUISITION_DATE: item?.ACQUISITION_DATE || "----",
                    createdAt: new Date(item?.createdAt).toLocaleString('en-Us', "Asia/Muscat") || '----',
                    updatedAt: new Date(item?.updatedAt).toLocaleString('en-Us', "Asia/Muscat") || "----",
                    DEPRECIATION: item?.DEPRECIATION || "----",
                    NBV: item?.NBV || "----",
                    REMARKS: item?.REMARKS || "----",
                    maintenanceDate: item?.maintenanceDate || "----",
                    imageLink: item?.imageLink || "----",
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
                                <h1 className="dashboard-heading">Stock on Hand</h1>
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
                                    {/* <CSVLink filename="Counted Report" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 60 }} data={data} headers={headers}>
                                        <SystemUpdateAltIcon fontSize="large" htmlColor="black" />
                                        <h1 className="dashboard-heading" style={{ fontSize: '15px' }} >CSV</h1>
                                    </CSVLink> */}
                                </IconButton>
                            </div>
                            <Collapse
                                in={this.state.open}
                                timeout="auto"
                                unmountOnExit
                                style={{ width: "100%" }}
                            >
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
                                    categoryCode_changeHandler={this.categoryCode_changeHandler}
                                    categoryName_changeHandler={this.categoryName_changeHandler}
                                    subCategoryCode_changeHandler={this.subCategoryCode_changeHandler}
                                    subCategoryName_changeHandler={this.subCategoryName_changeHandler}
                                    categoryCodeOption={this.state.categoryCodeOptions}
                                    categoryNameOption={this.state.categoryNameOptions}
                                    subCategoryCodeOption={this.state.subCategoryCodeOptions}
                                    subCategoryNameOption={this.state.subCategoryNameOptions}
                                    categoryCode_Value={this.state.categoryCode_Value}
                                    categoryName_Value={this.state.categoryName_Value}
                                    subCategoryCode_Value={this.state.subCategoryCode_Value}
                                    subCategoryName_Value={this.state.subCategoryName_Value}
                                >
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
                            <StockOnHandTable
                                mainData={this.state.assetsDetails}
                                openModal={(device) => this.handleClickOpen(device)} asn={this.state.assetsDetails !== true ? this.state.assetsDetails?.filter((row => row?.asset_EPC)) : this.state.assetsDetails} />
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default CountedItems;
