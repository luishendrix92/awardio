import { useAppDispatch } from "../../app/hooks";
import Entry from "../../models/Entry";
import { updateEntryAsync } from "../../slices/showDetailsSlice";
import { SetWinnerButton } from "../award/SetWinnerButton";
import EditableText from "../reusable/EditableText";
import VoteButton from "../vote/VoteButton";
import VoteLabel from "../vote/VoteLabel";
import DeleteEntryButton from "./DeleteEntryButton";

const DEFAULT_IMG_URL = 'https://www.tibs.org.tw/images/default.jpg';

interface EntryItemProps {
  winnerEntryId: number | null;
  entry: Entry;
  awardId: number;
}

function EntryItem({ entry, winnerEntryId, awardId }: EntryItemProps) {
  const { id, title, image, description, votes } = entry;
  const isWinner = winnerEntryId === id;
  const dispatch = useAppDispatch();

  const changeImageHandler = () => {
    const newImg = prompt('What is the URL of the new image?');

    if (newImg) {
      dispatch(updateEntryAsync({ id, data: { title, image: newImg, description } }));
    }
  };

  const changeTitleHandler = async (newTitle: string): Promise<void> => {
    await dispatch(updateEntryAsync({
      data: { title: newTitle, image, description }, id
    }));
  }

  const changeDescHandler = async (newDesc: string): Promise<void> => {
    await dispatch(updateEntryAsync({
      data: { title, image, description: newDesc }, id
    }));
  }

  return (
    <div className={`column ${isWinner ? 'winner-entry' : ''}`}>
      <div className="ui items">
        <div className="item">
          <div className="ui tiny image">
            {isWinner &&
              <div className="ui orange left ribbon label">
                <i className="trophy icon"></i>
              </div>
            }
            <img
              className="fit-cover entry-img"
              src={image || DEFAULT_IMG_URL}
              onClick={changeImageHandler}
              alt={title}
            />
          </div>
          <div className="content">
            <div className="ui small header">
              <EditableText
                onChange={changeTitleHandler}
                label="Title" text={title}
              />
            </div>
            <div className="ui icon basic buttons mini right floated">
              <DeleteEntryButton entryId={id} />
              <SetWinnerButton
                winnerEntryId={id}
                isWinner={isWinner}
                awardId={awardId}
              />
              <VoteButton entryId={id} />
            </div>
            <div className="description">
              <EditableText
                label="Description" text={description} fluid
                onChange={changeDescHandler}
              />
            </div>
            {votes && votes.length > 0 && (
              <div className="extra">
                Voters: {" "}
                {votes?.map((vote) => <VoteLabel key={vote.id} vote={vote} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryItem;
