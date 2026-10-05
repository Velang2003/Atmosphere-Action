import BottomNavigator from "./BottomNavigator"
import useFetchData from "../useFetchData";

function SavedLocations() {

    const savedLocations = JSON.parse(localStorage.getItem("savedLocations")) || [];
    console.log(savedLocations);

    let fetchSavedData = [];

    savedLocations.forEach(element => {
        console.log(element);
    });

    // console.log("Saved Location Data: "+ fetchSavedData);

  return (
        <>
            <p>Saved Locations</p>

            

            <BottomNavigator/>
        </>
  )
}

export default SavedLocations