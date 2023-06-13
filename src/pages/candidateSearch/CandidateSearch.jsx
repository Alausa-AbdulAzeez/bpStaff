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
import './candidateSearch.scss'
import searchImg from '../../utils/images/searchImg.png'
import CandidateSearchDatagrid from '../../components/candidateSearchDatagrid/CandidateSearchDatagrid'
import { useSelector } from 'react-redux'

const CandidateSearch = (props) => {
  const [searched, setSearched] = useState(false)

  // GET CURRENT LOGGED IN USER
  const { currentUser } = useSelector((state) => state?.user)
  const loggedInUserRole = currentUser?.data?.role
  const userName = currentUser?.data?.profile?.fullName
  console.log(currentUser)

  return (
    <div className='candidateSearchWrapper'>
      <Sidebar loggedInUserRole={loggedInUserRole} />
      <div className='candidateSearchRight'>
        <Topber userName={userName} />
        <div className='candidateSearchMainWrapper'>
          <div className='candidateSearchMainTop'>
            <h3 className='candidateSearchMainTopTitle'>Search</h3>
            <div className='candidateSearchMainTopForm'>
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
                  <MenuItem value={10}>Unity Bank</MenuItem>
                  <MenuItem value={20}>Chicken Republic</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id='outlined-search'
                label='Candidate name'
                type='search'
                className='candidateName'
              />

              <div className='candidateSearchBtn'>Search</div>
            </div>
          </div>
          <div className='candidateSearchMainBottom'>
            {searched && (
              <>
                <img src={searchImg} alt='Search' className='searchImg' />
                <h3>Nothing to see here, yet</h3>
              </>
            )}
            {<CandidateSearchDatagrid userDetails={currentUser} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateSearch
