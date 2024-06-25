import { useDispatch } from "react-redux";
import { Box, Flex } from "rebass";
import { SecondaryButton } from "./StyledComponents/StyledButtons";
import { logoutRequest } from "../Actions/LogoutAction";
import { useNavigate } from "react-router-dom";
import { userStateClear } from "../Actions/UserAction";
import { clearLoginState } from "../Actions/LoginAction";


function LogoutConfirmation({onClose}){
  const  dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogoutButton = (e) => {
        e.preventDefault();
        dispatch(logoutRequest());
        dispatch(userStateClear());
        dispatch(clearLoginState());
        onClose();
        navigate('/');


    }
    return(  
        <Box> <Flex flexDirection={'column'}>
        <p>Are You Sure You Want To Logout?</p>
        <Flex flexDirection={'row'}>
            <SecondaryButton onClick={(e) => handleLogoutButton(e)}>yes</SecondaryButton>
            <SecondaryButton onClick={onClose}>NO</SecondaryButton>
        </Flex>
    </Flex>
    </Box>);
 

}
export default LogoutConfirmation;