import { Button, IconButton } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import PeopleIcon from "@material-ui/icons/People";
import { DatePicker } from 'antd';
import _ from 'lodash';
import moment from "moment";
import { CSVLink } from "react-csv";
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import Papa from "papaparse";
import React, { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import CustomModal from "../components/CustomModal";
import { FilterFunction } from "../components/filterFunction";
import Filters from "../components/Filters";
import ItemMasterTable from "../components/ItemMasterTable";
import "../css/Dashboard.css";
import api from "../services/api";
import Select from 'react-select'
const { RangePicker } = DatePicker;
export class ThirdReport extends Component {
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
    maintenanceTime: '',
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
  maintenanceTime_changeHandler = (e) => {
    console.log(e?.value);
    this.setState({ maintenanceTime: e })
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
          site_Value: this.state.site_Value?.label === 'all' ? '' : this.state.site_Value?.label,
          zone_Value: this.state.zone_Value?.label === 'all' ? '' : this.state.zone_Value?.label,
          department_Value: this.state.department_Value.label === 'all' ? '' : this.state.department_Value.label,
          assetEPC_Value: this.state.assetEPC_Value || '',
          createdAt: this.state.creationDate_Value || '',
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
    this.setState({ loading: true });
    const assetRoutes = await api.getSohByParams({
      siteId: this.state.site_Value?.value || null,
      zoneId: this.state.zone_Value?.value || null,
      departementId: this.state.department_Value?.value || null,
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
      console.log(assetRoutes.map((item => item?.maintenanceDate)), "assetsDetails");
      // this.setState({
      //     assetsDetails: FilterFunction({
      //         data: this.state.assetsDetailsNew,
      //         filters: {
      //             site_Value: this.state.site_Value?.label === 'all' ? '' : this.state.site_Value?.label,
      //             zone_Value: this.state.zone_Value?.label === 'all' ? '' : this.state.zone_Value?.label,
      //             department_Value: this.state.department_Value.label === 'all' ? '' : this.state.department_Value.label,
      //             assetEPC_Value: this.state.assetEPC_Value || '',
      //             Odoo_Tag_Value: this.state.Odoo_Tag_Value || '',
      //             ownerName_Value: this.state.ownerName_Value || '',
      //             description_Value: this.state.description_Value || '',
      //             assetStatus_Value: this.state.assetStatus_Value || '',
      //             createdAt: this.state.creationDate_Value || '',
      //             updatedAt: this.state.modificationDate_Value || '',
      //             // zoneFilter: ''
      //         }
      //     })
      // })

      // await this.searchFunction()
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
  csvUploader = (e) => {
    console.log(e.target.files[0]);
    const files = e.target.files;
    console.log(files);
    if (files) {

      Papa.parse(files[0], {
        header: true,
        complete: results => {
          console.log(results.data)
        },
      })
    } else {
      return toast.error("Please Upload Csv")
    }
  }


  render() {
    const maintenanceOptions = [
      { label: 5, value: 5 },
      { label: 10, value: 10 },
      { label: 15, value: 15 },
      { label: 20, value: 20 },
      { label: 25, value: 25 },
      { label: 30, value: 30 },
    ]

    const customStyles = {
      control: (base, state) => ({
        ...base,
        marginTop: 10,
        backgroundColor: "transparent",
        color: 'black',
      }),
      menu: (base) => ({
        ...base,
        zIndex: 30, color: 'black',
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
                  creationDate_Value={this.state.creationDate_Value}
                  site_changeHandler={this.site_changeHandler}
                  zone_changeHandler={this.zone_changeHandler}
                  department_changeHandler={this.department_changeHandler}
                  assetEPC_changeHandler={this.assetEPC_changeHandler}
                  creationDate_changeHandler={this.creationDate_changeHandler}
                  sitesOption={this.state.sitesOption}
                  zoneOption={this.state.zoneOption}
                  departmentOption={this.state.departmentOption}
                  siteFilter
                  zoneFilter
                  departmentFilter
                  assetEPCFilter
                  creationDateFilter
                >
                  <Select
                    value={this.state.maintenanceTime}
                    onChange={this.maintenanceTime_changeHandler}
                    options={maintenanceOptions}
                    isSearchable={true}
                    placeholder={this.state.maintenanceTime || "Zero"}
                    className="last-scan-select-2"
                    styles={customStyles}
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

export default ThirdReport;
