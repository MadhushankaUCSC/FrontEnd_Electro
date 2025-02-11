import React,{useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom'
import Axios from 'axios';
import SearchBar from "material-ui-search-bar";
import Popup from "../../components/Customer/bill_control/Popup";
import * as SpecialDeviceBill from "./SpecialEventFixedDeviceBill";
import Notification from "../../components/Customer/bill_control/Notification";
import ConfirmDialog from "../../components/Customer/bill_control/ConfirmDialog";
import SpecialFixedCalculateBillForm from "./SpecialFixedCalculateBillForm";
import {
    InputAdornment,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Toolbar,
  } from "@material-ui/core";
  import { Add, DeleteOutline, EditOutlined, Search } from "@material-ui/icons";
import { Col, Form, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";

const noOfDays = 0;

  const useStyles = makeStyles((theme) => ({
    pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3),
    },
    table: {
      marginTop: theme.spacing(3),
      '& thead th': {
          fontWeight: '600',
          color: theme.palette.primary.light,
      },
      '& tbody td' : {
          fontWeight: '300',
      },
      '& tbody tr:hover': {
          backgroundColor: '#fffbf2',
          cursor: 'pointer',
      },
  },
  Rowinform: {
    margin: "10px"
}
  }));

  var token = document.cookie
  .split(';')
  .map(cookie => cookie.split('='))
  .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {}).token;


  var ParamsUserId = document.cookie
  .split(';')
  .map(cookie => cookie.split('='))
  .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {}).userId;

  console.log("Front End eken yanawada Special Evevnt id eka :- " + ParamsUserId);

  export default function SpecialFixedAddBill() {

    const classes = useStyles();
    let history = useHistory();
    const [buttonState, setButtonState] = useState(true);
    const [saveButtonState, setSaveButtonState] = useState(true);
    const [recordForEdit, setRecordForEdit] = useState(null);
    
    const [inputValue, setInputValue] = useState ('');
    const[searchRecords,setSearchRecords] = useState([]);
    const [searched,setSearched] = useState("");

    const [addtionalUnit, setAddtionalUnit] = useState(0);
    
    const [newBillId, setNewBillId] = useState(0);

    async function getBillId() {


      const response = await Axios.get(`${process.env.REACT_APP_BASE_URL}/get-special-event-fix-bill-id/${ParamsUserId}`, {
        headers: {
          authorization: `Token ${token}`
        }
  
    })
    if (response.data.status){
      var oldBillId = response.data.data;
      oldBillId++;
      var new_bill_id = oldBillId;
      return new_bill_id;
    }else {
      console.log(response.data.message);
      history.push("/sign-in");
      window.location.reload();//reload browser
      deleteAllCookies();//delete all cookies
    }
          
    
  
    }
    const [records, setRecords] = useState([]);
    

    // const [filterFn, setFilterFn] = useState({
    //   fn: (items) => {
    //     return items;
    //   },
    // });

    const [openPopup, setOpenPopup] = useState(false);

    const [confirmDialog, setConfirmDialog] = useState({
      isOpen: false,
      title: "",
      subTitle: "",
    });

    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      variant: "",
    });


    const requestSearch =  (searchVal) =>{
      console.log("The searsearchVal",searchVal);
      
      const filteredRows =  searchRecords.filter((row) =>{
        console.log(records);
        return row.appliance.toLowerCase().includes(searchVal.toLowerCase());
      });
      console.log("The filter Row",filteredRows);
      if(searchVal == " "){
        console.log("val");
        setRecords(records);
      }else{
        setRecords(filteredRows);
      }
      
    }

    const cancelSearch = () =>{
      setSearched("");
      requestSearch(searched);
    };

    
    useEffect( async () => {
     const new_bill_id = await getBillId();
     setNewBillId(new_bill_id);
     console.log("useEffect "+new_bill_id);
     const recordDetails = await SpecialDeviceBill.getAllDevices(new_bill_id);
     console.log("record details:"+recordDetails);
     if(recordDetails==null){
      setSearchRecords([]);
      setRecords([]);
      setButtonState(true);
      setSaveButtonState(true);
    }else{
      setSearchRecords(recordDetails);
       setRecords(recordDetails);
       setButtonState(false);
       setSaveButtonState(false);
    }

    console.log("inside of useEffect" , recordDetails);
  
    },[]);
  

    const addOrEdit = async (device, resetForm) => {
      if (device.device_id == 0) {
        await SpecialDeviceBill.insertDevice(device);
        console.log("hy");
      } else {
        //console.log(device.device_id);
        await SpecialDeviceBill.updateDevice(device,newBillId);
      }
  
      resetForm();
      setRecordForEdit(null);
      setOpenPopup(false);
      console.log("addoredit");
      const recordDetails = await SpecialDeviceBill.getAllDevices(newBillId);
      //setRecords(recordDetails);
      if (recordDetails == null) {
        setRecords([]);
        setButtonState(true);
        setSaveButtonState(true);
        setSearchRecords([]);
      } else {
        setRecords(recordDetails);
        setButtonState(false);
        setSaveButtonState(false);
        setSearchRecords(recordDetails);
      }
      setNotify({
        isOpen: true,
        message: "Submitted Successfully",
        variant: "success",
      });
    };

    const openInPopup = (item) => {
      console.log(item.device_id);
      setRecordForEdit(item);
      setOpenPopup(true);
    };

    const onDeletedevice = async (device_id) => {
      console.log("Fixed device id:",device_id);
     
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      await SpecialDeviceBill.Deletedevice(device_id,newBillId);
      const recordDetails = await SpecialDeviceBill.getAllDevices(newBillId);
      if (recordDetails == null) {
        setRecords([]);
        setButtonState(true);
        setSaveButtonState(true);
        setSearchRecords([]);
        console.log("button disabled after delete all");
      } else {
        setRecords(recordDetails);
        setButtonState(false);
        setSaveButtonState(false);
        setSearchRecords(recordDetails);
      }
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        variant: "danger",
      });
    }

    function deleteAllCookies() {
      var cookies = document.cookie.split(";");
  
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    }

    async function calculateSpecialEventFixedDevice() {

      console.log("work onclick function");

      var token = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {}).token;
  
  
      var ParamsUserId = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {}).userId;
  
  
  
      const response = await Axios.post(`${process.env.REACT_APP_BASE_URL}/calculate-special-event-Fixedbill/${ParamsUserId}`, {
  
        bill_id: newBillId
      }, {
        headers: {
          authorization: `Token ${token}`
        }
      })
       console.log("Calculate Special Event:",response.data);
      if (response.data.status) {
        if(response.data.data[0].total_units == null){
          setAddtionalUnit(0);
        }else{
          setAddtionalUnit(response.data.data[0].total_units.toFixed(2));
          console.log(response.data.data);
        }
        
      }
      else {
        // console.log(response.data.message);
        // history.push("/sign-in");
        // window.location.reload();//reload browser
        // deleteAllCookies();//delete all cookies
      }
  
    }

    async function saveSpecialEventFixedDevice() {

      var token = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {}).token;
  
  
      var ParamsUserId = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {}).userId;
  
  
  
      const response = await Axios.post(`${process.env.REACT_APP_BASE_URL}/save-special-event-Fixedbill/${ParamsUserId}`, {
  
        bill_id: newBillId,
        fixed_plan_name:inputValue
      }, {
        headers: {
          authorization: `Token ${token}`
        }
      })
       console.log("Calculate Special Event:",response.data);
      if (response.data.status) {
        history.push("/special-event");
       
       
        console.log(response.data.data);
        
      
  
  
      } else {
        // console.log(response.data.message);
        // history.push("/sign-in");
        // window.location.reload();//reload browser
        // deleteAllCookies();//delete all cookies
      }
  
    }

    return (
        <div>
            
        <Paper className={classes.pageContent}>
        <h1>Your Device Data</h1>

        <Toolbar>
        <SearchBar
           value={searched}
           onChange={(searchVal) => requestSearch(searchVal)}
           onCancelSearch={() => cancelSearch()}
            />
          <button
            type="button"
            className="btn btn-info add-new-button"
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          >
            <Add />
            New Appliance
          </button>
        </Toolbar>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{textAlign:"center"}}>Appliance</TableCell>
              <TableCell style={{textAlign:"center"}}>Quantity</TableCell>
              <TableCell style={{textAlign:"center"}}>Power</TableCell>
              <TableCell style={{textAlign:"center"}}>Time Duration</TableCell>
              <TableCell style={{textAlign:"center"}}>No Of Days</TableCell>
              <TableCell style={{textAlign:"center"}}>Actions</TableCell>

            </TableRow>
          </TableHead>
            <TableBody>
            {records.map((item) => (
              <TableRow key={item.device_id}>
                <TableCell style={{textAlign:"center"}}>{item.appliance}</TableCell>
                <TableCell style={{textAlign:"center"}}>{item.quantity}</TableCell>
                <TableCell style={{textAlign:"center"}}>{item.power}</TableCell>
                <TableCell style={{textAlign:"center"}}>{item.hfixed}hrs : {item.mfixed}mins </TableCell>
                <TableCell style={{textAlign:"center"}}>{item.numberOfDays}</TableCell>
                <TableCell style={{textAlign:"center"}}>
                <button
                    className="btn editActionButtonIcon"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlined
                      fontSize="small"
                      ClassName={classes.actionButtonIcon}
                    />
                  </button>
                  <button
                    className="btn deleteActionButtonIcon"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are You sure delete this record",
                        subTitle: "You can't  undo this operation",
                        onConfirm: () => {
                          onDeletedevice(item.device_id);
                        },
                      });
                    }}
                  >
                    <DeleteOutline
                      fontSize="small"
                      ClassName={classes.actionButtonIcon}
                    />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Paper className={classes.pageContent}>
        <Form className="main-calculate-form">
            <Form.Group>
              <Row className="RowInForm-noOfDays">
                
                <Col sm="4" style={{marginLeft:"624px"}}>
                <button type="button" className="btn btn-success calculate-button-special-event" onClick={calculateSpecialEventFixedDevice} disabled={buttonState}>
                    Calculate
                </button>
                </Col>
              </Row>
              </Form.Group>
          </Form>
          <Form className={classes.formLabelStyle}>
            <Form.Group>
              <Row className={classes.Rowinform}>
                <Col sm="4"></Col>
                <Form.Label column sm="4" style={{fontWeight:"550"}}>
                Additional Units for the Event
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    type="text"
                    value={addtionalUnit}
                    disabled
                  />
                </Col>
              </Row>

              

              <Row className={classes.Rowinform}>
                <Col sm="4"></Col>
                <Form.Label column sm="4" style={{fontWeight:"550"}}>
               Name Of Your Plan
                </Form.Label>
                <Col sm="4">
                  

      <input
         type="text"
         value={inputValue}
         placeholder="Enter a plan"
         onChange={e => setInputValue(e.target.value)}
       />

                     
                     
                    
               
                </Col>
              </Row>

              <Row className={classes.Rowinform}>
                <Col sm="4"></Col>
               
                <Col sm="4" style={{marginLeft:"624px"}}>
               
                <button type="button" disabled={saveButtonState} className="btn btn-success calculate-button-special-event" onClick={saveSpecialEventFixedDevice} >
                    Save Plan
                </button>
              
                </Col>
              </Row>
               
            </Form.Group>
          </Form>
        </Paper>
      </Paper>
      <Popup
        title="Add New Device Details"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <SpecialFixedCalculateBillForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
         billId={newBillId}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
        </div>
    );
                  }
                

