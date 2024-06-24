import { Button,Box,Flex } from "rebass";
import { StyledContainer } from "../Components/StyledComponents/StyledContainer";
import { PrimaryButton } from "../Components/StyledComponents/StyledButtons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSongRequest } from "../Actions/CreateSongsActions";
import { useNavigate } from "react-router-dom";



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
            <Flex flexDirection = 'column'justifyContent={"center"} alignItems={'center'} width={'100%'} height={'100%'}>
                <label htmlFor="title">Title</label>
                <input value = {title} type='text' onChange={(e) => setTitle(e.target.value)} name = 'title'/>
                <label htmlFor="artist">Artist</label>
                <input value = {artist}  onChange = {(e) => setArtist(e.target.value)} type='text' name = 'artist'/>
                <label htmlFor="file"> File Upload</label>
                <input  onChange ={(e) => handleFileChange(e)}type = 'file' name = 'file'/>
                <flex flexDirection= 'row'> 
                    <PrimaryButton onClick={(e)=>handleUpload(e)}>upload</PrimaryButton>
                    <PrimaryButton onClick = {(e)=>handleUpdateCancel(e)}>cancel</PrimaryButton>
                </flex>
               
                {createError && <Box>{createError}</Box>}
            </Flex>
           
        </StyledContainer>
        </Box>
     


    );
}
export default Upload;