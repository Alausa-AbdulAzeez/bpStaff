/* eslint-disable react/prop-types */
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
import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import './candidateSearchDatagrid.scss'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { publicRequest } from '../../functions/requestMethods'
import { useSelector } from 'react-redux'

const CandidateSearchDatagrid = (props) => {
  // TABLE ROWS TO LOAD
  const [pageSize, setPageSize] = useState(5)

  // TOAST ID
  const toastId = useRef(null)

  // TO SET THE STATE OF THE UPDATE BUTTON
  const [disableUpdateBtn, setDisableUpdateBtn] = useState(false)

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data)

  const demo =
    '{"Color/Appearance":"brown/red","Leucocytes":"no","Nitrites":"no","Urobilinogen":"no","Protein":"no","pH":"6.5","Blood":"no","SpecificGravity":"1.2","Ketone":"no","Bilirubin":"no","Glucose":"no"}'

  // BMI
  const [BMI, setBMI] = useState('')

  // USER DETAILS
  const [urinalysisDetails, setUrinalysisDetails] = useState({
    'Color/Appearance': '',
    Leucocytes: '',
    Nitrites: '',
    Urobilinogen: '',
    Protein: '',
    pH: '',
    Blood: '',
    SpecificGravity: '',
    Ketone: '',
    Bilirubin: '',
    Glucose: '',
  })
  const [userDetails, setUserDetails] = useState({
    candidateId: '',
    clientid: '',
    height: '',
    bloodPressure: '',
    weight: '',
    age: '',
    bmi: '',
    gender: '',
    temperature: '',
    state: '',
    visaulAcuity: '',
    randomBloodSugar: '',
    stoolAnalysis: '',
    urinalysis: JSON.stringify(urinalysisDetails),
  })

  // SELECTED CANDIDATE AFTER ROW CLICK
  const [selectedCandidate, setSelecedCandidate] = useState({})

  // SELECTED CANDIDATE AFTER ROW CLICK
  const [candidateToBeUpdated, setCandidateToBeUpdated] = useState({})

  // INITIAL POSITION OF SLIDE
  const [position, setPosition] = useState('-100%')

  // TABLE DATA
  const tableData = props?.tableData
  let rows
  let columns
  let title

  // SLIDE BUTTONS
  let leftBtnText
  let rightBtnText

  // LOGGED IN USER RLOE
  const loggedInUserRole = props.userDetails?.data?.role

  const defaultColumns = [
    {
      field: 'candidateName',
      headerName: 'Candidate Name',
      width: 250,
      editable: false,
    },
    { field: 'clientName', headerName: 'Company Name', width: 250 },
    {
      field: 'testcategory',
      headerName: 'Test Category',
      width: 200,
      editable: false,
    },
    {
      field: 'appointmentdate',
      headerName: 'Appointment Date',
      width: 190,
      description: 'The candidate shoul be present by this date',
      renderCell: (props) => {
        const refinedDate = new Date(props?.value)
        const dateWithRightFormat = format(refinedDate, 'dd-MMM-yyyy')
        return <div>{dateWithRightFormat}</div>
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 130,
    },
    {
      field: 'laboratory',
      headerName: 'Screening Lab',
      width: 130,
    },
  ]

  switch (loggedInUserRole[0]) {
    case 'Reception':
      rows = tableData
      columns = defaultColumns
      title = 'Candidates'
      rightBtnText = 'Authorize'
      break
    case 'Phlebotomy':
      rows = tableData
      columns = defaultColumns
      title = 'Candidates'
      // leftBtnText = "Send Details";
      rightBtnText = 'Save Details'
      break
    case 'MainLab1':
      rows = tableData
      columns = defaultColumns
      title = 'Candidates'
      // leftBtnText = "Send Result";
      rightBtnText = 'Save Result'
      break
    case 'Quality assurance':
      rows = tableData
      columns = defaultColumns
      title = 'Candidates'
      rightBtnText = 'Approve'
      break
    case 'Report':
      rows = tableData
      columns = defaultColumns
      title = 'Candidates'
      rightBtnText = 'Approve'
      break

    default:
      break
  }

  const [result, setResult] = useState({
    Gender: '',
    Age: '',
    Temperature: '',
    Weight: '',
    Height: '',
    BMI: '',
    ['Blood Pressure']: '',
  })

  // SET SIDE INFO POSITION
  const handleSetPosition = () => {
    setPosition('0')
  }
  // END OF SET SIDE INFO POSITION

  // HANDLE ROW CLICK
  const handleRowClick = (row, e) => {
    setSelecedCandidate(row?.row)
    setCandidateToBeUpdated(row?.row)
    // console.log(JSON.parse(JSON.stringify(row?.row?.urinalysis)).pH);
    // console.log(JSON.parse(row?.row?.urinalysis))

    setUrinalysisDetails(JSON.parse(row?.row?.urinalysis || ''))
    // console.log(JSON.parse(demo).pH);
    // console.log(JSON.parse(demo));

    // console.log(row?.row);
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

  // FUNCTION TO CALCULATE BMI
  const calculateBmi = () => {
    let height = Number(candidateToBeUpdated?.height)
    let weight = Number(candidateToBeUpdated?.weight)
    let bmi

    // CHECK IF HEIGHT AND WEIGHT ARE AVAILABLE
    candidateToBeUpdated?.height && candidateToBeUpdated?.weight

    bmi = weight / Math.pow(height, 2)
    setCandidateToBeUpdated({ ...candidateToBeUpdated, bmi: bmi?.toString() })

    setBMI(bmi.toFixed(3))
  }
  // END OF FUNCTION TO CALCULATE BMI

  // FUNCTION TO HANDLE CHANGE OF CANDIDATE'S PROPERTIES
  const handleCandidatePropertyChange = (e, dataType) => {
    setCandidateToBeUpdated({
      ...candidateToBeUpdated,
      [dataType]: e.target.value,
    })
    // console.log(userDetails)
  }

  // END OF FUNCTION TO HANDLE CHANGE OF CANDIDATE'S PROPERTIES

  // FUNCTION TO HANDLE URINALYSIS DATA CHANGE
  const handleUrinalysisDetailsChange = (e, dataType) => {
    setUrinalysisDetails({ ...urinalysisDetails, [dataType]: e.target.value })
    setCandidateToBeUpdated({
      ...candidateToBeUpdated,
      urinalysis: JSON.stringify({
        ...urinalysisDetails,
        [dataType]: e.target.value,
      }),
    })
  }
  // END OF FUNCTION TO HANDLE URINALYSIS DATA CHANGE

  // FUNCTION TO SEND UPDATED USER DETAILS TO THE BACKEND (PHLEB)
  const updatedUserDetails = async () => {
    const { candidateId, clientid } = candidateToBeUpdated

    toastId.current = toast('Please wait...', {
      isLoading: true,
    })
    setDisableUpdateBtn(true)

    try {
      await publicRequest
        .put(
          `/Candidate/UInfo?Candidateid=${Number(
            candidateId
          )}&Clientid=${Number(clientid)}`,
          {
            ...candidateToBeUpdated,
            state: 'state',
          },
          {
            headers: {
              Accept: '*',
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(async () => {
          await publicRequest.put(
            `Candidate/Authorize/${candidateId}`,
            { recommendation: '' },
            {
              headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          )
          setDisableUpdateBtn(false)
        })
        .then(async () => {
          await props?.getAllCandidates().then(() => {
            setPosition('-100%')
          })
          // window.location.reload();
        })
        // .then(() => props?.setReloadTable((prev) => !prev))
        .then(() => {
          toast.update(toastId.current, {
            render: 'Update successful!',
            type: 'success',
            isLoading: false,
            autoClose: 2500,
          })
        })
    } catch (error) {
      console.log(error)
      console.log(error.message)
      toast.update(toastId.current, {
        type: 'error',
        autoClose: 2500,
        isLoading: false,
        render: `${
          error?.response?.data?.title ||
          error?.response?.data?.description ||
          error?.message ||
          'Something went wrong, please try again'
        }`,
      })
      setDisableUpdateBtn(false)
    }
  }
  // END OF FUNCTION TO SEND UPDATED USER DETAILS TO THE BACKEND (PHLEB)

  // USEEFFECT TO UPDATE SELECTED ROW
  useEffect(() => {}, [selectedCandidate])

  // use effect to update bmi
  useEffect(() => {
    calculateBmi()
  }, [candidateToBeUpdated?.height, candidateToBeUpdated?.weight])
  return (
    <div className='datagridWraper'>
      <div
        className={position === '-100%' ? 'zeroWidth' : 'slide'}
        style={{ right: position }}
      >
        <div className='slideTop'>
          <div className='cancelconWrapper' onClick={handleHideSlide}>
            <MdCancel className='cancelIcon' />
          </div>
          <div className='initials'>
            {selectedCandidate?.candidateName &&
              selectedCandidate?.candidateName[0]?.toUpperCase()}
          </div>
          <div className='slideFullname'>
            {selectedCandidate?.candidateName?.toUpperCase()}
          </div>
        </div>
        <div className='companyName h3'>
          <h3>Company Name</h3>
          <p>{selectedCandidate?.phoneNumber}</p>
        </div>

        <div className='phoneNo h3'>
          <h3>Candidate Phone Number</h3>
          <p>{selectedCandidate?.phoneNumber}</p>
        </div>
        <div className='numberOfTests h3'>
          <h3>{"Candidate's Email"}</h3>
          <p>{selectedCandidate?.email}</p>
        </div>
        <div className='numberOfTests h3'>
          <h3>{"Candidate's Adderess"}</h3>
          <p>{selectedCandidate?.address}</p>
        </div>
        {loggedInUserRole === 'Reception' && (
          <div className='numberOfTests h3'>
            <h3>{"Candidate's Adderess"}</h3>
            <p>{selectedCandidate?.address}</p>
          </div>
          // <div className='listOfTests'>
          //   <div className='singleTest'></div>
          //   <h3>Number of Tests</h3>
          //   <p>
          //     1. <span>Malaria test</span>
          //   </p>
          // </div>
        )}
        {selectedCandidate?.status === 'PENDING' &&
          loggedInUserRole[0] === 'Phlebotomy' && (
            <>
              <div className='numberOfTests h3'>
                <h3>{"Candidate's General Details"}</h3>
              </div>
              <div className='candidateSearchBasicDetailsWrapper'>
                <FormControl className='genderSelect' size='small'>
                  <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={candidateToBeUpdated?.gender || ''}
                    label='Company name'
                    inputLabelProps={{ shrink: true }}
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
                  size='small'
                  value={candidateToBeUpdated?.age || ''}
                  className='candidateName basicCandidateDetailsInput'
                  onChange={(e) => handleCandidatePropertyChange(e, 'age')}
                  inputLabelProps={{ shrink: true }}
                />
                <TextField
                  id='outlined-search'
                  label='Temperature'
                  type='string'
                  inputLabelProps={{ shrink: true }}
                  placeholder='°C'
                  value={candidateToBeUpdated?.temperature || ''}
                  onChange={(e) =>
                    handleCandidatePropertyChange(e, 'temperature')
                  }
                  size='small'
                  className='candidateName basicCandidateDetailsInput'
                />
                <TextField
                  // id="outlined-search"
                  label='Weight'
                  type='string'
                  placeholder='kg'
                  className='candidateName basicCandidateDetailsInput'
                  onChange={(e) => handleCandidatePropertyChange(e, 'weight')}
                  // value={userDetails?.weight}
                  value={candidateToBeUpdated?.weight || ''}
                  inputLabelProps={{ shrink: true }}
                  key={candidateToBeUpdated}
                  size='small'
                />

                <TextField
                  id='outlined-search'
                  label='Height'
                  type='number'
                  className='candidateName basicCandidateDetailsInput'
                  onChange={(e) => handleCandidatePropertyChange(e, 'height')}
                  value={candidateToBeUpdated?.height || ''}
                  inputLabelProps={{ shrink: true }}
                  placeholder='m'
                  size='small'
                />
                <TextField
                  id='outlined-search'
                  label='BMI'
                  type='number'
                  value={BMI}
                  className='candidateName basicCandidateDetailsInput'
                  inputLabelProps={{ shrink: true }}
                  size='small'
                />
                <TextField
                  id='outlined-search'
                  label='Blood Pressure'
                  type='search'
                  className='candidateName basicCandidateDetailsInput'
                  onChange={(e) =>
                    handleCandidatePropertyChange(e, 'bloodPressure')
                  }
                  inputLabelProps={{ shrink: true }}
                  size='small'
                  value={candidateToBeUpdated?.bloodPressure || ''}
                />
                <TextField
                  id='outlined-search'
                  label='Visual Acuity'
                  type='search'
                  className='candidateName basicCandidateDetailsInput'
                  onChange={(e) =>
                    handleCandidatePropertyChange(e, 'visaulAcuity')
                  }
                  inputLabelProps={{ shrink: true }}
                  value={candidateToBeUpdated?.visaulAcuity || ''}
                  size='small'
                />
                <TextField
                  id='outlined-search'
                  label='Random Blood Sugar'
                  type='search'
                  className='candidateName basicCandidateDetailsInput'
                  onChange={(e) =>
                    handleCandidatePropertyChange(e, 'randomBloodSugar')
                  }
                  inputLabelProps={{ shrink: true }}
                  value={candidateToBeUpdated?.randomBloodSugar || ''}
                  size='small'
                />
              </div>
              <div className='numberOfTests h3'>
                <h3 className='urinalysisH3'>
                  {'Urinalysis and Stool Analysis Details'}
                </h3>
                <div className='candidateSearchBasicDetailsWrapper'>
                  <TextField
                    id='outlined-search'
                    label='Stool Analysis'
                    type='search'
                    className='candidateName basicCandidateDetailsInput'
                    onChange={(e) =>
                      handleCandidatePropertyChange(e, 'stoolAnalysis')
                    }
                    inputLabelProps={{ shrink: true }}
                    size='small'
                    value={candidateToBeUpdated?.stoolAnalysis || ''}
                    placeholder='Color/Appearance'
                  />
                  <TextField
                    id='outlined-search'
                    label='Color/Appearance'
                    type='search'
                    className='candidateName basicCandidateDetailsInput'
                    onChange={(e) =>
                      handleUrinalysisDetailsChange(e, 'Color/Appearance')
                    }
                    inputLabelProps={{ shrink: true }}
                    value={urinalysisDetails?.['Color/Appearance'] || ''}
                    size='small'
                    placeholder='Color/Appearance'
                  />
                  <TextField
                    id='outlined-search'
                    label='Leucocytes'
                    type='search'
                    className='candidateName basicCandidateDetailsInput'
                    onChange={(e) =>
                      handleUrinalysisDetailsChange(e, 'Leucocytes')
                    }
                    value={urinalysisDetails?.Leucocytes || ''}
                    inputLabelProps={{ shrink: true }}
                    size='small'
                  />
                  <TextField
                    id='outlined-search'
                    label='Nitrites'
                    type='search'
                    className='candidateName basicCandidateDetailsInput'
                    onChange={(e) =>
                      handleUrinalysisDetailsChange(e, 'Nitrites')
                    }
                    inputLabelProps={{ shrink: true }}
                    value={urinalysisDetails?.Nitrites || ''}
                    size='small'
                  />
                  <TextField
                    id='outlined-search'
                    label='Urobilinogen'
                    type='search'
                    className='candidateName basicCandidateDetailsInput'
                    onChange={(e) =>
                      handleUrinalysisDetailsChange(e, 'Urobilinogen')
                    }
                    inputLabelProps={{ shrink: true }}
                    value={urinalysisDetails?.Urobilinogen || ''}
                    size='small'
                  />
                  <TextField
                    id='outlined-search'
                    label='Protein'
                    type='search'
                    className='candidateName basicCandidateDetailsInput'
                    onChange={(e) =>
                      handleUrinalysisDetailsChange(e, 'Protein')
                    }
                    inputLabelProps={{ shrink: true }}
                    value={urinalysisDetails?.Protein || ''}
                    size='small'
                  />
                  <TextField
                    id='outlined-search'
                    label='pH'
                    type='search'
                    className='candidateName basicCandidateDetailsInput'
                    onChange={(e) => handleUrinalysisDetailsChange(e, 'pH')}
                    value={urinalysisDetails?.pH || ''}
                    inputLabelProps={{ shrink: true }}
                    size='small'
                  />
                  <TextField
                    id='outlined-search'
                    label='Blood'
                    type='search'
                    className='candidateName basicCandidateDetailsInput'
                    onChange={(e) => handleUrinalysisDetailsChange(e, 'Blood')}
                    inputLabelProps={{ shrink: true }}
                    value={urinalysisDetails?.Blood || ''}
                    size='small'
                  />
                  <TextField
                    id='outlined-search'
                    label='SpecificGravity'
                    type='search'
                    className='candidateName basicCandidateDetailsInput'
                    onChange={(e) =>
                      handleUrinalysisDetailsChange(e, 'SpecificGravity')
                    }
                    inputLabelProps={{ shrink: true }}
                    value={urinalysisDetails?.SpecificGravity || ''}
                    size='small'
                  />
                  <TextField
                    id='outlined-search'
                    label='Ketone'
                    type='search'
                    className='candidateName basicCandidateDetailsInput'
                    onChange={(e) => handleUrinalysisDetailsChange(e, 'Ketone')}
                    inputLabelProps={{ shrink: true }}
                    value={urinalysisDetails?.Ketone || ''}
                    size='small'
                  />
                  <TextField
                    id='outlined-search'
                    label='Bilirubin'
                    type='search'
                    className='candidateName basicCandidateDetailsInput'
                    onChange={(e) =>
                      handleUrinalysisDetailsChange(e, 'Bilirubin')
                    }
                    inputLabelProps={{ shrink: true }}
                    value={urinalysisDetails?.Bilirubin || ''}
                    size='small'
                  />
                  <TextField
                    id='outlined-search'
                    label='Glucose'
                    type='search'
                    className='candidateName basicCandidateDetailsInput'
                    onChange={(e) =>
                      handleUrinalysisDetailsChange(e, 'Glucose')
                    }
                    inputLabelProps={{ shrink: true }}
                    value={urinalysisDetails?.Glucose || ''}
                    size='small'
                  />
                </div>
              </div>
            </>
          )}
        <div className='candidateSearchBottomButtons'>
          {/* {leftBtnText && (
            <div className='authorize sendDetails'>{leftBtnText}</div>
          )} */}
          {rightBtnText?.length > 0 &&
            loggedInUserRole['0'] === 'Phlebotomy' &&
            selectedCandidate?.status === 'PENDING' && (
              <button
                className='authorizeBtnCandidateSearch'
                onClick={updatedUserDetails}
                disabled={disableUpdateBtn}
              >
                {rightBtnText}
              </button>
            )}
        </div>
      </div>
      <div className='boxWrapper'>
        <Box sx={{ height: 350 }}>
          <h3>{title}</h3>
          <DataGrid
            rows={tableData}
            columns={defaultColumns}
            pageSize={pageSize}
            // checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            onRowClick={(row, e) => handleRowClick(row, e)}
            pagination
            getRowId={(row) => row.candidateId}
          />
        </Box>
      </div>
    </div>
  )
}

export default CandidateSearchDatagrid
