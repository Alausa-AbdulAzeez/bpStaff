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
    date: '',
  })

  // FUNCTION TO HANDLE INPUT CHANGES
  const handleInputChange = (event, name, data) => {
    if (name === 'date') {
      setFilters({ ...filters, [name]: data })
    }
    if (name === 'clientId') {
      setFilters({ ...filters, [name]: data?.clientId })
      setClientId(data?.clientId)
    }
    // setFilters({ ...filters, [name]: value.trim() });
  }
  // END OF FUNCTION TO HANDLE INPUT CHANGES

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

  // FUNCTION TO CONVERT DATE TO THE CORRECT FORMAT
  function convertDateFormat(localeString) {
    const dateObj = new Date(localeString)

    const year = dateObj.getFullYear()
    const day = String(dateObj.getDate()).padStart(2, '0')
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')

    return `${year}/${month}/${day}`
  }
  // END OF FUNCTION TO CONVERT DATE TO THE CORRECT FORMAT

  // FUNCTION TO GET AND SET ALL CANDIDATES
  const getInvoices = async () => {
    // setFilters({ clientId: '', phoneNumberOrName: '', date: '' })
    toastId.current = toast('Please wait...', {
      autoClose: 2500,
      isLoading: true,
    })

    const startDate = new Date(
      filters?.date?.[0] ? filters?.date?.[0] : new Date()
    )
    const endDate = new Date(
      filters?.date?.[1] ? filters?.date?.[1] : new Date()
    )

    console.log(startDate)

    const convertedStartDate = convertDateFormat(startDate.toLocaleString())
    const convertedEndDate = convertDateFormat(endDate.toLocaleString())

    const url = `/Bill/invoice/${filters?.clientId}?startDate=${
      convertedStartDate || '2023/01/01'
    }&endDate=${convertedEndDate || '2024/01/01'}`

    try {
      console.log(url)
      const res = await publicRequest.get(url, {
        headers: {
          Accept: '*',
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data) {
        setTableData(res.data?.data?.reverse())
        setFilteredData(res.data?.data?.reverse())

        console.log(res.data?.data)
        if (res.data?.data?.length === 0 || res.data?.data === '') {
          toast.update(toastId.current, {
            render: 'No Invoice available',
            type: 'info',
            isLoading: false,
            autoClose: 2500,
          })
        } else {
          toast.update(toastId.current, {
            render: 'Incoice(s) fetched successfully!',
            type: 'success',
            isLoading: false,
            autoClose: 2500,
          })
        }
      } else {
        console.log(res.data)
      }
    } catch (error) {
      setError(true)
      setErrorMessage(error)

      console.log(error)
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
  // END OF FUNCTION TO GET AND SET ALL CANDIDATES

  // USE EFFECT TO GET ALL CANDIDATES AS THE PAGE LOADS
  // useEffect(() => {
  //   getInvoices()
  // }, [])

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
                  onChange={(update, e) => {
                    handleInputChange(e, 'date', update)
                    setDateRange(update)
                  }}
                  placeholderText='Start-date - End-date'
                  // onChange={(date, e) => handleInputChange(e, 'date', date)}
                  className='invoiceFilterDate'
                  isClearable={true}
                  key={loading}
                  // selected={startDate}
                />
              </div>
              <button
                className='searchFilterBtn'
                onClick={getInvoices}
                disabled={clientId ? false : true}
              >
                Search
              </button>
              <button
                className='resetBtn'
                onClick={(prev) => setLoading(!prev)}
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
