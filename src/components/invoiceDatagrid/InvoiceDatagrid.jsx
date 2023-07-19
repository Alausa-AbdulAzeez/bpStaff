/* eslint-disable react/prop-types */
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'

import './invoiceDatagrid.scss'
import { format } from 'date-fns'

const InvoiceDatagrid = (props) => {
  // TABLE ROWS TO LOAD
  const [pageSize, setPageSize] = useState(100)

  // TABLE DATA
  const tableData = props?.tableData
  console.log(tableData)
  let title = 'Invoices'

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
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 130,
    },
  ]

  return (
    <div className='invoiceDatagridWraper'>
      <div className='boxWrapper'>
        <Box sx={{ height: 350, zIndex: -1 }}>
          <h3>{title}</h3>
          <DataGrid
            rows={tableData}
            columns={defaultColumns}
            pageSize={pageSize}
            experimentalFeatures={{ newEditingApi: true }}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[100, 200, 300]}
            pagination
            getRowId={(row) => row.candidateId}
          />
        </Box>
      </div>
    </div>
  )
}

export default InvoiceDatagrid
