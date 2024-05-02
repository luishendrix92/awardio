import { useAppDispatch } from "../../app/hooks";
import { castVoteAsync } from "../../slices/showDetailsSlice";

const USERNAME_PROMPT_MSG = "Who will you vote as? Type 'Erin' or 'Luis'";
const COMMENT_PROMPT_MSG = "Any comment to make? Press 'Cancel' or leave it blank otherwise.";
const INCORRECT_USER_MSG = "Incorrect user to vote as, it's either 'Luis' or 'Erin' ;)";

interface VoteButtonProps {
  entryId: number;
}

function VoteButton({ entryId }: VoteButtonProps) {
  const dispatch = useAppDispatch();

  const castVoteHandler = (): void => {
    const username = prompt(USERNAME_PROMPT_MSG);

    if (username === 'Erin' || username === 'Luis') {
      const voterId: number = username === 'Erin' ? 5 : 7;
      const comment = prompt(COMMENT_PROMPT_MSG) || null;

      dispatch(castVoteAsync({ entryId, voterId, comment }));
    } else {
      alert(INCORRECT_USER_MSG);
    }
  };

  return (
    <button
      className="ui button"
      data-tooltip="Vote for this entry"
      onClick={castVoteHandler}
    >
      <i className="thumbs up icon"></i>
    </button>
  );
}

export default VoteButton;
