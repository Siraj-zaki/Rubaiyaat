import DashboardIcon from '@material-ui/icons/Dashboard';
import React, { Component } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import ActivityCard from '../components/ActivityCard';
import Card from '../components/Card';
import Chart from '../components/Chart';
import '../css/Dashboard.css';
import api from '../services/api';
export class CountDashboard extends Component {
    state = {
        IBT: "",
        CountedItems: [],
        AssetsBySoh: [],
        count: 0,
        uncount: 0,
        Unders: 0,
        loading: true,
    }
    async componentDidMount() {
        const CountedItems = await api.getCountedItems()
        await this.setState({ CountedItems })
        const AssetsBySoh = await api.getAssetsBySoh()
        await this.setState({ AssetsBySoh })

        // console.log(AssetsBySoh, 'AssetsBySoh');
        // console.log(CountedItems, 'CountedItems');
        let re = this.state.CountedItems.filter(o1 => this.state.AssetsBySoh.some(o2 => o1.asset_EPC === o2.asset_EPC));
        this.setState({ count: re.length })
        this.setState({ uncount: this.state.CountedItems.length - this.state.count })
        console.log(re, 'Counted');
        console.log(this.state.chartData, 'Chart Data');
        let Unders = re.filter(o1 => this.state.AssetsBySoh.some(o2 => o1.asset_EPC === o2.asset_EPC));
        this.setState({ Unders })
        if (CountedItems) {
            this.setState({ loading: false })
        }
    }
    resultInPercentage(value1, value2) {
        let result = Math.round((value1 / value2) * 100)
        return result
    }
    filterNameEvent = (e) => {
        this.setState({ filterName: e.target.value })
    }
    filterUsernameEvent = (e) => {
        this.setState({ filterUsername: e.target.value })
    }
    onSubmitEvent = () => {
        console.log("User")
    }
    handleChangeStatus = (e) => {
        this.setState({ store: e })
    }
    render() {
        const stores = [
            { label: 'All Stores' },
            { label: 'New Stores' },
            { label: 'Old Stores' },
        ];
        const customStyles = {
            control: (base, state) => ({
                ...base,
                height: 33,
                marginTop: 10,
                backgroundColor: 'transparent',
            }),
            menu: base => ({
                ...base,
                zIndex: 30
            }),
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition, color: "white" };
            },
        };

        return (
            <React.Fragment>
                <div>
                    <div className="main-dashboard">
                        {
                            this.state.loading ? <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', width: '100%', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', height: '100%', backgroundColor: 'rgba(28, 28, 28, 0.6)', top: 0, left: 0 }}>
                                <ClipLoader color={'white'} loading={this.state.loading} size={100} />
                            </div> : null
                        }
                        <div className="dashboard">
                            <div className="dashboard-header">
                                <DashboardIcon htmlColor="black" className=" ml-4 mr-4" />
                                <h1 className="dashboard-heading">Dashboard</h1>
                            </div>
                            {/* <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'transparent' }}>
                                <form style={{ width: '30%', margin: 20, display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-end', flexWrap: 'wrap', flexDirection: 'column' }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">
                                    <Select
                                        value={"Val"}
                                        isSearchable={true}
                                        placeholder={"All Stores"}
                                        className="last-scan-select-2"
                                        styles={customStyles}
                                    />  
                                    <Select
                                        value={"Val"}
                                        isSearchable={true}
                                        placeholder={"Department"}
                                        className="last-scan-select-2"
                                        styles={customStyles}
                                    />
                                    <Select
                                        value={"Val"}
                                        isSearchable={true}
                                        placeholder={"Brand"}
                                        className="last-scan-select-2"
                                        styles={customStyles}
                                    />
                                </form>
                                <form style={{ width: '30%', margin: 20, display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: 'column' }} onSubmit={(e) => this.onSubmitEvent(e)} noValidate={false} autoComplete="off">
                                    <Select
                                        value={"Val"}
                                        isSearchable={true}
                                        placeholder={"Color"}
                                        className="last-scan-select-2"
                                        styles={customStyles}
                                    />
                                    <Select
                                        value={"Val"}
                                        isSearchable={true}
                                        placeholder={"Size"}
                                        className="last-scan-select-2"
                                        styles={customStyles}
                                    />
                                    <BasicTextFields margin={10} name="Date" value={this.state.date} onChangeEvent={(e) => this.setState({ date: e.target.value })} placeholder={"dd-mm-yyyy"} />
                                </form>
                            </div>
                            <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between', alignSelf: 'flex-end', margin: '10px' }}>
                                <Button type="submit" variant="contained">Run</Button>
                            </div> */}
                            <div className="dashboard-first-col">
                                <Card flex={1} height={167} mainText="Total Tagged" number={this.state.CountedItems.length} />
                                <Card flex={1} height={167} mainText="Item-Count Accuracy" number={this.resultInPercentage(this.state.count, this.state.AssetsBySoh.length) + "%"} />
                                {/* <ActivityCard
                                    flex="0.5"
                                    mainText="Tagged By Category"
                                    color={'#28a745'}
                                    smallText={`Count ${"40%"}`}
                                    count={`Percentage ${"70%"}`}
                                /> */}
                                <ActivityCard
                                    flex="0.5"
                                    mainText="Unders"
                                    color={'#dc3545'}
                                    smallText={`Count ${this.state.Unders.length}`}
                                    count={`Percentage ${this.resultInPercentage(this.state.Unders.length, this.state.AssetsBySoh.length) + "%"}`}
                                />
                            </div>
                            <div className="dashboard-first-col">
                                <div style={{ width: '77%', minHeight: '300px' }}>
                                    <Chart chartData={this.state.chartData} location="Massachusetts" legendPosition="bottom" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Card flex={1} height={167} mainText="Extras" number={this.state.uncount} />
                                    <Card flex={1} height={167} mainText="Count" number={this.state.count} />
                                </div>
                                {/* <Card flex={1} height={167} mainText="Front" number={this.state.AssetsBySoh.length} /> */}
                                {/* <Card flex={1} height={167} mainText="Back Store" number={"35"} /> */}
                            </div>


                            {/* <div className="dashboard-first-col">
                                <ActivityCard
                                    flex="0.5"
                                    mainText="On Hand Matching"
                                    smallText={`Count ${"40%"}`}
                                    count={`Percentage ${"70%"}`}
                                />


                                <ActivityCard
                                    flex="0.5"
                                    mainText="Overs"
                                    color={"#28a745"}
                                    smallText={`Count ${this.state.uncount}`}
                                    count={`Percentage ${this.resultInPercentage(this.state.uncount, this.state.AssetsBySoh.length) + "%"}`}
                                />
                                <ActivityCard
                                    flex="0.5"
                                    mainText="Critical Out Of Stock"
                                    color={'#dc3545'}
                                    smallText={`Count ${"40%"}`}
                                    count={`Percentage ${"70%"}`}
                                    height={40}
                                />

                            </div> */}
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default CountDashboard