import { React, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/login/Login'
import './app.scss'
import Home from './pages/home/Home'
import CandidateSearch from './pages/candidateSearch/CandidateSearch'
import PendingCandidates from './pages/pendingCandidates/PendingCandidates'
import ViewClients from './pages/viewClients/ViewClients'
import { useSelector } from 'react-redux'
import Reports from './pages/reports/Reports'

function App() {
  let userDetails
  // const user = sessionStorage.getItem('user')
  // const [user, setUser] = useState(sessionStorage.getItem('user'))
  const user = useSelector((state) => state.globalState.globalState.user)
  console.log(user)

  // FUNCTION FOR SETTING USER DETAILS
  switch (user?.email) {
    case 'e@gmail.com':
      userDetails = { name: 'Esther', role: 'receptionist' }
      break
    case 'o@gmail.com':
      userDetails = { name: 'Olamide', role: 'phlebotomist' }
      console.log('Olamide')
      break
    case 'ada@gmail.com':
      userDetails = { name: 'Ada', role: 'labScientist' }
      break
    case 'ade@gmail.com':
      userDetails = { name: 'Adetola', role: 'reportOfficer' }
      break
    case 'b@gmail.com':
      userDetails = { name: 'Bankole', role: 'qualityAssurance' }
      break

    default:
      break
  }

  // END OF FUNCTION FOR SETTING USER DETAILS

  useEffect(() => {}, [user])

  return (
    <BrowserRouter>
      {user.name === null ? (
        <Register />
      ) : (
        <Routes>
          <Route exact path='/login' element={<Register />} />
          <Route
            exact
            path='/'
            element={<Home userDetails={userDetails && userDetails} />}
          />
          <Route
            path='/candidateSearch'
            element={
              <CandidateSearch userDetails={userDetails && userDetails} />
            }
          />
          <Route
            path='/pendingCandidates'
            element={
              <PendingCandidates userDetails={userDetails && userDetails} />
            }
          />
          <Route
            path='/viewClients'
            element={<ViewClients userDetails={userDetails && userDetails} />}
          />
          <Route
            path='/reports'
            element={<Reports userDetails={userDetails && userDetails} />}
          />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App
