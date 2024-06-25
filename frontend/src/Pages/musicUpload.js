import { Button,Box,Flex } from "rebass";
import { StyledContainer } from "../Components/StyledComponents/StyledContainer";
import { PrimaryButton, SecondaryButton, StyledIcon } from "../Components/StyledComponents/StyledButtons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSongRequest } from "../Actions/CreateSongsActions";
import { useNavigate } from "react-router-dom";
import { StyledHeading, StyledHeading3, StyledP } from "../Components/StyledComponents/StyledText";
import { StyledInput } from "../Components/StyledComponents/StyledInput";



function Upload(){
  const  [title,setTitle] = useState(null);
   const [artist,setArtist] = useState(null);
   const [file,setFile] = useState(null);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [created,setCreated] = useState(false);
   const createSuccess = useSelector((state) => state.createSongReducer.success);
   const createLoading = useSelector((state) => state.createSongReducer.loading);
   const createError = useSelector((state) => state.createSongReducer.error);
   function handleFileChange(e){
    setFile(e.target.files[0]);
   }

    function handleUpload(e){
       e.preventDefault();
       console.log(title,artist,file);
       const formData = new FormData();
       formData.append('title', title);
       formData.append('artist', artist);
       formData.append('file', file);
   
       dispatch(createSongRequest(formData));
       setCreated(true);
        
    }
    const handleUpdateCancel = (e) =>{
        e.preventDefault();
        setTitle('');
        setArtist('');
        setFile('');
        navigate('/');
    }
 useEffect(() =>{
    if(createSuccess && created){
    navigate('/');
    setCreated(false);
}
 },[createSuccess]);
    return(
        <Box  display="flex" justifyContent="center" alignItems="center" height="100vh">
        <StyledContainer >
        <Flex flexDirection='column' height={'10%'} width = {'10%'} justifyContent={'center'} alignItems={'center'}>    
                <StyledHeading> My</StyledHeading>
                <StyledHeading>Music</StyledHeading>
                </Flex>
            <Flex flexDirection = 'column' alignItems={'center'} width={'100%'} height={'100%'} >
              <Box margin={3}><StyledHeading>Upload Your Song</StyledHeading></Box>
                <Box>  
                    
                    
                    <label htmlFor="title"><StyledHeading3>Title</StyledHeading3></label>
                
                <StyledInput  value = {title} type='text' onChange={(e) => setTitle(e.target.value)} name = 'title'/>
             
                <label htmlFor="artist"><StyledHeading3>Artist</StyledHeading3></label>
                
                <StyledInput value = {artist}  onChange = {(e) => setArtist(e.target.value)} type='text' name = 'artist'/>
                
                <label htmlFor="file"> <StyledHeading3>File</StyledHeading3></label>
            
                <StyledInput   onChange ={(e) => handleFileChange(e)}type = 'file' name = 'file'/>
                <Box height={'1vh'}></Box>
                <Box width={'100%'}>
                    <Flex flexDirection= 'row'  width={'100%'} justifyContent='space-between'> 
                    <SecondaryButton onClick={(e)=>handleUpload(e)}><StyledHeading3>Upload</StyledHeading3></SecondaryButton>

                    <SecondaryButton onClick = {(e)=>handleUpdateCancel(e)}><StyledHeading3>Cancel</StyledHeading3></SecondaryButton>
                </Flex></Box>
                
                
               
                {createError && <Box>{createError}</Box>}
                </Box>
                
              
            </Flex>
           
        </StyledContainer>
        </Box>
     


    );
}
export default Upload;