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
import StockOnHandTable from "../components/StockOnHandTable";
import _ from 'lodash'
const { RangePicker } = DatePicker;

export class StockOnHand extends Component {
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
        site: '',
        Serial_no: "",
        sites: [],
        groupedData: [],
        hardcoreData: [
            {
                "site_name": "03 - RMLP",
                "zone_name": "zone4",
                "total": 2,
                "items": [
                    {
                        "_id": "621c70b646fd520023a29049",
                        "asset_name": {
                            "assetType": "Sack",
                            "_id": "621a0664713b4ae6f71ca208",
                            "EPCID": "30340000440C924000000F35",
                            "CATEGORY_CODE": "201",
                            "CATEGORY_NAME": "FURNITURE",
                            "CREATION_DATE": "26-03-17 21:37",
                            "DEPRECIATION": "",
                            "MODIFICATION_DATE": "26-03-17 21:37",
                            "NBV": "",
                            "REMARKS": "",
                            "SITE": "06 - QPD",
                            "SUB_CATEGORY_CODE": "201-005",
                            "SUB_CATEGORY_NAME": "Shelves",
                            "VALUE": "",
                            "__v": 0,
                            "assetStatus": "Written Off",
                            "createdAt": "2022-02-26T10:52:20.441Z",
                            "department": "066231 - (Closed 2017.12.05) Q Store - Mall of Dahran",
                            "description": "heloo world",
                            "inventoryDate": "26-03-17 21:37",
                            "location": "01 - Selling Area",
                            "ownerName": "Bilal",
                            "ownerName1": "",
                            "updatedAt": "2022-02-28T11:28:40.323Z",
                            "image": null
                        },
                        "asset_EPC": "30340000440C924000000F35",
                        "zoneId": {
                            "_id": "620a08b4170ade002307b0b6",
                            "zone_name": "zone4",
                            "mapViewImage": "NO IMAGE REFERENCE",
                            "geoJson": "{\"type\":\"Polygon\",\"coordinates\":[[[58.169675,23.584693],[58.169707,23.581585],[58.173334,23.581604],[58.173205,23.584702],[58.169675,23.584693]]]}",
                            "site": "620a083532a17bdbc2180cf7",
                            "level": "1",
                            "__v": 0
                        },
                        "asn": "621caf167bdba40023568dd3",
                        "inputNote": "",
                        "operation": "receiving",
                        "siteId": {
                            "_id": "620a083532a17bdbc2180cf7",
                            "site_name": "03 - RMLP",
                            "mapViewImage": "https://i.ibb.co/6s5VQfW/SQCCC-map.png",
                            "location": "[{\"lat\":23.58108,\"lng\":58.1655},{\"lat\":23.58512,\"lng\":58.173775}]",
                            "objectType": "site",
                            "__v": 0
                        },
                        "__v": 0,
                        "createdAt": "2022-02-28T06:50:30.773Z",
                        "updatedAt": "2022-02-28T11:16:39.810Z"
                    },
                    {
                        "_id": "621caf097bdba40023568dc9",
                        "asset_name": {
                            "assetType": "Sack",
                            "_id": "621a0664713b4ae6f71ca208",
                            "EPCID": "30340000440C924000000F35",
                            "CATEGORY_CODE": "201",
                            "CATEGORY_NAME": "FURNITURE",
                            "CREATION_DATE": "26-03-17 21:37",
                            "DEPRECIATION": "",
                            "MODIFICATION_DATE": "26-03-17 21:37",
                            "NBV": "",
                            "REMARKS": "",
                            "SITE": "06 - QPD",
                            "SUB_CATEGORY_CODE": "201-005",
                            "SUB_CATEGORY_NAME": "Shelves",
                            "VALUE": "",
                            "__v": 0,
                            "assetStatus": "Written Off",
                            "createdAt": "2022-02-26T10:52:20.441Z",
                            "department": "066231 - (Closed 2017.12.05) Q Store - Mall of Dahran",
                            "description": "heloo world",
                            "inventoryDate": "26-03-17 21:37",
                            "location": "01 - Selling Area",
                            "ownerName": "Bilal",
                            "ownerName1": "",
                            "updatedAt": "2022-02-28T11:28:40.323Z",
                            "image": null
                        },
                        "asset_EPC": "30340000440C924000000F35",
                        "zoneId": {
                            "_id": "620a08b4170ade002307b0b6",
                            "zone_name": "zone4",
                            "mapViewImage": "NO IMAGE REFERENCE",
                            "geoJson": "{\"type\":\"Polygon\",\"coordinates\":[[[58.169675,23.584693],[58.169707,23.581585],[58.173334,23.581604],[58.173205,23.584702],[58.169675,23.584693]]]}",
                            "site": "620a083532a17bdbc2180cf7",
                            "level": "1",
                            "__v": 0
                        },
                        "asn": "621caf167bdba40023568dd3",
                        "inputNote": "",
                        "operation": "receiving",
                        "siteId": {
                            "_id": "620a083532a17bdbc2180cf7",
                            "site_name": "03 - RMLP",
                            "mapViewImage": "https://i.ibb.co/6s5VQfW/SQCCC-map.png",
                            "location": "[{\"lat\":23.58108,\"lng\":58.1655},{\"lat\":23.58512,\"lng\":58.173775}]",
                            "objectType": "site",
                            "__v": 0
                        },
                        "__v": 0,
                        "createdAt": "2022-02-28T11:16:25.056Z",
                        "updatedAt": "2022-02-28T11:16:39.810Z"
                    }
                ],
                "matched": 2,
                "under": 0,
                "over": 38
            },
            {
                "site_name": "03 - RMLP",
                "zone_name": "zone3",
                "total": 1,
                "items": [
                    {
                        "_id": "621d44520472b36c1fe99808",
                        "asset_name": {
                            "assetType": "Sack",
                            "_id": "621a0664713b4ae6f71ca208",
                            "EPCID": "30340000440C924000000F35",
                            "CATEGORY_CODE": "201",
                            "CATEGORY_NAME": "FURNITURE",
                            "CREATION_DATE": "26-03-17 21:37",
                            "DEPRECIATION": "",
                            "MODIFICATION_DATE": "26-03-17 21:37",
                            "NBV": "",
                            "REMARKS": "",
                            "SITE": "06 - QPD",
                            "SUB_CATEGORY_CODE": "201-005",
                            "SUB_CATEGORY_NAME": "Shelves",
                            "VALUE": "",
                            "__v": 0,
                            "assetStatus": "Written Off",
                            "createdAt": "2022-02-26T10:52:20.441Z",
                            "department": "066231 - (Closed 2017.12.05) Q Store - Mall of Dahran",
                            "description": "heloo world",
                            "inventoryDate": "26-03-17 21:37",
                            "location": "01 - Selling Area",
                            "ownerName": "Bilal",
                            "ownerName1": "",
                            "updatedAt": "2022-02-28T11:28:40.323Z",
                            "image": null
                        },
                        "asset_EPC": "AE1000000110000012097112",
                        "zoneId": {
                            "_id": "620a0873170ade002307b0b5",
                            "zone_name": "zone3",
                            "mapViewImage": "NO IMAGE REFERENCE",
                            "geoJson": "{\"type\":\"Polygon\",\"coordinates\":[[[58.166277,23.584755],[58.169249,23.584765],[58.169281,23.581558],[58.166406,23.58147],[58.166277,23.584755]]]}",
                            "site": "620a083532a17bdbc2180cf7",
                            "level": "1",
                            "__v": 0
                        },
                        "asn": "621caf167bdba40023568dd3",
                        "inputNote": "",
                        "operation": "receiving",
                        "siteId": {
                            "_id": "620a083532a17bdbc2180cf7",
                            "site_name": "03 - RMLP",
                            "mapViewImage": "https://i.ibb.co/6s5VQfW/SQCCC-map.png",
                            "location": "[{\"lat\":23.58108,\"lng\":58.1655},{\"lat\":23.58512,\"lng\":58.173775}]",
                            "objectType": "site",
                            "__v": 0
                        },
                        "__v": 0,
                        "createdAt": "2022-02-28T11:16:25.056Z",
                        "updatedAt": "2022-02-28T11:16:39.810Z"
                    }
                ],
                "matched": 1,
                "under": 0,
                "over": 0
            },
            {
                "site_name": "03 - ABC",
                "zone_name": "zone3",
                "total": 1,
                "items": [
                    {
                        "_id": "621d44520472b36c1fe99808",
                        "asset_name": {
                            "assetType": "Sack",
                            "_id": "621a0664713b4ae6f71ca208",
                            "EPCID": "30340000440C924000000F35",
                            "CATEGORY_CODE": "201",
                            "CATEGORY_NAME": "FURNITURE",
                            "CREATION_DATE": "26-03-17 21:37",
                            "DEPRECIATION": "",
                            "MODIFICATION_DATE": "26-03-17 21:37",
                            "NBV": "",
                            "REMARKS": "",
                            "SITE": "06 - QPD",
                            "SUB_CATEGORY_CODE": "201-005",
                            "SUB_CATEGORY_NAME": "Shelves",
                            "VALUE": "",
                            "__v": 0,
                            "assetStatus": "Written Off",
                            "createdAt": "2022-02-26T10:52:20.441Z",
                            "department": "066231 - (Closed 2017.12.05) Q Store - Mall of Dahran",
                            "description": "heloo world",
                            "inventoryDate": "26-03-17 21:37",
                            "location": "01 - Selling Area",
                            "ownerName": "Bilal",
                            "ownerName1": "",
                            "updatedAt": "2022-02-28T11:28:40.323Z",
                            "image": null
                        },
                        "asset_EPC": "AE1000000110000012097112",
                        "zoneId": {
                            "_id": "620a0873170ade002307b0b5",
                            "zone_name": "zone3",
                            "mapViewImage": "NO IMAGE REFERENCE",
                            "geoJson": "{\"type\":\"Polygon\",\"coordinates\":[[[58.166277,23.584755],[58.169249,23.584765],[58.169281,23.581558],[58.166406,23.58147],[58.166277,23.584755]]]}",
                            "site": "620a083532a17bdbc2180cf7",
                            "level": "1",
                            "__v": 0
                        },
                        "asn": "621caf167bdba40023568dd3",
                        "inputNote": "",
                        "operation": "receiving",
                        "siteId": {
                            "_id": "620a083532a17bdbc2180cf7",
                            "site_name": "03 - RMLP",
                            "mapViewImage": "https://i.ibb.co/6s5VQfW/SQCCC-map.png",
                            "location": "[{\"lat\":23.58108,\"lng\":58.1655},{\"lat\":23.58512,\"lng\":58.173775}]",
                            "objectType": "site",
                            "__v": 0
                        },
                        "__v": 0,
                        "createdAt": "2022-02-28T11:16:25.056Z",
                        "updatedAt": "2022-02-28T11:16:39.810Z"
                    }
                ],
                "matched": 1,
                "under": 0,
                "over": 0
            },
            {
                "site_name": "03 - ABC",
                "zone_name": "zone4",
                "total": 1,
                "items": [
                    {
                        "_id": "621d44520472b36c1fe99808",
                        "asset_name": {
                            "assetType": "Sack",
                            "_id": "621a0664713b4ae6f71ca208",
                            "EPCID": "30340000440C924000000F35",
                            "CATEGORY_CODE": "201",
                            "CATEGORY_NAME": "FURNITURE",
                            "CREATION_DATE": "26-03-17 21:37",
                            "DEPRECIATION": "",
                            "MODIFICATION_DATE": "26-03-17 21:37",
                            "NBV": "",
                            "REMARKS": "",
                            "SITE": "06 - QPD",
                            "SUB_CATEGORY_CODE": "201-005",
                            "SUB_CATEGORY_NAME": "Shelves",
                            "VALUE": "",
                            "__v": 0,
                            "assetStatus": "Written Off",
                            "createdAt": "2022-02-26T10:52:20.441Z",
                            "department": "066231 - (Closed 2017.12.05) Q Store - Mall of Dahran",
                            "description": "heloo world",
                            "inventoryDate": "26-03-17 21:37",
                            "location": "01 - Selling Area",
                            "ownerName": "Bilal",
                            "ownerName1": "",
                            "updatedAt": "2022-02-28T11:28:40.323Z",
                            "image": null
                        },
                        "asset_EPC": "AE1000000110000012097112",
                        "zoneId": {
                            "_id": "620a0873170ade002307b0b5",
                            "zone_name": "zone3",
                            "mapViewImage": "NO IMAGE REFERENCE",
                            "geoJson": "{\"type\":\"Polygon\",\"coordinates\":[[[58.166277,23.584755],[58.169249,23.584765],[58.169281,23.581558],[58.166406,23.58147],[58.166277,23.584755]]]}",
                            "site": "620a083532a17bdbc2180cf7",
                            "level": "1",
                            "__v": 0
                        },
                        "asn": "621caf167bdba40023568dd3",
                        "inputNote": "",
                        "operation": "receiving",
                        "siteId": {
                            "_id": "620a083532a17bdbc2180cf7",
                            "site_name": "03 - RMLP",
                            "mapViewImage": "https://i.ibb.co/6s5VQfW/SQCCC-map.png",
                            "location": "[{\"lat\":23.58108,\"lng\":58.1655},{\"lat\":23.58512,\"lng\":58.173775}]",
                            "objectType": "site",
                            "__v": 0
                        },
                        "__v": 0,
                        "createdAt": "2022-02-28T11:16:25.056Z",
                        "updatedAt": "2022-02-28T11:16:39.810Z"
                    }
                ],
                "matched": 1,
                "under": 0,
                "over": 0
            }
        ],
        hardcoreDataNew: [
            {
                "site_name": "03 - RMLP",
                "zone_name": "zone4",
                "total": 2,
                "items": [
                    {
                        "_id": "621c70b646fd520023a29049",
                        "asset_name": {
                            "assetType": "Sack",
                            "_id": "621a0664713b4ae6f71ca208",
                            "EPCID": "30340000440C924000000F35",
                            "CATEGORY_CODE": "201",
                            "CATEGORY_NAME": "FURNITURE",
                            "CREATION_DATE": "26-03-17 21:37",
                            "DEPRECIATION": "",
                            "MODIFICATION_DATE": "26-03-17 21:37",
                            "NBV": "",
                            "REMARKS": "",
                            "SITE": "06 - QPD",
                            "SUB_CATEGORY_CODE": "201-005",
                            "SUB_CATEGORY_NAME": "Shelves",
                            "VALUE": "",
                            "__v": 0,
                            "assetStatus": "Written Off",
                            "createdAt": "2022-02-26T10:52:20.441Z",
                            "department": "066231 - (Closed 2017.12.05) Q Store - Mall of Dahran",
                            "description": "heloo world",
                            "inventoryDate": "26-03-17 21:37",
                            "location": "01 - Selling Area",
                            "ownerName": "Bilal",
                            "ownerName1": "",
                            "updatedAt": "2022-02-28T11:28:40.323Z",
                            "image": null
                        },
                        "asset_EPC": "30340000440C924000000F35",
                        "zoneId": {
                            "_id": "620a08b4170ade002307b0b6",
                            "zone_name": "zone4",
                            "mapViewImage": "NO IMAGE REFERENCE",
                            "geoJson": "{\"type\":\"Polygon\",\"coordinates\":[[[58.169675,23.584693],[58.169707,23.581585],[58.173334,23.581604],[58.173205,23.584702],[58.169675,23.584693]]]}",
                            "site": "620a083532a17bdbc2180cf7",
                            "level": "1",
                            "__v": 0
                        },
                        "asn": "621caf167bdba40023568dd3",
                        "inputNote": "",
                        "operation": "receiving",
                        "siteId": {
                            "_id": "620a083532a17bdbc2180cf7",
                            "site_name": "03 - RMLP",
                            "mapViewImage": "https://i.ibb.co/6s5VQfW/SQCCC-map.png",
                            "location": "[{\"lat\":23.58108,\"lng\":58.1655},{\"lat\":23.58512,\"lng\":58.173775}]",
                            "objectType": "site",
                            "__v": 0
                        },
                        "__v": 0,
                        "createdAt": "2022-02-28T06:50:30.773Z",
                        "updatedAt": "2022-02-28T11:16:39.810Z"
                    },
                    {
                        "_id": "621caf097bdba40023568dc9",
                        "asset_name": {
                            "assetType": "Sack",
                            "_id": "621a0664713b4ae6f71ca208",
                            "EPCID": "30340000440C924000000F35",
                            "CATEGORY_CODE": "201",
                            "CATEGORY_NAME": "FURNITURE",
                            "CREATION_DATE": "26-03-17 21:37",
                            "DEPRECIATION": "",
                            "MODIFICATION_DATE": "26-03-17 21:37",
                            "NBV": "",
                            "REMARKS": "",
                            "SITE": "06 - QPD",
                            "SUB_CATEGORY_CODE": "201-005",
                            "SUB_CATEGORY_NAME": "Shelves",
                            "VALUE": "",
                            "__v": 0,
                            "assetStatus": "Written Off",
                            "createdAt": "2022-02-26T10:52:20.441Z",
                            "department": "066231 - (Closed 2017.12.05) Q Store - Mall of Dahran",
                            "description": "heloo world",
                            "inventoryDate": "26-03-17 21:37",
                            "location": "01 - Selling Area",
                            "ownerName": "Bilal",
                            "ownerName1": "",
                            "updatedAt": "2022-02-28T11:28:40.323Z",
                            "image": null
                        },
                        "asset_EPC": "30340000440C924000000F35",
                        "zoneId": {
                            "_id": "620a08b4170ade002307b0b6",
                            "zone_name": "zone4",
                            "mapViewImage": "NO IMAGE REFERENCE",
                            "geoJson": "{\"type\":\"Polygon\",\"coordinates\":[[[58.169675,23.584693],[58.169707,23.581585],[58.173334,23.581604],[58.173205,23.584702],[58.169675,23.584693]]]}",
                            "site": "620a083532a17bdbc2180cf7",
                            "level": "1",
                            "__v": 0
                        },
                        "asn": "621caf167bdba40023568dd3",
                        "inputNote": "",
                        "operation": "receiving",
                        "siteId": {
                            "_id": "620a083532a17bdbc2180cf7",
                            "site_name": "03 - RMLP",
                            "mapViewImage": "https://i.ibb.co/6s5VQfW/SQCCC-map.png",
                            "location": "[{\"lat\":23.58108,\"lng\":58.1655},{\"lat\":23.58512,\"lng\":58.173775}]",
                            "objectType": "site",
                            "__v": 0
                        },
                        "__v": 0,
                        "createdAt": "2022-02-28T11:16:25.056Z",
                        "updatedAt": "2022-02-28T11:16:39.810Z"
                    }
                ],
                "matched": 2,
                "under": 0,
                "over": 38
            },
            {
                "site_name": "03 - RMLP",
                "zone_name": "zone3",
                "total": 1,
                "items": [
                    {
                        "_id": "621d44520472b36c1fe99808",
                        "asset_name": {
                            "assetType": "Sack",
                            "_id": "621a0664713b4ae6f71ca208",
                            "EPCID": "30340000440C924000000F35",
                            "CATEGORY_CODE": "201",
                            "CATEGORY_NAME": "FURNITURE",
                            "CREATION_DATE": "26-03-17 21:37",
                            "DEPRECIATION": "",
                            "MODIFICATION_DATE": "26-03-17 21:37",
                            "NBV": "",
                            "REMARKS": "",
                            "SITE": "06 - QPD",
                            "SUB_CATEGORY_CODE": "201-005",
                            "SUB_CATEGORY_NAME": "Shelves",
                            "VALUE": "",
                            "__v": 0,
                            "assetStatus": "Written Off",
                            "createdAt": "2022-02-26T10:52:20.441Z",
                            "department": "066231 - (Closed 2017.12.05) Q Store - Mall of Dahran",
                            "description": "heloo world",
                            "inventoryDate": "26-03-17 21:37",
                            "location": "01 - Selling Area",
                            "ownerName": "Bilal",
                            "ownerName1": "",
                            "updatedAt": "2022-02-28T11:28:40.323Z",
                            "image": null
                        },
                        "asset_EPC": "AE1000000110000012097112",
                        "zoneId": {
                            "_id": "620a0873170ade002307b0b5",
                            "zone_name": "zone3",
                            "mapViewImage": "NO IMAGE REFERENCE",
                            "geoJson": "{\"type\":\"Polygon\",\"coordinates\":[[[58.166277,23.584755],[58.169249,23.584765],[58.169281,23.581558],[58.166406,23.58147],[58.166277,23.584755]]]}",
                            "site": "620a083532a17bdbc2180cf7",
                            "level": "1",
                            "__v": 0
                        },
                        "asn": "621caf167bdba40023568dd3",
                        "inputNote": "",
                        "operation": "receiving",
                        "siteId": {
                            "_id": "620a083532a17bdbc2180cf7",
                            "site_name": "03 - RMLP",
                            "mapViewImage": "https://i.ibb.co/6s5VQfW/SQCCC-map.png",
                            "location": "[{\"lat\":23.58108,\"lng\":58.1655},{\"lat\":23.58512,\"lng\":58.173775}]",
                            "objectType": "site",
                            "__v": 0
                        },
                        "__v": 0,
                        "createdAt": "2022-02-28T11:16:25.056Z",
                        "updatedAt": "2022-02-28T11:16:39.810Z"
                    }
                ],
                "matched": 1,
                "under": 0,
                "over": 0
            },
            {
                "site_name": "03 - ABC",
                "zone_name": "zone3",
                "total": 1,
                "items": [
                    {
                        "_id": "621d44520472b36c1fe99808",
                        "asset_name": {
                            "assetType": "Sack",
                            "_id": "621a0664713b4ae6f71ca208",
                            "EPCID": "30340000440C924000000F35",
                            "CATEGORY_CODE": "201",
                            "CATEGORY_NAME": "FURNITURE",
                            "CREATION_DATE": "26-03-17 21:37",
                            "DEPRECIATION": "",
                            "MODIFICATION_DATE": "26-03-17 21:37",
                            "NBV": "",
                            "REMARKS": "",
                            "SITE": "06 - QPD",
                            "SUB_CATEGORY_CODE": "201-005",
                            "SUB_CATEGORY_NAME": "Shelves",
                            "VALUE": "",
                            "__v": 0,
                            "assetStatus": "Written Off",
                            "createdAt": "2022-02-26T10:52:20.441Z",
                            "department": "066231 - (Closed 2017.12.05) Q Store - Mall of Dahran",
                            "description": "heloo world",
                            "inventoryDate": "26-03-17 21:37",
                            "location": "01 - Selling Area",
                            "ownerName": "Bilal",
                            "ownerName1": "",
                            "updatedAt": "2022-02-28T11:28:40.323Z",
                            "image": null
                        },
                        "asset_EPC": "AE1000000110000012097112",
                        "zoneId": {
                            "_id": "620a0873170ade002307b0b5",
                            "zone_name": "zone3",
                            "mapViewImage": "NO IMAGE REFERENCE",
                            "geoJson": "{\"type\":\"Polygon\",\"coordinates\":[[[58.166277,23.584755],[58.169249,23.584765],[58.169281,23.581558],[58.166406,23.58147],[58.166277,23.584755]]]}",
                            "site": "620a083532a17bdbc2180cf7",
                            "level": "1",
                            "__v": 0
                        },
                        "asn": "621caf167bdba40023568dd3",
                        "inputNote": "",
                        "operation": "receiving",
                        "siteId": {
                            "_id": "620a083532a17bdbc2180cf7",
                            "site_name": "03 - RMLP",
                            "mapViewImage": "https://i.ibb.co/6s5VQfW/SQCCC-map.png",
                            "location": "[{\"lat\":23.58108,\"lng\":58.1655},{\"lat\":23.58512,\"lng\":58.173775}]",
                            "objectType": "site",
                            "__v": 0
                        },
                        "__v": 0,
                        "createdAt": "2022-02-28T11:16:25.056Z",
                        "updatedAt": "2022-02-28T11:16:39.810Z"
                    }
                ],
                "matched": 1,
                "under": 0,
                "over": 0
            },
            {
                "site_name": "03 - ABC",
                "zone_name": "zone4",
                "total": 1,
                "items": [
                    {
                        "_id": "621d44520472b36c1fe99808",
                        "asset_name": {
                            "assetType": "Sack",
                            "_id": "621a0664713b4ae6f71ca208",
                            "EPCID": "30340000440C924000000F35",
                            "CATEGORY_CODE": "201",
                            "CATEGORY_NAME": "FURNITURE",
                            "CREATION_DATE": "26-03-17 21:37",
                            "DEPRECIATION": "",
                            "MODIFICATION_DATE": "26-03-17 21:37",
                            "NBV": "",
                            "REMARKS": "",
                            "SITE": "06 - QPD",
                            "SUB_CATEGORY_CODE": "201-005",
                            "SUB_CATEGORY_NAME": "Shelves",
                            "VALUE": "",
                            "__v": 0,
                            "assetStatus": "Written Off",
                            "createdAt": "2022-02-26T10:52:20.441Z",
                            "department": "066231 - (Closed 2017.12.05) Q Store - Mall of Dahran",
                            "description": "heloo world",
                            "inventoryDate": "26-03-17 21:37",
                            "location": "01 - Selling Area",
                            "ownerName": "Bilal",
                            "ownerName1": "",
                            "updatedAt": "2022-02-28T11:28:40.323Z",
                            "image": null
                        },
                        "asset_EPC": "AE1000000110000012097112",
                        "zoneId": {
                            "_id": "620a0873170ade002307b0b5",
                            "zone_name": "zone3",
                            "mapViewImage": "NO IMAGE REFERENCE",
                            "geoJson": "{\"type\":\"Polygon\",\"coordinates\":[[[58.166277,23.584755],[58.169249,23.584765],[58.169281,23.581558],[58.166406,23.58147],[58.166277,23.584755]]]}",
                            "site": "620a083532a17bdbc2180cf7",
                            "level": "1",
                            "__v": 0
                        },
                        "asn": "621caf167bdba40023568dd3",
                        "inputNote": "",
                        "operation": "receiving",
                        "siteId": {
                            "_id": "620a083532a17bdbc2180cf7",
                            "site_name": "03 - RMLP",
                            "mapViewImage": "https://i.ibb.co/6s5VQfW/SQCCC-map.png",
                            "location": "[{\"lat\":23.58108,\"lng\":58.1655},{\"lat\":23.58512,\"lng\":58.173775}]",
                            "objectType": "site",
                            "__v": 0
                        },
                        "__v": 0,
                        "createdAt": "2022-02-28T11:16:25.056Z",
                        "updatedAt": "2022-02-28T11:16:39.810Z"
                    }
                ],
                "matched": 1,
                "under": 0,
                "over": 0
            }
        ],
    };

    onSubmitEvent = () => {
        console.log("User");
    };
    searchFunction = () => {
        this.setState({ hardcoreData: this.dateFilter() });
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
    handleChangeSite = (e) => {
        this.setState({ site: e.value })
    }
    dateFilter = () => {
        return this.state.hardcoreDataNew.filter(
            (x) =>
                x?.site_name?.toLowerCase().includes(
                    this.state?.site.toLowerCase()
                )
        );
    };
    async componentDidMount() {
        const sites = await api.getAllSite()
        this.setState({ sites })
    }
    runFunction = async () => {
        this.setState({ loading: true });
        const SOH = await api.getStockOnHand();
        // let filtering = ASN.filter((item => item.operation_name === "receiving"))
        this.setState({ SOH: SOH, allData: SOH });
        console.log(SOH, "asdfsdafasdf");
        if (SOH) {
            this.setState({ loading: false });
            var grouped = _.mapValues(_.groupBy(this.state.hardcoreData, 'site_name'),
                clist => clist.map(singleSite => singleSite));
            let groupedData = Object.entries(grouped).map(([key, value]) => {
                return { site_name: key, data: value }
            })
            console.log(groupedData);
            this.setState({ groupedData })
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
            {
                label: "site_name",
                key: "site_name",
            },
            {
                label: "zone_name",
                key: "zone_name",
            },
            {
                label: "matched",
                key: "matched",
            },
            {
                label: "over",
                key: "over",
            },
            {
                label: "under",
                key: "under",
            },
        ];
        let sites = this.state.sites.map((item => {
            return { label: item?.site_name, value: item?.site_name }
        }))
        // sites = [{ label: "", value: '' }, ...sites]

        const data = this.state.hardcoreData
            .map((item) => {
                return {
                    site_name: item?.site_name,
                    zone_name: item?.zone_name,
                    matched: item?.matched,
                    over: item?.over,
                    under: item?.under,

                }
            });

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
                                <h1 className="dashboard-heading">Stock Count  (Report)</h1>
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
                                    <CSVLink filename="Stock_Count" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 60 }} data={data} headers={headers}>
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
                                            value={this.state.site || "all site"}
                                            onChange={(e) => this.handleChangeSite(e)}
                                            options={sites}
                                            isSearchable={true}
                                            placeholder={"Site"}
                                            className="last-scan-select-2"
                                            styles={customStyles}
                                        />
                                    </form>
                                    <div style={{ width: '1px', height: '100%', backgroundColor: 'white', position: 'absolute' }}></div>
                                    <form style={{ width: '50%', margin: 20, marginBottom: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: 0, flexDirection: 'column' }}  >
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
                            <StockOnHandTable asn={this.state.groupedData} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default StockOnHand;
