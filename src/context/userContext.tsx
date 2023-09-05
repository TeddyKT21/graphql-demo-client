import { createContext, useState } from "react";

type userContextType = {
    currentUser: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

type userContextProps = {
    children: React.ReactNode
}


export const UserContext = createContext<userContextType | null>(null);


const UserContextProvider = (props : userContextProps)  =>{
    const [currentUser,setUser] = useState<User | null>(null);
    return (
        <UserContext.Provider value={{setUser, currentUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider