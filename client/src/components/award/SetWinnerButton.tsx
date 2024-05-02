import { useAppDispatch } from "../../app/hooks";
import { setAwardWinnerAsync } from "../../slices/showDetailsSlice";

const SET_WINNER_TT = "Set this entry as the award's winner.";
const REMOVE_WINNER_TT = "Remove the winner status from this entry.";

interface SetWinnerButtonProps {
  winnerEntryId: number | null;
  isWinner: boolean;
  awardId: number;
}

export function SetWinnerButton({ winnerEntryId, isWinner, awardId }: SetWinnerButtonProps) {
  const dispatch = useAppDispatch();

  const setWinnerHandler = () => {
    dispatch(setAwardWinnerAsync({
      winnerEntryId: isWinner ? null : winnerEntryId,
      awardId
    }));
  };

  return (
    <button
      data-tooltip={isWinner ? REMOVE_WINNER_TT : SET_WINNER_TT}
      onClick={setWinnerHandler}
      className="ui button"
    >
      <i className="trophy icon"></i>
    </button>
  );
}
