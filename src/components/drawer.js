import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import "../css/drawer.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import userActions from "../Store/actions/userActions";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import Logo from '../assets/logo.png'
import Logo from "../assets/inn.png";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AlarmIcon from "@material-ui/icons/Alarm";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import BuildIcon from "@material-ui/icons/Build";
import StorageIcon from "@material-ui/icons/Storage";
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import StoreIcon from "@material-ui/icons/Store";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import PrintIcon from "@material-ui/icons/Print";
import WebIcon from "@material-ui/icons/Web";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import MemoryIcon from "@material-ui/icons/Memory";
import CodeIcon from "@material-ui/icons/Code";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { Link, NavLink } from "react-router-dom";
import ListSubheader from "@material-ui/core/ListSubheader";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

const drawerWidth = "12%";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  ListItemText: {
    color: "white",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    minWidth: drawerWidth,
    flexShrink: 0,
    backgroundColor: "#373E43",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#373E43",
    // boxShadow: "0px 0px 10px 1px rgba(255, 255, 255, 0.55)",
    // WebkitBoxShadow: "0px 0px 10px 1px rgba(255, 255, 255, 0.55)",
    webkitScrollbar: {
      display: "none",
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [open1, setOpen1] = React.useState(true);
  const [open2, setOpen2] = React.useState(true);
  const [open3, setOpen3] = React.useState(true);
  const [open4, setOpen4] = React.useState(true);

  const permissions = props.user.roleId ? props.user.roleId.permissions : [];
  const mapData = props.mapData;
  // console.log(permissions);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const handleClick3 = () => {
    setOpen3(!open3);
  };
  const handleClick4 = () => {
    setOpen4(!open4);
  };
  const logout = () => {
    localStorage.clear();
    props.userLogin({ user: {}, login: false });
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };
  return (
    <React.Fragment>
      <Drawer
        className={[classes.drawer, "drawer-scrollbar"]}
        variant="permanent"
        anchor="left"
        style={{
          backgroundColor: "#242424",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          <Typography noWrap>
            {/* INNOVENT DASHBOARD */}
            <img
              src={Logo}
              style={{ objectFit: "contain", width: "100%" }}
              alt="Logo"
              class="logo"
            />
          </Typography>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              marginTop: 5,
              marginLeft: 10,
              width: "100%",
            }}
          >
            <Typography style={{ color: "white" }}>
              {" "}
              Username: {props.user.userName}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              marginTop: 5,
              marginLeft: 10,
              width: "100%",
            }}
          >
            <Button onClick={() => logout()} variant="contained">
              Log Out
            </Button>
          </div>
          <div style={{ display: "none" }}>
            <ListItem button onClick={handleClick1}>
              <ListItemIcon>
                <AlarmIcon htmlColor="white" />
              </ListItemIcon>
              <ListItemText
                className={classes.ListItemText}
                primary={"Master"}
              />
            </ListItem>
            <Collapse
              style={{ marginLeft: "3%" }}
              in={open1}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {permissions.includes("Dashboard_Count") ? (
                  <NavLink
                    exact
                    to="/Count/CountDashboard"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <DashboardIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Dashboard"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}

                {permissions.includes("Operations") ? (
                  <NavLink
                    exact
                    to="/Count/CountOperation"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <MemoryIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Operation"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
                {permissions.includes("Inventory (EPC)") ? (
                  <NavLink
                    exact
                    to="/Count/CountInventory"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <StorageIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Asset registry"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
              </List>
            </Collapse>
            <ListItem button onClick={handleClick2}>
              <ListItemIcon>
                <BuildIcon htmlColor="white" />
              </ListItemIcon>
              <ListItemText
                className={classes.ListItemText}
                primary={"Transaction"}
              />
            </ListItem>
            <Collapse
              style={{ marginLeft: "3%" }}
              in={open2}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {permissions.includes("Supply Chain") ? (
                  <NavLink
                    exact
                    to="/SupplyChain/SupplyChainIBTData"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <TransferWithinAStationIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Receive"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
                <NavLink
                  exact
                  to="/SupplyChain/SupplyChainIBTDataPacking"
                  className="drawer-class"
                  activeClassName="drawer-active-class"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <TransferWithinAStationIcon htmlColor="white" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.ListItemText}
                      primary={"Pack"}
                    />
                  </ListItem>
                </NavLink>
                {permissions.includes("GI Summary") ? (
                  <NavLink
                    exact
                    to="/SupplyChain/SupplyChainGoodSummary"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <MemoryIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"GI Summary"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
                {permissions.includes("IN-Store GI") ? (
                  <NavLink
                    exact
                    to="/SupplyChain/SupplyChainStoreSummary"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <StorefrontIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Dispatch"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
                {permissions.includes("Warehouse GI") ? (
                  <NavLink
                    exact
                    to="/SupplyChain/SupplyChainWarehouseSummary"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <StoreIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"PutAway"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
              </List>
            </Collapse>
            <ListItem button onClick={handleClick3}>
              <ListItemIcon>
                <LocalOfferIcon htmlColor="white" />
              </ListItemIcon>
              <ListItemText
                className={classes.ListItemText}
                primary={"Analytics"}
              />
            </ListItem>
            <Collapse
              style={{ marginLeft: "3%" }}
              in={open3}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <NavLink
                  exact
                  to="/Analytics/AnalyticsReports"
                  className="drawer-class"
                  activeClassName="drawer-active-class"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <CodeIcon htmlColor="white" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.ListItemText}
                      primary={"Reports"}
                    />
                  </ListItem>
                </NavLink>
                <NavLink
                  exact
                  to="/Analytics/AnalyticsMapReports"
                  className="drawer-class"
                  activeClassName="drawer-active-class"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <CodeIcon htmlColor="white" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.ListItemText}
                      primary={"Map Report"}
                    />
                  </ListItem>
                </NavLink>
                <NavLink
                  exact
                  to="/Analytics/AnalyticsAging"
                  className="drawer-class"
                  activeClassName="drawer-active-class"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <CodeIcon htmlColor="white" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.ListItemText}
                      primary={"Aging"}
                    />
                  </ListItem>
                </NavLink>
                <NavLink
                  exact
                  to="/Analytics/AnalyticsAssetList"
                  className="drawer-class"
                  activeClassName="drawer-active-class"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <CodeIcon htmlColor="white" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.ListItemText}
                      primary={"Asset List"}
                    />
                  </ListItem>
                </NavLink>
                <NavLink
                  exact
                  to="/Analytics/AnalyticsMaintainece"
                  className="drawer-class"
                  activeClassName="drawer-active-class"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <CodeIcon htmlColor="white" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.ListItemText}
                      primary={"Maintainece"}
                    />
                  </ListItem>
                </NavLink>
                <NavLink
                  exact
                  to="/Analytics/AnalyticsAssetOwnership"
                  className="drawer-class"
                  activeClassName="drawer-active-class"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <CodeIcon htmlColor="white" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.ListItemText}
                      primary={"Asset Ownership"}
                    />
                  </ListItem>
                </NavLink>
                <NavLink
                  exact
                  to="/Analytics/AnalyticsMovementHistory"
                  className="drawer-class"
                  activeClassName="drawer-active-class"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <CodeIcon htmlColor="white" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.ListItemText}
                      primary={"Movement History"}
                    />
                  </ListItem>
                </NavLink>
                <NavLink
                  exact
                  to="/Analytics/AnalyticsHistory"
                  className="drawer-class"
                  activeClassName="drawer-active-class"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <CodeIcon htmlColor="white" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.ListItemText}
                      primary={"History"}
                    />
                  </ListItem>
                </NavLink>
                <NavLink
                  exact
                  to="/Analytics/AnalyticsZoneUtilization"
                  className="drawer-class"
                  activeClassName="drawer-active-class"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <CodeIcon htmlColor="white" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.ListItemText}
                      primary={"Zone Utilization"}
                    />
                  </ListItem>
                </NavLink>
              </List>
            </Collapse>
            {permissions.includes("Admin") ? (
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <SupervisorAccountIcon htmlColor="white" />
                </ListItemIcon>
                <ListItemText
                  className={classes.ListItemText}
                  primary={"Admin"}
                />
              </ListItem>
            ) : (
              ""
            )}
            <Collapse
              style={{ marginLeft: "3%" }}
              in={open}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {permissions.includes("Dashboard_Admin") ? (
                  <NavLink
                    exact
                    to="/Dashboard"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <DashboardIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Dashboard"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
                {permissions.includes("Users") ? (
                  <NavLink
                    to="/Users"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <PeopleIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Users"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
                {permissions.includes("Devices") ? (
                  <NavLink
                    to="/Devices"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <ImportantDevicesIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Devices"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
                {permissions.includes("Transfer Canelation") ? (
                  <NavLink
                    exact
                    to="/TransferCancelation"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <CallReceivedIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Transfer Cancelation"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
                {permissions.includes("Manual Receiving IBT") ? (
                  <NavLink
                    exact
                    to="/ManualIBT"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <StoreIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Manual Receiving IBT"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
                {permissions.includes("Stores") ? (
                  <NavLink
                    to="/StoreInformation"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <DeveloperModeIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Stores"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
                {permissions.includes("Printer") ? (
                  <NavLink
                    exact
                    to="/Printer"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <PrintIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Printers"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
                <NavLink
                  exact
                  to="/Location"
                  className="drawer-class"
                  activeClassName="drawer-active-class"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <PrintIcon htmlColor="white" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.ListItemText}
                      primary={"Location"}
                    />
                  </ListItem>
                </NavLink>
                {permissions.includes("ZPL") ? (
                  <NavLink
                    to="/ZPL"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <WebIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Zpl"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
                {permissions.includes("Audit") ? (
                  <NavLink
                    exact
                    to="/Audit"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <VerifiedUserIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Audit"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
                {permissions.includes("Admin") ? (
                  <NavLink
                    exact
                    to="/AdminMenu"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <SupervisorAccountIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Admin Menu"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
                {permissions.includes("Roles") ? (
                  <NavLink
                    to="/Roles"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <GroupAddIcon htmlColor="white" />
                      </ListItemIcon>

                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Roles"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
              </List>
            </Collapse>
            <ListItem button onClick={handleClick3}>
              <ListItemIcon>
                <LocalOfferIcon htmlColor="white" />
              </ListItemIcon>
              <ListItemText
                className={classes.ListItemText}
                primary={"Tag IT"}
              />
            </ListItem>
            <Collapse
              style={{ marginLeft: "3%" }}
              in={open3}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {permissions.includes("ZPL Printer") ? (
                  <NavLink
                    exact
                    to="/ZPLPrinter"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <CodeIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Zpl Printer"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}

                {permissions.includes("ZPL Report") ? (
                  <NavLink
                    exact
                    to="/ZPLReport"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <CodeIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Zpl Report"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
                {permissions.includes("ZPL Report") ? (
                  <NavLink
                    exact
                    to="/ZPLReportSKU"
                    className="drawer-class"
                    activeClassName="drawer-active-class"
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <CodeIcon htmlColor="white" />
                      </ListItemIcon>
                      <ListItemText
                        className={classes.ListItemText}
                        primary={"Zpl Report (Sku)"}
                      />
                    </ListItem>
                  </NavLink>
                ) : (
                  ""
                )}
              </List>
            </Collapse>

            <ListItem button onClick={handleClick4}>
              <ListItemIcon>
                <LocalOfferIcon htmlColor="white" />
              </ListItemIcon>
              <ListItemText
                className={classes.ListItemText}
                primary={"Reports"}
              />
            </ListItem>
            <Collapse
              style={{ marginLeft: "3%" }}
              in={open3}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <NavLink
                  exact
                  to="/Reports/FirstReport"
                  className="drawer-class"
                  activeClassName="drawer-active-class"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <CodeIcon htmlColor="white" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.ListItemText}
                      primary={"Associated Items (Report)"}
                    />
                  </ListItem>
                </NavLink>

                <NavLink
                  exact
                  to="/Reports/SecondReport"
                  className="drawer-class"
                  activeClassName="drawer-active-class"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <CodeIcon htmlColor="white" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.ListItemText}
                      primary={"Counted Assets (Report)"}
                    />
                  </ListItem>
                </NavLink>

                <NavLink
                  exact
                  to="/Reports/ThirdReport"
                  className="drawer-class"
                  activeClassName="drawer-active-class"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <CodeIcon htmlColor="white" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.ListItemText}
                      primary={"Table Report (Report)"}
                    />
                  </ListItem>
                </NavLink>

                <NavLink
                  exact
                  to="/Reports/FourthReport"
                  className="drawer-class"
                  activeClassName="drawer-active-class"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <CodeIcon htmlColor="white" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.ListItemText}
                      primary={"GF Exit Report"}
                    />
                  </ListItem>
                </NavLink>
                <NavLink
                  exact
                  to="/Reports/FifthReport"
                  className="drawer-class"
                  activeClassName="drawer-active-class"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <CodeIcon htmlColor="white" />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.ListItemText}
                      primary={"Item Master Report"}
                    />
                  </ListItem>
                </NavLink>
                {/* } */}
              </List>
            </Collapse>
          </div>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  user: state.createUser.user,
  login: state.createUser.login,
});

const mapDispatchToProps = (dispatch) => ({
  userLogin: (dt) => dispatch(userActions.userLogin(dt)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersistentDrawerLeft);
