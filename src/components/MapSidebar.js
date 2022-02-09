import React, { useEffect, useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CloseIcon from "@material-ui/icons/Close";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Collapse, IconButton } from "@material-ui/core";
import BasicTextFields from "./Input";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FlareIcon from "@material-ui/icons/Flare";
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
// import ShoppingIcon from '../assets/shopping.png'
import tagTop from "../assets/tagstop.png";
import ShoppingIcon from "../assets/TAGS.png";
import TargetIcon from "../assets/target.png";
import EnhancedTable from "./MapTable";
import api from "../services/api";
import { set } from "lodash";

function MapSidebar({
  drawer,
  data,
  toggleDrawer,
  pinData,
  searchBar,
  searchVal,
  clickPinZoom
}) {
  const [cluster, setCluster] = useState(true);
  const [item, setItem] = useState(true);
  const [zone, setZone] = useState(true);
  const [pin, setPin] = useState(false);
  const [close, setClose] = useState(false);
  const [properties, setProperties] = useState(false);
  const [assets, setAssets] = useState([]);
  const [assets1, setAssets1] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const clusterBtnHandler = () => {
    setCluster(true);
    setPin(false);
  };
  const pinBtnHandler = () => {
    setCluster(false);
    setPin(true);
  };
  // const filterSearch = (e) => {
  //     // console.log(e.target.value);
  //     setSearchVal(e.target.value)
  //     setAssets(dateFilter())
  // }
  const checkedVal = (e) => {
    console.log(permissions.includes(e.target.value), "value");
    if (permissions.includes(e.target.value)) {
      setPermissions(permissions.filter((val) => val !== e.target.value));
    } else {
      setPermissions([...permissions, e.target.value]);
    }
  };
  const checkedValChild = (e, data) => {
    if (permissions.includes(e.target.value)) {
      setPermissions(permissions.filter((val) => val !== e.target.value));
    } else {
      setPermissions([...permissions, e.target.value]);
    }
  };
  const checkedValChildPin = async (e, data) => {
    // console.log(e, data)
    const assetDetails = await api.getAssetsByEPC(data);
    console.log(assetDetails);
    setProperties(assetDetails);
    setPin(!pin);
    setCluster(!cluster);
  };
  useEffect(() => {
    setAssets(data);
    setAssets1(data);
    setPermissions(data);
    console.log(data);
    setPin(false);
    setCluster(true);
  }, [data]);
  useEffect(() => {
    if (!pinData) {
      setCluster(true);
      setPin(false);
    } else {
      setCluster(false);
      setPin(true);
    }
    console.log(pinData);
    setProperties(pinData ? pinData?.assetDetails[0] : null);
  }, [pinData]);

  const dateFilter = () => {
    return assets1.filter((x) =>
      x?.options?.title?.toLowerCase().includes(searchVal.toLowerCase())
    );
  };
  // console.log(data.map((item => item?.options)));
  // console.log(data);
  return (
    <div
      style={{
        position: "relative",
        left: drawer ? 0 : -300,
        top: 0,
        zIndex: 4000,
        backgroundColor: "#373E43",
        width: 300,
        transition: "all .4s",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          minHeight: 60,
        }}
      >
        <button
          className="btn-map"
          onClick={() => clusterBtnHandler()}
          style={{
            backgroundColor: cluster ? "#373E43" : "gray",
            minWidth: "100px",
            flex: 2,
            height: "3rem",
            outline: "none",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MenuIcon htmlColor="white" />
          Cluster
        </button>
        <button
          className="btn-map"
          onClick={() => pinBtnHandler()}
          style={{
            backgroundColor: pin ? "#373E43" : "gray",
            minWidth: "100px",
            flex: 2,
            height: "3rem",
            outline: "none",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LocationOnIcon htmlColor="white" />
          Pin

        </button>
        <button
          className="btn-map btn-map-cross"
          onClick={() => toggleDrawer()}
          style={{
            backgroundColor: "gray",
            minWidth: "60px",
            flex: 1,
            height: "3rem",
            outline: "none",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CloseIcon htmlColor="white" fontSize="large" />
        </button>
      </div>
      {cluster && (
        <div>
          <div
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
              display: "flex",
              padding: 10,
            }}
          >
            <BasicTextFields
              require
              name="Keywords"
              value={searchVal}
              onChangeEvent={(e) => searchBar(e)}
            />
          </div>
          <div className="dashboard-header" style={{ position: "relative" }}>
            <IconButton
              className="ml-2"
              aria-label="expand row"
              size="small"
              onClick={() => setItem(!item)}
            >
              {item ? (
                <KeyboardArrowUpIcon htmlColor="black" />
              ) : (
                <KeyboardArrowDownIcon htmlColor="black" />
              )}
            </IconButton>
            <img
              src={tagTop}
              style={{ objectFit: "contain" }}
              width="25px"
              height="25px"
            />
            <h1 className="dashboard-heading">ITEMS ({data && data.length})</h1>
            <div style={{ position: "absolute", right: 0 }}>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="All"
                  onChange={(e) => checkedVal(e)}
                  control={
                    <Checkbox
                      defaultChecked={true}
                      style={{ color: "black" }}
                      color="black"
                    />
                  }
                  label="All"
                  // checked={permissions.includes('All')}
                  defaultChecked={true}
                  style={{ color: "black" }}
                  labelPlacement="end"
                />
              </FormGroup>
            </div>
          </div>
          <Collapse
            in={item}
            timeout="auto"
            unmountOnExit
            style={{ width: "100%" }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: "transparent",
                wordBreak: "break-all",
              }}
            >
              <FormControl>
                <FormGroup
                  aria-label="position"
                  style={{
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    overflowY: "scroll",
                    overflowX: "hidden",
                    height: "100%",
                    maxHeight: "55vh",
                    minHeight: "300px",
                  }}
                >
                  {assets?.map((item) => (
                    <div className="tags" style={{ height: 33 }}>
                      <Checkbox
                        value={item.options?.title}
                        defaultChecked={permissions?.includes(
                          item.options?.title
                        )}
                        checked={!permissions?.includes(item.options?.title)}
                        onChange={(e) => checkedValChild(e, item?.options)}
                        style={{ color: "white" }}
                        color="white"
                      />
                      <FormLabel
                        style={{ color: "white" }}
                        onClick={(e) =>
                          checkedValChildPin(e, item?.options?.title)
                        }
                      >
                        <React.Fragment>
                          <img
                            src={ShoppingIcon}
                            width="25px"
                            height="25px"
                            style={{ objectFit: "contain" }}
                          />
                          {item.options?.title}
                        </React.Fragment>
                      </FormLabel>
                    </div>
                  ))}
                </FormGroup>
              </FormControl>
            </div>
            {/* <EnhancedTable /> */}
          </Collapse>
        </div>
      )}
      {pin && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {properties !== null ? (
            <React.Fragment>
              <div
                className={`map-table-3`}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <img
                  src={ShoppingIcon}
                  width="30px"
                  height="30px"
                  style={{ objectFit: "contain" }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    fontFamily: "Open Sans, sans-serif",
                  }}
                >
                  <h2
                    style={{
                      fontSize: 14,
                      opacity: 0.8,
                      color: "white",
                      fontFamily: "inherit",
                    }}
                  >
                    {properties["Thing Name"]}
                  </h2>
                  <h2
                    style={{
                      fontSize: 13,
                      opacity: 0.8,
                      color: "white",
                      fontFamily: "inherit",
                    }}
                  >
                    {properties?.RFID_Tag}
                  </h2>
                </div>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#0089c4",
                    borderRadius: 3,
                    visibility: 'hidden'
                  }}
                >
                  <FlareIcon htmlColor="white" />
                </div>
                <IconButton aria-label="pin-click" onClick={(e) => { console.log(properties); clickPinZoom(properties.RFID_Tag) }}>
                  <CenterFocusStrongIcon style={{ color: "red" }} />
                </IconButton>

              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  className="map-table-1"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    width: "100%",
                    padding: 5,
                  }}
                >
                  <h2
                    style={{
                      fontSize: 14,
                      color: "white",
                      fontWeight: "lighter",
                      fontFamily: "inherit",
                    }}
                  >
                    EPC
                  </h2>
                  <h2
                    style={{
                      fontSize: 13,
                      color: "white",
                      fontFamily: "inherit",
                    }}
                  >
                    {properties?.RFID_Tag}
                  </h2>
                </div>
                <div
                  className="map-table-1"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    width: "100%",
                    padding: 5,
                  }}
                >
                  <h2
                    style={{
                      fontSize: 13,
                      color: "white",
                      fontFamily: "inherit",
                    }}
                  >
                    Asset Name
                  </h2>
                  <h2
                    style={{
                      fontSize: 14,
                      color: "white",
                      fontWeight: "lighter",
                      fontFamily: "inherit",
                    }}
                  >
                    {properties?.assetName}
                  </h2>
                </div>
                <div
                  className="map-table-1"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    width: "100%",
                    padding: 5,
                  }}
                >
                  <h2
                    style={{
                      fontSize: 13,
                      color: "white",
                      fontFamily: "inherit",
                    }}
                  >
                    Description
                  </h2>
                  <h2
                    style={{
                      fontSize: 14,
                      color: "white",
                      fontWeight: "lighter",
                      fontFamily: "inherit",
                    }}
                  >
                    {properties?.description}
                  </h2>
                </div>

                <div
                  className="map-table-1"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    width: "100%",
                    padding: 5,
                  }}
                >
                  <h2
                    style={{
                      fontSize: 13,
                      color: "white",
                      fontFamily: "inherit",
                    }}
                  >
                    department
                  </h2>
                  <h2
                    style={{
                      fontSize: 14,
                      color: "white",
                      fontWeight: "lighter",
                      fontFamily: "inherit",
                    }}
                  >
                    {properties?.department}
                  </h2>
                </div>

                <div
                  className="map-table-1"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    width: "100%",
                    padding: 5,
                  }}
                >
                  <h2
                    style={{
                      fontSize: 14,
                      color: "white",
                      fontWeight: "lighter",
                      fontFamily: "inherit",
                    }}
                  >
                    Last Cycle Date
                  </h2>
                  <h2
                    style={{
                      fontSize: 13,
                      color: "white",
                      fontFamily: "inherit",
                    }}
                  >
                    {new Date(properties?.updatedAt).toLocaleString('en-Us', "Asia/Muscat")}
                  </h2>
                </div>
                <div
                  className="map-table-1"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    width: "100%",
                    padding: 5,
                  }}
                >
                  <h2
                    style={{
                      fontSize: 14,
                      color: "white",
                      fontWeight: "lighter",
                      fontFamily: "inherit",
                    }}
                  >
                    inventory Date
                  </h2>
                  <h2
                    style={{
                      fontSize: 13,
                      color: "white",
                      fontFamily: "inherit",
                    }}
                  >
                    {properties?.inventoryDate}
                  </h2>
                </div>
                <div
                  className="map-table-1"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    width: "100%",
                    padding: 5,
                  }}
                >
                  <h2
                    style={{
                      fontSize: 14,
                      color: "white",
                      fontWeight: "lighter",
                      fontFamily: "inherit",
                    }}
                  >
                    Owner Name
                  </h2>
                  <h2
                    style={{
                      fontSize: 13,
                      color: "white",
                      fontFamily: "inherit",
                    }}
                  >
                    {properties?.ownerName}
                  </h2>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <h2
              style={{
                fontSize: 14,
                color: "white",
                fontWeight: "lighter",
                fontFamily: "inherit",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
                width: "100%",
              }}
            >
              No Details
            </h2>
          )}
        </div>
      )}
    </div>
  );
}

export default MapSidebar;
