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
import { CSVLink } from "react-csv";
import SecondReportTable from "../components/SecondReportTable";
import ThirdReportTable from "../components/ThirdReportTable";
import { DatePicker, Radio, Space } from 'antd';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
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
    zone: "",
    RFID_Date: "",
    remarks: "",
    SOH: [],
    Asset_ID: "",
    Department: "",
    Item_Category: "",
    LastTimeDate: "",
    Serial_no: "",
    sites: [],
    zones: [],
    zone: '',
    site: '',
  };

  async componentDidMount() {
    const sites = await api.getAllSite()
    const zones = await api.getAllZone()
    this.setState({ zones, sites })
    console.log(sites, 'sites');
    console.log(zones, 'zones');
  }
  onSubmitEvent = () => {
    console.log("User");
  };
  searchFunction = () => {
    this.setState({ SOH: this.dateFilter() });
    // console.log(this.state.allData.map((item) => item?.asset_name));
  };
  dateCompare = (sDate, eDate) => {
    let { LastTimeDate } = this.state;
    let endingDate = this.state.LastTimeDate;
    if (!LastTimeDate && !endingDate) {
      return true;
    }
    LastTimeDate = moment(LastTimeDate);
    // endingDate = moment(endingDate)
    let sDiff = moment(sDate).diff(LastTimeDate, "days");
    let eDiff = !eDate ? -1 : moment(eDate).diff(endingDate, "days");
    if (sDiff >= 0 && eDiff <= 0) return true;
    return false;
  };
  dateFilter = () => {
    return this.state.allData.filter(
      (x) =>
        x?.asset_name?.description?.toLowerCase().includes(
          this.state?.Asset_ID.toLowerCase()
        ) &&
        x?.asset_name?.CATEGORY_CODE?.includes(
          this.state?.Item_Category
        ) &&
        x?.asset_name?.EPCID?.toLowerCase().includes(
          this.state?.Serial_no.toLowerCase()
        ) &&
        this.dateCompare(
          x?.createdAt,
          x?.createdAt
        )
    );
  };
  runFunction = async () => {
    this.setState({ loading: true });
    const SOH = await api.getAssetsBySohWithParam(this.state.site === '' ? this.state.sites[0]?._id : this.state.site?.value, this.state.zone === '' ? this.state.zones[0]?._id : this.state.zone?.value);
    // let filtering = ASN.filter((item => item.operation_name === "receiving"))
    this.setState({ SOH: SOH, allData: SOH });
    console.log(SOH, "asdfsdafasdf");
    if (SOH) {
      this.setState({ loading: false });
      this.searchFunction()
    }
  };
  handleChangeZone = (e) => {
    this.setState({ zone: e })
  }
  handleChangeSite = (e) => {
    this.setState({ site: e })
  }
  render() {
    const customStyles = {
      control: (base, state) => ({
        ...base,
        background: "transparent",
        backgroundColor: 'transparent',
        height: 33,
        marginTop: 10,
        // zIndex: 312312312312312

      }),
      menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 0,
        background: 'transparent',
        zIndex: 312312312312312
      }),
      menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0,
        background: 'gray',
        zIndex: 312312312312312

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
    const headers = [
      {
        label: "EPCID",
        key: "EPCID",
      },
      {
        label: "CATEGORY_CODE",
        key: "CATEGORY_CODE",
      },
      {
        label: "createdAt",
        key: "createdAt",
      },
      {
        label: "MODIFICATION_DATE",
        key: "MODIFICATION_DATE",
      },
      {
        label: "inventoryDate",
        key: "inventoryDate",
      },
      {
        label: "SITE",
        key: "SITE",
      },
      {
        label: "assetType",
        key: "assetType",
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
        label: "description",
        key: "description",
      },
      {
        label: "assetStatus",
        key: "assetStatus",
      },
      {
        label: "CATEGORY_CODE",
        key: "CATEGORY_CODE",
      },
      {
        label: "CATEGORY_NAME",
        key: "CATEGORY_NAME",
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
    const data = this.state.SOH
      .map((item) => {
        return {
          createdAt: new Date(item?.createdAt).toLocaleString('en-Us', "Asia/Muscat"),
          // CATEGORY_CODE: item?.asset_name?.CATEGORY_CODE,
          EPCID: item?.asset_name?.EPCID,
          MODIFICATION_DATE: new Date(item?.asset_name?.MODIFICATION_DATE).toLocaleString('en-Us', "Asia/Muscat"),
          inventoryDate: new Date(item?.asset_name?.inventoryDate).toLocaleString('en-Us', "Asia/Muscat"),
          SITE: item?.asset_name?.SITE,
          assetType: item?.asset_name?.assetType,
          department: item?.asset_name?.department,
          location: item?.asset_name?.location,
          description: item?.asset_name?.description,
          assetStatus: item?.asset_name?.assetStatus,
          CATEGORY_CODE: item?.asset_name.CATEGORY_CODE,
          CATEGORY_NAME: item?.asset_name.CATEGORY_NAME,
          SUB_CATEGORY_CODE: item?.asset_name.SUB_CATEGORY_CODE,
          SUB_CATEGORY_NAME: item?.asset_name.SUB_CATEGORY_NAME,
        }
      });
    let sites = this.state.sites.map((item => {
      return { label: item?.site_name, value: item?._id }
    }))

    const zones = this.state.zones.map((item => {
      return { label: item?.zone_name, value: item?._id }
    }))
    return (
      <React.Fragment>
        <CustomModal
          image
          open={this.state.openModal}
          handleClose={() => this.handleClose()}
          handleClickOpen={() => this.handleClickOpen}
          data={Logo}
        />
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
                <h1 className="dashboard-heading">Table Report (Report)</h1>
                <Button
                  onClick={() => this.runFunction()}
                  type="submit"
                  color={"secondary"}
                  variant="contained"
                  style={{ position: "absolute", right: "10px" }}
                >
                  Run
                </Button>
                <IconButton style={{ position: "absolute", right: "90px", cursor: 'pointer' }}>
                  <CSVLink filename="Table_Report" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 60 }} data={data} headers={headers}>
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
                      placeholder="Description"
                      name="Description"
                      value={this.state.Asset_ID}
                      onChangeEvent={(e) =>
                        this.setState({ Asset_ID: e.target.value })
                      }
                    />
                    <BasicTextFields
                      margin={10}
                      placeholder="Category"
                      name="Category"
                      value={this.state?.Item_Category}
                      onChangeEvent={(e) =>
                        this.setState({ Item_Category: e.target.value })
                      }
                    />
                  </form>
                  <div style={{ width: '1px', height: '100%', backgroundColor: 'white', position: 'absolute' }}></div>
                  <form style={{ width: '50%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 0, flexDirection: 'column' }}  >
                    <BasicTextFields
                      margin={10}
                      name="EPC"
                      placeholder={"EPC"}
                      value={this.state?.Serial_no}
                      onChangeEvent={(e) =>
                        this.setState({ Serial_no: e.target.value })
                      }
                    />
                    <DatePicker
                      value={this.state.LastTimeDate}
                      placeholder={"Created At"}
                      className="input-mat-1"
                      style={{
                        border: '1px solid white',
                        borderRadius: 5,
                        height: 37,
                        marginTop: 10,
                        fontWeight: 'lighter'
                      }}
                      size={'large'}
                      format={"YYYY-MM-DD"}
                      onChange={(e) => this.setState({ LastTimeDate: e })}
                    />
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
              <ThirdReportTable asn={this.state.SOH} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ThirdReport;
