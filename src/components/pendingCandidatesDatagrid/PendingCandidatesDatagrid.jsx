import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { useSelector } from 'react-redux'
import SimpleBackdrop from '../backdrop/Backdrop'
import './pendingCandidatesDatagrid.scss'
import { FaAngleDown } from 'react-icons/fa'

const PendingCandidatesDatagrid = (props) => {
  // USER DETAILS
  const [userDetails, setUserDetails] = useState({
    candidateId: null,
    clientid: '',
    height: '',
    bloodPressure: '',
    weight: '',
    age: '',
    bmi: '',
    gender: '',
    state: '',
  })

  // BMI
  const [BMI, setBMI] = useState(null)

  const [pageSize, setPageSize] = useState(5)
  const [position, setPosition] = useState('-100%')
  let rows
  let columns
  let title
  let leftBtnText
  let rightBtnText
  const loggedInUserRole = props.userDetails?.role
  const user = useSelector((state) =>
    console.log(state.globalState.globalState)
  )

  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  // SET SIDE INFO POSITION
  const handleSetPosition = () => {
    setPosition('0')
  }
  // END OF SET SIDE INFO POSITION

  // HANDLE ROW CLICK
  const handleRowClick = (row, e) => {
    if (e.target.textContent !== 'Authorize') {
      if (position !== '0') {
        setPosition('0')
      }
    }
  }
  // END OF HANDLE ROW CLICK

  // HANDLE ROW CLICK
  const handleHideSlide = () => {
    setPosition('-100%')
  }
  // END OF HANDLE ROW CLICK

  const receptionistcolumns = [
    {
      field: 'lastName',
      headerName: 'Candidate Name',
      width: 250,
      editable: false,
    },
    { field: 'id', headerName: 'Company Name', width: 190 },
    {
      field: 'firstName',
      headerName: 'Number of tests',
      width: 150,
      editable: false,
    },
    {
      field: 'action',
      headerName: 'Authorize',
      width: 130,
      renderCell: (params) => {
        return (
          <>
            {params.row.attendedTo === 'true' ? (
              <div className='notAuthorized'>Authorize</div>
            ) : (
              <div className='notAuthorized'>Authorize</div>
            )}
          </>
        )
      },
    },
    {
      field: 'view',
      headerName: 'View',
      width: 150,
      renderCell: () => {
        return (
          <div className='view' onClick={() => handleSetPosition()}>
            View
          </div>
        )
      },
    },
    {
      field: 'role',
      headerName: 'Attended to',
      width: 150,
      renderCell: () => {
        return (
          <>
            <div className='pendingCandidatesNotAttendedTo'>False</div>
          </>
        )
      },
    },
  ]

  const receptionistRows = [
    { id: 1, lastName: 'Snow', firstName: '1', age: 35, attendedTo: 'false' },
    {
      id: 2,
      lastName: 'Lannister',
      firstName: '1',
      age: 42,
      attendedTo: 'false',
    },
    {
      id: 3,
      lastName: 'Lannister',
      firstName: '3',
      age: 45,
      attendedTo: 'false',
    },
    { id: 4, lastName: 'Stark', firstName: '3', age: 16, attendedTo: 'false' },
    {
      id: 5,
      lastName: 'Targaryen',
      firstName: '2',
      age: null,
      attendedTo: 'true',
    },
    {
      id: 6,
      lastName: 'Melisandre',
      firstName: '2',
      age: 150,
      attendedTo: 'true',
    },
    {
      id: 7,
      lastName: 'Clifford',
      firstName: '3',
      age: 44,
      attendedTo: 'true',
    },
    { id: 8, lastName: 'Frances', firstName: '3', age: 36, attendedTo: 'true' },
    { id: 9, lastName: 'Roxie', firstName: '3', age: 65, attendedTo: 'true' },
  ]

  const phlebotomistcolumns = [
    {
      field: 'lastName',
      headerName: 'Candidate Name',
      width: 250,
      editable: false,
    },
    { field: 'id', headerName: 'Company Name', width: 190 },
    {
      field: 'firstName',
      headerName: 'Number of tests',
      width: 180,
      editable: false,
    },

    { field: 'date', headerName: 'Appointment Date', width: 220 },

    {
      field: 'role',
      headerName: 'Attended to',
      width: 180,
      renderCell: () => {
        return (
          <>
            <div className='pendingCandidatesNotAttendedTo'>False</div>
          </>
        )
      },
    },
  ]

  const phlebotomistRows = [
    {
      id: 1,
      lastName: 'Snow',
      firstName: '1',
      date: '1-March-2023',
      age: 35,
      attendedTo: 'false',
    },
    {
      id: 2,
      lastName: 'Lannister',
      date: '1-March-2023',
      firstName: '1',
      age: 42,
      attendedTo: 'false',
    },
    {
      id: 3,
      lastName: 'Lannister',
      firstName: '3',
      date: '1-March-2023',
      age: 45,
      attendedTo: 'false',
    },
    {
      id: 4,
      lastName: 'Stark',
      firstName: '3',
      date: '1-March-2023',
      age: 16,
      attendedTo: 'false',
    },
    {
      id: 5,
      lastName: 'Targaryen',
      firstName: '2',
      age: null,
      date: '1-March-2023',
      attendedTo: 'true',
    },
    {
      id: 6,
      lastName: 'Melisandre',
      firstName: '2',
      age: 150,
      date: '1-March-2023',
      attendedTo: 'true',
    },
    {
      id: 7,
      lastName: 'Clifford',
      firstName: '3',
      age: 44,
      attendedTo: 'true',
      date: '1-March-2023',
    },
    {
      id: 8,
      lastName: 'Frances',
      firstName: '3',
      age: 36,
      attendedTo: 'true',
    },
    { id: 9, lastName: 'Roxie', firstName: '3', age: 65, attendedTo: 'true' },
  ]
  const labScientistcolumns = [
    {
      field: 'lastName',
      headerName: 'Candidate Name',
      width: 250,
      editable: false,
    },
    { field: 'id', headerName: 'Company Name', width: 190 },
    {
      field: 'firstName',
      headerName: 'Number of tests',
      width: 180,
      editable: false,
    },

    { field: 'date', headerName: 'Appointment Date', width: 220 },

    {
      field: 'role',
      headerName: 'Attended to',
      width: 180,
      renderCell: () => {
        return (
          <>
            <div className='pendingCandidatesAttendedTo'>True</div>
          </>
        )
      },
    },
  ]

  const labScientistRows = [
    {
      id: 1,
      lastName: 'Snow',
      firstName: '1',
      date: '1-March-2023',
      age: 35,
      attendedTo: 'false',
    },
    {
      id: 2,
      lastName: 'Lannister',
      date: '1-March-2023',
      firstName: '1',
      age: 42,
      attendedTo: 'false',
    },
    {
      id: 3,
      lastName: 'Lannister',
      firstName: '3',
      date: '1-March-2023',
      age: 45,
      attendedTo: 'false',
    },
    {
      id: 4,
      lastName: 'Stark',
      firstName: '3',
      date: '1-March-2023',
      age: 16,
      attendedTo: 'false',
    },
    {
      id: 5,
      lastName: 'Targaryen',
      firstName: '2',
      age: null,
      date: '1-March-2023',
      attendedTo: 'true',
    },
    {
      id: 6,
      lastName: 'Melisandre',
      firstName: '2',
      age: 150,
      date: '1-March-2023',
      attendedTo: 'true',
    },
    {
      id: 7,
      lastName: 'Clifford',
      firstName: '3',
      age: 44,
      attendedTo: 'true',
      date: '1-March-2023',
    },
    {
      id: 8,
      lastName: 'Frances',
      firstName: '3',
      age: 36,
      attendedTo: 'true',
    },
    { id: 9, lastName: 'Roxie', firstName: '3', age: 65, attendedTo: 'true' },
  ]

  const qualityAssuranceColumns = [
    {
      field: 'lastName',
      headerName: 'Candidate Name',
      width: 250,
      editable: false,
    },
    { field: 'id', headerName: 'Company Name', width: 190 },

    { field: 'date', headerName: 'Appointment Date', width: 180 },

    {
      field: 'role',
      headerName: 'Report Status',
      width: 160,
      renderCell: () => {
        return (
          <>
            <div className='reportSent'>Sent</div>
          </>
        )
      },
    },
    {
      field: 'timeSent',
      headerName: 'Time Sent',
      width: 145,
    },
    {
      field: 'timeUpdated',
      headerName: 'Time Updated',
      width: 145,
    },
  ]

  const qualityAssuranceRows = [
    {
      id: 1,
      lastName: 'Snow',
      firstName: '1',
      date: '1-March-2023',
      age: 35,
      attendedTo: 'true',
    },
    {
      id: 2,
      lastName: 'Lannister',
      date: '1-March-2023',
      firstName: '1',
      age: 42,
      attendedTo: 'true',
    },
    {
      id: 3,
      lastName: 'Lannister',
      firstName: '3',
      date: '1-March-2023',
      age: 45,
      attendedTo: 'true',
    },
    {
      id: 4,
      lastName: 'Stark',
      firstName: '3',
      date: '1-March-2023',
      age: 16,
      attendedTo: 'true',
    },
    {
      id: 5,
      lastName: 'Targaryen',
      firstName: '2',
      age: null,
      date: '1-March-2023',
      attendedTo: 'true',
    },
    {
      id: 6,
      lastName: 'Melisandre',
      firstName: '2',
      age: 150,
      date: '1-March-2023',
      attendedTo: 'true',
    },
    {
      id: 7,
      lastName: 'Clifford',
      firstName: '3',
      age: 44,
      attendedTo: 'true',
      date: '1-March-2023',
    },
    {
      id: 8,
      lastName: 'Frances',
      firstName: '3',
      age: 36,
      attendedTo: 'true',
    },
    { id: 9, lastName: 'Roxie', firstName: '3', age: 65, attendedTo: 'true' },
  ]
  const reportOfficerColumns = [
    {
      field: 'lastName',
      headerName: 'Candidate Name',
      width: 250,
      editable: false,
    },
    { field: 'id', headerName: 'Company Name', width: 190 },

    { field: 'date', headerName: 'Appointment Date', width: 180 },

    {
      field: 'role',
      headerName: 'Report Status',
      width: 160,
      renderCell: () => {
        return (
          <>
            <div className='reportSent'>Sent</div>
          </>
        )
      },
    },
    {
      field: 'timeSent',
      headerName: 'Time Sent',
      width: 145,
    },
    {
      field: 'timeUpdated',
      headerName: 'Time Updated',
      width: 145,
    },
  ]

  const reportOfficerRows = [
    {
      id: 1,
      lastName: 'Snow',
      firstName: '1',
      date: '1-March-2023',
      age: 35,
      attendedTo: 'true',
    },
    {
      id: 2,
      lastName: 'Lannister',
      date: '1-March-2023',
      firstName: '1',
      age: 42,
      attendedTo: 'true',
    },
    {
      id: 3,
      lastName: 'Lannister',
      firstName: '3',
      date: '1-March-2023',
      age: 45,
      attendedTo: 'true',
    },
    {
      id: 4,
      lastName: 'Stark',
      firstName: '3',
      date: '1-March-2023',
      age: 16,
      attendedTo: 'true',
    },
    {
      id: 5,
      lastName: 'Targaryen',
      firstName: '2',
      age: null,
      date: '1-March-2023',
      attendedTo: 'true',
    },
    {
      id: 6,
      lastName: 'Melisandre',
      firstName: '2',
      age: 150,
      date: '1-March-2023',
      attendedTo: 'true',
    },
    {
      id: 7,
      lastName: 'Clifford',
      firstName: '3',
      age: 44,
      attendedTo: 'true',
      date: '1-March-2023',
    },
    {
      id: 8,
      lastName: 'Frances',
      firstName: '3',
      age: 36,
      attendedTo: 'true',
    },
    { id: 9, lastName: 'Roxie', firstName: '3', age: 65, attendedTo: 'true' },
  ]

  switch (loggedInUserRole) {
    case 'receptionist':
      rows = receptionistRows
      columns = receptionistcolumns
      title = 'Pending Candidates'
      rightBtnText = 'Authorize'
      break

    case 'phlebotomist':
      rows = phlebotomistRows
      columns = phlebotomistcolumns
      title = 'Pending Candidates'
      leftBtnText = 'Save Details'
      // rightBtnText = 'Save Details'
      break
    case 'labScientist':
      rows = labScientistRows
      columns = labScientistcolumns
      title = 'Pending Candidates'
      leftBtnText = 'Send Result'
      rightBtnText = 'Save Result'
      break
    case 'qualityAssurance':
      rows = qualityAssuranceRows
      columns = qualityAssuranceColumns
      title = 'Candidates'
      rightBtnText = 'Approve'
      break

    case 'reportOfficer':
      rows = reportOfficerRows
      columns = reportOfficerColumns
      title = 'Candidates'
      leftBtnText = 'Send Report'
      rightBtnText = 'Preview Report'
      break

    default:
      break
  }

  // HANDLE LEFT AND RIGHT BUTTON CLICK
  const handleBtnClick = (e) => {
    switch (e.target.textContent) {
      case 'Preview Report':
        setOpen(true)
        console.log(e.target.textContent)

        break

      default:
        break
    }
  }
  // FUNCTION TO CALCULATE BMI
  const calculateBmi = () => {
    let height = Number(userDetails?.height)
    let weight = Number(userDetails?.weight)
    let bmi
    let heightInMetres

    // CHECK IF HEIGHT AND WEIGHT ARE AVAILABLE
    userDetails?.height && userDetails?.weight

    // convert Number( to) metres
    heightInMetres = Number(height) / 100

    bmi = weight / Math.pow(heightInMetres, 2)

    setBMI(bmi)
    console.log(BMI)
  }
  console.log(BMI)

  // FUNCTION TO HANDLE CHANGE OF CANDIDATE'S PROPERTIES
  const handleCandidatePropertyChange = (e, dataType) => {
    setUserDetails({ ...userDetails, [dataType]: e.target.value })
  }

  // use effect to update bmi
  useEffect(() => {
    calculateBmi()
  }, [userDetails?.height, userDetails?.weight])

  return (
    <div className='datagridWraper'>
      <SimpleBackdrop open={open} handleClose={handleClose} />

      <div className='slide' style={{ right: position }}>
        <div className='slideTop'>
          <div className='cancelconWrapper' onClick={handleHideSlide}>
            <MdCancel className='cancelIcon' />
          </div>
          <div className='initials'>AA</div>
          <div className='slideFullname'>Alausa Abdulazeez</div>
        </div>
        <div className='companyName h3'>
          <h3>Company Name</h3>
          <p>Chicken Republic</p>
        </div>

        <div className='phoneNo h3'>
          <h3>Candidate Phone Number</h3>
          <p>+23456789010</p>
        </div>
        <div className='numberOfTests h3'>
          <h3>Number of Tests</h3>
          <p>3</p>
        </div>
        {loggedInUserRole === 'receptionist' && (
          <div className='listOfTests'>
            <div className='singleTest'></div>
            <h3>Number of Tests</h3>
            <p>
              1. <span>Malaria test</span>
            </p>
          </div>
        )}
        {loggedInUserRole === 'phlebotomist' && (
          <div className='basicDetailsWrapper'>
            <FormControl className='genderSelect'>
              <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={userDetails?.gender}
                label='Company name'
                onChange={(e) => handleCandidatePropertyChange(e, 'gender')}
              >
                <MenuItem value={'M'}>M</MenuItem>
                <MenuItem value={'F'}>F</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id='outlined-search'
              label='Age'
              type='string'
              className='candidateName basicCandidateDetailsInput'
              onChange={(e) => handleCandidatePropertyChange(e, 'age')}
            />
            <TextField
              id='outlined-search'
              label='Temperature'
              type='string'
              className='candidateName basicCandidateDetailsInput'
              onChange={(e) => handleCandidatePropertyChange(e, 'temperature')}
            />
            <TextField
              id='outlined-search'
              label='Weight'
              type='string'
              className='candidateName basicCandidateDetailsInput'
              onChange={(e) => handleCandidatePropertyChange(e, 'weight')}
              value={userDetails?.weight}
            />
            <TextField
              id='outlined-search'
              label='Height'
              type='number'
              className='candidateName basicCandidateDetailsInput'
              onChange={(e) => handleCandidatePropertyChange(e, 'height')}
              value={userDetails?.height}
            />
            <TextField
              id='outlined-search'
              label='BMI'
              type='number'
              value={BMI}
              className='candidateName basicCandidateDetailsInput'
            />
            <TextField
              id='outlined-search'
              label='Blood Pressure'
              type='search'
              className='candidateName basicCandidateDetailsInput'
              onChange={(e) =>
                handleCandidatePropertyChange(e, 'bloodPressure')
              }
            />
          </div>
        )}
        {loggedInUserRole === 'labScientist' && (
          <>
            <div className='qualityAssuranceAccordionWrapper'>
              <Accordion>
                <AccordionSummary
                  expandIcon={<FaAngleDown />}
                  aria-controls='panel2a-content'
                  id='panel2a-header'
                >
                  <Typography>Candidate Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className='basicDetailsWrapper'>
              <TextField
                id='outlined-search'
                label='PCV'
                type='search'
                className='candidateName basicCandidateDetailsInput'
              />
              <TextField
                id='outlined-search'
                label='Blood Pressure'
                type='search'
                className='candidateName basicCandidateDetailsInput'
              />
            </div>
          </>
        )}
        {loggedInUserRole === 'qualityAssurance' && (
          <div className='qualityAssuranceAccordionWrapper'>
            <Accordion>
              <AccordionSummary
                expandIcon={<FaAngleDown />}
                aria-controls='panel2a-content'
                id='panel2a-header'
              >
                <Typography>Test Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        )}
        <div className='bottomButtons'>
          {leftBtnText && (
            <div
              className='authorize sendDetails'
              onClick={(e) => handleBtnClick(e)}
            >
              {leftBtnText}
            </div>
          )}
          {rightBtnText?.length > 0 && (
            <div className='authorize' onClick={(e) => handleBtnClick(e)}>
              {rightBtnText}
            </div>
          )}
        </div>
      </div>
      <Box sx={{ height: 350, width: '100%' }}>
        <h3>{title}</h3>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          // checkboxSelection
          // disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          onRowClick={(row, e) => handleRowClick(row, e)}
          pagination
        />
      </Box>
    </div>
  )
}

export default PendingCandidatesDatagrid
