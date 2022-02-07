import { Button, IconButton } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import PeopleIcon from "@material-ui/icons/People";
import React, { Component } from "react";
import Select from "react-select";
import ClipLoader from "react-spinners/ClipLoader";
import Logo from "../assets/logo.png";
import CustomModal from "../components/CustomModal";
import BasicTextFields from "../components/Input";
import SupplyChainGoodSummaryTable from "../components/SupplyChainGoodSummaryTable";
import "../css/Dashboard.css";
import api from "../services/api";
import { DatePicker, Radio, Space } from "antd";
const { RangePicker } = DatePicker;
export class AnalyticsMaintainece extends Component {
  state = {
    location: "",
    device: "",
    openModal: false,
    open: true,
    Batches: [],
    loading: false,
  };
  onSubmitEvent = () => {
    console.log("User");
  };
  handleChangeLocation = (e) => {
    this.setState({ location: e });
  };
  handleChangeDevice = (e) => {
    this.setState({ device: e });
  };
  handleClickOpen = () => {
    this.setState({ openModal: true });
  };
  handleClose = () => {
    this.setState({ openModal: false });
  };

  runFunction = async () => {
    this.setState({ loading: true });
    const Batches = await api.getBatch();
    await this.setState({ Batches });
    console.log(this.state.Batches);
    if (Batches) {
      this.setState({ loading: false });
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
                <h1 className="dashboard-heading">Maintenance</h1>
                <Button
                  onClick={() => this.runFunction()}
                  type="submit"
                  color={"secondary"}
                  variant="contained"
                  style={{ position: "absolute", right: "10px" }}
                >
                  Run
                </Button>
              </div>
              <Collapse
                in={this.state.open}
                timeout="auto"
                unmountOnExit
                style={{ width: "100%" }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    backgroundColor: "transparent",
                  }}
                >
                  <form
                    style={{
                      width: "80%",
                      margin: 20,
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      flexWrap: "wrap",
                      marginBottom: 0,
                    }}
                    onSubmit={this.onSubmitEvent}
                    noValidate={false}
                    autoComplete="off"
                  >
                    <DatePicker
                      value={this.state.startingDate}
                      placeholder={"starting-date"}
                      className="input-mat"
                      style={{
                        border: "1px solid white",
                        borderRadius: 5,
                        height: 35,
                        margin: 10,
                        fontWeight: "lighter",
                      }}
                      size={"large"}
                      format={"YYYY-MM-DD"}
                      onChange={(e) => this.setState({ startingDate: e })}
                    />
                    <DatePicker
                      value={this.state.endingDate}
                      placeholder={"ending-date"}
                      className="input-mat"
                      style={{
                        border: "1px solid white",
                        borderRadius: 5,
                        height: 35,
                        margin: 10,
                        fontWeight: "lighter",
                      }}
                      size={"large"}
                      format={"YYYY-MM-DD"}
                      onChange={(e) => this.setState({ endingDate: e })}
                    />
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
                <Button type="submit" variant="contained">
                  Search
                </Button>
              </div>
              <SupplyChainGoodSummaryTable
                data={this.state.Batches}
                openModal={() => this.handleClickOpen()}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AnalyticsMaintainece;
