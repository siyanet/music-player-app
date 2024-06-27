import { Box, Flex, Heading, Text } from 'rebass';
import { StyledHeading, StyledHeading3, StyledP } from '../Components/StyledComponents/StyledText';
import { StyledContainer } from '../Components/StyledComponents/StyledContainer';
import { PrimaryButton, SecondaryButton, StyledIcon } from '../Components/StyledComponents/StyledButtons';
import { Table, TableBody, TableHead, TableHeader, TableRow ,TableCell} from '../Components/StyledComponents/StyledTable';
import { useDispatch, useSelector } from "react-redux";
import { getSongsFetch } from '../Actions/GetSongsActions';
import { createRef, useEffect,useRef, useState } from 'react';
import EditForm from '../Components/EditForm';
import { Navigate, useNavigate } from 'react-router-dom';
import DeleteAlert from '../Components/DeleteAlert';
import { logoutRequest, logoutStateClear } from '../Actions/LogoutAction';
import { clearLoginState } from '../Actions/LoginAction';
import { userStateClear } from '../Actions/UserAction';
import { getDefaultSongsFetch } from '../Actions/DefaultSongAction';
import LogoutConfirmation from '../Components/LogOutConfirmation';
import SongController from '../Components/SongController';
import { faEdit, faTrashAlt, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { checkFileAvailability } from '../Components/CheckFileAvailablity';
import { clearUpdateSongState } from '../Actions/UpdateSongsActions';


function Home(){
  
    const songs = useSelector((state) => state.songsReducer.songs);
    const defaultSongs = useSelector((state) => state.defaultSongsReducer.songs);
    const audioRefs = useRef({});
    const [currentSong,setCurrentSong] = useState(null);
    const [showEditForm,setShowEditForm] = useState(false);
    const [selectedSong,setSelectedSong] = useState(null);
    const [showDeleteAlert,setShowDeleteAlert] = useState(false);
    const [navigateToUpload,setNavigateToUpload] = useState(false);
    const [navigateToLogin,setNavigateToLogin] = useState(false);
    const loggedOut = useSelector((state) => state.logoutReducer.loggedOut);
    // const loginSuccess = useSelector((state) => state.loginReducer.success);
    const loginSuccess = useSelector((state) => state.loginReducer.success);
    const user = useSelector((state) => state.userFetchReducer.success);
    const [showLogout,setShowLogout] = useState(false);
    const [playingSong,setPlayingSong] = useState();
    const [loading, setLoading] = useState({});

    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getSongsFetch());
        dispatch(getDefaultSongsFetch());
    }, [dispatch]); 
    if(navigateToUpload === true){
       navigate('/upload');
    }
    if(navigateToLogin === true){
        navigate('/login');
    }
    const closeEditForm = () =>{
        setShowEditForm(false);
        setSelectedSong(null);
        dispatch(clearUpdateSongState());
        dispatch(getSongsFetch());
    }
    const openEditForm = (song) =>{
        setShowEditForm(true);
        setSelectedSong(song)
        
    }
    const closedLogout = () =>{
        setShowLogout(false);
    }
    const openLogout = () =>{
        setShowLogout(true);
    }
    const closeDeleteAlert = () =>{
        setShowDeleteAlert(false);
        setSelectedSong(null);
        dispatch(getSongsFetch());
    }
    const openDeleteAlert = (song) =>{
        setShowDeleteAlert(true);
        setSelectedSong(song)
        

    }

const logOut = () =>{
    dispatch(logoutRequest());
    dispatch(userStateClear());
    dispatch(clearLoginState());
}
const logIn = () =>{
    dispatch(logoutStateClear());
    navigate('/login');
}



const handlePlayPause = (song) => {
    const audioRef = audioRefs.current[song.id] ? audioRefs.current[song.id].current : null;

    if(!audioRef) return;
    Object.values(audioRefs.current).forEach((ref) => {
        if (ref.current && !ref.current.paused && ref.current !== audioRef) {
          ref.current.pause();
        }
      });
   if(audioRef.paused){
         audioRef.play();
         setCurrentSong(song.id);
         setPlayingSong(song);
         }
    else{
            audioRef.pause();
            setCurrentSong(null)
        }


}




    return(
     <StyledContainer width= {'100%'} height='100%'>
                <Flex flexDirection={'row'}width = '100%' height={'100%'}>      
            <Box width={'15%'} height={'100%'} margin={2}>
                <Flex flexDirection={'column'} width={'100%'}  justifyContent={'space-between'}>
                    <Flex flexDirection='column' height={'10%'} width = {'100%'} justifyContent={'center'} alignItems={'center'}>    
                <StyledHeading> My</StyledHeading>
                <StyledHeading>Music</StyledHeading>
                </Flex>
            
                    <Box height={'77vh'}>    
                        <Flex flexDirection={'column'}>
                         <PrimaryButton backgroundColor="#006100" hoverColor="#059e08">
                    <StyledHeading3>Home</StyledHeading3>
                </PrimaryButton>
            <PrimaryButton backgroundColor="#006100" hoverColor="#059e08"> <StyledHeading3 onClick={() => setNavigateToUpload(true)}>Upload</StyledHeading3></PrimaryButton> 
              {loggedOut &&  <Box  ><PrimaryButton onClick = {logIn}><StyledHeading3>LogIn</StyledHeading3></PrimaryButton></Box>}
             {loginSuccess && <Box><PrimaryButton onClick={openLogout}><StyledHeading3>LogOut</StyledHeading3></PrimaryButton></Box>}
             </Flex>
             </Box>


                   {playingSong && <Box height={'13%'} width={'100%'}>
                    <Flex  white-space= {"pre-wrap"} flexDirection={'column'} width={'100%'} flexWrap="wrap" height = {'100%'}alignItems={'center'}>
                        <StyledHeading3> {playingSong.title}</StyledHeading3>
                        <StyledP>{playingSong.artist}</StyledP>
                      
                     
                       
                        
                    </Flex>
                        </Box>}  
                        
                  
            </Flex>
        </Box>
        <Box width={'85%'} margin={3} height={'100%'}>
            <Flex flexDirection={'column'} height = {'100%'}width={'100%'}>
                <Box height='10%'>               
        <Flex flexDirection={'row'} justifyContent={'flex-end'} width={'100%'}>
           
        <StyledHeading>Hi {user && user.username}</StyledHeading>
        </Flex>
        </Box>
      
        
   
        {(songs && songs.length > 0 )|| (defaultSongs && defaultSongs.length > 0)? (
            <Box height={'77%'} overflowX={'hidden'} overflowY={'auto'}>      <Table>
            <TableHead>
             <TableHeader>Play</TableHeader>
             <TableHeader>Title</TableHeader>
             <TableHeader>Musican</TableHeader>
             {user && <TableHeader>Actions</TableHeader>}
            </TableHead>
            
                <TableBody >
          { songs && songs.map((song) => {
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
              <SecondaryButton onClick = {()=>  handlePlayPause(song)}>
              {currentSong === song.id? <StyledIcon icon={faPause}/>: <StyledIcon icon={faPlay}/>} </SecondaryButton>
          <audio  ref = {audioRefs.current[song.id]} src = {song.file}/>
          </TableCell>
     
      <TableCell><StyledP>{song.title} </StyledP></TableCell>
      <TableCell><StyledP>{song.artist} </StyledP></TableCell>
      {user &&     <TableCell> <SecondaryButton onClick={() => openEditForm(song)}><StyledIcon icon={faEdit} /></SecondaryButton>
      <SecondaryButton onClick={() => openDeleteAlert(song)}><StyledIcon icon={faTrashAlt}/></SecondaryButton></TableCell>}
  
       </TableRow>);
          
             })}
               {defaultSongs && defaultSongs.map((defaultSong) => {
                                      if (!audioRefs.current[defaultSong.id]) {
                                          audioRefs.current[defaultSong.id] = createRef();
                                      }

                                      return (
                                          <TableRow key={defaultSong.id}>
                                              <TableCell>
                                                {console.log(defaultSong.file)}
                                                  <SecondaryButton onClick={() => handlePlayPause(defaultSong)}>
                                                      {currentSong === defaultSong.id ? <StyledIcon icon={faPause}/>: <StyledIcon icon={faPlay}/>}
                                                  </SecondaryButton>
                                                  <audio ref={audioRefs.current[defaultSong.id]} src={defaultSong.file} />
                                              </TableCell>
                                              <TableCell><StyledP>{defaultSong.title}</StyledP></TableCell>
                                              <TableCell><StyledP>{defaultSong.artist}</StyledP></TableCell>
                                              
                                          </TableRow>
                                      );
                                  })}
              
              
          </TableBody>
            
      </Table>
      </Box>
        
            )
        
        
        
        : (<StyledHeading3> No Available Songs</StyledHeading3>)}
        {showEditForm && selectedSong && <EditForm  song = {selectedSong} onClose = {closeEditForm}/>}
      
        {showDeleteAlert && selectedSong && <DeleteAlert song = {selectedSong} onClose = {closeDeleteAlert}/>}
        {showLogout && <LogoutConfirmation onClose = {closedLogout}/>}
    
        {playingSong && 
        <Box height={'13%'} width={'100%'} ><SongController currentSong={playingSong} audioRefs={audioRefs} handlePlayPause = {handlePlayPause} isPlaying={currentSong}/></Box> }
        </Flex>
        </Box>
        </Flex>
     </StyledContainer>
    

     
  
    );
}
export default Home;