import React from 'react';
import './App.css';
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import PersistentDrawerLeft from './components/drawer'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard';
import Footer from './components/Footer';
import Users from './screens/Users';
import EditUser from './screens/EditUser';
import Devices from './screens/Devices';
import EditDevice from './screens/EditDevice';
import IBTDetail from './screens/IBTDetail'
import AdminMenu from './screens/AdminMenu'
import userActions from "./Store/actions/userActions";
// import TransferCancelationTable from './components/TransferCancelationTable';
import TransferCancelation from './screens/TransferCancelation';
import ManualIBT from './screens/ManualIBT';
import StoreInformation from './screens/StoreInformation';
import createSite from "./Store/actions/siteActions";
import EditStoreInformation from './screens/EditStoreInformation';
import Printer from './screens/Printer';
import ZPL from './screens/ZPL';
import EditZPL from './screens/EditZPL';
import Audit from './screens/Audit';
import Roles from './screens/Roles';
import EditRoles from './screens/EditRoles';
import CountDashboard from './screens/CountDashboard';
import CountInventory from './screens/CountInventory';
import CountOperation from './screens/CountOperation'
import SupplyChainIBTData from './screens/SupplyChainIBTData';
import SupplyChainGoodSummary from './screens/SupplyChainGoodSummary';
import SupplyChainStoreSummary from './screens/SupplyChainStoreSummary';
import SupplyChainWarehouseSummary from './screens/SupplyChainWarehouseSummary';
import ZPLReport from './screens/ZPLReport';
import ZPLReportSKU from './screens/ZPLReportSKU';
import ZPLPrinter from './screens/ZPLPrinter';
import MapView from './components/mapReport/mapView';
import ScrollableTabsButtonForce from './components/TopDrawer';
import { ToastContainer } from 'react-toastify';
import AddRole from './screens/AddRole';
import AddUser from './screens/AddUser';
import AddDevice from './screens/AddDevice';
import PrivateRoute from './PrivateRoute'
// import MiniDrawer from './components/SideDrawer'
import { connect } from 'react-redux';
import BatchDetail from './screens/BatchDetail';
import EPCDetail from './screens/EPCDetail';
import AnalyticsAssetList from './screens/AnalyticsAssetList';
import SupplyChainIBTDataPacking from './screens/SupplyChainIBTDataPacking';
import SupplyChainIBTDataDispatch from './screens/SupplyChainIBTDataDispatch';
import AnalyticsMaintainece from './screens/AnalyticsMaintainece';
import AnalyticsMovementHistory from './screens/AnalyticsMovementHistory';
import EPCDetailMovement from './screens/EPCDetailMovement';
import AnalyticsMovementReport from './screens/AnalyticsMovementReport';
import ASNDetailByMovement from './screens/ASNDetailByMovement';
import MapSidebar from './components/MapSidebar';
import { withRouter } from 'react-router-dom'
import FirstReport from './screens/FirstReport';
import SecondReport from './screens/SecondReport';
import ThirdReport from './screens/ThirdReport';
import FourthReport from './screens/FourthReport';
import FifthReport from './screens/FifthReport';
import userImage from './assets/user.jpg';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import itemMasterUpload from './screens/ItemMasterUpload';
import CountedItems from './screens/CountedItems';
import ItemMasterReport from './screens/ItemMasterReport';
import DiscrepancyReport from './screens/DiscrepancyReport';
import StockOnHand from './screens/StockOnHand';
import AssociatedReport from './screens/AssociatedReport';
import ReTaggingReport from './screens/ReTaggingReport';
import SupplyChainIBTDataDispatchCancel from './screens/SupplyChainIBTDataDispatchCancel';
import AddSite from './screens/AddSite';
import storage from './components/config';


import AddZone from './screens/AddZone';
import AddDepartment from './screens/AddDepartment';
// const firebaseConfig = {
//   apiKey: "AIzaSyCLkmYcYbayPOEIqPzPwCdddg3vYFVNzIw",
//   authDomain: "innoasset-ebfc6.firebaseapp.com",
//   projectId: "innoasset-ebfc6",
//   storageBucket: "innoasset-ebfc6.appspot.com",
//   messagingSenderId: "1063269039178",
//   appId: "1:1063269039178:web:d56ba324b81e31e4313ab3",
//   measurementId: "G-6J34HX3501"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const firebaseApp = initializeApp(firebaseConfig);
// // Get a reference to the storage service, which is used to create references in your storage bucket
// const storage = getStorage(firebaseApp);
// const pathReference = ref(storage, '/profilePics/000000000000000000002038.Jpeg');
// const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/b/bucket/o/profilePics/000000000000000000002038.Jpeg');
class App extends React.Component {
  state = {
    open: true,
    location1: ''
  }
  handleDrawerOpen = () => {
    this.setState({ open: true })
  }
  handleDrawerClose = () => {
    this.setState({ open: false })
  }
  componentDidMount() {

    this.props.createSite({ modal: false })
    if (window.location.href.split('/').reverse()[0] === "MapReport") {
      this.setState({ location1: '/MapReport' })
    }
    // console.log(this.imageFunction());
    // console.log(getBlob(ref: storage));
  }
  // getImage(image) {
  //   storage.ref(`/profilePics/2F000000000000000000002038.Jpeg`).getDownloadURL().then((url) => {
  //     return url
  //   })
  // }

  
  logout = () => {
    localStorage.clear();
    this.props.userLogin({ user: {}, login: false });
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };
  render() {
    const permissions = this.props.user?.roleId?.permissions
    console.log(this.props.user?.roleId?.permissions, 'APP.JS');
    this.props.history.listen((location, action) => {

      this.setState({ location1: location.pathname })
    })


    return (
      <React.Fragment>
        <ToastContainer className="toastify-custom-class" />
        <Switch >
          <Route path={"/login"} exact component={Login} />
          <div style={{ display: "flex", justifyContent: 'flex-start', width: '100%' }} >
            {/* {this.state.location1 !== '/MapReport' ?
              <div className="App" style={{ width: '12%', backgroundColor: 'transparent' }}>
                <PersistentDrawerLeft permissions={this.props.user} handleDrawerOpen={this.handleDrawerOpen} handleDrawerClose={this.handleDrawerClose} open={this.state.open} />
              </div> : ""} */}
            <div style={{ paddingBottom: 80, width: '80%', flex: 1 }}>
              <ScrollableTabsButtonForce />
              <PrivateRoute component={Dashboard} path="/Dashboard" exact />
              <PrivateRoute component={Dashboard} path="/" exact />
              <PrivateRoute path={"/Count/CountDashboard"} exact component={CountDashboard} />
              <PrivateRoute path={"/Count/CountInventory"} exact component={CountInventory} />
              <PrivateRoute path={"/Count/CountOperation"} exact component={CountOperation} />
              {permissions?.includes("Supply Chain") ?
                <React.Fragment>
                  <PrivateRoute path={"/SupplyChain/SupplyChainIBTData"} exact component={SupplyChainIBTData} />
                  <PrivateRoute path={"/SupplyChain/SupplyChainIBTDataPacking"} exact component={SupplyChainIBTDataPacking} />
                  <PrivateRoute path={"/SupplyChain/SupplyChainIBTDataDispatch"} exact component={SupplyChainIBTDataDispatch} />
                  <PrivateRoute path={"/SupplyChain/SupplyChainIBTDataDispatchCancel"} exact component={SupplyChainIBTDataDispatchCancel} />
                  <PrivateRoute path={"/SupplyChain/SupplyChainGoodSummary"} exact component={SupplyChainGoodSummary} />
                  <PrivateRoute path={"/SupplyChain/SupplyChainStoreSummary"} exact component={SupplyChainStoreSummary} />
                  <PrivateRoute path={"/SupplyChain/SupplyChainWarehouseSummary"} exact component={SupplyChainWarehouseSummary} />
                </React.Fragment>
                : ""}

              <React.Fragment>
                <PrivateRoute path={"/ZPL/ZPLReport"} exact component={ZPLReport} />
                <PrivateRoute path={"/ZPL/ZPLReportSKU"} exact component={ZPLReportSKU} />
                <PrivateRoute path={"/ZPL/ZPLPrinter"} exact component={ZPLPrinter} />
              </React.Fragment>
              {permissions?.includes("Map_Report") ?
                <PrivateRoute data={this.props} path={"/MapReport"} exact component={MapView} />
                : ""}
              {permissions?.includes("Dashboard_Admin") ?
                <React.Fragment>
                  <PrivateRoute path={"/Users"} exact component={Users} />
                  <PrivateRoute path={"/Users/EditUser"} exact component={EditUser} />
                  <PrivateRoute path={"/Devices/EditDevice"} exact component={EditDevice} />
                  <PrivateRoute path={"/Devices"} exact component={Devices} />
                  <PrivateRoute path={"/TransferCancelation"} exact component={TransferCancelation} />
                  <PrivateRoute path={"/IBTDetail"} exact component={IBTDetail} />
                  <PrivateRoute path={"/EPCDetail"} exact component={EPCDetail} />
                  <PrivateRoute path={"/EPCDetailMovement"} exact component={EPCDetailMovement} />
                  <PrivateRoute path={"/BatchDetail"} exact component={BatchDetail} />
                  <PrivateRoute path={"/ManualIBT"} exact component={ManualIBT} />
                  <PrivateRoute path={"/AdminMenu"} exact component={AdminMenu} />
                  <PrivateRoute path={"/StoreInformation"} exact component={StoreInformation} />
                  <PrivateRoute path={"/StoreInformation/EditStoreInformation"} exact component={EditStoreInformation} />
                  <PrivateRoute path={"/Printer"} exact component={Printer} />
                  <PrivateRoute path={"/ZPL"} exact component={ZPL} />
                  <PrivateRoute path={"/ZPL/EditZPL"} exact component={EditZPL} />
                  <PrivateRoute path={"/Audit"} exact component={Audit} />
                  <PrivateRoute path={"/Roles"} exact component={Roles} />
                  <PrivateRoute path={"/Roles/EditRoles"} exact component={EditRoles} />
                  <PrivateRoute path={"/Roles/AddRole"} exact component={AddRole} />
                  <PrivateRoute path={"/User/AddUser"} exact component={AddUser} />
                  <PrivateRoute path={"/Site/AddSite"} exact component={AddSite} />
                  <PrivateRoute path={"/Zone/AddZone"} exact component={AddZone} />
                  <PrivateRoute path={"/Department/AddDepartment"} exact component={AddDepartment} />
                  <PrivateRoute path={"/Devices/AddDevice"} exact component={AddDevice} />
                </React.Fragment>
                : ""}
              {permissions?.includes("Analytics") ?
                <React.Fragment>
                  <PrivateRoute path={"/Analytics/AnalyticsAssetList"} exact component={AnalyticsAssetList} />
                  <PrivateRoute path={"/Analytics/AnalyticsMaintainece"} exact component={AnalyticsMaintainece} />
                  <PrivateRoute path={"/Analytics/AnalyticsMovementHistory"} exact component={AnalyticsMovementHistory} />
                  <PrivateRoute path={"/Analytics/AnalyticsMovementReport"} exact component={AnalyticsMovementReport} />
                  <PrivateRoute path={"/Analytics/ASNDetailByMovement"} exact component={ASNDetailByMovement} />
                </React.Fragment>
                : ""}
              {permissions?.includes("Associated_Items") ?
                <PrivateRoute path={"/Reports/FirstReport"} exact component={FirstReport} />
                : null
              }
              {permissions?.includes("Associated_Items") ?
                <PrivateRoute path={"/Reports/AssociatedReport"} exact component={AssociatedReport} />
                : null
              }
              {permissions?.includes("Associated_Items") ?
                <PrivateRoute path={"/Reports/ReTaggingReport"} exact component={ReTaggingReport} />
                : null
              }
              {permissions?.includes("Associated_Items") ?
                <PrivateRoute path={"/Reports/StockOnHand"} exact component={StockOnHand} />
                : null
              }
              {permissions?.includes("Counted_Assets") ?
                <PrivateRoute path={"/Reports/SecondReport"} exact component={SecondReport} />
                : null
              }
              {permissions?.includes("Table_Report") ?
                <PrivateRoute path={"/Reports/ThirdReport"} exact component={ThirdReport} />
                : null
              }
              {permissions?.includes("Table_Report") ?
                <PrivateRoute path={"/Reports/FourthReport"} exact component={FourthReport} />
                : null
              }
              {/* {permissions?.includes("Table_Report") ? */}
                <PrivateRoute path={"/Reports/ItemMasterUpload"} exact component={itemMasterUpload} />
                {/* : null
              } */}
              {permissions?.includes("Table_Report") ?
                <PrivateRoute path={"/Reports/CountedItemReport"} exact component={CountedItems} />
                : null
              }
              {permissions?.includes("Table_Report") ?
                <PrivateRoute path={"/Reports/DiscrepancyReport"} exact component={DiscrepancyReport} />
                : null
              }
              {permissions?.includes("Table_Report") ?
                <PrivateRoute path={"/Reports/ItemMasterReport"} exact component={ItemMasterReport} />
                : null
              }
              {permissions?.includes("Table_Report") ?
                <PrivateRoute path={"/Reports/FifthReport"} exact component={FifthReport} />
                : null
              }
              <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', background: 'black', height: 60, display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 300, justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                  <img src={userImage} alt="userImage" style={{ objectFit: 'contain', marginLeft: 10 }} width='35px' height='35px' />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginLeft: 10 }}>
                    <h1 style={{ fontSize: 14 }}>root user :</h1>
                    <h1 style={{ fontSize: 14 }}>{this.props?.user?.userName}</h1>
                  </div>
                  <PowerSettingsNewIcon onClick={() => this.logout()} htmlColor='white' style={{ width: 25, height: 25, objectFit: 'contain', marginLeft: '30%', cursor: 'pointer' }} />
                </div>
              </div>
              {/* <Footer /> */}
            </div>
          </div>

        </Switch>
      </React.Fragment>
    );
  }
}
// export default App;
const mapStateToProps = (state) => ({
  user: state.createUser.user,
  login: state.createUser.login,
  modal: state.createSite.modal
});
const mapDispatchToProps = (dispatch) => ({
  createSite: (dt) => dispatch(createSite.createSite(dt)),
  userLogin: (dt) => dispatch(userActions.userLogin(dt)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
