import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useRef, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { useSelector } from 'react-redux'
import SimpleBackdrop from '../backdrop/Backdrop'
import './pendingCandidatesDatagrid.scss'
import { FaAngleDown } from 'react-icons/fa'
import {
  publicRequest,
  publicRequestWithHeaders,
} from '../../functions/requestMethods'
import { toast } from 'react-toastify'
import FormDialog from '../DialogueWithInfo'
import { Link, Navigate } from 'react-router-dom'

const PendingCandidatesDatagrid = (props) => {
  // RESULT DIALOGUE BACKDROP
  const [openDialogueWithInfo, setOpenDialogueWithInfo] = React.useState(false)

  // REJECTION DETAILS
  const [reasonForRejection, setReasonForRejection] = React.useState('')

  // SINGLE CANDIDATE
  const [singleCandidate, setSingleCandidate] = useState({})

  // SELECTED CANDIDATE TESTS (FOR MAINLAB)
  const [candidateTests, setCandidateTests] = useState([])
  const [loadingCandedateTests, setLoadingCandedateTests] = useState(false)
  const [candedateTestsError, setCandedateTestsError] = useState(false)

  // TO SET THE STATE OF THE UPDATE BUTTON
  const [disableUpdateBtn, setDisableUpdateBtn] = useState(false)

  // SELECTED CANDIDATE SUBMITTED RESULTS (FOR QA and REPORTS )
  const [candidateSubmittedResults, setCandidateSubmittedResults] = useState([])

  // SELECTED CANDIDATE SUBMITTED RESULTS (FOR REPORTS )
  const [
    loadingCandedateSubmittedResults,
    setLoadingCandedateSubmittedResults,
  ] = useState(false)
  const [candedateSubmittedResultsError, setCandedateSubmittedResultsError] =
    useState(false)
  const [
    candedateSubmittedResultsErrorMsg,
    setCandedateSubmittedResultsErrorMsg,
  ] = useState('')

  // BUTTONS STATUS (FOR REPORTS)
  const [btnsAreDisabled, setBtnsAreDisabled] = useState(true)

  // SELECTED CANDIDATE RESULTS
  let [candidateResults, setCandidateResults] = useState([])
  let [selectedCandidateResults, setSelectedCandidateResults] = useState([])

  // BMI
  const [BMI, setBMI] = useState('')

  // TOAST ID
  const toastId = useRef(null)

  // WIDAL TEST CHECK
  let containsWidalTest = false
  const [containsWidal, setContainsWidal] = useState(false)

  // SELECTED CANDIDATE AFTER ROW CLICK
  const [selectedCandidate, setSelecedCandidate] = useState({})

  // USER DETAILS
  const [widalTestDetails, setWidalTestDetails] = useState({
    'S.typhi O': '',
    'S.typhi H': '',
    'S.paratyphi-A O': '',
    'S.paratyphi-A H': '',
    'S.paratyphi-B O': '',
    'S.paratyphi-B H': '',
    'S.paratyphi-C O': '',
    'S.paratyphi-C H': '',
  })
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

  // RECOMMENDATION
  const [recommendation, setRecommendation] = useState(
    'In the light of all the results obtained, the above-named person is hereby certified as medically fit'
  )

  // TABLE ROWS PER PAGE
  const [pageSize, setPageSize] = useState(5)

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
  const loggedInUserRole = props.userDetails?.data?.role?.[0]

  // LOGGED IN USER
  const userName = props.userDetails?.data?.profile?.fullName

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data)

  // LOGOUT BACKDROP
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const defaultColumns = [
    {
      field: 'candidateName',
      headerName: 'Candidate Name',
      width: 250,
      editable: false,
    },
    { field: 'clientName', headerName: 'Client Name', width: 250 },
    {
      field: 'testcategory',
      headerName: 'Test Category',
      width: 200,
      editable: false,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell: (params) => {
        return (
          <>
            {loggedInUserRole === 'Reception' && (
              <div
                className='notAuthorized'
                onClick={() => authorizeUser(params, 'main')}
              >
                Authorize
              </div>
            )}

            {(loggedInUserRole === 'Phlebotomy' ||
              loggedInUserRole === 'MainLab1' ||
              loggedInUserRole === 'Customer Care' ||
              loggedInUserRole === 'Report' ||
              loggedInUserRole === 'Quality assurance') && (
              <div className='notAuthorized'>View</div>
            )}
          </>
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

  switch (loggedInUserRole) {
    case 'Reception':
      rows = tableData
      columns = defaultColumns
      title = 'Pending Candidates'
      rightBtnText = 'Authorize'
      break

    case 'Phlebotomy':
      rows = tableData
      columns = defaultColumns
      title = 'Pending Candidates'
      rightBtnText = 'Save Details'
      break
    case 'MainLab1':
      rows = tableData
      columns = defaultColumns
      title = 'Pending Candidates'
      rightBtnText = 'Save Result'
      break
    case 'Quality assurance':
      rows = tableData
      columns = defaultColumns
      title = 'Candidates'
      rightBtnText = 'Approve'
      leftBtnText = 'Reject'
      break

    case 'Report':
      rows = tableData
      columns = defaultColumns
      title = 'Candidates'
      leftBtnText = 'Send Report'
      rightBtnText = 'Preview Report'
      break

    case 'Customer Care':
      rows = tableData
      columns = defaultColumns
      title = 'Candidates'
      leftBtnText = 'Send Report'
      rightBtnText = 'Preview Report'
      break

    default:
      break
  }

  // SHOW RESULT DIALOGUE
  const handleOpenDialogueWithInfo = () => {
    setOpenDialogueWithInfo(true)
  }

  // HIDE RESULT DIALOGUE
  const handleCloseDialogueWithInfo = () => {
    setOpenDialogueWithInfo(false)
  }

  // SET SIDE INFO POSITION
  const handleSetPosition = () => {
    setPosition('0')
  }
  // END OF SET SIDE INFO POSITION

  // FUNCTION TO GET SELECTED CANDIDATE'S INFO
  // const getSingleCandidate = async (candidateId) => {
  //   try {
  //     await publicRequest
  //       .get(`Candidate/SearchByID?Candidateid=${candidateId}`, {
  //         headers: {
  //           Accept: "*",
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((res) => {
  //         setSingleCandidate(res?.data?.data);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // END OF FUNCTION TO GET SELECTED CANDIDATE'S INFO

  // HANDLE ROW CLICK
  const handleRowClick = (row, e) => {
    setSelecedCandidate(row?.row)
    // getSingleCandidate(row?.row?.candidateId);

    setUserDetails({
      ...userDetails,
      clientid: row?.row?.clientId,
      candidateId: row?.row?.candidateId,
    })

    if (e.target.textContent !== 'Authorize') {
      if (position !== '0') {
        setPosition('0')
      }
    }
  }
  // END OF HANDLE ROW CLICK

  // FUNCTION TO HANDLE RECOMMENDATION INPUT
  const handleRecommendationInputChange = (e) => {
    setRecommendation(e.target?.value)
  }
  // END OF FUNCTION TO HANDLE RECOMMENDATION INPUT

  // HANDLE ROW CLICK
  const handleHideSlide = () => {
    setPosition('-100%')
  }
  // END OF HANDLE ROW CLICK

  // FUNCTION TO HANDLE CANDIDATE AUTHORIZATION
  const authorizeUser = async (params, type) => {
    if (type === 'main') {
      // console.log(params?.row?.candidateId)
    }
    if (type === 'notMain') {
      // console.log(selectedCandidate)
    }
    toastId.current = toast('Please wait...', {
      autoClose: 2500,
      isLoading: true,
    })

    let selectedCandidateId =
      params?.row?.candidateId || selectedCandidate?.candidateId
    try {
      await publicRequest
        .put(
          `Candidate/Authorize/${selectedCandidateId}`,
          { recommendation: '' },
          {
            headers: {
              Accept: '*',
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(async () => {
          await props?.getPendingCandidates()
        })
        // .then(() => props?.setReloadTable((prev) => !prev))
        .then(() => {
          toast.update(toastId.current, {
            render: 'Candidate can proceed to the next stage',
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
    }
  }
  // END OF FUNCTION TO HANDLE CANDIDATE AUTHORIZATION

  // FUNCTION TO SEND UPDATED USER DETAILS TO THE BACKEND (PHLEB)
  const updatedUserDetails = async () => {
    const { candidateId, clientId } = selectedCandidate

    toastId.current = toast('Please wait...', {
      isLoading: true,
    })
    setDisableUpdateBtn(true)

    try {
      await publicRequest
        .put(
          `/Candidate/UInfo?Candidateid=${Number(
            candidateId
          )}&Clientid=${Number(clientId)}`,
          userDetails,
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
          await props?.getPendingCandidates().then(() => {
            setPosition('-100%')
          })
          // window.location.reload();
        })
        // .then(() => props?.setReloadTable((prev) => !prev))
        .then(() => {
          toast.update(toastId.current, {
            render: 'Candidate can proceed to the next stage',
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

  // FUNCTION TO SEND RESULT TO QA
  const saveResult = async () => {
    const { candidateId } = selectedCandidate
    toastId.current = toast('Please wait...', {
      isLoading: true,
    })

    const keys = [
      'candidateId',
      'testId',
      'result',
      'department',
      'uploadedBy',
      'clientId',
    ]

    try {
      let found
      for (let index = 0; index < candidateResults?.length; index++) {
        for (const key of keys) {
          if (
            candidateResults[index][key] === '' ||
            candidateResults[index][key] === undefined
          ) {
            found = true // Set found to true if an incomplete field is found
            break // Exit the inner loop if an incomplete field is found
          }
        }
        if (found) {
          break // Exit the outer loop if an incomplete field is found
        }
      }

      if (!found) {
        await publicRequest
          .post(`/Result/create`, candidateResults, {
            headers: {
              Accept: '*',
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
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
          })
          .then(async () => await props?.getPendingCandidates())
          // .then(() => props?.setReloadTable((prev) => !prev))
          .then(() => {
            toast.update(toastId.current, {
              render: 'Result sent to QA for review',
              type: 'success',
              isLoading: false,
              autoClose: 2500,
            })
          })
      } else {
        if (
          window.confirm(
            'Please review your entries: an empty field has been detected. If this is not intentional, kindly complete all required fields before proceeding.'
          )
        ) {
          await publicRequest
            .post(`/Result/create`, candidateResults, {
              headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            })
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
            })
            .then(async () => await props?.getPendingCandidates())
            // .then(() => props?.setReloadTable((prev) => !prev))
            .then(() => {
              toast.update(toastId.current, {
                render: 'Result sent to QA for review',
                type: 'success',
                isLoading: false,
                autoClose: 2500,
              })
            })
        } else {
          toastId.current = toast.dismiss()
        }
      }
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
    }
  }
  // END OF FUNCTION TO SEND RESULT TO QA

  // FUNCTION TO APPROVE RESULT BY QA
  const approveResult = async () => {
    // const { candidateId } = selectedCandidate;
    toastId.current = toast('Please wait...', {
      isLoading: true,
    })

    try {
      if (selectedCandidateResults?.length > 0) {
        await publicRequest
          .post(
            `Result/approve`,
            { id: selectedCandidateResults },
            {
              headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          )
          .then(async () => {
            // return window.location.reload();
            return await props?.getPendingCandidates()
          })
          // .then(() => props?.setReloadTable((prev) => !prev))
          .then(() => {
            toast.update(toastId.current, {
              render: 'Results has been accepted',
              type: 'success',
              isLoading: false,
              autoClose: 2500,
            })
          })
      } else {
        throw new Error('Please select the result to be approved.')
      }
    } catch (error) {
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
    }

    // try {
    //   await publicRequest
    //     .put(
    //       `Candidate/Authorize/${candidateId}`,
    //       {},
    //       {
    //         headers: {
    //           Accept: "*",
    //           Authorization: `Bearer ${token}`,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     )
    //     .then(() => props?.getPendingCandidates())
    //     // .then(() => props?.setReloadTable((prev) => !prev))
    //     .then(() => {
    //       toast.update(toastId.current, {
    //         render: "Result sent to QA for review",
    //         type: "success",
    //         isLoading: false,
    //         autoClose: 2500,
    //       });
    //     });
    // } catch (error) {
    //   toast.update(toastId.current, {
    //     type: "error",
    //     autoClose: 2500,
    //     isLoading: false,
    //     render: `${
    //       error?.response?.data?.title ||
    //       error?.response?.data?.description ||
    //       error?.message ||
    //       "Something went wrong, please try again"
    //     }`,
    //   });
    // }
  }
  // END OF FUNCTION TO APPROVE RESULT BY QA

  // FUNCTION TO SEND RESULT BY REPORTS OFFICER
  const sendReport = async () => {
    if (
      window.confirm(
        'Are you sure you want to send this report? Please review the information carefully before proceeding. Once the report is sent, it cannot be undone.'
      )
    ) {
      toastId.current = toast('Please wait...', {
        isLoading: true,
      })

      const { candidateId } = selectedCandidate
      try {
        await publicRequest
          .put(
            `Candidate/Authorize/${candidateId}`,
            { recommendation: recommendation },
            {
              headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          )
          .then(async () => await props?.getPendingCandidates())
          // .then(() => props?.setReloadTable((prev) => !prev))
          .then(() => {
            toast.update(toastId.current, {
              render: 'Result successfully sent to the client',
              type: 'success',
              isLoading: false,
              autoClose: 2500,
            })
          })
      } catch (error) {
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
      }
    } else {
      console.log(recommendation)
    }
  }
  // END OF FUNCTION TO SEND RESULT BY REPORTS OFFICER

  // FUNCTION TO REJECT RESULT BY QA
  const rejectResult = async () => {
    let rejectedResultDetails = {}

    // const ids = candidateSubmittedResults.map(
    //   (candidateSubmittedResult) => candidateSubmittedResult?.resultId
    // )

    // rejectedResultDetails = { id: ids, rejectionReason: reasonForRejection }
    rejectedResultDetails = {
      id: selectedCandidateResults,
      rejectionReason: reasonForRejection,
    }
    toastId.current = toast('Please wait...', {
      autoClose: 2500,
      isLoading: true,
    })

    try {
      if (reasonForRejection && selectedCandidateResults?.length > 0) {
        await publicRequest
          .post(`Result/reject/`, rejectedResultDetails, {
            headers: {
              Accept: '*',
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
          .then(async () => await props?.getPendingCandidates())
          // .then(() => props?.setReloadTable((prev) => !prev))
          .then(() => {
            toast.update(toastId.current, {
              render: 'Result has been rejected',
              type: 'info',
              isLoading: false,
              autoClose: 2500,
            })
          })
      } else {
        throw new Error(
          'Please select a result and add the reason for rejecting this result.'
        )
      }
    } catch (error) {
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
    }
  }
  // END OF FUNCTION TO REJECT RESULT BY QA

  // HANDLE FUNCTIONS TO CALL BASED ON BUTTON CLICKED
  const handleBtnClick = (e) => {
    e.preventDefault()
    switch (e.target.textContent) {
      case 'Preview Report':
        // btnsAreDisabled ? '' : setOpen(true)

        break
      case 'Save Details':
        updatedUserDetails()
        break
      case 'Authorize':
        authorizeUser(selectedCandidate, 'notMain')
        break
      case 'Save Result':
        saveResult()
        break
      case 'Reject':
        setOpenDialogueWithInfo(true)
        break
      case 'Approve':
        approveResult()
        break
      case 'Send Report':
        sendReport()
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

    // CHECK IF HEIGHT AND WEIGHT ARE AVAILABLE
    userDetails?.height && userDetails?.weight

    bmi = weight / Math.pow(height, 2)
    setUserDetails({ ...userDetails, bmi: bmi?.toString() })

    setBMI(bmi.toFixed(3))
  }
  // END OF FUNCTION TO CALCULATE BMI

  // FUNCTION TO HANDLE CHANGE OF CANDIDATE'S PROPERTIES
  const handleCandidatePropertyChange = (e, dataType) => {
    setUserDetails({ ...userDetails, [dataType]: e.target.value })
  }

  // END OF FUNCTION TO HANDLE CHANGE OF CANDIDATE'S PROPERTIES

  // FUNCTION TO HANDLE URINALYSIS DATA CHANGE
  const handleUrinalysisDetailsChange = (e, dataType) => {
    setUrinalysisDetails({ ...urinalysisDetails, [dataType]: e.target.value })
    setUserDetails({
      ...userDetails,
      urinalysis: JSON.stringify({
        ...urinalysisDetails,
        [dataType]: e.target.value,
      }),
    })
  }
  // END OF FUNCTION TO HANDLE URINALYSIS DATA CHANGE

  // FUNCTION TO HANDLE WIDAL TEST DATA CHANGE
  const handleWidalDetailsChange = (e, dataType) => {
    setWidalTestDetails({ ...widalTestDetails, [dataType]: e.target.value })
    // setUserDetails({
    //   ...userDetails,
    //   urinalysis: JSON.stringify({
    //     ...urinalysisDetails,
    //     [dataType]: e.target.value,
    //   }),
    // })
    // console.log(userDetails)
    candidateResults = candidateResults.map((candidateResult) => {
      if (candidateResult.testId === 19) {
        return {
          ...candidateResult,
          result: JSON.stringify({
            ...widalTestDetails,
            [dataType]: e.target.value,
          }),
        }
      } else {
        return candidateResult
      }
    })

    setCandidateResults(candidateResults)
  }
  // END OF FUNCTION TO HANDLE WIDAL TEST DATA CHANGE

  // FUNCTION TO HANDLE CHANGE OF CANDIDATE'S PROPERTIES
  const handleTestInputChange = (e, data) => {
    if (candidateResults?.length > 0) {
      // MAP OVER THE CANDIDATE RESULTS ARRAY, IF THE IDs MATCH UPDATE, IF NOT RETURN CURRENT ITEM IN THE ARRAY
      candidateResults = candidateResults.map((candidateResult) => {
        if (candidateResult?.testId !== 19) {
          return candidateResult?.testId === data?.testId
            ? { ...candidateResult, result: e.target.value }
            : candidateResult
        } else {
          return candidateResult
        }
      })
      setCandidateResults(candidateResults)
    }
  }

  // END OF FUNCTION TO HANDLE CHANGE OF CANDIDATE'S PROPERTIES

  // use effect to update bmi
  useEffect(() => {
    calculateBmi()
  }, [userDetails?.height, userDetails?.weight])

  // USEEFFECT TO UPDATE SELECTED ROW

  // AS A CANDIDATE IS SELECTED, GET IT'S TESTS AND CREATE A RESULTS LIST
  useEffect(() => {
    if (loggedInUserRole === 'MainLab1') {
      if (selectedCandidate?.candidateId) {
        let resultList = []
        const getCandidatetTests = async () => {
          setLoadingCandedateTests(true)
          setCandedateTestsError(false)

          try {
            await publicRequest
              .get(`Candidate/test/${selectedCandidate?.candidateId}`, {
                headers: {
                  Accept: '*',
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              })
              .then((res) => {
                setCandidateTests(res?.data?.data?.tests)
                let tests = res?.data?.data?.tests

                containsWidalTest = tests?.some((test) => {
                  return test.test === 'Widal test'
                })
                setContainsWidal(containsWidalTest)

                setLoadingCandedateTests(false)

                for (
                  let index = 0;
                  index < res?.data?.data?.tests?.length;
                  index++
                ) {
                  resultList = [
                    ...resultList,
                    {
                      candidateId: selectedCandidate?.candidateId,
                      testId: res?.data?.data?.tests[index]?.testId,
                      result: '',
                      department: 3,
                      uploadedBy: userName,
                      clientId: selectedCandidate?.clientId,
                    },
                  ]
                }
                setCandidateResults(resultList)
              })
          } catch (error) {
            console.log(error)
            setLoadingCandedateTests(false)
            setCandedateTestsError(true)
          }
        }

        getCandidatetTests()
      }
    }

    if (loggedInUserRole === 'Quality assurance') {
      setCandidateSubmittedResults(selectedCandidate?.tests)
    }
    if (loggedInUserRole === 'Report' || loggedInUserRole === 'Customer Care') {
      if (selectedCandidate?.candidateId) {
        const getCandidatetResults = async () => {
          setLoadingCandedateSubmittedResults(true)
          setCandedateSubmittedResultsError(false)
          try {
            await publicRequest
              .get(`Result/candidate/${selectedCandidate?.candidateId}`, {
                headers: {
                  Accept: '*',
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              })
              .then((res) => {
                setLoadingCandedateSubmittedResults(false)
                setLoadingCandedateSubmittedResults(false)
                setCandidateSubmittedResults(res?.data?.data)
              })
          } catch (error) {
            console.log(error)
            setLoadingCandedateSubmittedResults(false)
            setCandedateSubmittedResultsError(true)
            setCandidateSubmittedResults([])
            setCandedateSubmittedResultsErrorMsg(
              error?.response?.data?.title ||
                error?.response?.data?.description ||
                error?.message ||
                'Something went wrong, please try again'
            )
          }
        }

        getCandidatetResults()
      }
    }
  }, [selectedCandidate])

  // USEEFFECT TO UPDATE USER DETAILS
  useEffect(() => {}, [userDetails])

  // USEEFFECT TO UPDATE USER URINALYSIS DETAILS
  useEffect(() => {}, [urinalysisDetails])

  // USEEFFECT TO UPDATE BUTTON DISABLED STATE
  useEffect(() => {}, [btnsAreDisabled])

  // USEEFFECT TO UPDATE CANDIDATE TESTS AND RESULT
  useEffect(() => {}, [candidateTests, candidateSubmittedResults])
  const resultColumn = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'testName',
      headerName: 'Test name',
      width: 150,
    },
    {
      field: 'result',
      headerName: 'Result',
      width: 150,
    },
    {
      field: 'action',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        return (
          <>
            {(loggedInUserRole === 'Report' ||
              loggedInUserRole === 'Customer Care') && (
              <div
                className={
                  params?.row?.status === 'PENDING'
                    ? 'pendingResult'
                    : 'approvedResult'
                }
              >
                {params?.row?.status}
              </div>
            )}
          </>
        )
      },
    },
  ]

  return (
    <div className='pendingCandidatesDatagridWraper'>
      <SimpleBackdrop open={open} handleClose={handleClose} />
      <FormDialog
        open={openDialogueWithInfo}
        handleClose={handleCloseDialogueWithInfo}
        rejectResult={rejectResult}
        setReasonForRejection={setReasonForRejection}
      />

      <form
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
          <p>{selectedCandidate?.clientName}</p>
        </div>

        {loggedInUserRole !== 'Quality assurance' && (
          <div className='phoneNo h3'>
            <h3>Candidate Phone Number</h3>
            <p>{selectedCandidate?.phoneNumber}</p>
          </div>
        )}
        {loggedInUserRole !== 'Quality assurance' && (
          <div className='numberOfTests h3'>
            <h3>{"Candidate's Email"}</h3>
            <p>{selectedCandidate?.email}</p>
          </div>
        )}

        {loggedInUserRole === 'receptionist' && (
          <div className='numberOfTests h3'>
            <h3>{"Candidate's Adderess"}</h3>
            <p>{selectedCandidate?.address}</p>
          </div>
        )}

        {loggedInUserRole === 'Phlebotomy' && (
          <>
            <div className='numberOfTests h3'>
              <h3>{"Candidate's General Details"}</h3>
            </div>
            <div className='basicDetailsWrapper'>
              <FormControl className='genderSelect' size='small'>
                <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={userDetails?.gender}
                  label='Company name'
                  required
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
                className='candidateName basicCandidateDetailsInput'
                onChange={(e) => handleCandidatePropertyChange(e, 'age')}
              />
              <TextField
                id='outlined-search'
                label='Temperature'
                type='string'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='start'>°C</InputAdornment>
                  ),
                }}
                placeholder='°C'
                size='small'
                className='candidateName basicCandidateDetailsInput'
                onChange={(e) =>
                  handleCandidatePropertyChange(e, 'temperature')
                }
              />
              <TextField
                // id="outlined-search"
                label='Weight'
                type='string'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='start'>kg</InputAdornment>
                  ),
                }}
                placeholder='kg'
                className='candidateName basicCandidateDetailsInput'
                onChange={(e) => handleCandidatePropertyChange(e, 'weight')}
                value={userDetails?.weight}
                size='small'
              />
              <TextField
                id='outlined-search'
                label='Height'
                type='number'
                className='candidateName basicCandidateDetailsInput'
                onChange={(e) => handleCandidatePropertyChange(e, 'height')}
                value={userDetails?.height}
                placeholder='m'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='start'>m</InputAdornment>
                  ),
                }}
                size='small'
              />
              <TextField
                id='outlined-search'
                label='BMI'
                type='number'
                value={BMI}
                className='candidateName basicCandidateDetailsInput'
                InputLabelProps={{ shrink: true }}
                size='small'
              />
              <TextField
                id='outlined-search'
                label='Blood Pressure, Heart Rate'
                type='search'
                className='candidateName basicCandidateDetailsInput'
                onChange={(e) =>
                  handleCandidatePropertyChange(e, 'bloodPressure')
                }
                size='small'
              />
              <TextField
                id='outlined-search'
                label='Visual Acuity'
                type='search'
                className='candidateName basicCandidateDetailsInput'
                onChange={(e) =>
                  handleCandidatePropertyChange(e, 'visaulAcuity')
                }
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
                size='small'
              />
            </div>
            <div className='numberOfTests h3 urinalysisWrapper'>
              <h3 className='urinalysisH3'>
                {'Urinalysis and Stool Analysis Details'}
              </h3>
              <div className='basicDetailsWrapper'>
                <TextField
                  id='outlined-search'
                  label='Stool Analysis'
                  type='search'
                  className='candidateName basicCandidateDetailsInput'
                  onChange={(e) =>
                    handleCandidatePropertyChange(e, 'stoolAnalysis')
                  }
                  size='small'
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
                  size='small'
                />
                <TextField
                  id='outlined-search'
                  label='Nitrites'
                  type='search'
                  className='candidateName basicCandidateDetailsInput'
                  onChange={(e) => handleUrinalysisDetailsChange(e, 'Nitrites')}
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
                  size='small'
                />
                <TextField
                  id='outlined-search'
                  label='Protein'
                  type='search'
                  className='candidateName basicCandidateDetailsInput'
                  onChange={(e) => handleUrinalysisDetailsChange(e, 'Protein')}
                  size='small'
                />
                <TextField
                  id='outlined-search'
                  label='pH'
                  type='search'
                  className='candidateName basicCandidateDetailsInput'
                  onChange={(e) => handleUrinalysisDetailsChange(e, 'pH')}
                  size='small'
                />
                <TextField
                  id='outlined-search'
                  label='Blood'
                  type='search'
                  className='candidateName basicCandidateDetailsInput'
                  onChange={(e) => handleUrinalysisDetailsChange(e, 'Blood')}
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
                  size='small'
                />
                <TextField
                  id='outlined-search'
                  label='Ketone'
                  type='search'
                  className='candidateName basicCandidateDetailsInput'
                  onChange={(e) => handleUrinalysisDetailsChange(e, 'Ketone')}
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
                  size='small'
                />
                <TextField
                  id='outlined-search'
                  label='Glucose'
                  type='search'
                  className='candidateName basicCandidateDetailsInput'
                  onChange={(e) => handleUrinalysisDetailsChange(e, 'Glucose')}
                  size='small'
                />
              </div>
            </div>
          </>
        )}

        {loggedInUserRole === 'MainLab1' && (
          // loggedInUserRole === "Quality assurance") && (
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
                    Age -----
                    <span style={{ fontWeight: 'bold' }}>
                      {selectedCandidate?.age || singleCandidate?.age} years
                    </span>
                  </Typography>
                  <Typography>
                    Gender -----
                    <span style={{ fontWeight: 'bold' }}>
                      {selectedCandidate?.gender || singleCandidate?.gender}
                    </span>
                  </Typography>
                  <Typography>
                    BMI -----
                    <span style={{ fontWeight: 'bold' }}>
                      {Number(
                        selectedCandidate?.bmi || singleCandidate?.bmi
                      )?.toFixed(3)}
                    </span>
                  </Typography>
                  <Typography>
                    Height -----
                    <span style={{ fontWeight: 'bold' }}>
                      {selectedCandidate?.height || singleCandidate?.height}m
                    </span>
                  </Typography>
                  <Typography>
                    Weight -----{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      {selectedCandidate?.weight || singleCandidate?.weight}kg
                    </span>
                  </Typography>
                  <Typography>
                    bloodPressure, Heart Rate -----
                    <span style={{ fontWeight: 'bold' }}>
                      {selectedCandidate?.bloodPressure ||
                        singleCandidate?.bloodPressure}
                    </span>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            {loggedInUserRole === 'MainLab1' && (
              <>
                <div className='basicDetailsWrapper'>
                  {loadingCandedateTests || candedateTestsError
                    ? loadingCandedateTests
                      ? 'Loading...'
                      : 'An error occured, please try again'
                    : candidateTests?.length === 0
                    ? 'No test for selected candidate'
                    : candidateTests?.map((candidateTest, index) => {
                        return (
                          candidateTest?.test !== 'Widal test' &&
                          (candidateTest?.testId === 64 ||
                          candidateTest?.testId === 30 ||
                          candidateTest?.testId === 38 ? (
                            <div className='textAreaSingleInput'>
                              <p>{candidateTest?.test}</p>
                              <div className='textAreaInputWrapper'>
                                <textarea
                                  // value={recommendation}
                                  type='text'
                                  className='specialTextArea'
                                  onChange={(e) =>
                                    handleTestInputChange(e, candidateTest)
                                  }
                                />
                              </div>
                            </div>
                          ) : (
                            <TextField
                              key={index}
                              id={candidateTest?.id}
                              label={candidateTest?.test}
                              type='search'
                              className='candidateName basicCandidateDetailsInput'
                              onChange={(e) =>
                                handleTestInputChange(e, candidateTest)
                              }
                              size='small'
                            />
                          ))
                        )
                      })}
                </div>
                {containsWidal && (
                  <div className='widalTestWrapper'>
                    <h3 className='widalTestH3'>{'Widal Test'}</h3>
                    <div className='widalTestBasicDetailsWrapper'>
                      <TextField
                        id='outlined-search'
                        label='S.typhi O'
                        type='search'
                        className='candidateName basicCandidateDetailsInput'
                        onChange={(e) =>
                          handleWidalDetailsChange(e, 'S.typhi O')
                        }
                        size='small'
                        placeholder='A:B'
                      />
                      <TextField
                        id='outlined-search'
                        label='S.typhi H'
                        type='search'
                        className='candidateName basicCandidateDetailsInput'
                        onChange={(e) =>
                          handleWidalDetailsChange(e, 'S.typhi H')
                        }
                        size='small'
                        placeholder='A:B'
                      />
                      <TextField
                        id='outlined-search'
                        label='S.paratyphi-A O'
                        type='search'
                        className='candidateName basicCandidateDetailsInput'
                        onChange={(e) =>
                          handleWidalDetailsChange(e, 'S.paratyphi-A O')
                        }
                        size='small'
                        placeholder='A:B'
                      />
                      <TextField
                        id='outlined-search'
                        label='S.paratyphi-A H'
                        type='search'
                        className='candidateName basicCandidateDetailsInput'
                        onChange={(e) =>
                          handleWidalDetailsChange(e, 'S.paratyphi-A H')
                        }
                        size='small'
                        placeholder='A:B'
                      />
                      <TextField
                        id='outlined-search'
                        label='S.paratyphi-B O'
                        type='search'
                        className='candidateName basicCandidateDetailsInput'
                        onChange={(e) =>
                          handleWidalDetailsChange(e, 'S.paratyphi-B O')
                        }
                        size='small'
                        placeholder='A:B'
                      />
                      <TextField
                        id='outlined-search'
                        label='S.paratyphi-B H'
                        type='search'
                        className='candidateName basicCandidateDetailsInput'
                        onChange={(e) =>
                          handleWidalDetailsChange(e, 'S.paratyphi-B H')
                        }
                        size='small'
                        placeholder='A:B'
                      />
                      <TextField
                        id='outlined-search'
                        label='S.paratyphi-C O'
                        type='search'
                        className='candidateName basicCandidateDetailsInput'
                        onChange={(e) =>
                          handleWidalDetailsChange(e, 'S.paratyphi-C O')
                        }
                        size='small'
                        placeholder='A:B'
                      />
                      <TextField
                        id='outlined-search'
                        label='S.paratyphi-C H'
                        type='search'
                        className='candidateName basicCandidateDetailsInput'
                        onChange={(e) =>
                          handleWidalDetailsChange(e, 'S.paratyphi-C H')
                        }
                        size='small'
                        placeholder='A:B'
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
        {loggedInUserRole === 'Quality assurance' && (
          <div className='qaResultsWrapper'>
            {candidateSubmittedResults?.length === 0 ? (
              'No result for selected candidate'
            ) : (
              <Box sx={{ height: 300, width: '100%' }}>
                <DataGrid
                  rows={candidateSubmittedResults || []}
                  columns={resultColumn}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  getRowId={(row) => row?.resultId}
                  onRowSelectionModelChange={(result) => {
                    return setSelectedCandidateResults(result)
                  }}
                />
              </Box>
            )}
          </div>
        )}
        {(loggedInUserRole === 'Report' ||
          loggedInUserRole === 'Customer Care') && (
          <div className='reportResultsWrapper'>
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
                  <Typography>Age -{selectedCandidate?.age} years</Typography>
                  <Typography>Gender - {selectedCandidate?.gender}</Typography>
                  <Typography>
                    BMI - {Number(selectedCandidate?.bmi)?.toFixed(3)}
                  </Typography>
                  <Typography>Height - {selectedCandidate?.height}m</Typography>
                  <Typography>
                    Weight - {selectedCandidate?.weight}kg
                  </Typography>
                  <Typography>
                    Blood Pressure/Heart rate -{' '}
                    {selectedCandidate?.bloodPressure}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            {loadingCandedateSubmittedResults ||
            candedateSubmittedResultsError ? (
              loadingCandedateSubmittedResults ? (
                <div className=''>Loading...</div>
              ) : (
                candedateSubmittedResultsErrorMsg
              )
            ) : candidateSubmittedResults?.length === 0 ? (
              'No test for selected candidate'
            ) : (
              <>
                <Box sx={{ height: 300, width: '100%' }}>
                  <DataGrid
                    rows={candidateSubmittedResults || []}
                    columns={resultColumn}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    getRowId={(row) => row?.resultId}
                    onRowSelectionModelChange={(result) => {
                      return setSelectedCandidateResults(result)
                    }}
                  />
                </Box>
                <div className='recommendationSingleInput'>
                  <p>
                    Recommendation <span>*</span>
                  </p>
                  <div className='recommendationInputWrapper'>
                    <textarea
                      value={recommendation}
                      type='text'
                      className='recommendationTextArea'
                      onChange={(e) => handleRecommendationInputChange(e)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        {loggedInUserRole !== 'Report' &&
          loggedInUserRole !== 'Customer Care' && (
            <div className='bottomButtons'>
              {leftBtnText && (
                <div
                  className=' rejectResult'
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
          )}
        {(loggedInUserRole === 'Report' ||
          loggedInUserRole === 'Customer Care') &&
          candidateSubmittedResults.length > 0 &&
          !loadingCandedateSubmittedResults && (
            <div className='bottomButtons'>
              {leftBtnText && (
                <div
                  className=' rejectResult'
                  onClick={(e) => handleBtnClick(e)}
                >
                  {leftBtnText}
                </div>
              )}
              {rightBtnText?.length > 0 &&
                (rightBtnText === 'Preview Report' ? (
                  <Link
                    to={`/labReport/${
                      selectedCandidate && selectedCandidate.candidateId
                    }`}
                    target='_blank'
                    className='authorize'
                    disabled={disableUpdateBtn}
                  >
                    {/* <button className='authorize' disabled={disableUpdateBtn}> */}
                    {rightBtnText}
                    {/* abab */}
                    {/* </button> */}
                  </Link>
                ) : (
                  <button
                    className='authorize'
                    disabled={disableUpdateBtn}
                    onClick={(e) => handleBtnClick(e)}
                  >
                    {rightBtnText}
                  </button>
                ))}
            </div>
          )}
      </form>
      <Box sx={{ height: 350 }}>
        <h3>{title}</h3>
        <DataGrid
          rows={tableData}
          columns={defaultColumns}
          pageSize={pageSize}
          // checkboxSelection
          // disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          onRowClick={(row, e) => handleRowClick(row, e)}
          getRowId={(row) =>
            row?.candidateId || row?.candidateName + row?.clientName
          }
          pagination
          rowSelection={false}
        />
      </Box>
    </div>
  )
}

export default PendingCandidatesDatagrid
