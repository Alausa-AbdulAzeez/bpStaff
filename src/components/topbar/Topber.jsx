import React, { useEffect, useState } from 'react'
import { BsFillBellFill } from 'react-icons/bs'
import './topbar.scss'
import { publicRequest } from '../../functions/requestMethods'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Topber = (props) => {
  const userName = props?.userData?.profile?.fullName
  const labName = props?.userData?.profile?.laboratory?.laboratoryName

  // LOGGED IN USER TOKEN
  const { token } = useSelector((state) => state?.user?.currentUser?.data)

  // LOGGED IN USER RLOE
  const loggedInUserRole = props.userData?.role?.[0]

  // LOADING AND ERROR DATA
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  // END OF LOADING AND ERROR DATA

  // TABLE DATA
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const getPendingCandidates = async () => {
      loggedInUserRole === 'Quality assurance'
        ? '/Result/pending'
        : '/Candidate/stage'
      try {
        setLoading(true)
        setError(false)

        const res = await publicRequest.get(
          loggedInUserRole === 'Quality assurance'
            ? '/Result/pending'
            : '/Candidate/stage',
          {
            headers: {
              Accept: '*',
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (res.data) {
          setTableData(res.data?.data === '' ? [] : res.data?.data)
          setLoading(false)
        } else {
          console.log(res.data)
        }
      } catch (error) {
        setLoading(false)
        setError(true)

        console.log(error)
      }
    }
    getPendingCandidates()
  }, [])

  return (
    <div className='topbarWrapper'>
      <h3 className='topbarUsername'>
        {userName} <span className='topbarLabname'>({labName})</span>
      </h3>
      {/* <h3>{labName}</h3> */}
      <Link to={'/pendingCandidates'}>
        <div className='topbarIconWrapper'>
          <BsFillBellFill className='topbarIcon' />
          {loading && <div className='loadingnotificationCount'></div>}
          {error && <div className='notificationCount'>x</div>}
          {!loading && !error && (
            <div className='notificationCount'>{tableData?.length}</div>
          )}
        </div>
      </Link>
    </div>
  )
}

export default Topber
