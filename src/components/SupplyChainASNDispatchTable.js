import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Button } from "@material-ui/core";
import moment from "moment";
import api from "../services/api";
import { toast } from "react-toastify";
const useRowStyles = makeStyles({
  root: {
    backgroundColor: "rgba(92, 92, 92, 1)",
    "& > *": {
      borderBottom: "unset",
    },
  },
  backgroundColorfix: {
    backgroundColor: "#263238",
  },
});

function Row(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const { row } = props;
  const { reloadData } = props;
  const {edit} = props ;
  console.log(row.operation_name);
  const cancelTransfer = (data) => {
    const changedStatus = api.editAsn(data._id);
    if (changedStatus) {
        toast.success("Asn Cancel Successfully")
      setTimeout(() => {
        reloadData();
        // window.location.reload();
      }, 500);
    }
  };
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
          {edit && 
          <TableCell
          colSpan={2}
          style={{
            color: "white",
            fontWeight: "bold",
            letterSpacing: 1,
            fontSize: 12,
          }}
          align="center"
        >
          <Button style={{fontSize:'12px',width:'180px'}} variant={'contained'} type={'primary'}  onClick={() => cancelTransfer(row)}>
            Cancel Transfer Out
          </Button>
        </TableCell>
          }
        
        <TableCell
          colSpan={2}
          style={{
            color: "white",
            fontWeight: "bold",
            letterSpacing: 1,
            fontSize: 12,
          }}
          align="center"
        >
          {row?.asn}
        </TableCell>
        <TableCell
          colSpan={2}
          style={{
            color: "white",
            fontWeight: "bold",
            letterSpacing: 1,
            fontSize: 12,
          }}
          align="center"
        >
          {row?.siteId?.site_name}
        </TableCell>
        <TableCell
          colSpan={2}
          style={{
            color: "white",
            fontWeight: "bold",
            letterSpacing: 1,
            fontSize: 12,
          }}
          align="center"
        >
          {row?.departementId?.departement_name}
        </TableCell>
        <TableCell
          colSpan={2}
          style={{
            color: "white",
            fontWeight: "bold",
            letterSpacing: 1,
            fontSize: 12,
          }}
          align="center"
        >
          {row?.zoneId?.zone_name}
        </TableCell>
        <TableCell
          colSpan={2}
          style={{
            color: "white",
            fontWeight: "bold",
            letterSpacing: 1,
            fontSize: 12,
          }}
          align="center"
        >
          <Link
            to={{
              pathname: "/EPCDetail",
              state: {
                row: { operation: "transfer out", asn: row._id },
                data: {
                  zone: row?.zoneId?.zone_name,
                  departmentName: row?.departementId?.departement_name,
                },
              },
            }}
          >
            {row.transfer_items?.qt}
          </Link>{" "}
        </TableCell>
        <TableCell
          colSpan={2}
          style={{
            color: "white",
            fontWeight: "bold",
            letterSpacing: 1,
            fontSize: 12,
          }}
          align="center"
        >
          {row?.operation_name}
        </TableCell>
        <TableCell
          colSpan={2}
          style={{
            color: "white",
            fontWeight: "bold",
            letterSpacing: 1,
            fontSize: 12,
          }}
          align="center"
        >
          {new Date(row?.transfer_items?.date).toLocaleString(
            "en-Us",
            "Asia/Muscat"
          )}
        </TableCell>
        <TableCell
          colSpan={2}
          style={{
            color: "white",
            fontWeight: "bold",
            letterSpacing: 1,
            fontSize: 12,
          }}
          align="center"
        >
          {row?.transfer_items?.remarks}
        </TableCell>
        {/* <TableCell colSpan={2} style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, fontSize: 12, }} align="center">{row?.zoneId?.zone_name}</TableCell> */}
      </TableRow>
    </React.Fragment>
  );
}
export default function SupplyChainASNDispatchTable({ asn, runFunction,edit }) {
  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 440,
    },
    backgroundColorfix: {
      backgroundColor: "#263238",
    },
  });
  // const { row } = props;
  const [open, setOpen] = React.useState(false);
  // const classes = useRowStyles();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Table size="small" aria-label="collapsible table">
          <TableHead>
            <TableRow>
                {edit  && 
                 <TableCell
                 colSpan={2}
                 align="center"
                 style={{ color: "white", fontWeight: "bold", letterSpacing: 1 }}
                 size="small"
               >
                 Action
               </TableCell>}
              <TableCell
                colSpan={2}
                align="center"
                style={{ color: "white", fontWeight: "bold", letterSpacing: 1 }}
                size="small"
              >
                IBT
              </TableCell>
             
              <TableCell
                colSpan={2}
                align="center"
                style={{ color: "white", fontWeight: "bold", letterSpacing: 1 }}
                size="small"
              >
                Source(Site)
              </TableCell>
              <TableCell
                colSpan={2}
                align="center"
                style={{ color: "white", fontWeight: "bold", letterSpacing: 1 }}
                size="small"
              >
                Source(Department)
              </TableCell>
              <TableCell
                colSpan={2}
                align="center"
                style={{ color: "white", fontWeight: "bold", letterSpacing: 1 }}
                size="small"
              >
                Source(Zone)
              </TableCell>
              <TableCell
                colSpan={2}
                align="center"
                style={{ color: "white", fontWeight: "bold", letterSpacing: 1 }}
                size="small"
              >
                Transfer Items
              </TableCell>
              <TableCell
                colSpan={2}
                align="center"
                style={{ color: "white", fontWeight: "bold", letterSpacing: 1 }}
                size="small"
              >
                Status
              </TableCell>
              <TableCell
                colSpan={2}
                align="center"
                style={{ color: "white", fontWeight: "bold", letterSpacing: 1 }}
                size="small"
              >
                Shipping Date
              </TableCell>
              <TableCell
                colSpan={2}
                align="center"
                style={{ color: "white", fontWeight: "bold", letterSpacing: 1 }}
                size="small"
              >
                Shipping Remarks
              </TableCell>
              {/* <TableCell colSpan={2} align="center" style={{ color: 'white', fontWeight: 'bold', letterSpacing: 1, }} size="small">Zone </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {asn
              .reverse()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row
                  reloadData={() => runFunction()}
                  edit={edit ? true : null}
                  key={row.name}
                  row={row}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={asn.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className={classes.backgroundColorfix}
        style={{ backgroundColor: "#263238", color: "white" }}
      />
    </Paper>
  );
}
