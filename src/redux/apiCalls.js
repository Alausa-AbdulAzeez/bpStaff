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
      if (res?.data?.data?.role === 'SuperAdmin') {
        throw new Error('Can not access this resource')
      } else {
        if (res?.data?.data?.isDefaultPassword === false) {
          dispatch(loginSuccess(res?.data))
          dispatch(loggedIn())
          toast.update(toastId.current, {
            render: 'Login succesful! Please wait while we redirect you.',
            type: 'success',
            autoClose: 2000,
            isLoading: false,
          })
          navigate('/')
          // setInterval(() => {
          //   // redirect('/')
          // }, 2500);
        } else {
          dispatch(loginSuccess(res?.data))
          navigate('/changePassword')
          toast.update(toastId.current, {
            render:
              "Hi there! You're required to change your password from the default password before you can proceed.",
            type: 'info',
            autoClose: 4000,
            isLoading: false,
          })
        }
      }
    })
  } catch (error) {
    console.log(error)
    // dispatch(loginFailure())
    toast.update(toastId.current, {
      type: 'error',
      autoClose: 3000,
      isLoading: false,
      render: `${
        error?.response?.data?.title ||
        error?.response?.data?.description ||
        error?.message ||
        'Something went wrong, please try again'
      }`,
    })
  }
}
