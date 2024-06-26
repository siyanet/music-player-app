import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Box ,  Flex} from "rebass";
import { updateSongRequest} from "../Actions/UpdateSongsActions";
import { StyledInput } from "./StyledComponents/StyledInput";
import { SecondaryButton } from "./StyledComponents/StyledButtons";
import { StyledHeading, StyledHeading3, StyledP } from "./StyledComponents/StyledText";
import { StyledBox } from "./StyledComponents/StyledBox";

function EditForm({song,onClose}) {
    const [title,setTitle] = useState(song.title);
    const [artist,setArtist] = useState(song.artist);
    const [titleError,setTitleError] = useState('');
    const [artistError,setArtistError] = useState('');
    const dispatch = useDispatch();
    const updateError = useSelector((state) => state.updateSongsReducer.error);
    const updateLoading = useSelector((state) => state.updateSongsReducer.loading);
    const updateSuccess = useSelector((state) => state.updateSongsReducer.success);
    const [updated,setUpdated] = useState(null);
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(updateSongRequest({songId: song.id,updatedTitle: title,updatedArtist : artist}));
        setUpdated(true);
     
       
}
useEffect(() => {
    if (updateSuccess && updated) {
        onClose();
        setUpdated(false);
    }
}, [updateSuccess])
const handleTitleValidation = (e) =>{
    setTitle(e.target.value);
   if(/^[a-zA-Z\s]*$/.test(e.target.value)){
    setTitleError('');
   }
   else{
    setTitleError('only alphabetic characters are allowed');
   }
};
const handleArtistValidation = (e) =>{
    setArtist(e.target.value);
   if(/^[a-zA-Z\s]*$/.test(e.target.value)){
    setArtistError('');
   }
   else{
    setArtistError('only alphabetic characters are allowed');
   }
};
return(
    // <Box  sx={{
    //     position: 'fixed',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: '400px',
    //     bg: '#006100',
    // //   tertiary: '',
    //     p: 3,
    //     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    //     zIndex: 1000,
    // }}>
    <StyledBox>
        <Box >
            <Flex justifyContent={'center'} alignItems={'center'}>
            <StyledHeading>Edit Song</StyledHeading>
                </Flex></Box>
      
        <Flex flexDirection = {'column'}>
        <label htmlFor="title"><StyledHeading3>Title</StyledHeading3></label>
      
        <StyledInput id="title"  name="title" value={title} onChange={(e) => handleTitleValidation(e)} />
        {titleError && <span>{titleError}</span>}
        <label htmlFor="artist"><StyledHeading3>Artist</StyledHeading3></label>
        <StyledInput id="musician" name="artist" value={artist} onChange={(e) => handleArtistValidation(e)} />
        {artistError && <span>{artistError}</span>}
        <Flex justifyContent={'space-between'} flexDirection={'row'} >  
             <SecondaryButton  onClick={(e) => handleSubmit(e)}><StyledP>Update</StyledP></SecondaryButton>
        <SecondaryButton  onClick = {onClose}><StyledP>Cancel</StyledP></SecondaryButton>
        </Flex>
        {updateError && <Box bg = 'red'>{updateError}</Box>}
       
      

        </Flex>

    </StyledBox>
);

}
export default EditForm;