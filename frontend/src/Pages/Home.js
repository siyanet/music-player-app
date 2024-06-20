import { Box, Flex, Heading, Text } from 'rebass';
import { StyledHeading, StyledHeading3 } from '../Components/StyledComponents/StyledText';
import { StyledContainer } from '../Components/StyledComponents/StyledContainer';
import { PrimaryButton, SecondaryButton } from '../Components/StyledComponents/StyledButtons';
import { Table, TableBody, TableHead, TableHeader, TableRow ,TableCell} from '../Components/StyledComponents/StyledTable';
import { useDispatch, useSelector } from "react-redux";
import { getSongsFetch } from '../Actions/GetSongsActions';
import { createRef, useEffect,useRef, useState } from 'react';
import EditForm from '../Components/EditForm';
import { Navigate, useNavigate } from 'react-router-dom';
import DeleteAlert from '../Components/DeleteAlert';

function Home(){
  
    const songs = useSelector((state) => state.songsReducer.songs);
    const audioRefs = useRef({});
    const [currentSong,setCurrentSong] = useState(null);
    const [showEditForm,setShowEditForm] = useState(false);
    const [selectedSong,setSelectedSong] = useState(null);
    const [showDeleteAlert,setShowDeleteAlert] = useState(false);
    const [navigateToUpload,setNavigateToUpload] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getSongsFetch());
    }, [dispatch]); 
    if(navigateToUpload === true){
       navigate('/upload');
    }
    const closeEditForm = () =>{
        setShowEditForm(false);
        setSelectedSong(null);
    }
    const openEditForm = (song) =>{
        setShowEditForm(true);
        setSelectedSong(song)
        
    }
    const closeDeleteAlert = () =>{
        setShowDeleteAlert(false);
        setSelectedSong(null);
    }
    const openDeleteAlert = (song) =>{
        setShowDeleteAlert(true);
        setSelectedSong(song)
        
    }




const handlePlayPause = (songId) => {
    const audioRef = audioRefs.current[songId] ? audioRefs.current[songId].current : null;

    if(!audioRef) return;
    Object.values(audioRefs.current).forEach((ref) => {
        if (ref.current && !ref.current.paused && ref.current !== audioRef) {
          ref.current.pause();
        }
      });
   if(audioRef.paused){
         audioRef.play();
         setCurrentSong(songId);
         }
    else{
            audioRef.pause();
            setCurrentSong(null)
        }


}

    return(
     <StyledContainer>
                <Flex flexDirection={'row'}width = '100%'>      
            <Box width={1/4} >
                <Flex flexDirection={'column'} width={'100%'}  justifyContent={'space-between'}>
                    <Box >
                <StyledHeading> My</StyledHeading>
                <StyledHeading>Music</StyledHeading>
               
                <PrimaryButton backgroundColor="#006100" hoverColor="#059e08">
                    <StyledHeading3>Home</StyledHeading3>
                </PrimaryButton>
            <PrimaryButton backgroundColor="#006100" hoverColor="#059e08"> <StyledHeading3>Favourites</StyledHeading3></PrimaryButton>
            <PrimaryButton backgroundColor="#006100" hoverColor="#059e08"> <StyledHeading3 onClick={() => setNavigateToUpload(true)}>Upload</StyledHeading3></PrimaryButton> 
              
              </Box>
              <Box  ><PrimaryButton><StyledHeading>LogOut</StyledHeading></PrimaryButton></Box>
            </Flex>
        </Box>
        <Box width={3/4}>
            <Flex flexDirection={'column'} width={'100%'}>
                     
        <Flex flexDirection={'row'} justifyContent={'space-between'} width={'100%'}>
            <Box>search</Box>
        <StyledHeading>Hi</StyledHeading>
        </Flex>/
   
        {songs && songs.length > 0? (
              <Table>
              <TableHead>
               <TableHeader>play</TableHeader>
               <TableHeader>img</TableHeader>
               <TableHeader>title</TableHeader>
               <TableHeader>musican</TableHeader>
               <TableHeader>actions</TableHeader>
              </TableHead>
              <TableBody>
            { songs.map((song) => {
                    // <EditForm onClose={closeEditForm} songId ={ song.id}></EditForm>
                // <EditForm onClose = {closeEditForm} songId = {song.id}></EditForm>
               
                {  
                    // Initialize audioRef for each song if not already initialized
                    if (!audioRefs.current[song.id]) {
                      audioRefs.current[song.id] = createRef();
                    }
                }
           
          return( <TableRow key ={song.id}> 
            <TableCell> 
                <SecondaryButton onClick = {()=>  handlePlayPause(song.id)}>
                {currentSong === song.id? 'pause': 'play'} </SecondaryButton>
            <audio ref = {audioRefs.current[song.id]} src = {song.file}/>
            </TableCell>
        <TableCell> </TableCell>
        <TableCell>{song.title} </TableCell>
        <TableCell> </TableCell>
        <TableCell> <SecondaryButton onClick={() => openEditForm(song)}>edit</SecondaryButton>
        <SecondaryButton onClick={() => openDeleteAlert(song)}>Delete</SecondaryButton></TableCell>
         </TableRow>);
            
               })}
                
                
            </TableBody>
        </Table>
            )
        
        
        
        : (<StyledHeading3> No Available Songs</StyledHeading3>)}
        {showEditForm && selectedSong && <EditForm  song = {selectedSong} onClose = {closeEditForm}/>}
      
        {showDeleteAlert && selectedSong && <DeleteAlert song = {selectedSong} onClose = {closeDeleteAlert}/>}
            </Flex>
      
        </Box>
       
        </Flex>
  
     </StyledContainer>
    

     
  
    );
}
export default Home;