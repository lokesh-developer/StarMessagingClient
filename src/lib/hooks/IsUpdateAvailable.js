import { useEffect, useState } from "react";

export const IsUpdateAvailable = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        registrations.onupdatefound = () => {
          setUpdateAvailable(true);
        };
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return updateAvailable;
};
