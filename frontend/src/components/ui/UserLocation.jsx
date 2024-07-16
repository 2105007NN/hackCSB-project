import { useState, useEffect } from "react";

const UserLocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message,
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation not supported by your browser",
      });
    }
  }, []);

  return (
    <div>
      {location.error ? (
        <p>Error: {location.error}</p>
      ) : (
        <>
          {/* <div>
          <p>Latitude: </p>
          <p>Longitude: </p>
        </div> */}
          <div className="font-light text-sm p-4">
            Latitude
            <p className="text-white font-medium text-lg"></p>
            {location.latitude}
          </div>
          <div className="font-light text-sm p-4">
            Longitude
            <p className="text-white font-medium text-lg"></p>
            {location.longitude}
          </div>
        </>
      )}
    </div>
  );
};

export default UserLocation;
