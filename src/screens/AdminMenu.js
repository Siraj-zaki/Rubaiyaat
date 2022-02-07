import { Button } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/Dashboard.css';
export class AdminMenu extends Component {
    state = {
        filterName: '',
        filterUsername: '',
        store: "All Stores",
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
        const permissions = this.props.user.roleId ? this.props.user.roleId.permissions : []
        console.log(permissions);
        return (
            <React.Fragment>
                <div>
                    <div className="main-dashboard">
                        <div className="dashboard ">
                            <div className="dashboard-header">
                                <PeopleIcon htmlColor="black" className="ml-4 mr-4" />
                                <h1 className="dashboard-heading">Admin Menu</h1>
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', flexWrap: 'wrap' }}>
                                    {permissions.includes('Handle_Cronjobs')
                                        ?
                                        <Button className="m-4 w-25" type="submit" variant="contained" style={{ minWidth: 280 }}>Handle Cron Job</Button>
                                        :
                                        ""
                                    }
                                    {permissions.includes('Soh Details')
                                        ?
                                        <Button className="m-4 w-25" type="submit" color="primary" style={{ minWidth: 280 }} variant="contained">Soh Handle</Button>
                                        :
                                        ""
                                    }
                                    {permissions.includes('Notification')
                                        ?
                                        <Button className="m-4 w-25" type="submit" color="secondary" style={{ minWidth: 280 }} variant="contained">Notification</Button>
                                        :
                                        ""
                                    }
                                    {permissions.includes('Logs')
                                        ?
                                        <Button className="m-4 w-25" type="submit" style={{ backgroundColor: "#455a64", color: 'whitesmoke', minWidth: 280 }} variant="contained">Error Log</Button>
                                        :
                                        ""
                                    }
                                    {permissions.includes('Problem ASN')
                                        ?
                                        <Button className="m-4 w-25" type="submit" style={{ backgroundColor: "#ff7043", color: 'whitesmoke', minWidth: 280 }} variant="contained">Problem Asn</Button>
                                        :
                                        ""
                                    }
                                    {permissions.includes('Stock Summary Extras')
                                        ?
                                        <Button className="m-4 w-25" type="submit" style={{ backgroundColor: "#00e676", color: 'whitesmoke', minWidth: 280 }} variant="contained">Stock Summary Extra</Button>
                                        :
                                        ""
                                    }
                                    {permissions.includes('Handle_Cronjobs')
                                        ?
                                        <Button className="m-4 w-25" type="submit" style={{ backgroundColor: "#fbc02d", color: 'whitesmoke', minWidth: 280 }} variant="contained">Run Cron Job</Button>
                                        :
                                        ""
                                    }



                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

// export default AdminMenu
const mapStateToProps = (state) => ({
    user: state.createUser.user,
    login: state.createUser.login,
});


export default connect(mapStateToProps)(AdminMenu)
