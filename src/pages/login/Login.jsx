import { useState, useEffect, React } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackgroundImg from '../../utils/images/IMG_6229.png'
import { updateUser } from '../../redux/globalSlice'
import './login.scss'

const Register = () => {
  const dispatch = useDispatch()
  // USER LOGIN DETAILS
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [userDetails, setUserDetails] = useState({
    name: '',
    role: '',
  })

  const [btnDisabled, setBtnDisabled] = useState(true)
  const navigate = useNavigate()

  //   FUNCTIONs FOR SETTING BUTTON STATE

  const handleSetUser = (event, inputType) => {
    setUser({ ...user, [inputType]: event.target.value })
  }
  const setBtnState = () => {
    if (user.email && user.password) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }
  //   END OF FUNCTIONs FOR SETTING BUTTON STATE

  // FUNCTION FOR ONCLICK LOGIN BUTTON
  const handleLogin = (e) => {
    e.preventDefault()
    localStorage.setItem('isLoggedIn', 'true')
    dispatch(updateUser(user))

    // sessionStorage.removeItem('user')
    // sessionStorage.setItem('user', JSON.stringify(user))
    navigate('/')
  }
  // END OF FUNCTION FOR ONCLICK LOGIN BUTTON

  //   USE EFFECT FOR SETTING BUTTON STATE
  useEffect(() => {
    setBtnState(user, setBtnDisabled)
    sessionStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <div className='loginWrapper'>
      <div className='loginWrapperLeft'>
        <img
          // src='blob:https://web.whatsapp.com/6cdf605b-5634-4bc1-9711-a671a348523c'
          src={BackgroundImg}
          // src={require('../../utils/images/BiopathLogo2.jpeg')}
          // src={require('../../utils/images/medicalimg.jpg')}
          alt=''
          // className='loginWrapperLeftImg'
          className='biopathImg'
        />
      </div>
      <div className='loginWrapperRight'>
        <form className='loginFormWrapper'>
          {/* <div className='loginTest'>Trying to test, click</div> */}
          <div className='loginHeading'>Log in</div>
          <div className='loginInputs'>
            <label htmlFor=''>Email</label>
            <input
              type='email'
              className='loginEmailInput loginInput'
              placeholder='example@****.com'
              data-testid='emailTestId'
              onChange={(e) => handleSetUser(e, 'email')}
            />
            <label htmlFor=''>Password</label>
            <input
              type='password'
              className='loginPasswordInput loginInput'
              placeholder='Password'
              onChange={(e) => handleSetUser(e, 'password')}
              data-testid='passwordTestId'
            />
          </div>

          <button
            className='loginBtn'
            type={'submit'}
            disabled={btnDisabled}
            data-testid='loginBtn'
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
