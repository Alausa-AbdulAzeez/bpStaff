import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './reports.scss'
import searchImg from '../../utils/images/searchImg.png'
import ReportsDatagrid from '../../components/reportsDatagrid/ReportsDatagrid'

const Reports = (props) => {
  const [searched, setSearched] = useState(false)
  const loggedInUserRole = props.userDetails?.role

  console.log(props)
  return (
    <div className='reportsWrapper'>
      <Sidebar loggedInUserRole={loggedInUserRole} />
      <div className='reportsRight'>
        <Topber userName={props.userDetails.name} />
        <div className='reportsMainWrapper'>
          <div className='reportsMainTop'>
            <h3 className='reportsMainTopTitle'>Search</h3>
            <div className='reportsMainTopForm'>
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
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id='outlined-search'
                label='Candidate name'
                type='search'
                className='candidateName'
              />

              <div className='reportsBtn'>Search</div>
            </div>
          </div>
          <div className='reportsMainBottom'>
            {searched && (
              <>
                <img src={searchImg} alt='Search' className='searchImg' />
                <h3>Nothing to see here, yet</h3>
              </>
            )}
            {<ReportsDatagrid userDetails={props.userDetails} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
