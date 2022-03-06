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
    categoryCode_Value: [],
    categoryName_Value: [],
    subCategoryCode_Value: [],
    subCategoryName_Value: [],
    locations: [],
    locationsDepartments: [],
    categoryCodeOptions: [],
    categoryNameOptions: [],
    subCategoryCodeOptions: [],
    subCategoryNameOptions: [],
    mainTime: 30,


  };
  mainTimeHandler = (e) => {
    console.log(Number(e.target.value));
    this.setState({ mainTime: Number(e.target.value) })
  }
  async componentDidMount() {
    const filters = await api.getFilters()
    if (filters) {
      let data = filters?.filters
      let categoryCodeOptions = data?.category_code?.map(item => {
        return { label: item, value: item }
      })
      let categoryNameOptions = data?.category_name?.map(item => {
        return { label: item, value: item }
      })
      let subCategoryCodeOptions = data?.sub_category_code?.map(item => {
        return { label: item, value: item }
      })
      let subCategoryNameOptions = data?.sub_category_name?.map(item => {
        return { label: item, value: item }
      })
      this.setState({
        categoryCodeOptions,
        categoryNameOptions,
        subCategoryCodeOptions,
        subCategoryNameOptions,
      })
    }
    console.log(filters, 'filters');
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
  onSubmitEvent = () => {
    console.log("User");
  };
  searchFunction = () => {
    let newARR = []
    newARR = [...newARR, this.state.assetsDetailsNew.filter((item => {
      const then = new Date(item?.maintenanceDate)

      const now = new Date();
      const msBetweenDates = Math.abs(then.getTime() - now.getTime());

      // 👇️ convert ms to days                 hour   min  sec   ms
      const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);
      if (daysBetweenDates < this.state.mainTime) {
        return item
      }
    }))]
    console.log(newARR);
    this.setState({
      assetsDetails: newARR[0]
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
      zoneId: zones ? null : this.state.zone_Value?.map((item => item.value)),
      departementId: depaets ? null : this.state.department_Value?.map((item => item.value)),
      description: this.state.description_Value || null,
      ownerName: this.state.ownerName_Value || null,
      asset_EPC: this.state.assetEPC_Value || null,
      assetStatus: this.state.assetStatus_Value || null,
    })
    console.log(assetRoutes, "assetsDetails");
    await this.setState({
      assetsDetails: assetRoutes,
      assetsDetailsNew: assetRoutes,
    });

    if (assetRoutes) {
      await this.setState({ loading: false });
      this.searchFunction()
      // console.log(assetRoutes.filter((item => item?.asset_EPC.includes("E2000016170F02380880C293"))), "assetsDetails");
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

    const headers = [
      {
        label: "asset_EPC",
        key: "asset_EPC",
      },
      {
        label: "serialNumber",
        key: "serialNumber",
      },
      {
        label: "SITE",
        key: "site",
      },
      {
        label: "CATEGORY_CODE",
        key: "category_code",
      },
      {
        label: "CATEGORY_NAME",
        key: "category_name",
      },
      {
        label: "SUB_CATEGORY_CODE",
        key: "sub_category_code",
      },
      {
        label: "SUB_CATEGORY_NAME",
        key: "sub_category_name",
      },
      {
        label: "departement",
        key: "departement_name",
      },
      {
        label: "zone",
        key: "zone",
      },
      {
        label: "ownerName",
        key: "ownerName",
      },
      {
        label: "description",
        key: "description",
      },
      {
        label: "assetStatus",
        key: "assetStatus",
      },
      {
        label: "ACQUISITION_DATE",
        key: "ACQUISITION_DATE",
      },
      {
        label: "createdAt",
        key: "createdAt",
      },
      {
        label: "updatedAt",
        key: "updatedAt",
      },
      {
        label: "DEPRECIATION",
        key: "DEPRECIATION",
      },
      {
        label: "NBV",
        key: "NBV",
      },
      {
        label: "REMARKS",
        key: "REMARKS",
      },
      {
        label: "maintenanceDate",
        key: "maintenanceDate",
      },
    ];
    const data = this.state.assetsDetails.map((item) => {
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
                <h1 className="dashboard-heading">Maintenance (Report)</h1>
                <Button
                  onClick={() => this.runFunction()}
                  type="submit"
                  color={"secondary"}
                  variant="contained"
                  style={{ position: "absolute", right: "10px" }}
                >
                  Run
                </Button>
                {/* <Button
                  onClick={() => this.searchFunction()}
                  type="submit"
                  color={"secondary"}
                  variant="contained"
                  style={{ position: "absolute", right: "190px" }}
                >
                  Search
                </Button> */}
                {/* <CSVReader /> */}
                <IconButton style={{ position: "absolute", right: "90px", cursor: 'pointer' }}>
                  <CSVLink filename="Maintenance Report" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 60 }} data={data} headers={headers}>
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
                  ownerNameFilter
                  descriptionFilter
                  assetStatusFilter
                >
                  <BasicTextFields
                    type={'numeric'}
                    margin={10}
                    name="Maintenance Time"
                    placeholder={"Maintenance Time"}
                    value={this.state.mainTime}
                    onChangeEvent={this.mainTimeHandler}
                  />
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
                {/* <CSVLink data={data} headers={headers}>
                  <Button color="primary" variant="contained">
                    CSV
                  </Button>
                </CSVLink> */}
              </div>
              <ItemMasterTable openModal={(device) => this.handleClickOpen(device)} asn={this.state.assetsDetails} />
            </div>
          </div>
        </div>
      </React.Fragment >
    );
  }
}

export default ItemMasterReport;
