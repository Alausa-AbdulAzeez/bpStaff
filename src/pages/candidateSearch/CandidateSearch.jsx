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

const CandidateSearch = (props) => {
  const [searched, setSearched] = useState(false)
  const loggedInUserRole = props.userDetails?.role

  console.log(props)
  return (
    <div className='candidateSearchWrapper'>
      <Sidebar loggedInUserRole={loggedInUserRole} />
      <div className='candidateSearchRight'>
        <Topber userName={props.userDetails.name} />
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
            {<CandidateSearchDatagrid userDetails={props.userDetails} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateSearch
