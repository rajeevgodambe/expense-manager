import React, { useEffect } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { DatabaseProvider } from "@nozbe/watermelondb/DatabaseProvider";
import { database, addDefaultCategories } from "./src/database/database";


const App = () => {

  // useEffect(() => {
  //   console.log("Adding default categories");
  //   addDefaultCategories();
  // }, []);

  return (
    <DatabaseProvider database={database}>
      <RootNavigator />
    </DatabaseProvider>
  )
};

export default App;
