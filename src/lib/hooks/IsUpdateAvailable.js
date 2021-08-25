import { useEffect, useState } from "react";

export const IsUpdateAvailable = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        registrations.map((e) => {
          if (e.waiting === null) {
            setUpdateAvailable(false);
            return false;
          } else {
            setUpdateAvailable(true);
            return true;
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return updateAvailable;
};
