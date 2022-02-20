import { Button, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import BasicTextFields from '../components/Input';
import '../css/Dashboard.css';
import api from '../services/api';
export class AddRole extends Component {
    state = {
        filterName: '',
        filterUsername: 'Store Manager',
        permissions: [],
        roleName: '',
        Role: {},
        Home: [
            {
                Item: 'Dashboard_Home',
                type: false
            }
        ],
        Admin: [
            {
                Item: 'Dashboard_Admin',
                type: false
            },
            {
                Item: 'Users',
                type: false
            },
            {
                Item: 'Devices',
                type: false
            },
            {
                Item: 'Transfer Canelation',
                type: false
            },
            {
                Item: 'Manual Receiving IBT',
                type: false
            },
            {
                Item: 'Stores',
                type: false
            },
            {
                Item: 'Printer',
                type: false
            },
            {
                Item: 'ZPL',
                type: false
            },
            {
                Item: 'Audit',
                type: false
            },
            {
                Item: 'IBT Difference',
                type: false
            },
            {
                Item: 'Roles',
                type: false
            },
        ],
        MobilePermission: [
            {
                Item: 'Manage Tags',
                type: false
            },
            {
                Item: 'Cycle Count',
                type: false
            },
            {
                Item: 'scanScan',
                type: false
            },
            {
                Item: 'TagId',
                type: false
            },
            {
                Item: 'FindIT',
                type: false
            },
            {
                Item: 'Locate Item',
                type: false
            },
            {
                Item: 'Workflow',
                type: false
            },
        ],
        Count: [
            {
                Item: 'Dashboard_Count',
                type: false
            },
            {
                Item: 'Operations',
                type: false
            },
            {
                Item: 'Operation 0',
                type: false
            },
            {
                Item: 'Inventory (EPC)',
                type: false
            },
            {
                Item: 'EPC Report',
                type: false
            },
        ],
        SupplyChain: [
            {
                Item: 'Dashboard_SupplyChain',
                type: false
            },
            {
                Item: 'ASN',
                type: false
            },
            {
                Item: 'GI Summary',
                type: false
            },
            {
                Item: 'IN-Store GI',
                type: false
            },
            {
                Item: 'Warehouse GI',
                type: false
            },
            {
                Item: 'Short IBT Details',
                type: false
            },
            {
                Item: 'Access IBT Details',
                type: false
            },
        ],
        Reports: [
            {
                Item: 'Associated_Items',
                type: false
            },
            {
                Item: 'Counted_Assets',
                type: false
            },
            {
                Item: 'Table_Report',
                type: false
            },
            {
                Item: 'GF_Report',
                type: false
            },
            {
                Item: 'Item_Report',
                type: false
            },
            {
                Item: 'remove_site',
                type: false
            },
            {
                Item: 'remove_zone',
                type: false
            },

        ],
        Dashboard: [
            {
                Item: 'Zone_Utilization',
                type: false
            },
            {
                Item: 'Transaction',
                type: false
            },
        ],
        Master: [
            {
                Item: 'Asset_Registry',
                type: false
            },

        ],
        Analytics: [
            {
                Item: 'AnalyticsAging',
                type: false
            },
            {
                Item: 'AnalyticsAssetList',
                type: false
            },
            {
                Item: 'AnalyticsMaintainece',
                type: false
            },
            {
                Item: 'AnalyticsAssetOwnership',
                type: false
            },
            {
                Item: 'AnalyticsMovementHistory',
                type: false
            },
            {
                Item: 'AnalyticsHistory',
                type: false
            },
            {
                Item: 'AnalyticsZoneUtilization',
                type: false
            },
            {
                Item: 'AnalyticsMovementReport',
                type: false
            },
        ],
        TagIT: [
            {
                Item: 'ZPL Printer',
                type: false
            },
            {
                Item: 'ZPL Printer (Sku)',
                type: false
            },
            {
                Item: 'ZPL Report',
                type: false
            },
        ],
        Extra: [
            {
                Item: 'Manual Receiving Asn',
                type: false
            },
            {
                Item: 'Handle_Cronjobs',
                type: false
            },
            {
                Item: 'Logs',
                type: false
            },
            {
                Item: `Retails Api's`,
                type: false
            },
            {
                Item: 'Soh Details',
                type: false
            },
            {
                Item: 'Product Item Master',
                type: false
            },
            {
                Item: 'Stock Summary Detail',
                type: false
            },
            {
                Item: 'Admin Menu',
                type: false
            },
            {
                Item: 'Admin Error Log',
                type: false
            },
            {
                Item: 'Problem ASN',
                type: false
            },
            {
                Item: 'Stock Summary Extras',
                type: false
            },
        ],
    }
    filterNameEvent = (e) => {
        this.setState({ filterName: e.target.value })
    }
    filterUsernameEvent = (e) => {
        this.setState({ roleName: e.target.value })
    }
    onSubmitEvent = (e) => {
        e.preventDefault()

        let NewRole = {
            permissions: this.state.permissions,
            role_name: this.state.roleName,
        }
        this.setState({ Role: NewRole })
        // console.log(dee);
        this.AddRole(NewRole)
    }
    async AddRole(role) {
        try {
            if (role.role_name === '') {
                return toast.error('Please Enter Role Name')
            } else if (role.permissions === []) {
                return toast.error('Please At least One Permission')
            } else {
                const roleAdded = await api.addRole(role)
                if (roleAdded) {
                    toast.success("Role Added")
                    setTimeout(() => {
                        window.location.href = "/Roles"
                    }, 500);
                }
            }
        } catch (err) {

            toast.error("Role Already exist")
        }
    }
    checkedVal = (e) => {
        if (this.state.permissions.includes(e.target.value)) {
            this.setState({
                permissions: this.state.permissions.filter(val => val !== e.target.value)
            })
        } else {
            this.setState({ permissions: [...this.state.permissions, e.target.value] })
        }
    }
    render() {

        console.log(this.state.permissions,);
        return (
            <React.Fragment>
                <div>
                    <div className="main-dashboard">
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">Add User Roles</h1>
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'flex-start', backgroundColor: 'transparent' }}>
                                <form onSubmit={(e) => this.onSubmitEvent(e)} >
                                    <div style={{ width: '80%', margin: 20, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap' }} onSubmit={this.onSubmitEvent} noValidate={false} autoComplete="off">
                                        <BasicTextFields name="Rolenames" value={this.state.roleName} onChangeEvent={(e) => this.filterUsernameEvent(e)} />
                                    </div>
                                    <div style={{ width: '80%', margin: 20, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap' }} onSubmit={this.onSubmitEvent} noValidate={false} autoComplete="off">
                                        <Typography align="center" className="white" variant="subtitle1" >User Permissions *</Typography>
                                        <FormControl component="fieldset">
                                            <FormGroup aria-label="position" row>
                                                <FormControlLabel
                                                    value="Home"
                                                    onChange={(e) => this.checkedVal(e)}
                                                    control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                    label="Home"
                                                    style={{ color: 'white' }}
                                                    labelPlacement="end"
                                                />
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                {this.state.Home.map((item =>
                                                    <FormControlLabel
                                                        value={item.Item}
                                                        control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                        label={item.Item}
                                                        onChange={(e) => this.checkedVal(e)}
                                                        style={{ color: 'white', marginLeft: '4%', width: 250 }}
                                                        labelPlacement="end"
                                                    />))}
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                <FormControlLabel
                                                    value="Admin"
                                                    control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                    label="Admin"
                                                    onChange={(e) => this.checkedVal(e)}
                                                    style={{ color: 'white' }}
                                                    labelPlacement="end"
                                                />
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                {this.state.Admin.map((item =>
                                                    <FormControlLabel
                                                        value={item.Item}
                                                        control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                        label={item.Item}
                                                        onChange={(e) => this.checkedVal(e)}
                                                        style={{ color: 'white', marginLeft: '4%', width: 250 }}
                                                        labelPlacement="end"
                                                    />))}
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                <FormControlLabel
                                                    value="Count"
                                                    onChange={(e) => this.checkedVal(e)}
                                                    control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                    label="Count"
                                                    style={{ color: 'white' }}
                                                    labelPlacement="end"
                                                />
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                {this.state.Count.map((item =>
                                                    <FormControlLabel
                                                        value={item.Item}
                                                        onChange={(e) => this.checkedVal(e)}
                                                        control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                        label={item.Item}
                                                        style={{ color: 'white', marginLeft: '4%', width: 250 }}
                                                        labelPlacement="end"
                                                    />))}
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                <FormControlLabel
                                                    value="Supply Chain"
                                                    control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                    label="Supply Chain"
                                                    onChange={(e) => this.checkedVal(e)}
                                                    style={{ color: 'white' }}
                                                    labelPlacement="end"
                                                />
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                {this.state.SupplyChain.map((item =>
                                                    <FormControlLabel
                                                        value={item.Item}
                                                        control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                        label={item.Item}
                                                        style={{ color: 'white', marginLeft: '4%', width: 250 }}
                                                        labelPlacement="end"
                                                        onChange={(e) => this.checkedVal(e)}
                                                    />))}
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                <FormControlLabel
                                                    value="Dashboard"
                                                    control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                    label="Dashboard"
                                                    onChange={(e) => this.checkedVal(e)}
                                                    style={{ color: 'white' }}
                                                    labelPlacement="end"
                                                />
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                {this.state.Dashboard.map((item =>
                                                    <FormControlLabel
                                                        value={item.Item}
                                                        control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                        label={item.Item}
                                                        style={{ color: 'white', marginLeft: '4%', width: 250 }}
                                                        labelPlacement="end"
                                                        onChange={(e) => this.checkedVal(e)}
                                                    />))}
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                <FormControlLabel
                                                    value="Tag IT"
                                                    control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                    label="Tag IT"
                                                    style={{ color: 'white' }}
                                                    onChange={(e) => this.checkedVal(e)}
                                                    labelPlacement="end"
                                                />
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                {this.state.TagIT.map((item =>
                                                    <FormControlLabel
                                                        value={item.Item}
                                                        control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                        label={item.Item}
                                                        style={{ color: 'white', marginLeft: '4%', width: 250 }}
                                                        labelPlacement="end"
                                                        onChange={(e) => this.checkedVal(e)}
                                                    />))}
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                <FormControlLabel
                                                    value="Extras"
                                                    control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                    label="Extras"
                                                    style={{ color: 'white' }}
                                                    labelPlacement="end"
                                                    onChange={(e) => this.checkedVal(e)}
                                                />
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                {this.state.Extra.map((item =>
                                                    <FormControlLabel
                                                        value={item.Item}
                                                        control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                        label={item.Item}
                                                        style={{ color: 'white', marginLeft: '4%', width: 250 }}
                                                        labelPlacement="end"
                                                        onChange={(e) => this.checkedVal(e)}
                                                    />))}
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                <FormControlLabel
                                                    value="Map_Report"
                                                    control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                    label="Map_Report"
                                                    style={{ color: 'white' }}
                                                    labelPlacement="end"
                                                    onChange={(e) => this.checkedVal(e)}
                                                />
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                <FormControlLabel
                                                    value="Reports"
                                                    control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                    label="Reports"
                                                    style={{ color: 'white' }}
                                                    labelPlacement="end"
                                                    onChange={(e) => this.checkedVal(e)}
                                                />
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                {this.state.Reports.map((item =>
                                                    <FormControlLabel
                                                        value={item.Item}
                                                        control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                        label={item.Item}
                                                        style={{ color: 'white', marginLeft: '4%', width: 250 }}
                                                        labelPlacement="end"
                                                        onChange={(e) => this.checkedVal(e)}
                                                    />))}
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                <FormControlLabel
                                                    value="Master"
                                                    control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                    label="Master"
                                                    style={{ color: 'white' }}
                                                    labelPlacement="end"
                                                    onChange={(e) => this.checkedVal(e)}
                                                />
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                {this.state.Master.map((item =>
                                                    <FormControlLabel
                                                        value={item.Item}
                                                        control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                        label={item.Item}
                                                        style={{ color: 'white', marginLeft: '4%', width: 250 }}
                                                        labelPlacement="end"
                                                        onChange={(e) => this.checkedVal(e)}
                                                    />))}
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                <FormControlLabel
                                                    value="Analytics"
                                                    control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                    label="Analytics"
                                                    style={{ color: 'white' }}
                                                    labelPlacement="end"
                                                    onChange={(e) => this.checkedVal(e)}
                                                />
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                {this.state.Analytics.map((item =>
                                                    <FormControlLabel
                                                        value={item.Item}
                                                        control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                        label={item.Item}
                                                        style={{ color: 'white', marginLeft: '4%', width: 250 }}
                                                        labelPlacement="end"
                                                        onChange={(e) => this.checkedVal(e)}
                                                    />))}
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                <Typography align="center" className="white" variant="subtitle1" >Mobile Permissions *</Typography>
                                            </FormGroup>
                                            <FormGroup aria-label="position" row>
                                                {this.state.MobilePermission.map((item =>
                                                    <FormControlLabel
                                                        value={item.Item}
                                                        control={<Checkbox style={{ color: 'white' }} color="white" />}
                                                        label={item.Item}
                                                        style={{ color: 'white', marginLeft: '4%', width: 250 }}
                                                        labelPlacement="end"
                                                        onChange={(e) => this.checkedVal(e)}
                                                    />))}
                                            </FormGroup>
                                        </FormControl>
                                    </div>
                                    <div style={{ width: '80%', margin: 20, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap' }} onSubmit={this.onSubmitEvent} noValidate={false} autoComplete="off">
                                        <Button onClick={(e) => this.checkedVal(e)} type="submit" variant="contained">Add Role</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default AddRole
