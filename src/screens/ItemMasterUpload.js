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
import ItemMasterUploadTable from "../components/ItemMasterUploadTable";
const { RangePicker } = DatePicker;
export class itemMasterUpload extends Component {
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
                x?.assetDetails[0]?.assetName?.toLowerCase().includes(this.state?.asset_name?.toLowerCase())
                &&
                x?.asset_EPC?.toLowerCase().includes(this.state?.epc?.toLowerCase())
                &&
                x?.assetDetails[0].assetStatus.toLowerCase().includes(this.state.asset_status.toLowerCase())
                &&
                this.dateCompareCreation(x?.assetDetails[0].createdAt, x?.assetDetails[0].createdAt)
                &&
                this.dateCompareUpdated(x?.assetDetails[0].updatedAt, x?.assetDetails[0].updatedAt)
        );
    };
    runFunction = async () => {
        if (this.state.assetsDetails.length !== 0) {
            const uploading = await api.uploadingData(this.state.assetsDetails)
                .then(res => {
                    return toast.success("Uploaded")
                }).catch(err => {
                    return toast.error("Something went wrong")
                })
        } else {
            return toast.error("Please enter csv file first")
        }


    };
    async componentDidMount() {
        let data = await this.getBase64FromUrl('https://images.unsplash.com/photo-1600857062241-98e5dba7f214?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=498&q=80').then((res) => res)
        await this.setState({ image: data })
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
                    this.setState({
                        assetsDetails: results.data.map((item =>
                            // return {
                            //     createdAt: item.createdAt,
                            //     ownerName: item.ownerName,
                            //     assetType: item.assetType,
                            //     EPC: item.EPC,
                            //     department: item.department,
                            //     location: item.location,
                            //     inventoryDate: item.inventoryDate,
                            //     updatedAt: item.updatedAt,
                            //     updatedAt: item.updatedAt,
                            //     updatedAt: item.updatedAt,
                            //     updatedAt: item.updatedAt,
                            //     updatedAt: item.updatedAt,
                            // }
                            item
                        ))
                    })
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
                label: "Asset_Name",
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
            {
                label: "Asset_Image",
                key: "Asset_Image",
            },
        ];
        return (
            <React.Fragment>
                <CustomModal data={this.state.QrCode} image={true} open={this.state.openModal} handleClose={() => this.handleClose()} handleClickOpen={() => this.handleClickOpen} />
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
                                <h1 className="dashboard-heading">Asset (Report)</h1>
                                <Button
                                    onClick={() => this.runFunction()}
                                    type="submit"
                                    color={"secondary"}
                                    variant="contained"
                                    style={{ position: "absolute", right: "10px" }}
                                >
                                    Push Csv to Server
                                </Button>
                                {/* <CSVReader /> */}
                                <IconButton style={{ position: "absolute", right: "190px", cursor: 'pointer' }}>
                                    <input onChange={(e) => this.csvUploader(e)} style={{ display: 'none' }} id="fileSelect" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                                    <SystemUpdateAltIcon fontSize="large" htmlColor="black" />
                                    <label htmlFor="fileSelect" className="dashboard-heading" style={{ fontSize: '15px' }} >UPLOAD CSV</label>
                                </IconButton>
                            </div>
                            <Collapse
                                in={this.state.open}
                                timeout="auto"
                                unmountOnExit
                                style={{ width: "100%" }}
                            >
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'transparent', minHeight: 50, marginTop: 10, position: 'relative' }}>
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
                            <ItemMasterUploadTable openModal={(device) => this.handleClickOpen(device)} asn={this.state.assetsDetails} />
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default itemMasterUpload;
