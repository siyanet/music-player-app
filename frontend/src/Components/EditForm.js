import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import { useState } from "react"
import { Box ,  Flex} from "rebass";

function EditForm({song,onClose}) {
    const [title,setTitle] = useState(song.title);
    const [artist,setArtist] = useState(song.artist);
    const [titleError,setTitleError] = useState('');
    const [artistError,setArtistError] = useState('');
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(titleError == '' && artistError == ''){
        onClose();}
}
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
    <Box  sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        bg: 'white',
        p: 3,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
    }}>
      
        <Flex flexDirection = {'column'}>
        <label htmlFor="title">Title</label>
      
        <input id="title"  name="title" value={title} onChange={(e) => handleTitleValidation(e)} />
        {titleError && <span>{titleError}</span>}
        <label htmlFor="artist">Artist</label>
        <input id="musician" name="artist" value={artist} onChange={(e) => handleArtistValidation(e)} />
        {artistError && <span>{artistError}</span>}
        <Flex justifyContent={'space-between'} m = {'4px'}>   <button mt={3} onClick={(e) => handleSubmit(e)}>Update</button>
        <button mt={2} onClick = {onClose}>Cancel</button></Flex>
      
      

        </Flex>

    </Box>
);

}
export default EditForm;