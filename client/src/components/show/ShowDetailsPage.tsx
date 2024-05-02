import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { prop, sortBy } from "ramda";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createAwardAsync, fetchShowByIdAsync, selectShow } from "../../slices/showDetailsSlice";
import AwardItem from "../award/AwardItem";
import ShowStatistics from "./ShowStatistics";

type RouteParams = { id?: string }

function ShowDetailsPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams<RouteParams>();
  const show = useAppSelector(selectShow);

  useEffect(() => {
    dispatch(fetchShowByIdAsync(Number(id)));
  }, [dispatch, id]);

  const createAwardHandler = () => {
    const title = prompt('Type in the title of the award.');

    if (id !== undefined && title !== null) {
      dispatch(createAwardAsync({
        title: title || 'Untitled Award',
        showId: Number(id)
      }));
    }
  };

  if (show === null) {
    return (<div className="ui active centered inline loader"></div>);
  }

  const orderedAwards = sortBy(prop('title'), show.awards || []);

  return (
    <React.Fragment>
      {show.awards !== undefined &&
        <ShowStatistics awards={show.awards} />
      }
      <div className="ui huge header">
        Winners & Nominees
      </div>
      <div className="ui items">
        {orderedAwards.map((award) =>
          <AwardItem key={award.id} award={award} />)}
      </div>
      <button
        className="ui icon labeled green fluid button"
        onClick={createAwardHandler}
      >
        <i className="add icon"></i>
        Add Award Category
      </button>
    </React.Fragment>
  );
}

export default ShowDetailsPage;
