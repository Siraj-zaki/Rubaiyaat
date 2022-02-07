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
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

import { CSVLink } from "react-csv";


export class FourthReport extends Component {
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
  };

  onSubmitEvent = () => {
    console.log("User");
  };
  searchFunction = () => {
    this.setState({ countedItems: this.dateFilter() });
  };
  dateFilter = () => {
    return this.state.allData.filter(
      (x) =>
        x?.assetDetails[0]['Thing Name']?.toLowerCase().includes(
          this.state?.ibt.toLowerCase()
        ) &&
        x?.asset_EPC?.toLowerCase().includes(this.state?.startingDate.toLowerCase()) &&
        x?.assetDetails[0]?.Serial_no?.toLowerCase().includes(
          this.state?.remarks.toLowerCase()
        ) &&
        x?.assetDetails[0]?.ASSET_ID?.toLowerCase().includes(
          this.state?.endingDate.toLowerCase()
        )
    );
  };

  runFunction = async () => {
    this.setState({ loading: true });
    const countedItems = await api.getAssetsBySite();
    this.setState({
      countedItems: countedItems.filter((item) =>
        item?.zoneId?.zone_name?.toLowerCase().includes("exit")
      ),
      allData: countedItems.filter((item) =>
        item?.zoneId?.zone_name?.toLowerCase().includes("exit")
      ),
    });


    console.log(countedItems, "countedItems");

    if (countedItems) {
      this.setState({ loading: false });
      this.searchFunction()
    }
  };
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
      // {
      //   label: "Scan Time",
      //   key: "Time",
      // },
      {
        label: "Odoo_Tag",
        key: "Odoo_Tag",
      },
      {
        label: "ASSET_ID",
        key: "ASSET_ID",
      },
      {
        label: "EPC",
        key: "asset_EPC",
      },
      {
        label: "Exit Gate",
        key: "zone",
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
        label: "Description",
        key: "Description",
      },
      {
        label: "Device_Type",
        key: "Device_Type",
      },
      {
        label: "make",
        key: "make",
      },
      {
        label: "Manufacturer",
        key: "Manufacturer",
      },
      {
        label: "Owner Group",
        key: "Owner_Group",
      },
      {
        label: "Purchase_Date",
        key: "Purchase_Date",
      },
      {
        label: "Serial_no",
        key: "Serial_no",
      },
      {
        label: "Supplier",
        key: "Supplier",
      },
      {
        label: "Supplier Code",
        key: "Supplier Code",
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
        label: "UUIDMobile",
        key: "UUIDMobile",
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
    const data = this.state.countedItems
      .filter((i) => !!i.assetDetails.length)
      .map((item) => {
        return {
          Time: item?.createdAt,
          Odoo_Tag: item?.assetDetails[0]["Thing Serial"],
          ASSET_ID: item?.assetDetails[0].ASSET_ID,
          asset_EPC: item?.asset_EPC,
          zone: item?.zoneId?.zone_name ? item?.zoneId?.zone_name : '----',
          Floor: item?.assetDetails[0].Floor,
          Asset_Location: item?.assetDetails[0].Asset_Location,
          Room_no: item?.assetDetails[0].Room_no,
          Brand: item?.assetDetails[0].Brand,
          Item_Category: item?.assetDetails[0].Item_Category,
          Description: item?.assetDetails[0].Description,
          Device_Type: item?.assetDetails[0].Device_Type,
          make: item?.assetDetails[0].make,
          Serial_no: item?.assetDetails[0].Serial_no,
          Manufacturer: item?.assetDetails[0].Manufacturer,
          "Owner_Group": item?.assetDetails[0]["Owner Group"],
          Purchase_Date: item?.assetDetails[0].Purchase_Date,
          "Thing Serial": item?.assetDetails[0]["Thing Serial"],
          Supplier: item?.assetDetails[0].Supplier,
          "Supplier Code": item?.assetDetails[0]["Supplier Code"],
          "Thing Type Code": item?.assetDetails[0]["Thing Type Code"],
          "Thing Name": item?.assetDetails[0]["Thing Name"],
          UUIDMobile: item?.assetDetails[0].UUIDMobile,
          Warranty_Expiry_date: item?.assetDetails[0].Warranty_Expiry_date,
          Warranty_Period: item?.assetDetails[0].Warranty_Period,


        }
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
                <h1 className="dashboard-heading"> GF Exit (Report)</h1>
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
                  <CSVLink filename="GF_Exit_Report" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 60 }} data={data} headers={headers}>
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
                      placeholder="EPC"
                      name="EPC"
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
                      name="Odoo Tag"
                      placeholder={"Odoo Tag"}
                      value={this.state.ibt}
                      onChangeEvent={(e) =>
                        this.setState({ ibt: e.target.value })
                      }
                    />
                    <BasicTextFields
                      margin={10}
                      name="Serial"
                      placeholder={"Serial"}
                      value={this.state?.remarks}
                      onChangeEvent={(e) =>
                        this.setState({ remarks: e.target.value })
                      }
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

                {/* <CSVLink data={data} headers={headers}>
                  <Button color="primary" variant="contained">
                    CSV
                  </Button>
                </CSVLink> */}
              </div>
              <SecondReportTable asn={this?.state?.countedItems} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FourthReport;
