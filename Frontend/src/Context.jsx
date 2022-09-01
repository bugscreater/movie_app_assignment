import React, { useState } from "react";


export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
	const [playlistchange,setPlaylistchange] = useState(false);
	const [logout,setlogout] = useState(false);
	

	return (
		<Context.Provider value={{is_change:[playlistchange,setPlaylistchange],handlelogout:[logout,setlogout]}}>
			{children}
		</Context.Provider>
	);
};
