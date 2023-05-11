import React,{useState, useContext, createContext} from 'react'

const GlobalState = createContext()

export function useGlobalState(){
    return useContext(GlobalState)
}
const Context = ({children}) => {
    const [searchText, setSearchText] = useState('')
    const [favList, setFavList] = useState([])
    const [exploreList, setExploreList] = useState([])
    const [userWindowWidth, setUserWindowWidth] = useState(window.innerWidth)

  return (
    <GlobalState.Provider 
      value={{
          searchValue:[searchText, setSearchText], 
          favoritesValue: [favList, setFavList],
          exploreValue: [exploreList, setExploreList],
          windowWidthValue: userWindowWidth
    }}>
        {children}
    </GlobalState.Provider>
  )
}

export default Context