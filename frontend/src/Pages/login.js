// Login.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRegisterRequest } from '../Actions/RegiserAction';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from '../Components/StyledComponents/StyledButtons';
import { loginRequest } from '../Actions/LoginAction';
import { StyledContainer } from '../Components/StyledComponents/StyledContainer';
import { StyledBox } from '../Components/StyledComponents/StyledBox';
import { StyledHeading, StyledHeading3, StyledP } from '../Components/StyledComponents/StyledText';
import { Box, Flex } from 'rebass';
import { StyledInput } from '../Components/StyledComponents/StyledInput';


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
    <StyledContainer >
      <Flex flexDirection={'column'} width={'100%'}>
       

{/* {loginError && <StyledHeading>{loginError}</StyledHeading>}
            {registerError && <StyledHeading>{registerError}</StyledHeading>}
             */}
             <Box marginTop={'130px'} position="fixed" width="100%"> <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} ><StyledHeading>Wellcome To</StyledHeading> 
             <StyledHeading>My Music</StyledHeading>
             
             </Flex></Box>
            
         
            <StyledBox>
              <form onSubmit={handleSubmit}>
                <Flex justifyContent={'center'}><StyledHeading>{method}</StyledHeading></Flex>
        <label>
          <StyledP> Username:</StyledP>
         
          <StyledInput type="text" value={username} onChange={(e) => validateUserName(e)} required />
        </label>
       { userNameInputError && <span>userNameInputError</span>}
        <br />
        <label>
          <StyledP>Password:</StyledP>
          
          <StyledInput type="password" value={password} onChange={(e) => validatePassword(e)} required />
        </label>
        {passwordInputError && <span> passwordInputError</span>}
        <br />
        <Flex justifyContent={'center'}><SecondaryButton type="submit"><StyledP>{method}</StyledP></SecondaryButton></Flex>
        
      </form>
      
      { method === 'login'? 
      
      <StyledP onClick = {() => changeMethod()}><p >Don't have account? create</p> </StyledP>:
      <StyledP onClick = {() => changeMethod()}><p> Have account? Login</p></StyledP>}
    </StyledBox>

    </Flex>
    </StyledContainer>
    
  );
};

export default Login;
