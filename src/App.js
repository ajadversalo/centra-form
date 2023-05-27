import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { makeStyles } from 'tss-react/mui';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from 'react-bootstrap/Table';
import jsPDF from "jspdf";

const useStyles = makeStyles()((theme, props) => ({
    root: {
    padding: '2rem',
    "& .MuiInputBase-root": {
      padding: 0,
      "& .MuiButtonBase-root": {
        padding: 0,
        paddingLeft: 10,
      },
      "& .MuiInputBase-input": {
        padding: 15,
        paddingLeft: 0
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: 'none'
      }
    }
  },
    paper: {
      padding: '1rem',
      width: '100%'
    },
    title: {
      fontSize: '2rem',
      paddingBottom: '1rem'
    },
    label: {
      fontWeight: 600
    },
    input: {
      width: '95%', 
      border: 'none', 
      fontSize: '0.9rem',
      fontFamily: 'Arial'
    },
    rowLabel : {
      backgroundColor: 'lightGrey'
    }
}));

function App() {
  const { classes } = useStyles();
  const reportTemplateRef = useRef(null);
  const [data, setData] = useState(
    {
      customerName: '',
      address: '',
      phoneNumber: '',
      reason: '',
      item: '',
      trip: false, 
      signOff: false, 
      return: false,
      lastInstallDate: '',
      productOrderedDate: '',
      expectedArrivalDate: '',
      arrangedReturnDate: '',
      jobCompletedDate: '',
    }
  );
  
  const handleInputChage = (e) => {
    if(e){
      console.log(e?.target?.value)
      console.log(e?.target?.name)
      setData(d => {
        let _d = {...d};
        _d[e.target.name] = e.target.value;
        return _d;
      })
    }
  }

  const handleSwitchChange = (e) => {
    if(e){
      setData(d => {
        let _d = {...d};
        _d[e.target.name] = e.target.checked;
        return _d;
      })
    }
  }

  const handleDropdownChange = (e) => {
    if(e){
     console.log(e.target.value)
    }
  }

    const handleDateChange = (name, val) => {
      console.log(val)
      console.log(name)
    if(val){      
      setData(d => {
        let _d = {...d};
        _d[name] = val;
        return _d;
      })
    }
  }

  const handleRadioChange = (e) => {
    if(e){
      console.log(e)
      setData(d => {
        let _d = {...d};
        _d[e.target.name] = e.target.id === 'yes' ? true : false;
        return _d;
      })
    }
  }

  useEffect(() => {
    console.log('data', data)
  }, [data])

  const handleInputOnChange = (e) => {
    console.log('e', e.target.value)
  }

  const YesNo = (props) => {
    const { name } = props;
    return(
      <div style={{paddingLeft: '0.5rem'}}>
        <label>Yes</label>
        <input type='radio' value='yes' id='yes' name={name} onChange={handleRadioChange} checked={data[name]}/>
        <label style={{paddingLeft: '0.5rem'}}>No</label>           
        <input type='radio' value='no' id='no' name={name} onChange={handleRadioChange} checked={!data[name]}/>        
    </div>
    )
  }

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
    });

    // Adding the fonts
    doc.setFont("Inter-Regular", "normal");

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("document");
      }
    });
  };

  return (
    <div className={classes.root} ref={reportTemplateRef}>
      <h1>Return Trip Checklist</h1>
      <Table striped bordered hover style={{width: '50rem'}}>
      <thead>
        <tr> 
          <th colSpan={2} style={{backgroundColor: 'blue', color: '#FFF', textAlign: 'left'}}>Customer Information</th>          
        </tr>
      </thead>
      <tbody>
      <tr className={classes.rowLabel}>
          <td className={classes.label}>W/O #</td>
          <td className={classes.label}>Does this return trip require new product?</td>
        </tr>
        <tr>
          <td>
            <input 
              name={'won'}
              onChange={handleInputChage}
              value={data.won} 
              className={classes.input}
            />
          </td>
          <td>
            <YesNo name={'doesThisReturn'}/>
          </td>
        </tr>
        <tr className={classes.rowLabel}>
          <td className={classes.label}>Customer name</td>
          <td className={classes.label}>Photo of defects required for remakes. Complete?</td>
        </tr>
        <tr>
          <td>
            <input 
              name={'customerName'}
              onChange={handleInputChage}
              value={data.customerName} 
              className={classes.input}
            />
          </td>
          <td>
            <YesNo name={'photoOfDefects'}/>
          </td>
        </tr>
        <tr className={classes.rowLabel}>
          <td className={classes.label}>Address</td>
          <td className={classes.label}>Has the customer signed off/paid for job?</td>
        </tr>
        <tr>
          <td>
            <input 
              name={'address'}
              onChange={handleInputChage}
              value={data.address} 
              className={classes.input}
            />
          </td>
          <td>
            <YesNo name={'hasTheCustomerSigned'}/>
          </td>
        </tr>
        <tr className={classes.rowLabel}>
          <td className={classes.label}>Phone Number</td>
          <td className={classes.label}>Have you given then a return date?</td>
        </tr>
        <tr>
          <td>
            <input               
              name={'phoneNumber'}
              onChange={handleInputChage}
              value={data.phoneNumber} 
              className={classes.input}
            />
          </td>
          <td>
            <YesNo name={'haveYouGiven'}/>
          </td>
        </tr>
        <tr className={classes.rowLabel}>
          <td className={classes.label}>Last install date</td>
          <td className={classes.label}>{data.haveYouGiven && 'Return Date'}</td>
        </tr>
        <tr>
          <td>
            <input
                type='date' 
                name={'lastInstallDate'}
                onChange={handleInputChage}
                value={data.lastInstallDate} 
                className={classes.input}
            />
          </td>
          <td>
            {data.haveYouGiven && 
              <input
                  type='date' 
                  name={'returnDate'}
                  onChange={handleInputChage}
                  value={data.returnDate} 
                  className={classes.input}
              />
            }
          </td>
        </tr>
        <tr className={classes.rowLabel}>
          <td className={classes.label}>Reason for return trip</td>
          <td className={classes.label}>Item Numbers & Descriptions</td>
        </tr>
        <tr>
          <td>
            <textarea 
              name={'reason'}
              onChange={handleInputChage}
              value={data.reason} 
              rows={3}
              className={classes.input}
            />
          </td>
          <td>
            <textarea 
                name={'itemNumbers'}
                onChange={handleInputChage}
                value={data.itemNumbers} 
                rows={3}
                className={classes.input}
              />
          </td>
        </tr>
        <tr> 
          <th colSpan={2} style={{backgroundColor: 'blue', color: '#FFF', textAlign: 'left'}}>Additional Information</th>          
        </tr>
        <tr className={classes.rowLabel}>
          <td className={classes.label}>Additional Instructions for installer</td>
          <td className={classes.label}>Completion notes if needed</td>
        </tr>
        <tr>
          <td>
            <textarea 
              name={'additionalInstructions'}
              onChange={handleInputChage}
              value={data.additionalInstructions} 
              rows={3}
              className={classes.input}
            />
          </td>
          <td>
            <textarea 
                name={'completionNotes'}
                onChange={handleInputChage}
                value={data.completionNotes} 
                rows={3}
                className={classes.input}
              />
          </td>
        </tr>
        <tr> 
          <th colSpan={2} style={{backgroundColor: 'blue', color: '#FFF', textAlign: 'left'}}>Admin To Complete</th>          
        </tr>
        <tr className={classes.rowLabel}>
          <td className={classes.label}>Product Ordered Date</td>
          <td className={classes.label}>Confirmed Arrival Date</td>
        </tr>
        <tr>
          <td>
            <input
                type='date' 
                name={'productOrderedDate'}
                onChange={handleInputChage}
                value={data.productOrderedDate} 
                className={classes.input}
            />
          </td>
          <td>
              <YesNo name={'attachRemakeForm'}/>
          </td>
        </tr>
        <tr className={classes.rowLabel}>
          <td className={classes.label}>Expected Arrival Date</td>
          <td className={classes.label}>Product In Stock</td>
        </tr>
        <tr>
          <td>
            <input
                type='date' 
                name={'expectedArrivalDate'}
                onChange={handleInputChage}
                value={data.expectedArrivalDate} 
                className={classes.input}
            />
          </td>
          <td>
            <YesNo name={'productInStock'}/>
          </td>
        </tr>
        <tr className={classes.rowLabel}>
          <td className={classes.label}>Arranged Return Date</td>
          <td className={classes.label}>Job Completed By</td>
        </tr>
        <tr>
          <td>
            <input
                type='date' 
                name={'arrangedReturnDate'}
                onChange={handleInputChage}
                value={data.arrangedReturnDate} 
                className={classes.input}
            />
          </td>
          <td>

          </td>
        </tr>
        <tr className={classes.rowLabel}>
          <td className={classes.label}>Attach Remake Form</td>
          <td className={classes.label}>Job Completed Date</td>
        </tr>
        <tr>
          <td>
            <YesNo name={'attachRemakeForm'}/>
          </td>
          <td>
            <input
                type='date' 
                name={'jobCompletedDate'}
                onChange={handleInputChage}
                value={data.jobCompletedDate} 
                className={classes.input}
            />
          </td>
        </tr>
      </tbody>
    </Table>
    <button className="button" onClick={handleGeneratePdf}>  Generate PDF
      </button>
    </div>
  );
}

export default App;
