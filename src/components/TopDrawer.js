import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import StorefrontIcon from "@material-ui/icons/Storefront";
import AlarmIcon from "@material-ui/icons/Alarm";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import BuildIcon from "@material-ui/icons/Build";
import StorageIcon from "@material-ui/icons/Storage";
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import StoreIcon from "@material-ui/icons/Store";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import PrintIcon from "@material-ui/icons/Print";
import WebIcon from "@material-ui/icons/Web";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import createSite from "../Store/actions/siteActions";
import createZone from "../Store/actions/siteActions";
import MemoryIcon from "@material-ui/icons/Memory";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { NavLink } from "react-router-dom";
import CodeIcon from "@material-ui/icons/Code";
import Map from "@material-ui/icons/Map";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { connect } from "react-redux";
import { Autorenew, Home, Style } from "@material-ui/icons";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ backgroundColor: "black" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));
function ScrollableTabsButtonForce(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [ActiveBtn1, setActiveBtn1] = React.useState(1);
  const [ActiveBtn2, setActiveBtn2] = React.useState(0);
  const [ActiveBtn3, setActiveBtn3] = React.useState(0);
  const [ActiveBtn4, setActiveBtn4] = React.useState(0);
  const [ActiveBtn5, setActiveBtn5] = React.useState(0);
  const [ActiveBtn6, setActiveBtn6] = React.useState(0);
  const [ActiveBtn7, setActiveBtn7] = React.useState(0);
  const [ActiveBtn8, setActiveBtn8] = React.useState(0);
  const [ActiveBtn9, setActiveBtn9] = React.useState(0);
  const permissions = props.user.roleId ? props.user.roleId.permissions : [];
  // console.log(permissions);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const createSite = () => {
    props.createSite({ modal: !props.modal });
    // console.log(props.modal);
  };
  const createZone = () => {
    props.createZone({ zoneModal: !props.zoneModal });
    // console.log(props.zoneModal);
  };

  const Btn1 = () => {
    setActiveBtn1(1);
    setActiveBtn2(0);
    setActiveBtn3(0);
    setActiveBtn4(0);
    setActiveBtn5(0);
    setActiveBtn6(0);
    setActiveBtn7(0);
    setActiveBtn8(0);
    setActiveBtn9(0);
  };
  const Btn2 = () => {
    setActiveBtn1(0);
    setActiveBtn2(1);
    setActiveBtn3(0);
    setActiveBtn4(0);
    setActiveBtn5(0);
    setActiveBtn6(0);
    setActiveBtn7(0);
    setActiveBtn8(0);
    setActiveBtn9(0);
  };
  const Btn3 = () => {
    setActiveBtn1(0);
    setActiveBtn2(0);
    setActiveBtn3(1);
    setActiveBtn4(0);
    setActiveBtn5(0);
    setActiveBtn6(0);
    setActiveBtn7(0);
    setActiveBtn8(0);
    setActiveBtn9(0);
  };
  const Btn4 = () => {
    setActiveBtn1(0);
    setActiveBtn2(0);
    setActiveBtn3(0);
    setActiveBtn4(1);
    setActiveBtn5(0);
    setActiveBtn6(0);
    setActiveBtn7(0);
    setActiveBtn8(0);
    setActiveBtn9(0);
  };
  const Btn5 = () => {
    setActiveBtn1(0);
    setActiveBtn2(0);
    setActiveBtn3(0);
    setActiveBtn4(0);
    setActiveBtn5(1);
    setActiveBtn6(0);
    setActiveBtn7(0);
    setActiveBtn8(0);
    setActiveBtn9(0);
  };
  const Btn6 = () => {
    setActiveBtn1(0);
    setActiveBtn2(0);
    setActiveBtn3(0);
    setActiveBtn4(0);
    setActiveBtn5(0);
    setActiveBtn6(1);
    setActiveBtn7(0);
    setActiveBtn8(0);
    setActiveBtn9(0);
  };
  const Btn7 = () => {
    setActiveBtn1(0);
    setActiveBtn2(0);
    setActiveBtn3(0);
    setActiveBtn4(0);
    setActiveBtn5(0);
    setActiveBtn6(0);
    setActiveBtn7(1);
    setActiveBtn8(0);
    setActiveBtn9(0);
  };
  const Btn8 = () => {
    setActiveBtn1(0);
    setActiveBtn2(0);
    setActiveBtn3(0);
    setActiveBtn4(0);
    setActiveBtn5(0);
    setActiveBtn6(0);
    setActiveBtn7(0);
    setActiveBtn8(1);
    setActiveBtn9(0);
  };
  const Btn9 = () => {
    setActiveBtn1(0);
    setActiveBtn2(0);
    setActiveBtn3(0);
    setActiveBtn4(0);
    setActiveBtn5(0);
    setActiveBtn6(0);
    setActiveBtn7(0);
    setActiveBtn8(0);
    setActiveBtn9(1);
  };

  useEffect(() => {
    if (window.location.href.includes("Count")) {
      Btn2();
    }
    //  else if (window.location.href.includes("SupplyChain")) {
    //   Btn3();
    // }
    else if (window.location.href.includes("Analytics")) {
      Btn6();
    } else if (window.location.href.includes("Dashboard")) {
      Btn5();
    } else if (window.location.href.includes("ZPLPrinter")) {
      Btn4();
    } else if (window.location.href.includes("MapReport")) {
      Btn8();
    } else if (window.location.href.includes("Reports")) {
      Btn9();
    } else if (window.location.href.includes("Users")) {
      Btn1();
    } else {
      Btn2();
    }
  }, []);

  return (
    <div>
      <div
        className="top_drawer"
        style={{
          width: "20%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >

      </div>
      <div
        className="top_drawer"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          overflowX: "auto",
        }}
      >
        {permissions.includes("Supply Chain") ? (
          <NavLink to="/SupplyChain/SupplyChainIBTData">
            <button
              onClick={() => Btn3()}
              className={`top-drawer-btn top-drawer-btn-${ActiveBtn3}`}
            >
              <Autorenew htmlColor="white" />
              Transaction
            </button>
          </NavLink>
        ) : (
          ""
        )}

        {permissions.includes("Dashboard") ? (
          <NavLink to="/Dashboard">
            <button
              onClick={() => Btn5()}
              className={`top-drawer-btn top-drawer-btn-${ActiveBtn5}`}
            >
              {" "}
              <Home htmlColor="white" />
              Dashboard
            </button>
          </NavLink>
        ) : (
          ""
        )}
        {/* {window.location.href.split('/').reverse()[0] === "MapReport" ? */}
        <NavLink to="/Dashboard">
          <button
            onClick={() => Btn5()}
            className={`top-drawer-btn top-drawer-btn-${ActiveBtn5}`}
          >
            {" "}
            <Home htmlColor="white" />
            Home
          </button>
        </NavLink>
        {/* : ""} */}
        {permissions.includes("Dashboard_Admin") ? (
          <NavLink className="p0" to="/Users">
            <button
              onClick={() => Btn1()}
              className={`top-drawer-btn top-drawer-btn-${ActiveBtn1}`}
            >
              <SupervisorAccountIcon htmlColor="white" />
              Admin
            </button>
          </NavLink>
        ) : (
          ""
        )}
        {permissions.includes("Tag IT") ? (
          <NavLink to="/ZPL/ZPLPrinter">
            <button
              onClick={() => Btn4()}
              className={`top-drawer-btn top-drawer-btn-${ActiveBtn4}`}
            >
              {" "}
              <Style htmlColor="white" />
              Tag IT
            </button>
          </NavLink>
        ) : (
          " "
        )}
        {/* {permissions.includes("AnalyticsMovementReport") ? (
          <NavLink to="/Analytics/AnalyticsMovementReport">
            <button
              onClick={() => Btn7()}
              className={`top-drawer-btn top-drawer-btn-${ActiveBtn7}`}
            >
              {" "}
              <Map htmlColor="white" />
              Movement Report
            </button>
          </NavLink>
        ) : (
          ""
        )} */}
        {permissions.includes("Map_Report") ? (
          <NavLink to="/MapReport">
            <button
              onClick={() => Btn8()}
              className={`top-drawer-btn top-drawer-btn-${ActiveBtn8}`}
            >
              {" "}
              <Map htmlColor="white" />
              Map Report
            </button>
          </NavLink>
        ) : (
          ""
        )}
        {permissions.includes("Reports") ? (
          <NavLink to="/Reports/FirstReport">
            <button
              onClick={() => Btn9()}
              className={`top-drawer-btn top-drawer-btn-${ActiveBtn8}`}
            >
              {" "}
              <Map htmlColor="white" />
              Reports
            </button>
          </NavLink>
        ) : (
          " "
        )}
      </div>
      <div>
        {ActiveBtn1 === 1 ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              overflowX: "auto",
              overflowY: "hidden",
              justifyContent: "flex-start",
            }}
          >
            {/* {permissions.includes("Dashboard_Admin") ? (
              <NavLink
                exact
                to="/Dashboard"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn1}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <DashboardIcon htmlColor="white" />
                Dashboard
              </NavLink>
            ) : (
              ""
            )} */}
            {permissions.includes("Users") ? (
              <NavLink
                to="/Users"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn1}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <PeopleIcon htmlColor="white" />
                Users
              </NavLink>
            ) : (
              ""
            )}
            {permissions.includes("Devices") ? (
              <NavLink
                to="/Devices"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn1}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <ImportantDevicesIcon htmlColor="white" />
                Devices
              </NavLink>
            ) : (
              ""
            )}


            {permissions.includes("Stores") ? (
              <NavLink
                to="/StoreInformation"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn1}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <DeveloperModeIcon htmlColor="white" />
                Sites
              </NavLink>
            ) : (
              ""
            )}
            {permissions.includes("Roles") ? (
              <NavLink
                to="/Roles"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn1}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <GroupAddIcon htmlColor="white" />
                Roles
              </NavLink>
            ) : (
              ""
            )}
          </div>
        ) : ActiveBtn2 === 1 ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              overflowX: "scroll",
              overflowY: "hidden",
              justifyContent: "flex-start",
            }}
          >
          </div>
        ) : ActiveBtn3 === 1 ? (
          // <button onClick={() => setActiveBtn1(1)} className={`top-drawer-btn top-drawer-btn-${ActiveBtn3}`}>Supply</button>
          <div
            style={{
              display: "flex",
              width: "100%",
              overflowX: "scroll",
              overflowY: "hidden",
              justifyContent: "flex-start",
            }}
          >
            {permissions.includes("Supply Chain") ? (
              <NavLink
                exact
                to="/SupplyChain/SupplyChainIBTData"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn3}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <TransferWithinAStationIcon htmlColor="white" />
                Receive
              </NavLink>
            ) : (
              ""
            )}
            {/* {permissions.includes("Supply Chain") ? (
              <NavLink
                exact
                to="/SupplyChain/SupplyChainIBTDataPacking"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn3}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <TransferWithinAStationIcon htmlColor="white" />
                Pack
              </NavLink>
            ) : (
              ""
            )} */}
            {/* {permissions.includes("GI Summary") ? (
              <NavLink
                exact
                to="/SupplyChain/SupplyChainGoodSummary"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn3}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <MemoryIcon htmlColor="white" />
                GI Summary
              </NavLink>
            ) : (
              ""
            )} */}

            {permissions.includes("IN-Store GI") ? (
              <NavLink
                exact
                to="/SupplyChain/SupplyChainIBTDataDispatch"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn3}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <StorefrontIcon htmlColor="white" />
                Dispatch
              </NavLink>
            ) : (
              ""
            )}
            {/* {permissions.includes("Warehouse GI") ? (
              <NavLink
                exact
                to="/SupplyChain/SupplyChainWarehouseSummary"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn3}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <StoreIcon htmlColor="white" />
                PutAway
              </NavLink>
            ) : (
              ""
            )} */}
          </div>
        ) : ActiveBtn4 === 1 ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              overflowX: "scroll",
              overflowY: "hidden",
              justifyContent: "flex-start",
            }}
          >
            {permissions.includes("ZPL Printer") ? (
              <NavLink
                exact
                to="/ZPL/ZPLPrinter"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn4}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <CodeIcon htmlColor="white" />
                Zpl Printer
              </NavLink>
            ) : (
              ""
            )}

            {/* {permissions.includes("ZPL Report") ? (
              <NavLink
                exact
                to="/ZPL/ZPLReport"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn4}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <CodeIcon htmlColor="white" />
                Zpl Report
              </NavLink>
            ) : (
              ""
            )} */}
          </div>
        ) : ActiveBtn5 ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              overflowX: "scroll",
              overflowY: "hidden",
              justifyContent: "flex-start",
            }}
          >
            {permissions.includes("Dashboard_Count") ? (
              <NavLink
                exact
                to="/Dashboard"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn5}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <DashboardIcon htmlColor="white" />
                General
              </NavLink>
            ) : (
              ""
            )}
            {/* {permissions.includes("Dashboard_Admin") ? (
              <NavLink
                exact
                to="/Count/CountDashboard"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn5}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <DashboardIcon htmlColor="white" />
                Cycle Count
              </NavLink>
            ) : (
              ""
            )} */}
          </div>
        ) : ActiveBtn9 ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              overflowX: "scroll",
              overflowY: "hidden",
              justifyContent: "flex-start",
            }}
          >
            {permissions.includes("Associated_Items") ? (
              <NavLink
                exact
                to="/Reports/FirstReport"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn6}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <DashboardIcon htmlColor="white" />
                Asset (Report)
              </NavLink>
            ) : (
              ""
            )}
            {/* {permissions.includes("Counted_Assets") ? (
              <NavLink
                exact
                to="/Reports/SecondReport"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn6}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <DashboardIcon htmlColor="white" />
                Counted Assets
              </NavLink>
            ) : (
              ""
            )} */}
            {/* {permissions.includes("Table_Report") ? (
              <NavLink
                exact
                to="/Reports/ThirdReport"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn6}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <DashboardIcon htmlColor="white" />
                Table Report
              </NavLink>
            ) : (
              ""
            )} */}
            {/* {permissions.includes("Table_Report") ? (
              <NavLink
                exact
                to="/Reports/FourthReport"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn6}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <DashboardIcon htmlColor="white" />
                GF Exit Report
              </NavLink>
            ) : (
              ""
            )} */}
            {/* {permissions.includes("Table_Report") ? (
              <NavLink
                exact
                to="/Reports/FifthReport"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn6}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <DashboardIcon htmlColor="white" />
                Item Master Report
              </NavLink>
            ) : (
              ""
            )} */}
            {/* {permissions.includes("AnalyticsAssetList") ? (
              <NavLink
                exact
                to="/Analytics/AnalyticsAssetList"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn6}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <DashboardIcon htmlColor="white" />
                Asset List
              </NavLink>
            ) : (
              ""
            )} */}

            {permissions.includes("AnalyticsMovementHistory") ? (
              <NavLink
                exact
                to="/Analytics/AnalyticsMovementHistory"
                className={`top-drawer-btn top-drawer-btn-${ActiveBtn6}`}
                activeClassName="top-drawer-btn top-drawer-btn-active"
              >
                <DashboardIcon htmlColor="white" />
                Movement History
              </NavLink>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.createUser.user,
  login: state.createUser.login,
  modal: state.createSite.modal,
  zoneModal: state.createSite.zoneModal,
});
const mapDispatchToProps = (dispatch) => ({
  createZone: (dt) => dispatch(createZone.createZone(dt)),
  createSite: (dt) => dispatch(createSite.createSite(dt)),
});

// props.createSite({ modal: !props.modal })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrollableTabsButtonForce);
