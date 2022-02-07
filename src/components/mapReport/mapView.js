import "./styles.css";
import React, { useRef, useEffect, ReactDom, useState } from "react";
import { LayersPicker, PinInfo, ZoneMode, MapSideMenu } from "./components";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Collapse,
  IconButton,
  List,
} from "@material-ui/core";
import * as L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "leaflet.markercluster";
import "leaflet.markercluster.freezable";
import "./leaflet-coordinate";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { featureCollection, envelope, bbox, point } from "@turf/turf";
import { createTheme } from "@material-ui/core/styles";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import centroid from "@turf/centroid";
import createSite from "../../Store/actions/siteActions";
import createZone from "../../Store/actions/siteActions";
import { TextField } from "@material-ui/core";
import CustomModal from "../CustomModal";
import { connect } from "react-redux";
import api from "../../services/api";
import MapSidebar from "../MapSidebar";
import PeopleIcon from "@material-ui/icons/People";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Slider } from "@material-ui/core";
import LayerImage from "../../assets/layer.png";
import PinImage from "../../assets/pin.png";
import ZoneImage from "../../assets/timeZone.png";
import LocationImage from "../../assets/locations.png";
import SiteImage from "../../assets/internet.png";
import zoneOpacityImage from "../../assets/zoneOpacity.png";
import mapImage from "../../assets/mapImage.png";
import addSiteImage from "../../assets/addSite.png";
import clustringImage from "../../assets/clustringImage.png";
import BasicTextFields from "../Input";
import { Path, BASE_URL } from "../../config/Path";
import { Autorenew, ExpandLess, ExpandMore, Home, Style, ViewHeadlineTwoTone } from "@material-ui/icons";
import DetailsIcon from "@material-ui/icons/Details";
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';
import { DatePicker, Radio, Space } from 'antd';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import moment from "moment";
const { RangePicker } = DatePicker;
const useStyles = makeStyles((theme) => ({
  ListItemText: {
    color: "white",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    color: "white",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});
L.Icon.Default.imagePath = "/";

function MapView(props) {
  const permissions = props.user?.roleId?.permissions
  const classes = useStyles();
  const mapContainer = useRef();
  const map = useRef();
  const GeoJSON_Asset = React.useRef([]);
  const [clicked_zone_asset, set_clicked_zone_asset] = React.useState([]);
  const [openSiteModal, setOpenSiteModal] = React.useState(false);
  const [openZoneModal, setOpenZoneModal] = React.useState(false);
  const [openZone, setOpenZone] = React.useState(props.zoneModal);
  const [siteId, setSiteId] = React.useState("61b62968c72421b96dd9281b");
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [allSites, setAllSites] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [siteFile, setSiteFile] = React.useState();
  const [mapData, setMapData] = React.useState(null);
  const [zoneOpacity, setZoneOpacity] = React.useState(false);
  const [mapOpacity, setMapOpacity] = React.useState(false);
  const [sliderVal, setSliderVal] = React.useState(20);
  const [border, setBorder] = React.useState(false);
  const [pinLabel, setPinLabel] = React.useState(false);
  const [zoneLabel, setZoneLabel] = React.useState(false);
  const [clustring, setClustring] = React.useState(false);
  const [Sites, setSites] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [fitlerToggler, setfitlerToggler] = React.useState(true);
  const [assetID, setAssetID] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [lastDetectTime, setlastDetectTime] = React.useState("");
  const [serialNumber, setSerialNumber] = React.useState("");
  const [zone, setZone] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [RFID_EPC_ID, setRFID_EPC_ID] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [EPC, setEPC] = React.useState("");
  const [RFID_TAG, setRFID_TAG] = React.useState("");
  const [filterDate, setfilterDate] = React.useState("");
  const [filterDateEnd, setfilterDateEnd] = React.useState("");
  const [zoneSlider, setZoneSlider] = React.useState(100);
  const [pinData, setPinData] = React.useState(false);
  const [mapSlider, setMapSlider] = React.useState(100);
  const [filter, setfilter] = React.useState(false);
  const zoneGeoJSON = React.useRef({});
  const zoneDetails = React.useRef({});
  const [siteViews, setSiteViews] = React.useState([]);

  const [addSite, setAddSite] = useState(false);
  const [addZone, setAddZone] = useState(false);
  const [siteOpener, setSiteOpener] = useState(false);
  const layerZone = useRef();
  const layerZoneLabel = useRef([]);
  const layerCluster = React.useRef();
  const layerImage = useRef();
  const [siteDetails, setSiteDetails] = React.useState({
    miny: "",
    maxx: "",
    maxy: "",
    minx: "",
    name: "",
  });
  const [viewInputValue, setViewInputValue] = React.useState();
  const [viewUpdate, setViewUpdate] = React.useState(false);
  const viewInputChange = (value) => {
    // console.log(value)
    setViewInputValue(value);
  }
  const handleClick = () => {
    setSiteOpener(!siteOpener);
  };
  const siteViewClick = (id) => {
    siteViews.forEach(view => {
      if (view._id === id) {
        map.current.fitBounds(JSON.parse(view.geoJson));
      }
    })
  }
  const clickSaveView = () => {
    const bounds = map.current.getBounds();
    // console.log(bounds);
    fetch(BASE_URL + "/level/add/", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "geoJson": [[bounds._northEast.lat, bounds._northEast.lng], [bounds._southWest.lat, bounds._southWest.lng]],
        "site": siteId,
        "level": viewInputValue,
        "type": "floor"
      })
    })
      .then(r => r.json())
      .then(r => {
        setViewUpdate(!viewUpdate);
        setViewInputValue("");
      })
  }
  const viewDelete = (id) => {
    fetch(BASE_URL + "/level/delete/" + id, {
      method: 'delete'
    })
      .then(r => r.json())
      .then(r => { console.log(r); setViewUpdate(!viewUpdate); })
  }
  const [searchVal, setSearchVal] = useState("");
  const changeTextField = (event) => {
    setSiteDetails({ ...siteDetails, [event.target.name]: event.target.value });
  };
  const changeTextFieldZone = (event) => {
    zoneDetails.current = {
      ...zoneDetails.current,
      [event.target.name]: event.target.value,
    };
  };
  const handleCloseSiteModel = () => {
    setAddSite(false);
    setOpenSiteModal(false);
  };
  const handleCloseZoneModel = () => {
    setAddZone(false);
    setOpenZoneModal(false);
    // if(map.current){
    //     map.current.eachLayer(function(layer){
    //         if (layer._path != null) {
    //             layer.remove()
    //         }
    //     });
    // }
  };
  const handleOpenModal = (feat) => {
    setMapData(feat);
    setOpenModal(!openModal);
  };
  useEffect(() => {
    if (map.current) {
      if (addSite === true || addZone === true) {
        map.current.pm.enableDraw("Polygon", {
          snappable: true,
          snapDistance: 20,
        });
      } else {
        map.current.pm.disableDraw("Polygon");
      }
      map.current.on("pm:create", (e) => {
        const fg = L.featureGroup();
        map.current.eachLayer((layer) => {
          if (layer instanceof L.Polygon && layer.pm) {
            fg.addLayer(layer);
          }
        });

        const features = fg.toGeoJSON().features;
        if (addSite) {
          const feat = features[features.length - 1];
          const _bbox = bbox(feat);
          // console.log(_bbox, feat);
          setSiteDetails({
            ...siteDetails,
            miny: _bbox[1],
            maxx: _bbox[0],
            maxy: _bbox[3],
            minx: _bbox[2],
          });
          setOpenSiteModal(true);
          setOpenZoneModal(false);
        } else if (addZone) {
          const feature = features[features.length - 1];
          const bodyData = features[features.length - 1].geometry;
          setOpenZoneModal(true);
          setOpenSiteModal(false);
          zoneGeoJSON.current = bodyData;
        }
      });
    }
  }, [addSite, map.current, addZone]);
  const onChangeFile = (e) => {
    const file = e.target.files[0];
    setSiteFile(file);
  };
  const searchBar = (e) => {
    setSearchVal(e.target.value);
    // console.log(e.target.value);
    // drawClusterAndMarkers(e.target.value);
  };
  const markerHandler1 = () => {
    setZoneOpacity(!zoneOpacity);
    setMapOpacity(false);
    setBorder(false);
    setfilter(false);
    setClustring(false);
    setPinLabel(false);
    setZoneLabel(false);
    setSites(false);
  };
  const markerHandler2 = () => {
    setZoneOpacity(false);
    setMapOpacity(!mapOpacity);
    setBorder(false);
    setClustring(false);
    setSites(false);
    setfilter(false);
    setPinLabel(false);
    setZoneLabel(false);
  };
  const markerHandler3 = () => {
    setZoneOpacity(false);
    setMapOpacity(false);
    setSites(false);
    setBorder(!border);
    setfilter(false);
    setClustring(false);
    setPinLabel(false);
    setZoneLabel(false);
  };
  const markerHandler4 = () => {
    setZoneOpacity(false);
    setMapOpacity(false);
    setBorder(false);
    setClustring(!clustring);
    setfilter(false);
    setPinLabel(false);
    setZoneLabel(false);
    setSites(false);

    if (clustring && layerCluster.current) {
      layerCluster.current.disableClustering();
    } else if (!clustring && layerCluster.current) {
      layerCluster.current.enableClustering();
    }
  };
  const markerHandler5 = () => {
    setZoneOpacity(false);
    setMapOpacity(false);
    setBorder(false);
    setfilter(false);
    setClustring(false);
    setPinLabel(!pinLabel);
    setZoneLabel(false);
    setSites(false);
  };
  const markerHandler6 = () => {
    setZoneOpacity(false);
    setMapOpacity(false);
    setBorder(false);
    setClustring(false);
    setPinLabel(false);
    setfilter(false);
    setZoneLabel(!zoneLabel);
    setSites(false);
    if (zoneLabel) {
      layerZoneLabel.current.forEach((marker) => {
        map.current.addLayer(marker);
      });
    } else {
      layerZoneLabel.current.forEach((marker) => {
        map.current.removeLayer(marker);
      });
    }
  };
  const addSiteHandler = () => {
    setAddSite(true);
  };
  const addZoneHandler = () => {
    setAddZone(true);
  };
  const markerHandler7 = () => {
    setSites(!Sites);
  };

  const clickOnSite = (id) => {
    setSiteId(id);
  };
  const handlePlayersChange = (e, value) => {
    setSliderVal(value);
  };
  const clickPinZoom = (asset_EPC) => {
    const feature = GeoJSON_Asset.current.features.filter(feature => {
      return feature.properties.asset_EPC == asset_EPC
    })
    map.current.setView([feature[0].geometry.coordinates[1], feature[0].geometry.coordinates[0]], 19, {
      "animate": true,
      "pan": {
        "duration": .5
      }
    });
  }
  const dateCompare = (sDate, eDate) => {
    let { LastTimeDate } = filterDate;
    let endingDate = filterDate;
    if (!LastTimeDate && !endingDate) {
      return true;
    }
    // LastTimeDate = moment(LastTimeDate);
    // endingDate = moment(endingDate)
    let sDiff = moment(sDate).diff(LastTimeDate, "days");
    let eDiff = !eDate ? -1 : moment(eDate).diff(endingDate, "days");
    if (sDiff >= 0 && eDiff <= 0) return true;
    return false;
  };
  const drawClusterAndMarkers = (value) => {
    if (layerCluster.current) {
      map.current.removeLayer(layerCluster.current);
    }
    let cluster = L.markerClusterGroup({
      spiderfyOnMaxZoom: false,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: false,
      iconCreateFunction: function (cluster) {
        var length = cluster.getAllChildMarkers().length;
        const icon = L.divIcon({
          className: "none",
          html:
            "<div class='marker-pin'><div class='marker-number'>" +
            length +
            "</div></div>",
          iconSize: [30, 42],
          iconAnchor: [15, 42],
        });
        return icon;
      },
    });
    const formatDate = (date) => {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('-');
    }
    const markers = [];
    //            assetID: assetID,
    //             room: room,
    //             level: level,
    //             serialNumber: serialNumber,
    //             lastDetectTime: lastDetectTime,
    //             EPC: EPC,
    //             description: description,
    //             RFID_TAG: RFID_TAG,
    //             filterDate: filterDate,

    for (var i = 0; i < GeoJSON_Asset.current.features.length; i++) {
      var feature = GeoJSON_Asset.current.features[i];
      // if (
      //   value.EPC === "" &&
      //   value.assetID === "" &&
      //   value.room === "" &&
      //   value.level === "" &&
      //   value.serialNumber === "" &&
      //   value.lastDetectTime === "" &&
      //   value.description === "" &&
      //   value.RFID_TAG === "" &&
      //   value.filterDate === ""
      // ) {
      // console.log(value);
      var marker = L.marker(
        new L.LatLng(
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0]
        ),
        {
          title: feature.properties.asset_EPC,
          ...feature.properties,
        }
      ).on("click", function (e) {
        setPinData(e.target.options);
        setOpenDrawer(true);
      });
      // markers.filter((x => x?.options?.asset_EPC.includes("E280116060000204A14088CE"))).push(marker);
      if (
        value.EPC === "" &&
        value.assetID === "" &&
        value.room === "" &&
        value.level === "" &&
        value.serialNumber === "" &&
        value.lastDetectTime === "" &&
        value.description === "" &&
        value.RFID_TAG === "" &&
        value.filterDate === ""
      ) {
        markers.push(marker);
        console.log(markers.filter((x => x?.options?.asset_EPC.includes(""))));
        markers.forEach((marker) => {
          cluster.addLayer(marker);
        });
        map.current.addLayer(cluster);
        layerCluster.current = cluster;
        layerCluster.current.on("clusterclick", function (e) {
          set_clicked_zone_asset(e.layer.getAllChildMarkers());
          setOpenDrawer(true);
        });
        // markers.push(marker);
      } else {
        markers.push(marker);
        const newMarkers = markers.filter((x =>
          x?.options?.asset_EPC.includes(value.EPC)
          &&
          x?.options?.assetDetails[0].Room_no.includes(value.room)
          &&
          x?.options?.assetDetails[0].Floor.includes(value.level)
          &&
          x?.options?.assetDetails[0].Serial_no.includes(value.serialNumber)
          &&
          x?.options?.assetDetails[0].Description.includes(value.description)
          &&
          x?.options?.assetDetails[0]["Thing Serial"].includes(value.RFID_TAG)
          &&
          formatDate(x?.options?.assetDetails[0].last_cycle_date) >= formatDate(filterDate) && formatDate(x?.options?.assetDetails[0].last_cycle_date) <= formatDate(filterDateEnd)
        ))
        console.log('run');
        // console.log(moment(newMarkers?.options[0]?.assetDetails[0]?.last_cycle_date).toISOString());
        console.log(newMarkers.filter((x => {
          var startDate = formatDate(filterDate);
          var endDate = formatDate(filterDateEnd);
          var date = formatDate(x?.options?.assetDetails[0].last_cycle_date);
          return (date >= startDate && date <= endDate);
        })));

        newMarkers.forEach((marker) => {
          cluster.addLayer(marker);
        });
        map.current.addLayer(cluster);
        layerCluster.current = cluster;
        layerCluster.current.on("clusterclick", function (e) {
          set_clicked_zone_asset(e.layer.getAllChildMarkers());
          setOpenDrawer(true);
        });

      }


      // } /
      // else if (value.EPC.length > 0 || value.assetID.length > 0) {
      //   // console.log(value);
      //   if (
      //     feature.properties.asset_EPC === value.EPC ||
      //     feature.properties._id === value.assetID
      //   ) {
      //     console.log(value);
      //     var marker = L.marker(
      //       new L.LatLng(
      //         feature.geometry.coordinates[1],
      //         feature.geometry.coordinates[0]
      //       ),
      //       {
      //         title: feature.properties.asset_EPC,
      //         ...feature.properties,
      //       }
      //     ).on("click", function (e) {
      //       setPinData(e.target.options);
      //       setOpenDrawer(true);
      //     });
      //     markers.push(marker);
      //     console.log(marker, 'marker marker marker');
      //   }
      // }
      //  else if (feature.properties.assetDetails.length > 0) {
      //   if (
      //     new Date(
      //       feature.properties.assetDetails[0].last_cycle_date
      //     ).getTime() < new Date(value.filterDate).getTime()
      //     ||
      //     feature.properties.assetDetails[0].Room_no.includes(value.room)
      //     ||
      //     feature.properties.assetDetails[0].Floor.includes(value.level)
      //     ||
      //     feature.properties.assetDetails[0].Serial_no.includes(value.serialNumber)
      //     ||
      //     feature.properties.assetDetails[0].Description.includes(value.description)
      //     ||
      //     feature.properties.assetDetails[0]["Thing Serial"].includes(value.RFID_TAG)
      //   ) {
      //     // console.log(value);
      //     // console.log(feature.properties.assetDetails.length)
      //     // console.log(new Date(feature.properties.assetDetails[0].last_cycle_date).getTime() < new Date(value.filterDate).getTime());
      //     var marker = L.marker(
      //       new L.LatLng(
      //         feature.geometry.coordinates[1],
      //         feature.geometry.coordinates[0]
      //       ),
      //       {
      //         title: feature.properties.asset_EPC,
      //         ...feature.properties,
      //       }
      //     ).on("click", function (e) {
      //       setPinData(e.target.options);
      //       setOpenDrawer(true);
      //     });
      //     markers.push(marker);
      //     console.log(marker, 'marker marker marker');
      //   }
      // }
    }

  };
  const handleSaveSite = async (e) => {
    const formData = new FormData();
    formData.append("profile", siteFile, siteFile.name);
    const fileRequest = await fetch(BASE_URL + "/upload", {
      method: "POST",
      body: formData,
      redirect: "follow",
    });
    let fileResponse = await fileRequest.json();
    fileResponse = {
      ...fileResponse,
      file_url: "https://" + fileResponse.file_url,
    };
    const location = [
      { lat: siteDetails.miny, lng: siteDetails.maxx },
      {
        lat: siteDetails.maxy,
        lng: siteDetails.minx,
      },
    ];
    if (fileResponse.success) {
      let siteRequestBody = {
        site_name: siteDetails.name,
        mapViewImage: fileResponse.file_url,
        location: JSON.stringify(location),
        objectType: "site",
      };
      const siteRequest = await fetch(BASE_URL + "/site/add", {
        method: "POST",
        body: JSON.stringify(siteRequestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const siteResponse = await siteRequest.json();
      if (siteResponse._id) {
        setOpenSiteModal(false);
      }
    }
  };
  const handleSaveZone = () => {
    const body = {
      zone_name: zoneDetails.current.name,
      mapViewImage: "NO IMAGE REFERENCE",
      geoJson: zoneGeoJSON.current,
      site: siteId,
      level: "1",
    };
    fetch(BASE_URL + "/zone/add", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((r) => {
        alert("zone created successfully");
        handleCloseZoneModel();
      });
  };
  const searchFilter = (e) => {
    e.preventDefault();
    let x = {
      assetID: assetID,
      room: room,
      level: level,
      serialNumber: serialNumber,
      lastDetectTime: lastDetectTime,
      EPC: EPC,
      description: description,
      RFID_TAG: RFID_TAG,
      filterDate: filterDate !== null ? filterDate : '',
    };
    // alert(JSON.stringify(x))
    console.log(x, 'data');
    drawClusterAndMarkers(x);
  };
  const onChangeZoneOpacity = (e, value) => {
    setZoneSlider(value);
    layerZone.current.setStyle({
      opacity: value / 100,
      fillOpacity: value / 100,
    });
  };
  const onChangeMapOpacity = (e, value) => {
    setMapSlider(value);
    layerImage.current.setStyle({
      opacity: value / 100,
      fillOpacity: value / 100,
    });
    // console.log(layerImage);
  };
  const filterHandler = () => {
    setfilter(!filter);
  };

  useEffect(() => {
    const asyncFun = async () => {
      const sites = await api.getAllSite();
      // console.log(sites[0]._id);
      setAllSites(sites);
      setSiteId(sites[0]._id);
    };
    asyncFun();
  }, []);
  useEffect(() => {
    fetch(BASE_URL + "/level/get/" + siteId).then(r => r.json()).then(r => {
      console.log(r);
      setSiteViews(r);
    })
  }, [viewUpdate])
  useEffect(() => {
    const _map = L.map(mapContainer.current, {
      center: [52.54432217453259, -1.308360683382157],
      zoom: 17,
      attributionControl: false,
    });
    L.control.mousePosition().addTo(_map);
    L.tileLayer(
      "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga",
      {
        maxZoom: 22,
      }
    ).addTo(_map);

    fetch(BASE_URL + "/site/get/" + siteId)
      .then((r) => r.json())
      .then((data) => {
        const location =
          typeof data.site.location === "string"
            ? JSON.parse(data.site.location)
            : data.site.location;
        const bounds = [
          [location[0].lat, location[0].lng],
          [location[1].lat, location[1].lng],
        ];
        const image = L.imageOverlay(data.site.mapViewImage, bounds);
        image.addTo(_map);
        image.bringToFront();
        layerImage.current = image;
        console.log(bounds)
        _map.fitBounds(bounds);
      });

    fetch(BASE_URL + "/asset/get_Asset_by_site/" + siteId)
      .then((r) => r.json())
      .then(async (assets) => {
        const req = await fetch(BASE_URL + "/zone/get/" + siteId);
        const zones = await req.json();
        const features = [];
        for (let asset of assets) {
          if (asset.mConData) {
            // console.letog(asset)
            const _point = point([asset.mConData.long, asset.mConData.lat], {
              ...asset,
            });
            features.push(_point);
          } else {
            for (let zone of zones) {
              if (zone._id == asset.zoneId) {
                const feat_geom = JSON.parse(zone.geoJson);
                let zone_center = centroid(feat_geom);
                zone_center = { ...zone_center, properties: { ...asset } };
                features.push(zone_center);
              }
            }
          }
        }

        GeoJSON_Asset.current = featureCollection(features);
        drawClusterAndMarkers({
          EPC: "",
          assetID: "",
          room: "",
          level: "",
          serialNumber: "",
          lastDetectTime: "",
          description: "",
          RFID_TAG: "",
          filterDate: "",
        });
      });

    fetch(BASE_URL + "/zone/get/" + siteId)
      .then((r) => r.json())
      .then((r) => {
        let features = [];
        // console.log(r);
        r.forEach((each) => {
          const feature = JSON.parse(each.geoJson);
          const new_feat = {
            type: "Feature",
            geometry:
              typeof feature === "object" ? feature : JSON.parse(feature),
            properties: {
              _id: each._id,
              level: each.level,
              zone_name: each.zone_name,
              site: each.site,
            },
          };
          features.push(new_feat);
        });

        const collection = featureCollection(features);

        function onEachFeature(feature, layer) {
          var marker = L.marker(layer.getBounds().getCenter(), {
            icon: L.divIcon({
              className: "label-custom",
              html: feature.properties.zone_name,
              iconSize: [100, 10],
              iconAnchor: [30, 10],
            }),
          }).addTo(_map);
          layerZoneLabel.current.push(marker);
        }

        layerZone.current = L.geoJSON(collection, {
          onEachFeature: onEachFeature,
        }).addTo(_map);
      });
    map.current = _map;
    // setTimeout(() => {
    //   console.log(_map.getBounds());
    //   _map.fitBounds([[23.580479181290773, 58.180623613254255], [23.582040155732994, 58.18377520884677]]);
    // }, 10 * 1000)
    return () => map.current.remove();
  }, [siteId, refresh]);

  return (
    <React.Fragment>
      <CustomModal
        open={openModal}
        handleClose={handleOpenModal}
        mapData={mapData}
      />
      <div className="map-wrapper" style={{ position: "relative" }}>
        {zoneOpacity && (
          <div
            style={{ position: "absolute", top: 20, right: 90, zIndex: 234234234234 }}
            className="slider-1"
          >
            <Slider
              value={zoneSlider}
              defaultValue={50}
              onChange={(e, value) => onChangeZoneOpacity(e, value)}
              aria-label="Default"
              orientation="vertical"
              valueLabelDisplay="auto"
              style={{ height: 200 }}
            />
            <h1 className="layers-h1">Zone</h1>
          </div>
        )}
        {mapOpacity && (
          <div
            style={{ position: "absolute", top: 50, right: 90 }}
            className="slider-1"
          >
            <Slider
              value={mapSlider}
              defaultValue={50}
              onChange={(e, value) => onChangeMapOpacity(e, value)}
              aria-label="Default"
              orientation="vertical"
              valueLabelDisplay="auto"
              style={{ height: 200 }}
            />
            <h1 className="layers-h1">Map</h1>
          </div>
        )}
        <div
          style={{
            position: "absolute",
            right: 0,
            // top: 35,
            zIndex: 51000,
            // minHeight: "max-content",
            minWidth: "80px",
            minHeight: "max-content",
            height: "100%",
            backdropFilter: "blur(8px)",
            // boxShadow:"-26px 13px 61px -4px rgba(255,255,255,0.04)"
            // backgroundColor: "rgb(55, 62, 67)",
            overflowY: "scroll",
            overflowX: "show",
          }}
          className="map-right-side"
        >
          <button onClick={() => markerHandler1()} className="layers layers-1">
            <img
              src={mapImage}
              width="25px"
              height="25px"
              style={{ objectFit: "contain" }}
              className="left-side-img"
            />
            <h1 className="layers-h1">Zone opacity</h1>
          </button>
          <button onClick={() => markerHandler2()} className="layers layers-1">
            <img
              src={mapImage}
              width="25px"
              height="25px"
              style={{ objectFit: "contain" }}
              className="left-side-img"
            />
            <h1 className="layers-h1">Map opacity</h1>
          </button>
          <button onClick={() => markerHandler4()} className="layers layers-1">
            <img
              src={clustringImage}
              width="25px"
              height="25px"
              style={{ objectFit: "contain" }}
              className="left-side-img"
            />
            <h1 className="layers-h1">Clustering</h1>
          </button>
          <button onClick={() => markerHandler7()} className="layers layers-1">
            <img
              src={zoneOpacityImage}
              width="25px"
              height="25px"
              style={{ objectFit: "contain" }}
              className="left-side-img"
            />
            <h1 className="layers-h1">Sites</h1>
          </button>

          <button onClick={() => setOpenDrawer(!openDrawer)} className="layers layers-1">
            <DetailsIcon htmlColor="#4A4A4A" style={{ width: '25px', height: '25px', objectFit: 'contain' }} />
            <h1 className="layers-h1">Open Details</h1>
          </button>
          <button onClick={() => setRefresh(!refresh)} className="layers layers-1">
            <Autorenew htmlColor="#4A4A4A" style={{ width: '25px', height: '25px', objectFit: 'contain' }} />
            <h1 className="layers-h1">Refresh</h1>
          </button>
          {permissions?.includes("remove_site") ?
            null : <button onClick={() => addSiteHandler()} className="layers layers-1">
              <img
                src={addSiteImage}
                width="25px"
                height="25px"
                style={{ objectFit: "contain" }}
                className="left-side-img"
              />
              <h1 className="layers-h1">Add Site</h1>
            </button>
          }
          <button onClick={() => filterHandler()} className="layers layers-1">
            {/* <img
              src={SiteImage}
              width="25px"
              height="25px"
              style={{ objectFit: "contain" }}
              className="left-side-img"
            /> */}
            <FilterListIcon htmlColor="#4A4A4A" style={{ width: '25px', height: '25px', objectFit: 'contain' }} />
            <h1 className="layers-h1">Fitlers</h1>
          </button>
          {permissions?.includes("remove_zone") ?
            null :
            <button onClick={() => addZoneHandler()} className="layers layers-1">
              <img
                src={addSiteImage}
                width="25px"
                height="25px"
                style={{ objectFit: "contain" }}
                className="left-side-img"
              />
              <h1 className="layers-h1">Add Zone</h1>
            </button>
          }
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            // top: 35,
            zIndex: 51000,
            height: "100%",
            minWidth: "480px",
            minHeight: "100%",
            maxWidth: "480px",
            marginLeft: filter ? "0px" : "-480px",
            transition: "all .4s",
            backgroundColor: "rgb(55, 62, 67)",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            overflowX: 'auto'
          }}
          className="map-right-side"
        >
          <div className="dashboard-header" style={{ width: "100%" }}>
            <IconButton
              className="ml-2"
              aria-label="expand row"
              size="small"
              onClick={() => setfitlerToggler(!fitlerToggler)}
            >
              {fitlerToggler ? (
                <KeyboardArrowUpIcon htmlColor="black" />
              ) : (
                <KeyboardArrowDownIcon htmlColor="black" />
              )}
            </IconButton>
            <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
            <h1 className="dashboard-heading">Map Report</h1>
          </div>
          <Collapse
            in={fitlerToggler}
            timeout="auto"
            unmountOnExit
            style={{ width: "100%", }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
                position: 'relative',
              }}
            >
              <form
                style={{
                  width: "60%",
                  margin: 20,
                  marginBottom: 0,
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  flexWrap: "wrap",
                  marginBottom: 0,
                  position: 'relative',
                }}
              >
                <BasicTextFields
                  name="Asset ID"
                  value={assetID}
                  onChangeEvent={(e) => setAssetID(e.target.value)}
                />
                <BasicTextFields
                  name="Serial Number"
                  value={serialNumber}
                  onChangeEvent={(e) => setSerialNumber(e.target.value)}
                />
                <BasicTextFields
                  name="Level"
                  value={level}
                  onChangeEvent={(e) => setLevel(e.target.value)}
                />
                <BasicTextFields
                  name="Room"
                  value={room}
                  onChangeEvent={(e) => setRoom(e.target.value)}
                />
                {/* <DatePicker
                  value={lastDetectTime}
                  placeholder={"Last Detect Time"}
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
                  onChange={(e) => setlastDetectTime(e)}
                /> */}
                <BasicTextFields
                  name="Description"
                  value={description}
                  onChangeEvent={(e) => setDescription(e.target.value)}
                />
                <BasicTextFields
                  name="Odoo_Tag"
                  value={RFID_TAG}
                  onChangeEvent={(e) => setRFID_TAG(e.target.value)}
                />
                <BasicTextFields
                  name="EPC"
                  value={EPC}
                  onChangeEvent={(e) => setEPC(e.target.value)}
                />
                {/* <BasicTextFields
                  secure={"date"}
                  name="Date"
                  value={filterDate}
                  onChangeEvent={(e) => setfilterDate(e.target.value)}
                /> */}
                <DatePicker
                  value={filterDate}
                  placeholder={"Starting-Date"}
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
                  onChange={(e) => setfilterDate(e)}
                />
                <DatePicker
                  value={filterDateEnd}
                  placeholder={"Ending-Date"}
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
                  onChange={(e) => setfilterDateEnd(e)}
                />
                <Button
                  variant="contained"
                  style={{ marginTop: "20px" }}
                  onClick={(e) => searchFilter(e)}
                >
                  Search
                </Button>
              </form>
            </div>
          </Collapse>
        </div>
        <div
          style={{
            position: "absolute",
            right: Sites ? 90 : 0,
            top: 0,
            transition: "all .4s",
            zIndex: 41000,
            backgroundColor: "#ffffff",
            display: "block",
          }}
        >
          <div
            style={{
              width: Sites ? "300px" : 0,
              minHeight: "83vh",
              height: "100%",
              backgroundColor: "#373E43",
              zIndex: 1000,
              overflowY: "auto",
              // scroll
            }}
          >
            {allSites.map((item) =>
              item.site_name && (
                <>
                  <label
                    key={item._id}
                    exact
                    className="map-table-1"
                    style={{ width: "100%", margin: 0 }}
                    activeClassName="drawer-active-class"
                    onClick={() => clickOnSite(item._id)}
                  >
                    <ListItem key={item._id} button>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={item.site_name}
                        onClick={handleClick}
                      >
                        {siteOpener ? <ExpandLess /> : <ExpandMore />}
                      </ListItemText>
                    </ListItem>
                  </label>
                  <Collapse in={siteOpener} timeout="auto" unmountOnExit>
                    <label
                      key={item._id}
                      exact
                      className="map-table-1"
                      style={{ width: "100%", margin: 0, backgroundColor: 'gray', cursor: 'pointer' }}
                      activeClassName="drawer-active-class"
                    >
                      <ListItemText className={classes.ListItemText} style={{ margin: 10 }} primary="Floors" />
                      {siteViews.map(view => {
                        return <ListItem button style={{ justifyContent: "space-between" }}>
                          <span onClick={() => siteViewClick(view._id)}>{view.level}</span>
                          <IconButton><CloseIcon htmlColor="white" onClick={() => viewDelete(view._id)} /></IconButton>
                        </ListItem>
                      })}
                      <ListItem style={{ justifyContent: "space-between", alignItems: 'center', display: 'flex', width: '100%' }}>

                        {/* <TextField
                          style={{ backgroundColor: 'white', border: "solid 2px black", borderRadius: 5 }}
                          value={viewInputValue}
                          onChange={(e) => viewInputChange(e.target.value)}
                        >
                        </TextField> */}
                        <BasicTextFields
                          name="Add Floor"
                          placeholder={"Add Floor"}
                          value={viewInputValue}
                          onChangeEvent={(e) => viewInputChange(e.target.value)}
                        />
                        <Button variant="contained" style={{ marginTop: '10px', marginLeft: '10px' }} onClick={() => clickSaveView()}>Add</Button>
                      </ListItem>
                    </label>
                  </Collapse>
                </>
              ))}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            // top: 35,
            transition: "all .4s",
            zIndex: 41000,
            // backgroundColor: '#373E43',
            width: 300,
            height: "100%",
            display: "block",
          }}
        >
          <MapSidebar
            data={clicked_zone_asset}
            pinData={pinData}
            drawer={openDrawer}
            toggleDrawer={() => setOpenDrawer(!openDrawer)}
            searchBar={searchBar}
            searchVal={searchVal}
            clickPinZoom={clickPinZoom}
          />
        </div>

        <div ref={mapContainer} style={{ width: "100%", height: "100%" }}>
          <Dialog
            open={openSiteModal}
            fullWidth={400}
            onClose={() => props.createSite({ modal: !props.modal })}
            aria-labelledby="responsive-dialog-title"
            hideBackdrop={false}
          >
            <DialogTitle id="">{"Upload image for Site"}</DialogTitle>
            <DialogContent style={{ height: "200px" }}>
              <TextField
                className="input-mat"
                InputProps={{
                  classes: { notchedOutline: classes.notchedOutline },
                }}
                size="small"
                inputProps={{ className: "text-field-label" }}
                InputLabelProps={{
                  className: "text-field-label",
                  shrink: true,
                }}
                style={{ color: "white" }}
                variant="outlined"
                name={"name"}
                onChange={changeTextField}
                value={siteDetails.name}
                label="Site Name"
              />
              <br />
              <Button
                style={{ marginTop: 5 }}
                variant="contained"
                component="label"
              >
                Upload File
                <input type="file" hidden onChange={onChangeFile} />
              </Button>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={handleCloseSiteModel}
                color="secondary"
                variant={"outlined"}
              >
                Close
              </Button>
              <Button
                autoFocus
                onClick={handleSaveSite}
                color="secondary"
                variant={"outlined"}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openZoneModal}
            // open={true}
            fullWidth={400}
            onClose={() => {
              props.createZone({ zoneModal: !props.zoneModal });
              handleCloseZoneModel();
            }}
            aria-labelledby="responsive-dialog-title"
            hideBackdrop={false}
          // style={{ backgroundColor:'#212121',color:'white' }}
          >
            <DialogTitle id="">{"Upload Zone"}</DialogTitle>
            <DialogContent style={{ height: "200px" }}>
              <TextField
                className="input-mat"
                InputProps={{
                  classes: { notchedOutline: classes.notchedOutline },
                }}
                size="small"
                inputProps={{ className: "text-field-label" }}
                InputLabelProps={{
                  className: "text-field-label",
                  shrink: true,
                }}
                style={{ color: "white" }}
                variant="outlined"
                name={"name"}
                onChange={changeTextFieldZone}
                value={zoneDetails.current.name}
                label="Zone Name"
              />
              {/* <BasicTextFields name={"name"} placeholder={"Zone Name"} value={zoneDetails.current.name} onChangeEvent={(e) => changeTextField(e)} /> */}
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={handleCloseZoneModel}
                color="secondary"
                variant={"contained"}
              >
                Close
              </Button>
              <Button
                autoFocus
                onClick={handleSaveZone}
                color="primary"
                variant={"contained"}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div >
    </React.Fragment >
  );
}

const mapStateToProps = (state) => ({
  modal: state.createSite.modal,
  zoneModal: state.createSite.zoneModal,
  user: state.createUser.user,
});
const mapDispatchToProps = (dispatch) => ({
  createSite: (dt) => dispatch(createSite.createSite(dt)),
  createZone: (dt) => dispatch(createZone.createZone(dt)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
