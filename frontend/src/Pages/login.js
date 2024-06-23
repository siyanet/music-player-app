// Login.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRegisterRequest } from '../Actions/RegiserAction';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from '../Components/StyledComponents/StyledButtons';
import { loginRequest } from '../Actions/LoginAction';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [method,setMethod]  = useState("login");
  const [userNameInputError,setUserNameInputError] = useState(null);
  const [passwordInputError,setPasswordInputError] = useState(null);
  const registerError = useSelector((state) => state.userRegisterReducer.error);
  const registerSuccess = useSelector((state) => state.userRegisterReducer.success);
  const loginSuccess = useSelector((state) => state.loginReducer.success);
  const loginError = useSelector((state) => state.loginReducer.error);

//   const [success,setSuccess] = useState(false);
//   const [logedIn,setLogedin] = useState(false);
//   const [registered,setRegistered] = useState(false);


const validateUserName = (e) =>{
    setUsername(e.target.value);
    if(method === 'register'){

    }


}
const validatePassword = (e) =>{
    setPassword(e.target.value);
    if(method === 'register'){

    }

}
const changeMethod = () => {
        setUsername('');
        setPassword('');
        setMethod(prevMethod => (prevMethod === 'register' ? 'login' : 'register'));
 
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if(method === 'register'){
        dispatch(userRegisterRequest(username,password));
        // setRegistered(true);
    }
    else if(method === 'login'){
        dispatch(loginRequest(username,password));
        
        // setLogedin(true);
    }
   
 
   

   
  };
  useEffect(() =>{
    if (method === 'login' && loginSuccess ) {

        navigate('/');
    }
     
    else if (method === 'register' && registerSuccess) {
        // Set registered to true upon successful registration
       setUsername('');
       setPassword('');
       setMethod('login');
   }


  },[loginSuccess,registerSuccess,method,navigate]);


  return (
    <div>
            {loginError && <p>{loginError}</p>}
            {registerError && <p>{registerError}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => validateUserName(e)} required />
        </label>
       { userNameInputError && <span>userNameInputError</span>}
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => validatePassword(e)} required />
        </label>
        {passwordInputError && <span> passwordInputError</span>}
        <br />
        <button type="submit">{method}</button>
      </form>
      { method === 'login'? 
      <SecondaryButton onClick = {() => changeMethod()}><p >Don't have account? create</p> </SecondaryButton>:
      <SecondaryButton onClick = {() => changeMethod()}><p> Have account LogIn</p></SecondaryButton>}
    </div>
  );
};

export default Login;
