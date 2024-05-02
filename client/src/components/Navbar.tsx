import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectNavBgImg, selectPageSub, selectPageTitle } from "../slices/globalSlice";

function Navbar() {
  const pageTitle = useAppSelector(selectPageTitle);
  const pageSub = useAppSelector(selectPageSub);
  const navBgImg = useAppSelector(selectNavBgImg);

  return (
    <div
      className="ui inverted vertical masthead center aligned segment bg-blend-sl"
      style={{ backgroundImage: `url('${navBgImg}')` }}
    >
      <div className="ui container">
        <nav className="ui large secondary inverted menu">
          <Link className="active item" to="/">Home</Link>
          <div className="right item">
            <button className="ui inverted button">
              <i className="pencil icon"></i>
              Edit Mode
            </button>
          </div>
        </nav>
        {pageTitle && (
          <h1 className="ui inverted header" style={{ marginBottom: "10px" }}>
            {pageTitle}
            {pageSub && (
              <div className="sub header" style={{ marginTop: "10px", color: "#bbb", lineHeight: "1.5em" }}>
                {pageSub}
              </div>
            )}
          </h1>
        )}
      </div>
    </div>
  );
}

export default Navbar;
