import { useState } from "react";
import Show from "../../models/Show";
import CUShowCard from "./CUShowCard";
import ShowSummary from "./ShowSummary";

interface ShowListItemProps {
  show: Show;
}

function ShowListItem({ show }: ShowListItemProps) {
  const { id, title, airDate, image, description } = show;
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <CUShowCard
        initialFormData={{ title, description, image, airDate }}
        afterSave={() => setIsEditing(false)}
        idToUpdate={id}
        isUpdate
      />
    );
  }

  return (
    <ShowSummary data={show} setIsEditing={setIsEditing} />
  );
}

export default ShowListItem;