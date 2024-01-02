import { createContext } from "react";

export interface UserProps {
  id: string, 
  identity: string
}

export const UserContext = createContext<UserProps>({
  id: "",
  identity: ""
})