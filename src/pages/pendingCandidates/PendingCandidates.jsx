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
import './pendingCandidates.scss'
import searchImg from '../../utils/images/searchImg.png'
import PendingCandidatesDatagrid from '../../components/pendingCandidatesDatagrid/PendingCandidatesDatagrid'

const PendingCandidates = (props) => {
  const [searched, setSearched] = useState(false)

  const loggedInUserRole = props.userDetails?.role

  return (
    <div className='pendingCandidatesWrapper'>
      <Sidebar loggedInUserRole={loggedInUserRole} />
      <div className='pendingCandidatesRight'>
        <Topber userName={props.userDetails.name} />
        <div className='pendingCandidatesMainWrapper'>
          <div className='pendingCandidatesMainTop'>
            <h3 className='pendingCandidatesMainTopTitle'>Search</h3>
            <div className='pendingCandidatesMainTopForm'>
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
                  <MenuItem value={10}>Union Bank</MenuItem>
                  <MenuItem value={20}>Chicken Republic</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id='outlined-search'
                label='Candidate name'
                type='search'
                className='candidateName'
              />

              <div className='pendingCandidatesBtn'>Search</div>
            </div>
          </div>
          <div className='pendingCandidatesMainBottom'>
            {searched && (
              <>
                <img src={searchImg} alt='Search' className='searchImg' />
                <h3>Nothing to see here, yet</h3>
              </>
            )}
            {<PendingCandidatesDatagrid userDetails={props.userDetails} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PendingCandidates
