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
import CountedTable from "../components/CountedTable";
const { RangePicker } = DatePicker;
export class DiscrepancyReport extends Component {
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
    };

    onSubmitEvent = () => {
        console.log("User");
    };
    searchFunction = async () => {
        // e.preventDefault();
        await this.setState({ assetsDetails: this.dateFilter() });
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
    dateFilter = () => {
        return this.state.assetsDetailsNew.filter(
            (x) =>
            
                x?.EPCID?.includes(this.state?.epc)
                &&
                x?.assetStatus.includes(this.state.asset_status)
                &&
                this.dateCompareCreation(x?.createdAt, x?.createdAt)
                &&
                this.dateCompareUpdated(x?.updatedAt, x?.updatedAt)
        );
    };
    runFunction = async () => {
        this.setState({ loading: true });
        const assetsDetails = await api.getCountedItems();
        const assetRoutes = await api.getAssetsByAll();
        const assetBySOH = await api.getAssetsBySoh();
        console.log(assetsDetails, "counted");
        console.log(assetRoutes, "assetsDetails");
        console.log(assetBySOH, "assetBySOH");

        let newArray = []

        newArray = assetRoutes.filter(f => assetsDetails.find(item => item?.asset_EPC === f.EPCID));
        newArray = newArray.filter(f => assetBySOH.find(item => item?.asset_EPC !== f.EPCID))
        await this.setState({
            assetsDetails: newArray.reverse(),
            assetsDetailsNew: newArray.reverse(),
        });
        console.log(newArray, "newArray");
        if (assetsDetails) {
            await this.setState({ loading: false });
            // await this.searchFunction()
        }
    };

    async componentDidMount() {
        // let data = this.imagetoBase64()

        // setTimeout(() => {
        //   console.log(data,'data');
        //   console.log(this.state.image);
        // }, 3000);
    }
    imagetoBase64 = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=498&q=80", true);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            console.log(this.response);
            var reader = new FileReader();
            reader.onload = function (event) {
                var res = event.target.result;
                console.log(res)
            }
            var file = this.response;
            reader.readAsDataURL(file)
        };
        xhr.send()
    }
    getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            }
        });
    }
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
                label: "Creation_Date",
                key: "Creation_Date",
            },
            {
                label: "Owner_name",
                key: "Asset_Name",
            },
            {
                label: "Asset_Type",
                key: "Asset_Type",
            },
            {
                label: "EPC",
                key: "asset_EPC",
            },
            {
                label: "Department",
                key: "Department",
            },
            {
                label: "Asset_Location",
                key: "Asset_Location",
            },
            {
                label: "Inventory_Date",
                key: "Inventory_Date",
            },
            {
                label: "Modification_Date",
                key: "Modification_Date",
            },
            {
                label: "Asset_Status",
                key: "Asset_Status",
            },
            {
                label: "Asset_Value",
                key: "Asset_Value",
            },
            {
                label: "Site",
                key: "Site",
            },
            {
                label: "Description",
                key: "Description",
            },
            // {
            //     label: "Asset_Image",
            //     key: "Asset_Image",
            // },
        ];
        const data = this.state.assetsDetails.map((item) => {
            return {
                Creation_Date: new Date(item?.createdAt).toLocaleString('en-Us', "Asia/Muscat") || "----",
                Asset_Name: item?.ownerName || "----",
                Asset_Type: item?.assetType || "----",
                asset_EPC: item?.EPCID || "----",
                Department: item?.department || "----",
                Asset_Location: item?.location || "----",
                Inventory_Date: new Date(item?.inventoryDate).toLocaleString('en-Us', "Asia/Muscat") || "----",
                Modification_Date: new Date(item?.updatedAt).toLocaleString('en-Us', "Asia/Muscat") || "----",
                Asset_Status: item?.assetStatus || "----",
                Asset_Value: item?.VALUE || "----",
                Site: item?.SITE || "----",
                Description: item?.description || "----",
                // Asset_Image: item?.image,
            }
        });
        console.log(data, "asdfasdf");
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
                                <h1 className="dashboard-heading">Discrepancy Item (Report)</h1>
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
                                <IconButton style={{ position: "absolute", right: "90px", cursor: 'pointer' }}>
                                    <CSVLink filename="Discrepancy Report" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 60 }} data={data} headers={headers}>
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
                                            value={this.state.epc}
                                            onChangeEvent={(e) =>
                                                this.setState({ epc: e.target.value })
                                            }
                                        />
                                        {/* <BasicTextFields
                                            margin={10}
                                            placeholder="Asset Name"
                                            name="Asset Name"
                                            value={this.state.asset_name}
                                            onChangeEvent={(e) =>
                                                this.setState({ asset_name: e.target.value })
                                            }
                                        /> */}
                                        <BasicTextFields
                                            margin={10}
                                            placeholder="Asset Status"
                                            name="Asset Status"
                                            value={this.state.asset_status}
                                            onChangeEvent={(e) =>
                                                this.setState({ asset_status: e.target.value })
                                            }
                                        />
                                    </form>
                                    <div style={{ width: '1px', height: '100%', backgroundColor: 'white', position: 'absolute' }}></div>
                                    <form style={{ width: '50%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 0, flexDirection: 'column' }}  >
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
                                {/* <CSVLink data={data} headers={headers}>
                  <Button color="primary" variant="contained">
                    CSV
                  </Button>
                </CSVLink> */}
                            </div>
                            <CountedTable openModal={(device) => this.handleClickOpen(device)} asn={this.state.assetsDetails} />
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default DiscrepancyReport;
