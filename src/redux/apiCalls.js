import { toast } from 'react-toastify'
import { publicRequest } from '../functions/requestMethods'
import { loginSuccess } from './userSlice'
import { loggedIn } from './globalSlice'

export const login = async (dispatch, user, navigate, toastId) => {
  // dispatch(loginStart())
  toastId.current = toast('Please wait...', {
    autoClose: false,
    isLoading: true,
  })

  try {
    const res = await publicRequest.post('/Account/login', user).then((res) => {
      console.log(res)
      console.log(res.data)
      if (res?.data?.data?.role === 'SuperAdmin') {
        throw new Error('Can not access this resource')
      } else {
        if (res?.data?.data?.isDefaultPassword === false) {
          dispatch(loginSuccess(res?.data))
          dispatch(loggedIn())
          toast.update(toastId.current, {
            render: 'Login succesful! Please wait while we redirect you.',
            type: 'success',
            autoClose: 3000,
            isLoading: false,
          })
          setInterval(() => {
            navigate('/')
          }, 3000)
        } else {
          dispatch(loginSuccess(res?.data))
          navigate('/changePassword')
          console.log('def')
        }
      }
    })
  } catch (error) {
    console.log(error)
    // dispatch(loginFailure())
    toast.error(
      error.response?.data?.title ||
        error.response?.data?.description ||
        error?.message ||
        'Something went wrong, please try again'
    )
  }
}
