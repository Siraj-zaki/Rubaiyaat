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
import { DatePicker, Radio, Space } from 'antd';
import { toast } from "react-toastify";
import CSVReader from "../components/CsvUploader";
import Barcode from 'react-barcode'
import ItemMasterTable from "../components/ItemMasterTable";
import { FilterFunction } from "../components/filterFunction";
import Filters from "../components/Filters";
import _ from 'lodash'
const { RangePicker } = DatePicker;
export class ItemMasterReport extends Component {
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
        assetsDetails: [],
        remarks: "",
        assetsDetailsNew: [],
        epc: '',
        asset_name: '',
        asset_status: '',
        creation_date: '',
        modification_date: '',
        image: '',
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
    //////////////////////new handlers
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
        console.log(e?.value);
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
    onSubmitEvent = () => {
        console.log("User");
    };
    searchFunction = () => {
        // e.preventDefault();

        this.setState({
            assetsDetails: FilterFunction({
                data: this.state.assetsDetailsNew,
                filters: {
                    site_Value: this.state.site_Value[0]?.label === 'all' ? [{ label: '' }] : this.state.site_Value,
                    zone_Value: this.state.zone_Value[0]?.label === 'all' ? [{ label: '' }] : this.state.zone_Value?.label,
                    department_Value: this.state.department_Value[0]?.label === 'all' ? [{ label: '' }] : this.state.department_Value.label,
                    assetEPC_Value: this.state.assetEPC_Value || '',
                    Odoo_Tag_Value: this.state.Odoo_Tag_Value || '',
                    ownerName_Value: this.state.ownerName_Value || '',
                    description_Value: this.state.description_Value || '',
                    assetStatus_Value: this.state.assetStatus_Value || '',
                    createdAt: this.state.creationDate_Value || '',
                    updatedAt: this.state.modificationDate_Value || '',
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
        // endingDate = moment(endingDate)
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
        // endingDate = moment(endingDate)
        let sDiff = moment(sDate).diff(modification_date, "days");
        let eDiff = !eDate ? -1 : moment(eDate).diff(endingDate, "days");
        if (sDiff >= 0 && eDiff <= 0) return true;
        return false;
    };
    runFunction = async () => {
        let sites = this.state.site_Value?.some((item => item.label === 'all'))
        let zones = this.state.zone_Value?.some((item => item.label === 'all'))
        let depaets = this.state.department_Value?.some((item => item.label === 'all'))
        console.log(sites);
        this.setState({ loading: true });
        const assetRoutes = await api.getSohByParams({
            siteId: sites ? null : this.state.site_Value?.map((item => item.value)),
            zoneId: zones ? this.state.zone_Value?.map((item => item.value)) : null,
            departementId: depaets ? this.state.department_Value?.map((item => item.value)) : null,
            description: this.state.description_Value || null,
            ownerName: this.state.ownerName_Value || null,
            asset_EPC: this.state.assetEPC_Value || null,
            serialNumber: this.state.Odoo_Tag_Value || null,
            assetValue: this.state.assetStatus_Value || null,
        })
        console.log(assetRoutes, "assetsDetails");
        await this.setState({
            assetsDetails: assetRoutes,
            assetsDetailsNew: assetRoutes,
        });

        if (assetRoutes) {
            await this.setState({ loading: false });
            console.log(assetRoutes.filter((item => item?.asset_EPC.includes("E2000016170F02380880C293"))), "assetsDetails");
        }
    };

    handleClickOpen = (device) => {
        this.setState({ openModal: true })
        // console.log(device);
        this.setState({ QrCode: device })
    }
    handleClose = () => {
        this.setState({ openModal: false })
    }



    render() {
        const customStyles = {
            control: (base, state) => ({
                ...base,
                marginTop: 10,
                backgroundColor: "transparent",
            }),
            menu: (base) => ({
                ...base,
                zIndex: 30,
            }),
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = "opacity 300ms";
                return { ...provided, opacity, transition, color: "white" };
            },
        };
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
        const data = this.state.assetsDetails.map((item) => {
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
        })
        console.log(this.state.assetsDetails, "asdfasdf");
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
                                <h1 className="dashboard-heading">Item Master (Report)</h1>
                                <Button
                                    onClick={() => this.runFunction()}
                                    type="submit"
                                    color={"secondary"}
                                    variant="contained"
                                    style={{ position: "absolute", right: "10px" }}
                                >
                                    Run
                                </Button>
                                <Button
                                    onClick={() => this.searchFunction()}
                                    type="submit"
                                    color={"secondary"}
                                    variant="contained"
                                    style={{ position: "absolute", right: "190px" }}
                                >
                                    Search
                                </Button>
                                {/* <CSVReader /> */}
                                <IconButton style={{ position: "absolute", right: "90px", cursor: 'pointer' }}>
                                    <CSVLink filename="Item Master Report" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 60 }} data={data} headers={headers}>
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
                                />
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
                                {/* <CSVLink data={data} headers={headers}>
                  <Button color="primary" variant="contained">
                    CSV
                  </Button>
                </CSVLink> */}
                            </div>
                            <ItemMasterTable edit openModal={(device) => this.handleClickOpen(device)} asn={this.state.assetsDetails} />
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default ItemMasterReport;
