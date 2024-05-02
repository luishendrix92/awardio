import { useAppDispatch } from "../../app/hooks";
import { deleteEntryAsync } from "../../slices/showDetailsSlice";

interface DeleteEntryButtonProps {
  entryId: number;
}

function DeleteEntryButton({ entryId }: DeleteEntryButtonProps) {
  const dispatch = useAppDispatch();

  const deleteEntryHandler = () => {
    const deletionConfirmed = window.confirm('Are you sure you want to delete this entry?');

    if (deletionConfirmed) {
      dispatch(deleteEntryAsync(entryId));
    }
  }

  return (
    <button className="ui button" onClick={deleteEntryHandler} >
      <i className="trash icon"></i>
    </button>
  );
}

export default DeleteEntryButton;