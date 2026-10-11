import BottomNavigator from "./BottomNavigator"

function SavedLocations() {

    const savedLocations = JSON.parse(localStorage.getItem("savedLocations")) || [];
    console.log(savedLocations);

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