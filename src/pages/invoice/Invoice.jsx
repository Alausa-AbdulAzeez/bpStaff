import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'

import Topber from '../../components/topbar/Topber'
import './invoice.scss'
import { useSelector } from 'react-redux'
import { publicRequest } from '../../functions/requestMethods'
import { ToastContainer, toast } from 'react-toastify'
import ErrorComponent from '../../components/error/Error'
import Loading from '../../components/loading/Loading'
import DatePicker from 'react-datepicker'
import InvoiceDatagrid from '../../components/invoiceDatagrid/InvoiceDatagrid'

const Invoice = () => {
  // MISCELLANEOUS
  const toastId = React.useRef(null)

  // GET CURRENT LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user)
  const loggedInUserRole = currentUser?.data?.role
  const userName = currentUser?.data?.profile?.fullName

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data)

  // LOADING AND ERROR DATA
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  // END OF LOADING AND ERROR DATA

  // TABLE DATA
  const [tableData, setTableData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  // CLIENTS DATA
  const [clients, setClients] = useState([])
  const [clientId, setClientId] = useState(null)

  // DATE SELECTION
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  // FILTER PARAMS
  const [filters, setFilters] = useState({
    clientId: '',
    phoneNumberOrName: '',
    date: '',
  })

  // FUNCTION TO HANDLE INPUT CHANGES
  const handleInputChange = (event, name, data) => {
    if (name === 'phoneNumberOrName') {
      setFilters({ ...filters, [name]: event?.target?.value?.trim() })
    }
    if (name === 'date') {
      setStartDate(data)
      setFilters({ ...filters, [name]: data })
    }
    if (name === 'clientId') {
      setFilters({ ...filters, [name]: data?.clientId })
    }
    // setFilters({ ...filters, [name]: value.trim() });
  }
  // END OF FUNCTION TO HANDLE INPUT CHANGES

  // FUNCTION TO GET AND SET ALL CANDIDATES
  const getAllCandidates = async () => {
    setStartDate(null)
    setFilters({ clientId: '', phoneNumberOrName: '', date: '' })

    try {
      setLoading(true)
      const res = await publicRequest.get('/Candidate', {
        headers: {
          Accept: '*',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data) {
        setTableData(res.data?.data?.reverse())
        setFilteredData(res.data?.data?.reverse())
        setLoading(false)
      } else {
        console.log(res.data)
      }
    } catch (error) {
      setLoading(false)
      setError(true)
      setErrorMessage(error)

      console.log(error)
    }
  }
  // END OF FUNCTION TO GET AND SET ALL CANDIDATES

  //  FUNCTIONALITIES FOR FETCHING AND SETTING CLIENTS

  const getAllClients = async () => {
    try {
      const res = await publicRequest.get('Client/Client-list', {
        headers: {
          Accept: '*',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (res.data) {
        setClients(res.data.data)
      } else {
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //  END OF FUNCTIONALITIES FOR FETCHING AND SETTING CLIENTS

  // FUNCTION FOR SETTING CLIENT ID
  // const handlescheduleCandidateInfo = (e, dataName, data) => {
  //   setClientId(data?.clientId)
  // }
  //END OF FUNCTION FOR SETTING CLIENT ID

  // FUNCTION TO FILTER DATA
  const filterData = () => {
    console.log(tableData)
    const filteredData = tableData.filter((item) => {
      const { clientId, phoneNumberOrName, date } = filters
      console.log(clientId, phoneNumberOrName, date)

      const correctDate = new Date(date)

      console.log(correctDate.toLocaleString())
      const month = (date && date?.getMonth() + 1).toString().padStart(2, '0')

      const year = date && date?.getFullYear()

      const newString = year && month ? year + '-' + month : ''
      console.log(newString)

      // const newString =
      //   correctDate.toLocaleString().split(",")[0].split("/")[2] +
      //   "-" +
      //   "0" +
      //   correctDate.toLocaleString().split(",")[0].split("/")[0];

      const itemCompanyId = item?.clientid?.toString().includes(clientId)
      const itemPhoneNumber = item?.phoneNumber
        ?.toString()
        .includes(phoneNumberOrName)
      const itemName = item?.candidateName
        ?.toLowerCase()
        .includes(phoneNumberOrName.toLowerCase())
      const itemDate = item?.createdDate?.substring(0, 7).includes(newString)
      console.log(itemDate)
      return (
        (clientId === '' || itemCompanyId) &&
        (phoneNumberOrName === '' || itemPhoneNumber || itemName) &&
        (date === '' || itemDate)
      )
    })
    console.log(filteredData)
    setFilteredData(filteredData)
  }
  // END OF FUNCTION TO FILTER DATA

  // USE EFFECT TO GET ALL CANDIDATES AS THE PAGE LOADS
  useEffect(() => {
    getAllCandidates()
  }, [])

  // use effect to call the getAllClients function as the page loads
  useEffect(() => {
    getAllClients()
  }, [])
  // end of use effect to call the getAllClients function as the page loads

  return (
    <>
      <ToastContainer />
      <div className='candidateSearchWrapper'>
        <Sidebar loggedInUserRole={loggedInUserRole} />
        <div className='candidateSearchRight'>
          <Topber userName={userName} />
          <div className='candidateSearchMainWrapper'>
            <div className='filterContainer'>
              <Autocomplete
                // disablePortal
                options={clients}
                getOptionLabel={(option) =>
                  `${option.clientName} ${option.email}`
                }
                onChange={(e, option) =>
                  handleInputChange(e, 'clientId', option)
                }
                key={loading}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label='Client Name' size='small' />
                )}
              />

              <div className='filterDateWrapper'>
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update)
                  }}
                  placeholderText='Start-date - End-date'
                  // onChange={(date, e) => handleInputChange(e, 'date', date)}
                  className='filterDate'
                  isClearable={true}
                  // selected={startDate}
                />
              </div>
              <button className='searchFilterBtn' onClick={filterData}>
                Search
              </button>
              <button
                className='resetBtn'
                onClick={getAllCandidates}
                // onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
            <div className='candidateSearchMainBottom'>
              {/* <Loading /> */}
              {loading || error ? (
                loading ? (
                  <Loading />
                ) : (
                  <ErrorComponent errorMessage={errorMessage && errorMessage} />
                )
              ) : (
                <InvoiceDatagrid
                  userDetails={currentUser}
                  tableData={filteredData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Invoice
