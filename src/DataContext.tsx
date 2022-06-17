import React, { createContext } from "react";
import { useQuery, gql } from "@apollo/client";

const CLIENTS = gql`
query getAllClients {clients {data {id,attributes {lastname,firstname,email,notes {data{attributes{score}}}}}}}
  `;

const DataContext = createContext<any>(undefined);

export const DataContextProvider: React.FC = ({ children }) => {
  const { loading, error, data } = useQuery(CLIENTS);

  return (
    <DataContext.Provider
      value={{
        loading,
        error,
        data
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => React.useContext<any>(DataContext)!;