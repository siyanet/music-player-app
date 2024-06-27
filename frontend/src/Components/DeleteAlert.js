import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton, SecondaryButton } from "./StyledComponents/StyledButtons";
import { Box ,  Flex} from "rebass";
import { clearSongDeleteState, deleteSongRequest } from "../Actions/deleteSongAction";
import { useEffect, useState } from "react";
import { StyledBox } from "./StyledComponents/StyledBox";
import { StyledHeading, StyledHeading3, StyledP } from "./StyledComponents/StyledText";

function DeleteAlert({song,onClose}){
    const dispatch = useDispatch();
    const [deleted,setDeleted] = useState(false);
    const deleteLoading = useSelector(state => state.deleteSongReducer.loading);
    const deleteSongSuccess = useSelector(state => state.deleteSongReducer.success);
    const deleteSongError = useSelector(state => state.deleteSongReducer.error);
function handleDelete(e){
    e.preventDefault();
    dispatch(deleteSongRequest(song.id));
    setDeleted(true);

}
useEffect(() => {
    if (deleteSongSuccess) {
        onClose();
        setDeleted(false);
        dispatch(clearSongDeleteState());
    }
},[deleteSongSuccess]);
    return (
<StyledBox>
<Flex justifyContent={'center'} textAlign={'center'}> <StyledHeading3>Do You Want To Delete {song.title} by {song.artist}?</StyledHeading3></Flex>
    <Flex flexDirection = 'row' justifyContent='space-between'>
        <SecondaryButton onClick={onClose}><StyledP>close</StyledP></SecondaryButton>
        <SecondaryButton onClick={(e) => handleDelete(e)}><StyledP>Delete</StyledP></SecondaryButton>
    </Flex>


</StyledBox>
  


    );

}
export default DeleteAlert;