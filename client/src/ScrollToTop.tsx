import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * As seen on https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition
 * This component doesn't return any DOM element but enables
 * automatic scroll-to-top whenever the route changes.
 * For the project this is useful because whenever the user
 * selects a show from the home page, the transition from
 * the "/" route to "/:id" leaves the user in the same
 * vertical scroll-top position, but ideally it should
 * take them straight to the top of the show details page.
 */

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;