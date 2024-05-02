import { changeAwardTitleAsync, createEntryAsync, deleteAwardAsync } from "../../slices/showDetailsSlice";
import { useAppDispatch } from "../../app/hooks";
import { prop, sortBy } from "ramda";
import Award from "../../models/Award";

import EntryItem from "../entry/EntryItem";

interface AwardProps {
  award: Award;
}

const DEFAULT_IMG = 'https://www.tibs.org.tw/images/default.jpg';

function AwardItem({ award }: AwardProps) {
  const { id, title, entries, winnerEntryId } = award;
  const orderedEntries = sortBy(prop('id'), entries || []);
  const dispatch = useAppDispatch();

  const addEntryHandler = () => {
    const title = prompt('Title of the new entry. [Press Cancel To Abort]');

    if (title !== null) {
      dispatch(createEntryAsync({
        description: 'Replace this with a better description or subtitle.',
        title: title || 'Untitled Entry',
        image: DEFAULT_IMG,
        awardId: id
      }));
    }
  };

  const deleteAwardHandler = () => {
    const deletionConfirmed = window.confirm('Are you sure you want to delete this award?');

    if (deletionConfirmed) {
      dispatch(deleteAwardAsync(id));
    }
  };

  const changeTitleHandler = () => {
    const newTitle = prompt('Type the new title for this award category.', title);

    if (newTitle) {
      dispatch(changeAwardTitleAsync({ awardId: id, newTitle }));
    }
  }

  return (
    <div className="ui vertical segment award-segment">
      <div className="ui large header">
        <span onClick={changeTitleHandler}>{title}</span>
        <button
          className="ui green button right floated mini"
          onClick={addEntryHandler}
        >
          <i className="add icon"></i>
          Add Entry
        </button>
        <button
          className="ui red button right floated mini"
          onClick={deleteAwardHandler}
          style={{ width: "42px" }}
        >
          <i className="icon trash"></i>
        </button>
        <div style={{ clear: "both" }}></div>
      </div>
      <div className="ui stackable two column relaxed grid entry-list">
        {orderedEntries.map((entry) => (
          <EntryItem
            key={entry.id}
            entry={entry}
            winnerEntryId={winnerEntryId}
            awardId={id}
          />
        ))}
      </div>
    </div>
  );
}

export default AwardItem;
