import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeNavBgImg, changePageTitle } from "../../slices/globalSlice";
import { fetchShowsAsync, selectShows } from "../../slices/showListSlice";
import CUShowCard from "./CUShowCard";
import ShowListItem from "./ShowListItem";

function ShowListPage() {
  const dispatch = useAppDispatch();
  const shows = useAppSelector(selectShows);

  useEffect(() => {
    dispatch(changePageTitle(null));
    dispatch(changeNavBgImg(null));
    dispatch(fetchShowsAsync());
  }, [dispatch]);

  return (
    <div className="ui three centered stackable cards">
      {shows.map((show) =>
        <ShowListItem key={show.id} show={show} />)}
      <CUShowCard />
    </div>
  );
}

export default ShowListPage;
