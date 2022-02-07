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
import SecondReportTable from "../components/SecondReportTable";
import { CSVLink } from "react-csv";
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import FifthReportTable from "../components/FifthReportTable";
import { DatePicker, Radio, Space } from 'antd';
const { RangePicker } = DatePicker;

export class FifthReport extends Component {
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
    remarks: "",
    allData: [],
    countedItems: [],
    FirstReportData: [],
    FirstReportDataNew: [],
    LastTimeDate: "",
  };

  onSubmitEvent = () => {
    console.log("User");
  };
  searchFunction = () => {

    this.setState({ countedItems: this.dateFilter() });
  };
  dateCompare = (sDate, eDate) => {
    let { LastTimeDate } = this.state;
    let endingDate = this.state.LastTimeDate;
    if (!LastTimeDate && !endingDate) {
      return true;
    }
    LastTimeDate = moment(LastTimeDate);
    endingDate = moment(endingDate)
    let sDiff = moment(sDate).diff(LastTimeDate, "days");
    let eDiff = !eDate ? -1 : moment(eDate).diff(endingDate, "days");
    if (sDiff >= 0 && eDiff <= 0) return true;
    return false;
  };
  dateFilter = () => {
    return this.state.allData.filter(
      (x) =>
        x?.RFID_Tag?.includes(
          this.state?.startingDate
        ) &&
        x?.Serial_no?.includes(
          this.state?.remarks
        ) &&
        x?.ASSET_ID?.includes(
          this.state?.endingDate
        ) &&
        this.dateCompare(x?.Scan_time, x?.Scan_time)
    );
  };
  runFunction = async () => {
    this.setState({ loading: true });
    const countedItems = await api.getAssetsByAll();
    // let filtering = ASN.filter((item => item.operation_name === "receiving"))
    // console.log(,'dsafasdfasdf');
    this.setState({
      countedItems: countedItems,
      allData: countedItems,
    });

    // console.log(
    //     countedItems?.map((item => item?.assetDetails[0]))
    //     , "countedItems");
    console.log(countedItems, "countedItems");
    // console.log(countedItems.filter((item => item?.zoneId?.zone_name === "exit")),'dsafasdfasdf');
    if (countedItems) {
      this.setState({ loading: false });
      this.searchFunction()
    }
  };
  render() {
    const headers = [
      {
        label: "Scan_time",
        key: "Scan_time",
      },
      {
        label: "ASSET_ID",
        key: "ASSET_ID",
      },
      {
        label: "Serial_no",
        key: "Serial_no",
      },
      {
        label: "Odoo_Tag",
        key: "RFID_Tag",
      },
      {
        label: "Floor",
        key: "Floor",
      },
      {
        label: "Asset_Location",
        key: "Asset_Location",
      },
      {
        label: "Room_no",

        key: "Room_no",
      },
      {
        label: "Brand",
        key: "Brand",
      },
      {
        label: "Category",
        key: "Item_Category",
      },
      {
        label: "Department",
        key: "Department",
      },
      {
        label: "Description",
        key: "Description",
      },
      {
        label: "Device_Type",
        key: "Device_Type",
      },
      {
        label: "Fixed_Loose",
        key: "Fixed_Loose",
      },
      {
        label: "Maintenance_Period",
        key: "Maintenance_Period",
      },
      {
        label: "Make",
        key: "Make",
      },
      {
        label: "Manufacturer",
        key: "Manufacturer",
      },
      {
        label: "Model",
        key: "Model",
      },
      {
        label: "Purchase_Date",
        key: "Purchase_Date",
      },
      {
        label: "Supplier",
        key: "Supplier",
      },
      {
        label: "SupplierCode",
        key: "SupplierCode",
      },
      {
        label: "Thing Type Code",
        key: "Thing Type Code",
      },
      {
        label: "Thing Name",
        key: "Thing Name",
      },
      {
        label: "Warranty_Expiry_date",
        key: "Warranty_Expiry_date",
      },
      {
        label: "Warranty_Period",
        key: "Warranty_Period",
      },
    ];
    const data = this.state.countedItems.map((item) => {
      return {
        Scan_time: moment(item?.Scan_time).toLocaleString(
          "en-Us",
          "Asia/Muscat"
        ),
        ASSET_ID: item.ASSET_ID,
        Serial_no: item.Serial_no,
        RFID_Tag: item.RFID_Tag,
        Floor: item.Floor,
        Asset_Location: item.Asset_Location,
        Room_no: item.Room_no,
        Brand: item.Brand,
        Item_Category: item.Item_Category,
        Department: item.Department,
        Description: item.Description,
        Device_Type: item.Device_Type,
        Fixed_Loose: item.Fixed_Loose,
        Maintenance_Period: item.Maintenance_Period,
        Make: item.Make,
        Manufacturer: item.Manufacturer,
        Model: item.Model,
        Purchase_Date: item.Purchase_Date,
        Supplier: item.Supplier,
        SupplierCode: item.SupplierCode,
        "Thing Type Code": item["Thing Type Code"],
        "Thing Name": item["Thing Name"],
        Warranty_Expiry_date: item.Warranty_Expiry_date,
        Warranty_Period: item.Warranty_Period,
      };
    });
    console.log(data);
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
                <IconButton style={{ position: "absolute", right: "90px", cursor: 'pointer' }}>
                  <CSVLink filename="Item_Master_Report" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 60 }} data={data} headers={headers}>
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
                    <BasicTextFields
                      margin={10}
                      placeholder="Odoo_Tag"
                      name="Odoo_Tag"
                      value={this.state.startingDate}
                      onChangeEvent={(e) =>
                        this.setState({ startingDate: e.target.value })
                      }
                    />

                    <BasicTextFields
                      margin={10}
                      placeholder="Asset_ID"
                      name="Asset_ID"
                      value={this.state.endingDate}
                      onChangeEvent={(e) =>
                        this.setState({ endingDate: e.target.value })
                      }
                    />
                  </form>
                  <div style={{ width: '1px', height: '100%', backgroundColor: 'white', position: 'absolute' }}></div>
                  <form style={{ width: '50%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 0, flexDirection: 'column' }}  >
                    <BasicTextFields
                      margin={10}
                      name="Serial_no"
                      placeholder={"Serial_no"}
                      value={this.state?.remarks}
                      onChangeEvent={(e) =>
                        this.setState({ remarks: e.target.value })
                      }
                    />

                    <DatePicker value={this.state.LastTimeDate} placeholder={"Scan Time"} className="input-mat-1" style={{ border: '1px solid white', borderRadius: 5, height: 37, marginTop: 10, fontWeight: 'lighter' }} size={'large'} format={"YYYY-MM-DD"} onChange={(e) => this.setState({ LastTimeDate: e })} />
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
                {/* <CSVLink data={data} headers={headers}>
                  <Button color="primary" variant="contained">
                    CSV
                  </Button>
                </CSVLink> */}
              </div>
              <FifthReportTable asn={this?.state?.countedItems} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FifthReport;
