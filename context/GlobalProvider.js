import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

import { getCurrentUser } from "../lib/appwrite";

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCurrentUser()
        .then((res) => {
            if (res) {
                setisLoggedIn(true)
                setUser(res)
            } else {
                setisLoggedIn(false)
                setUser(null)
            }
        })
        .catch((error) => {
            console.log(error);
        }) 
        .finally(() => {
            setIsLoading(false)
        })
    }, []);
    

    return (
        <GlobalContext.Provider
        value = {{
            isLoggedIn,
            setisLoggedIn,
            user,
            setUser,
            isLoading
        }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider