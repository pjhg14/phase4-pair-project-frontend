import { useHistory } from "react-router";
import { useEffect } from "react";

function Redirect() {
  const history = useHistory();
  useEffect(() => {
    history.push("/rentals/host");
  }, []);

  return <div></div>;
}

export default Redirect;
