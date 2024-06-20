import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "./StyledComponents/StyledButtons";
import { Box ,  Flex} from "rebass";
import { deleteSongRequest } from "../Actions/deleteSongAction";
import { useEffect, useState } from "react";

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
    if (deleteSongSuccess && deleted) {
        onClose();
        setDeleted(false);
    }
},[deleteSongSuccess]);
    return (
<Box>
    <Box>Do You Want To Delete {song.title} by {song.artist}?</Box>
    <flex flexDirection = 'row'>
        <PrimaryButton onClick={onClose}>close</PrimaryButton>
        <PrimaryButton onClick={(e) => handleDelete(e)}>Delete</PrimaryButton>
    </flex>
</Box>

    );

}
export default DeleteAlert;