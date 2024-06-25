import { Flex,Box } from "rebass";
import { SecondaryButton, StyledIcon } from "./StyledComponents/StyledButtons";

import { useEffect, useRef, useState } from "react";
import { faArrowLeft, faArrowRight, faChevronLeft, faPause, faPlay, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import { CustomSlider, StyledSlider } from "./StyledComponents/StyledSlider";
import { StyledP } from "./StyledComponents/StyledText";

function SongController({currentSong,audioRefs}){
     const audioRef = audioRefs.current[currentSong.id];
    const [currentTime,setCurrentTime] = useState(0);
    const [duration,setDuration] = useState(0);
    const [isPlaying,setIsPlaying] = useState(true);
    const isSeeking = useRef(false);
    const handleSeek = (seekTime) => {
        console.log("this is seek time", seekTime);
        const newTime = Number(seekTime);
        console.log("this is new time", newTime);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
        isSeeking.current = true;
    };
    
   
    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };
    useEffect(() => {
        const handleTimeUpdate = () => {
            
                setCurrentTime(audioRef.current.currentTime);
        
            
        };

        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
            audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

            setDuration(audioRef.current.duration); // Set initial duration
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);

            }
        };
    }, [audioRef]);
    return(
        <Box>
            <Flex flexDirection={'column'} width={'100%'}>
            <Flex flexDirection={'row'} width={'100%'} justifyContent={"center"}>
                <SecondaryButton><StyledIcon icon={faStepBackward}/></SecondaryButton>
                {isPlaying? <SecondaryButton onClick={handlePlayPause}><StyledIcon icon={faPause}/> </SecondaryButton>:<SecondaryButton onClick={handlePlayPause}><StyledIcon icon={faPlay}/></SecondaryButton>}
                <SecondaryButton><StyledIcon icon={faStepForward}/></SecondaryButton>
            </Flex>
            <Flex flexDirection={'row'} justifyContent={"center"}>
                <StyledP width= {'5%'}>{formatTime(currentTime)}</StyledP>
                <CustomSlider sx ={{width:'90%'}} value = {currentTime} max={duration} onClick={(e) => { isSeeking.current = true; handleSeek(e.target.value)}}/>
                {/* <StyledSlider
  type="range"
  min={0}
  max={duration}
  value={currentTime}
  onChange={(e) => handleSeek(e.target.value)}
/> */}

                <StyledP width={'5%'}>{formatTime(duration)}</StyledP>

            </Flex>
            </Flex>
           
        </Box>
    );
}
export default SongController;



