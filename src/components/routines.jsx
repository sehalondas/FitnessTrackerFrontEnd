// As any user on the Routines tab, I want to:
// -see a list of all public routines showing:
// --The routine name, goal, and creator's username(DONE)
// --A list of activities for the routine, including their name, description, and duration and/or count(DONE)

// STRETCH GOALS
// As any user on the Routines tab, I want to:
// -be able to click on a username (shown as a Routine creator), and see a list of all of their public routines
// -be able to click on an activity name (shown in a list of activities on a routine), and see a list of all public routines which feature it

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { myRoutineData } from "../helpers/apiCalls";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";


const Routines = ({ token }) => {
  const [routines, setRoutines] = useState([]);
  const [addRoutines, setAddRoutines] = useState(false);

  const history = useHistory();

  const handleRoutines = () => {
    history.push("/Routines/MyRoutines");
  };

  const checkToken = () => {
    const storedToken = localStorage.getItem("token");
      setAddRoutines(true);
    }

  useEffect(() => {
    myRoutineData(setRoutines);
    checkToken();
  }, [token]);

  return (
    <>
      {addRoutines === true && <Button onClick={handleRoutines}>My Routines</Button>}
      {routines && (
        <div>
          {routines.map((routine) => (
            <div key={routine._id}>
              <h3>{routine.name}</h3>
              <p>{routine.goal}</p>
              <p>{routine.creatorName}</p>
              <div>
                {routine.activities.map((activity) => (
                  <div key={activity._id}>
                    <p>{activity.name}</p>
                    <p>{activity.description}</p>
                    <p>{activity.duration}</p>
                    <p>{activity.count}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Routines;
