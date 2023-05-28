import React, { useState, useCallback } from 'react';
import './App.css';
import { makeStyles } from 'tss-react/mui';
import Table from 'react-bootstrap/Table';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import emailjs from 'emailjs-com';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const useStyles = makeStyles()(() => ({
  root: {
    width: '100%',
    paddingBottom: '5rem',
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
    fontFamily: 'Arial',
    height: '1.5rem'
  },
  dateInput: {
    width: '100%', 
    border: 'none', 
    fontSize: '0.9rem',
    fontFamily: 'Arial',
    height: '1.5rem'
  },
  rowLabel : {
    backgroundColor: 'lightGrey'
  },
  form: {
    width: '50rem', 
    margin: '0 auto'
  },
  sectionHeader: {
    backgroundColor: 'blue', 
    color: '#FFF', 
    textAlign: 'left'
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
      itemNumbers: '',
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
  
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);
  const [openFailPopup, setOpenFailPopup] = useState(false);

  const handleInputChage = (e) => {
    if(e){
      setData(d => {
        let _d = {...d};
        _d[e.target.name] = e.target.value;
        return _d;
      })
    }
  }

  const handleDropdownChange = (e) => {
    if(e){
      setData(d => {
        let _d = {...d};
        _d[e.target.name] = e.target.value;
        return _d;
      })
    }
  }

  const handleRadioChange = (e) => {
    if(e){
      setData(d => {
        let _d = {...d};
        _d[e.target.name] = e.target.id === 'yes' ? true : false;
        return _d;
      })
    }
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

  const handleSubmit = (e) => {
    if(e){      
      e.preventDefault();
      if(aRequiredFieldIsEmpty()){
        setOpenFailPopup(true);
      } else {
        const centraForm = document.getElementById("centra-form"); // Find form element
        if(centraForm){
          html2canvas(centraForm).then((canvas) => {
            const imgData = canvas.toDataURL("image/png"); 
            const pdf = new jsPDF();
            
            pdf.addImage(imgData, "PNG", 10, 10, 185, 270, '','FAST'); // Embed canvas in pdf                  
            pdf.save("download.pdf");
            
            let blobData = pdf.output('blob'); 
            let reader = new FileReader();

            reader.readAsDataURL(blobData); 
            reader.onloadend = function() {
              let base64Pdfdata = reader.result; // Convert blob to base64                        
              
              if(base64Pdfdata){
                let emailParams = {
                  to_email: 'ajadvers@gmail.com',
                  cc_email: 'a.adversalo@yahoo.com',
                  bcc_email: 'ajadvers@gmail.com',
                  from_name: 'AJ Adversalo',
                  won: data.won,
                  message: JSON.stringify(data),
                  content: base64Pdfdata // Attach pdf
                };
              
                emailjs.send('service_0cl4yjf', 'template_joy9wqn', emailParams, 'ajonPi_KH7jk3zPCW') // Send email
                .then((result) => {
                    console.log(result.text);
                    setOpenSuccessPopup(true);
                }, (error) => {
                    console.log(error.text);
                });
              }        
            }
          });
        }
      }       
    }
  }

  const nullableFields = ['additionalInstructions', 'completionNotes'];

  const aRequiredFieldIsEmpty = useCallback(() => {
    let result = false;
    
    if(data){      
      Object.entries(data).forEach(d => {
        if(d[1] === '' && !nullableFields.find(x => x === d[0])){ // If field is empty and not nullable
          result = true;
        }
      });      
    }

    return result;
  }, [data]);

  const handleClosePopUp = () => {
    setOpenSuccessPopup(false);
    setOpenFailPopup(false);
  }

  return (
    <div className={classes.root}>
      <div id='centra-form' className={classes.form}>
        <h2>Return Trip Checklist</h2>
        <Table striped bordered hover>
          <thead>
            <tr> 
              <th colSpan={2} className={classes.sectionHeader}>Customer Information</th>          
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
                  placeholder={'*required'}
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
                  placeholder={'*required'}
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
                  placeholder={'*required'}
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
                  placeholder={'*required'}
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
                    className={classes.dateInput}
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
                  placeholder={'*required'}
                />
              </td>
              <td>
                <textarea 
                    name={'itemNumbers'}
                    onChange={handleInputChage}
                    value={data.itemNumbers} 
                    rows={3}
                    className={classes.input}
                    placeholder={'*required'}
                  />
              </td>
            </tr>
            <tr> 
              <th colSpan={2} className={classes.sectionHeader}>Additional Information</th>          
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
              <th colSpan={2} className={classes.sectionHeader}>Admin To Complete</th>          
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
                  <YesNo name={'confirmedArrivalDate'}/>
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
                <select name="jobCompletedBy" id="jobCompletedBy" className={classes.input} onChange={handleDropdownChange}>
                  <option value="personOne">Person One</option>
                  <option value="personTwo">Person Two</option>
                  <option value="personThree">Person Three</option>
                </select>
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
        <hr/>
        <div style={{float: 'right', paddingTop: '1rem'}}>        
          <button onClick={handleSubmit} style={{fontSize: '1rem'}}>Submit</button>
        </div>
        <Snackbar open={openFailPopup} autoHideDuration={6000} onClose={handleClosePopUp}>
          <Alert onClose={handleClosePopUp} severity="warning" sx={{ width: '100%' }}>
            Please make sure none of the required fields are empty.
          </Alert>
        </Snackbar>
        <Snackbar open={openSuccessPopup} autoHideDuration={6000} onClose={handleClosePopUp}>
          <Alert onClose={handleClosePopUp} severity="success" sx={{ width: '100%' }}>
            Form successfully submitted.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default App;
