import React, { useContext, useState } from "react";

const StoreContext = React.createContext();

export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider({ children }) {
  const [favorites, setFavorites] = useState(["02", "05", "32"]);
  const [lastPlayed, setLastPlayed] = useState([]);

  return (
    <StoreContext.Provider
      value={{
        favorites: favorites,
        setFavorites: setFavorites,
        lastPlayed: lastPlayed,
        setLastPlayed: setLastPlayed,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
