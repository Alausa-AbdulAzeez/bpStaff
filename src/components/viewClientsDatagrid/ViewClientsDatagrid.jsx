import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { MdCancel, MdExpandLess, MdExpandMore } from 'react-icons/md'
import { FaAngleDown } from 'react-icons/fa'
import './viewClientsDatagrid.scss'
import { BsCheck, BsListCheck } from 'react-icons/bs'

const ViewClientsDatagrid = (props) => {
  const [pageSize, setPageSize] = useState(5)
  const [position, setPosition] = useState('-100%')
  let rows
  let columns
  let title
  const loggedInUserRole = props.userDetails?.role

  // LIST TOGGLE FUNCTIONALITY
  const [openListItem, setOpenListItem] = React.useState(true)

  const handleClick = () => {
    setOpenListItem(!openListItem)
  }
  // END OF LIST TOGGLE FUNCTIONALITY

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
    { field: 'compName', headerName: 'Company Name', width: 350 },
    {
      field: 'firstName',
      headerName: 'Number of Candidates',
      width: 250,
      editable: false,
    },
    {
      field: 'Date',
      headerName: 'Date',
      width: 350,
      editable: false,
    },
    // {
    //   field: 'action',
    //   headerName: 'Report Status',
    //   width: 250,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         {params.row.attendedTo === 'true' ? (
    //           <div className='notSent'>Not Sent</div>
    //         ) : (
    //           <div className='sent'>Sent</div>
    //         )}
    //       </>
    //     )
    //   },
    // },
  ]

  const receptionistRows = [
    {
      id: 1,
      firstName: '1',
      Date: '1-March-2023',
      attendedTo: 'false',
      compName: 'Chicken Republic',
    },
    {
      id: 2,

      firstName: '1',
      Date: '1-March-2023',
      attendedTo: 'true',
      compName: 'Chicken Republic',
    },
    {
      id: 3,

      firstName: '3',
      Date: '1-March-2023',
      attendedTo: 'false',
      compName: 'Chicken Republic',
    },
    {
      id: 4,
      firstName: '3',
      Date: '1-March-2023',
      attendedTo: 'true',
      compName: 'Chicken Republic',
    },
    {
      id: 5,
      lastName: 'Targaryen',
      firstName: '2',
      Date: '1-March-2023',
      attendedTo: 'true',
      compName: 'Chicken Republic',
    },
    {
      id: 6,

      firstName: '2',
      Date: '1-March-2023',
      attendedTo: 'true',
    },
    {
      id: 7,
      compName: 'Chicken Republic',
      firstName: '3',
      Date: '1-March-2023',
      attendedTo: 'true',
    },
    {
      id: 8,
      firstName: '3',
      Date: '1-March-2023',
      attendedTo: 'true',
      compName: 'Chicken Republic',
    },
    {
      id: 9,
      firstName: '3',
      Date: '1-March-2023',
      attendedTo: 'true',
      compName: 'Chicken Republic',
    },
  ]

  if (loggedInUserRole !== 'null') {
    rows = receptionistRows
    columns = receptionistcolumns
    title = 'Clients'
  }

  return (
    <div className='viewClientsDatagridWraper'>
      <div className='viewClientsSlide' style={{ right: position }}>
        <div className='viewClientsSlideTop'>
          <div
            className='viewClientsCancelconWrapper'
            onClick={handleHideSlide}
          >
            <MdCancel className='viewClientsCancelIcon' />
          </div>
          <div className='viewClientsInitials'>AA</div>
          <div className='viewClientsSlideFullname'>Alausa Abdulazeez</div>
        </div>
        <div className='viewClientsCompanyName h3'>
          <h3>Company Name</h3>
          <p>Chicken Republic</p>
        </div>

        <div className='viewClientsPhoneNo h3'>
          <h3>Contact Number</h3>
          <p>+23456789010</p>
        </div>
        <div className='viewClientsNumberOfTests h3'>
          <h3>Number of Candidates</h3>
          <p>3</p>
        </div>
        <div className='accordionWrapper'>
          <Accordion>
            <AccordionSummary
              expandIcon={<FaAngleDown />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>Candidates</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <BsCheck />
                </ListItemIcon>
                <ListItemText primary='John Afolabi' />
                <ListItemText primary='Pre Employment' />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <BsCheck />
                </ListItemIcon>
                <ListItemText primary='Dayo Banjo' />
                <ListItemText primary={`Food Handlers'`} />
                <ListItemText primary={`Pre Employment`} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <BsCheck />
                </ListItemIcon>
                <ListItemText primary='John Afolabi' />
                <ListItemText primary={`Food Handlers'`} />
                <ListItemText primary={`Pre Employment`} />
              </ListItemButton>
              {/* <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography> */}
            </AccordionDetails>
          </Accordion>
          <br />

          {/* <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
            }}
            component='nav'
            aria-labelledby='nested-list-subheader'
            subheader={
              <ListSubheader
                component='div'
                id='nested-list-subheader'
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Screening Details
              </ListSubheader>
            }
          >
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <BsListCheck />
              </ListItemIcon>
              <ListItemText primary='Pre-Employment' />
              {openListItem ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>
            <Collapse in={openListItem} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <BsCheck />
                  </ListItemIcon>
                  <ListItemText primary='Hepatitis' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <BsCheck />
                  </ListItemIcon>
                  <ListItemText primary='BP' />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
            }}
            component='nav'
            aria-labelledby='nested-list-subheader'
            subheader={
              <ListSubheader
                component='div'
                id='nested-list-subheader'
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: 'black',
                }}
              >
                Screening Details
              </ListSubheader>
            }
          >
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <BsListCheck />
              </ListItemIcon>
              <ListItemText primary='Pre-Employment' />
              {openListItem ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>
            <Collapse in={openListItem} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <BsCheck />
                  </ListItemIcon>
                  <ListItemText primary='Hepatitis' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <BsCheck />
                  </ListItemIcon>
                  <ListItemText primary='BP' />
                </ListItemButton>
              </List>
            </Collapse>
          </List> */}
        </div>

        <div className='viewClientsDate'>
          January-<small>24</small>-<small>2024</small>
        </div>
      </div>
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
          onRowClick={(row, e) => handleRowClick(row, e)}
          pagination
        />
      </Box>
    </div>
  )
}

export default ViewClientsDatagrid
