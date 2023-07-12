import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { persistor } from '../redux/store'
import { loggedOut } from '../redux/globalSlice'
import { publicRequest } from '../functions/requestMethods'

const PrivateRoutes = () => {
  // MISCELLANEOUS
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // GET LOGGED IN STATE OF THE USER
  const { isLoggedIn } = useSelector((state) => state?.globalState?.user)

  // GET CURRENT USER TOKEN
  const token = useSelector((state) => state?.user?.currentUser?.data?.token)
  const role = useSelector((state) => state?.user?.currentUser?.data?.role)

  console.log(role)

  if (role === 'Client' || role === 'SuperAdmin' || role === null) {
    persistor
      .purge()
      // .then(() => dispatch(loggedOut()))
      .then(() => {
        return toast.info('Session Expired Please login to continue', {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
  }

  useEffect(() => {
    const getAllCandidates = async () => {
      try {
        await publicRequest
          .get('/Candidate', {
            headers: {
              Accept: '*',
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async () => {
            await publicRequest.get('/Candidate/stage', {
              headers: {
                Accept: '*',
                Authorization: `Bearer ${token}`,
              },
            })
          })
      } catch (error) {
        if (
          error?.response?.statusText === 'Unauthorized' ||
          error?.response?.status === 401 ||
          error?.response?.status === 400
        ) {
          persistor
            .purge()
            .then(() => dispatch(loggedOut()))
            .then(() => {
              return toast.info('Session Expired Please login to continue', {
                position: 'top-right',
                // autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
              })
            })
        }
      }
    }
    // END OF FUNCTION TO GET AND SET ALL CANDIDATES
    getAllCandidates()
  }, [dispatch, navigate, token])

  useEffect(() => {
    console.log(isLoggedIn)
  }, [isLoggedIn])

  return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoutes
