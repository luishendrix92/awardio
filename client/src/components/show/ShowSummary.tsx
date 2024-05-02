import { Link } from "react-router-dom";
import Show from "../../models/Show";
import { useAppDispatch } from "../../app/hooks";
import { deleteShowAsync } from "../../slices/showListSlice";

interface ShowSummaryProps {
  setIsEditing: (isEditing: boolean) => void;
  data: Show;
}

function ShowSummary({ data, setIsEditing }: ShowSummaryProps) {
  const { id, title, description, airDate, image } = data;
  const formattedAirDate = `Aired on ${new Date(airDate).toDateString()}`;
  const dispatch = useAppDispatch();

  const deleteShowHandler = () => {
    const deletionConfirmed = window.confirm('Are you sure you want to delete this show?');

    if (deletionConfirmed) {
      dispatch(deleteShowAsync(id));
    }
  };

  return (
    <div className="ui raised card">
      <div className="image">
        <img className="fit-cover" src={image} alt={title} />
      </div>
      <div className="content">
        <Link to={`/${id}`} className="header">{title}</Link>
        <div className="meta">
          <span className="date">
            {formattedAirDate + " "}
            <i className="calendar alternate outline icon"></i>
          </span>
        </div>
        <div className="description">{description}</div>
      </div>
      <div className="extra content">
        <span className="left floated">
          <i
            className="trash icon pointer hover-red"
            onClick={deleteShowHandler}
          >
          </i>
          Delete
        </span>
        <span className="right floated">
          <i
            className="pencil icon pointer hover-green"
            onClick={() => setIsEditing(true)}
          >
          </i>
          Edit
        </span>
      </div>
    </div>
  );
}

export default ShowSummary;
