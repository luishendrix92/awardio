import { useAppDispatch } from "../../app/hooks";
import Vote from "../../models/Vote";
import { deleteVoteAsync } from "../../slices/showDetailsSlice";

interface VoteLabelProps {
  vote: Vote;
}

function VoteLabel({ vote }: VoteLabelProps) {
  const { id, comment, voter: { username } } = vote;
  const dispatch = useAppDispatch();

  const deleteVoteHandler = (): void => {
    dispatch(deleteVoteAsync(id));
  };

  return (
    <div
      className="ui image label small"
      data-tooltip={comment}
      data-position="top left"
    >
      <i className="user icon"></i>
      {username}
      <i className="delete icon" onClick={deleteVoteHandler}></i>
    </div>
  );
}

export default VoteLabel;
