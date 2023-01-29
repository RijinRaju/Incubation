import { React, createContext, useState, Children } from "react";

export const UserContext = createContext(null);

// export default function Context() {
//     const[state,setState] = useState(null)

//   return (
//         <UserContext.Provider value={{state,useState}}>
//             {Children}
//         </UserContext.Provider>
//   )
// }
