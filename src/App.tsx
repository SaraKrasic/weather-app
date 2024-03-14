import React from "react";
import { useState, createContext } from "react";
import WeatherCard from "./components/WeatherCard";
import ErrorNotification from "./components/ErrorNotification";

export const NameContext = createContext({
  error: null as any,
  setError: (error: string | null) => {},
});

const App = () => {
  const [error, setError] = useState<string | null>();
  return (
    <>
      <NameContext.Provider value={{ error, setError }}>
        <ErrorNotification></ErrorNotification>
        <WeatherCard></WeatherCard>
      </NameContext.Provider>
    </>
  );
};

export default App;
