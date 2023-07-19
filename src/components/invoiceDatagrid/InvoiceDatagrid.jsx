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
    {
      field: 'testCategory',
      headerName: 'Test Category',
      width: 250,
      editable: false,
    },

    {
      field: 'amount',
      headerName: 'Amount',
      width: 200,
    },
    {
      field: 'appointmentdate',
      headerName: 'Appointment Date',
      width: 150,
      description: 'The candidate shoul be present by this date',
      renderCell: (props) => {
        console.log(props)
        console.log(props.value)
        const refinedDate = new Date(props?.row?.appointmentDate)
        const dateWithRightFormat = format(refinedDate, 'dd-MMM-yyyy')
        return <div>{dateWithRightFormat}</div>
      },
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
            getRowId={(row) =>
              row.candidateName + Math.random() + new Date().getMilliseconds()
            }
          />
        </Box>
      </div>
    </div>
  )
}

export default InvoiceDatagrid
