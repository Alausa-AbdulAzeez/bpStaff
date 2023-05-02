import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import './homedatagrid.scss'

const Homedatagrid = () => {
  const [pageSize, setPageSize] = useState(5)
  let rows
  let columns
  let title
  const loggedInUserRole = 'labScientist'
  const receptionistcolumns = [
    {
      field: 'lastName',
      headerName: 'Candidate Name',
      width: 250,
      editable: true,
    },
    { field: 'id', headerName: 'Company Name', width: 190 },
    {
      field: 'firstName',
      headerName: 'Number of tests',
      width: 140,
      editable: false,
    },
    {
      field: 'action',
      headerName: 'Authorize',
      width: 170,
      renderCell: (params) => {
        return (
          <>
            {params.row.attendedTo === 'true' ? (
              <div className='homeNotAuthorized'>Authorize</div>
            ) : (
              <div className='homeNotAuthorized'>Authorize</div>
            )}
          </>
        )
      },
    },
    { field: 'date', headerName: 'Appointment Date', width: 190 },

    {
      field: 'role',
      headerName: 'Attended to',
      width: 130,
      renderCell: () => {
        return (
          <>
            <div className='homeNotAttendedTo'>False</div>
          </>
        )
      },
    },
  ]

  const receptionistRows = [
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
            <div className='homeNotAttendedTo'>False</div>
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
    { id: 8, lastName: 'Frances', firstName: '3', age: 36, attendedTo: 'true' },
    { id: 9, lastName: 'Roxie', firstName: '3', age: 65, attendedTo: 'true' },
  ]

  const labScientistColumns = [
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
            <div className='homeAttendedTo'>True</div>
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
    { id: 8, lastName: 'Frances', firstName: '3', age: 36, attendedTo: 'true' },
    { id: 9, lastName: 'Roxie', firstName: '3', age: 65, attendedTo: 'true' },
  ]

  switch (loggedInUserRole) {
    case 'receptionist':
      rows = receptionistRows
      columns = receptionistcolumns
      title = 'Candidates'
      break
    case 'phlebotomist':
      rows = phlebotomistRows
      columns = phlebotomistcolumns
      title = 'Candidates'
      break
    case 'labScientist':
      rows = labScientistRows
      columns = labScientistColumns
      title = 'Candidates'
      break

    default:
      break
  }
  return (
    <div className='datagridWraper'>
      <h3>{title}</h3>
      <Box sx={{ height: 350, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          // checkboxSelection
          // disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
        />
      </Box>
    </div>
  )
}

export default Homedatagrid
