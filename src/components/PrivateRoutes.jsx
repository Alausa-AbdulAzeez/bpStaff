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

  // useEffect(() => {
  //   const getAllCandidates = async () => {
  //     try {
  //       const res = await publicRequest.get('/Candidate', {
  //         headers: {
  //           Accept: '*',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })

  //       if (res.data) {
  //         console.log(res.data)
  //       } else {
  //         console.log(res)
  //       }
  //     } catch (error) {
  //       if (
  //         error?.response?.statusText === 'Unauthorized' ||
  //         error?.response?.status === 401
  //       ) {
  //         dispatch(loggedOut())

  //         persistor
  //           .purge()
  //           // .then(() => navigate('/login'))
  //           .then(() => {
  //             return toast.info('Session Expired Please login to continue', {
  //               position: 'top-right',
  //               // autoClose: 10000,
  //               hideProgressBar: false,
  //               closeOnClick: true,
  //               pauseOnHover: true,
  //               draggable: true,
  //               progress: undefined,
  //               theme: 'light',
  //             })
  //           })
  //       }
  //     }
  //   }
  //   // END OF FUNCTION TO GET AND SET ALL CANDIDATES
  //   getAllCandidates()
  // }, [dispatch, navigate, token])

  useEffect(() => {
    console.log(isLoggedIn)
  }, [isLoggedIn])

  return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoutes
