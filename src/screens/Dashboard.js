import DashboardIcon from '@material-ui/icons/Dashboard';
import React, { Component } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import ActivityCard from '../components/ActivityCard';
import Card from '../components/Card';
import '../css/Dashboard.css';
import api from '../services/api';
export class Dashboard extends Component {
    state = {
        Users: [],
        Site: [],
        HandHeld: [],
        count: 0,
        Unders: 0,
        uncount: 0,
        loading: true,
        AssetsBySoh: [],
    }
    async componentDidMount() {
        const Users = await api.getAllUsers()
        this.setState({ Users })
        console.log(Users);
        const Site = await api.getAllSite()
        this.setState({ Site })
        console.log(Site);
        const HandHeld = await api.getHandHeld()
        this.setState({ HandHeld })
        console.log(HandHeld);
        if (Users && Site && HandHeld) {
            this.setState({ loading: false })
        }
        const CountedItems = await api.getCountedItems()
        await this.setState({ CountedItems })
        const AssetsBySoh = await api.getAssetsBySoh()
        await this.setState({ AssetsBySoh })
        // console.log(AssetsBySoh, 'AssetsBySoh');
        // console.log(CountedItems, 'CountedItems');
        let re = this.state?.CountedItems?.filter(o1 => this.state?.AssetsBySoh?.some(o2 => o1?.asset_EPC === o2?.asset_EPC));
        this.setState({ count: re?.length })
        this.setState({ uncount: this.state.CountedItems?.length - this.state.count })
        let Unders = re?.filter(o1 => this.state.AssetsBySoh?.some(o2 => o1?.asset_EPC === o2?.asset_EPC));
        this.setState({ Unders })
        console.log(re, 'Counted');
        console.log(this.state.chartData, 'Chart Data');
    }
    resultInPercentage(value1, value2) {
        let result = Math.round((value1 / value2) * 100)
        return result
    }
    render() {
        // console.log(this.state.Users, "dasdfasdf");
        return (
            <React.Fragment>
                <div>
                    <div className="main-dashboard">
                        {
                            this.state.loading ? <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', width: '100%', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', height: '100%', backgroundColor: 'rgba(28, 28, 28, 0.6)', zIndex: 10, top: 0, left: 0 }}>
                                <ClipLoader color={'white'} loading={this.state.loading} size={100} />
                            </div> : null
                        }
                        <div className="dashboard">
                            <div className="dashboard-header">
                                <DashboardIcon htmlColor="black" className=" ml-4 mr-4" />
                                <h1 className="dashboard-heading">Dashboard</h1>
                            </div>
                            <div className="dashboard-first-col">
                                <Card mainText="Total Sites" number={this.state.Site.length} />
                                <Card mainText="Total Users" number={this.state.Users.length} />
                                <Card mainText="Total Devices" number={this.state.HandHeld.length} />
                            </div>
                            <div className="dashboard-first-col" style={{ height: 'max-content' }}>
                                <ActivityCard
                                    activity
                                    flex="2"
                                    inputVal="2021-08-19 15:08:20 -- admin -- Login successfully-- logType -- login

                                    2021-08-18 17:47:48 -- admin -- Login successfully-- logType -- login
                                    
                                    2021-08-18 15:39:25 -- admin -- Login successfully-- logType -- login
                                    
                                    2021-08-16 16:56:38 -- CycleCount Job run successfully for store 0002171 CycleCount total Record inserted 5280-- CycleCount Job run successfully for store 0002171 CycleCount total Record inserted 5280-- logType -- CycleCount-- StoreID -- 0002171
                                    
                                    2021-08-16 16:56:32 -- CycleCount job running for store 0002171-- CycleCount job running for store 0002171-- logType -- CycleCount-- StoreID -- 0002171-- retail_cycleCount_id -- run from soh details report
                                    
                                    2021-08-16 15:55:04 -- admin -- Login successfully-- CycleCount job running for store 0002171-- logType -- login-- StoreID -- 0002171-- retail_cycleCount_id -- run from soh details report
                                    
                                    2021-08-16 15:05:50 -- admin -- Login successfully-- CycleCount job running for store 0002171-- logType -- login-- StoreID -- 0002171-- retail_cycleCount_id -- run from soh details report
                                    
                                    2021-08-13 04:27:17 -- StockSummary Dump Job Run Successfully for Store 0002168 Total items inserted 569 in store 0002168-- StockSummary Dump Job Run Successfully for Store 0002168 Total items inserted 569 in store 0002168-- logType -- StockSummaryDump-- StoreID -- 0002168-- retail_cycleCount_id -- 0002168
                                    
                                    2021-08-13 04:26:35 -- StockSummary Dump Job Run Successfully for Store 0002166 Total items inserted 840 in store 0002166-- StockSummary Dump Job Run Successfully for Store 0002166 Total items inserted 840 in store 0002166-- logType -- StockSummaryDump-- StoreID -- 0002166-- retail_cycleCount_id -- 0002166
                                    
                                    2021-08-13 04:25:58 -- StockSummary Dump Job Run Successfully for Store 0002162 Total items inserted 809 in store 0002162-- StockSummary Dump Job Run Successfully for Store 0002162 Total items inserted 809 in store 0002162-- logType -- StockSummaryDump-- StoreID -- 0002162-- retail_cycleCount_id -- 0002162"
                                    mainText="Activities"
                                />
                                <ActivityCard
                                    flex="1"
                                    mainText="Last Scan"
                                    matching={this.resultInPercentage(this.state.count, this.state.AssetsBySoh.length) + "%"}
                                    overs={this.state.uncount}
                                    unders={`${this.resultInPercentage(this.state.Unders.length, this.state.AssetsBySoh.length) + "%"}`}
                                    stockOnHand={"80%"}
                                    backStore={"10"}
                                    count={this.state.count}
                                    salesFloor={"20"}
                                    selectStore
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Dashboard
