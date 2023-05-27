import React, { useState, useEffect } from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { makeStyles } from 'tss-react/mui';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const useStyles = makeStyles()((theme, props) => ({
    root: {
        padding: '1rem',
    },
    paper: {
      padding: '1rem',
      width: '100%'
    },
    title: {
      fontSize: '2rem',
      paddingBottom: '1rem'
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      paddingTop: '1rem'
    },
    itemLabel: {
      width: '20rem',
      paddingTop: '1rem'
    },
    itemValue: {
      width: '20rem'      
    },
    section : {
      paddingLeft: '2rem'
    },
    sectionTitle: {
      fontSize: '1.2rem',
      padding: '1rem 0',
      fontWeight: 600
    }
}));

function App() {
  const { classes } = useStyles();
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
      date: ''
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

    const handleDateChange = (val) => {
    if(val){      
      setData(d => {
        let _d = {...d};
        _d['date'] = val;
        return _d;
      })
    }
  }

  useEffect(() => {
    console.log('data', data)
  }, [data])


  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.paper}>
        <div>
          <Typography className={classes.title}>Return Trip Checklist</Typography>
          <Typography className={classes.sectionTitle}>Customer Information</Typography>
          <div className={classes.section}>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Customer name:</Typography>
              <TextField name={'customerName'} onChange={handleInputChage} value={data.customerName} className={classes.itemValue}></TextField>
            </div>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Address:</Typography>
              <TextField name={'address'} onChange={handleInputChage} value={data.address} className={classes.itemValue}></TextField>
            </div>            
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Phone Number:</Typography>
              <TextField name={'phoneNumber'} onChange={handleInputChage} value={data.phoneNumber} className={classes.itemValue}></TextField>
            </div>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Last install date:</Typography>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker className={classes.itemValue} onChange={handleDateChange} value={data.date}/>
                  </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Reason for return trip:</Typography>
              <TextField name={'reason'} onChange={handleInputChage} value={data.reason} className={classes.itemValue} maxRows={4} multiline></TextField>
            </div>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Does this return trip require new product? (Yes/No):</Typography>
              <Switch onChange={handleSwitchChange} name={'trip'} checked={data.trip}/>
            </div>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Item #'s & Description:</Typography>
              <TextField name={'item'} onChange={handleInputChage} value={data.item} className={classes.itemValue} maxRows={4} multiline></TextField>
            </div>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Photo of defects required for remakes. Complete? (Yes/No):</Typography>
              <Switch/>
            </div>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Has the customer signed off/paid for job? (Yes/No):</Typography>
              <Switch onChange={handleSwitchChange} name={'signOff'} checked={data.signOff}/>
            </div>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Have you given then a return date? (Yes/No):</Typography>
              <Switch onChange={handleSwitchChange} name={'return'} checked={data.return}/>
            </div>
          </div>
          <Typography className={classes.sectionTitle}>Additional Information</Typography>
          <div className={classes.section}>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Additional Instructions for Installer:</Typography>
              <TextField name={'reason'} onChange={handleInputChage} value={data.reason} className={classes.itemValue} maxRows={4} multiline></TextField>
            </div>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Completion Notes if needed:</Typography>
              <TextField name={'reason'} onChange={handleInputChage} value={data.reason} className={classes.itemValue} maxRows={4} multiline></TextField>
            </div>
          </div>
          <Typography className={classes.sectionTitle}>Admin To Complete</Typography>
          <div className={classes.section}>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Product Ordered Date:</Typography>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker className={classes.itemValue} onChange={handleDateChange} value={data.date}/>
                  </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Expected Arrival Date:</Typography>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker className={classes.itemValue} onChange={handleDateChange} value={data.date}/>
                  </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Arranged Return Date:</Typography>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker className={classes.itemValue} onChange={handleDateChange} value={data.date}/>
                  </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Attach Remake Form:</Typography>
              <Switch onChange={handleSwitchChange} name={'return'} checked={data.return}/>
            </div>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Confirmed Arrival Date:</Typography>
              <Switch onChange={handleSwitchChange} name={'return'} checked={data.return}/>
            </div>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Product in Stock:</Typography>
              <Switch onChange={handleSwitchChange} name={'return'} checked={data.return}/>
            </div>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Confirmed Arrival Date:</Typography>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker className={classes.itemValue} onChange={handleDateChange} value={data.date}/>
                  </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Job Completed By:</Typography>
                   <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={10}
                      label="Age"
                      onChange={handleDropdownChange}
                      className={classes.itemValue}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
            </div>
            <div className={classes.row}>
              <Typography className={classes.itemLabel}>Job Completed Date:</Typography>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker className={classes.itemValue} onChange={handleDateChange} value={data.date}/>
                  </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default App;
