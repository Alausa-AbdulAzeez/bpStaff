import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './viewClients.scss'
import searchImg from '../../utils/images/searchImg.png'
import ViewClientsDatagrid from '../../components/viewClientsDatagrid/ViewClientsDatagrid'

const ViewClients = (props) => {
  const [searched, setSearched] = useState(false)
  const loggedInUserRole = props.userDetails?.role

  return (
    <div className='viewClientsWrapper'>
      <Sidebar loggedInUserRole={loggedInUserRole} />
      <div className='viewClientsRight'>
        <Topber userName={props.userDetails?.name} />
        <div className='viewClientsMainWrapper'>
          <div className='viewClientsMainTop'>
            <h3 className='viewClientsMainTopTitle'>Search</h3>
            <div className='viewClientsMainTopForm'>
              <FormControl className='companySelect'>
                <InputLabel id='demo-simple-select-label'>
                  Company name
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  //   value={age}
                  label='Company name'
                  //   onChange={handleChange}
                >
                  <MenuItem value={10}>Chicken Republic</MenuItem>
                  <MenuItem value={20}>Union Bank</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className='viewClientsMainBottom'>
            {searched && (
              <>
                <img src={searchImg} alt='Search' className='searchImg' />
                <h3>Nothing to see here, yet</h3>
              </>
            )}
            {<ViewClientsDatagrid userDetails={props.userDetails} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewClients
