// Login.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRegisterRequest } from '../Actions/UsersRegiserAction';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from '../Components/StyledComponents/StyledButtons';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [method,setMethod]  = useState("login");
  const [userNameInputError,setUserNameInputError] = useState(null);
  const [passwordInputError,setPasswordInputError] = useState(null);
  const error = useSelector((state) => state.userRegisterReducer.error);
  const success = useSelector((state) => state.userRegisterReducer.success);
  const [registered,setRegistered] = useState(false);


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
   
    dispatch(userRegisterRequest(username,password,method));
    if (method === 'register' && success) {
        setRegistered(true); // Set registered to true upon successful registration
        setUsername('');
        setPassword('');
        setMethod('login');
    }
    if (method === 'login' && success && registered) {
        navigate('/');
    }
   

   
  };


  return (
    <div>
            {error && <p>{error}</p>}
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
