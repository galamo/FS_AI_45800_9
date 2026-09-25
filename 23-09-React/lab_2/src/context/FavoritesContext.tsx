import { createContext, useContext, useState, type ReactNode } from "react"
import type { SingleUserType } from "../pages/UsersPage/user-type"

type FavoritesContextValue = {
  favorites: SingleUserType[]
  addFavorite: (user: SingleUserType) => void
}

export const FavoritesContext =
  createContext<FavoritesContextValue | null>(null)

  export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<SingleUserType[]>([])
  
    function addFavorite(user: SingleUserType) {
      setFavorites(current => {
        const alreadyExists = current.some(
          favorite => favorite.login.uuid === user.login.uuid
        )
  
        if (alreadyExists) {
          return current
        }
  
        return [...current, user]
      })
    }
    return (
      <FavoritesContext.Provider value={{ favorites, addFavorite }}>
        {children}
      </FavoritesContext.Provider>
    )
  }
  
  export function useFavoritesContext() {
    const context = useContext(FavoritesContext)
  
    if (context === null) {
      throw new Error("useFavoritesContext must be used within FavoritesProvider")
    }
  
    return context
  }
   
      
     
    
  