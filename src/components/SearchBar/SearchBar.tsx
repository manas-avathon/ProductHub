import type React from "react";


interface SearchBarProps {
    searchTerm : string;
    onSearchChange : (newTerm : string) => void;
}


const SearchBar : React.FC <SearchBarProps> = ({searchTerm, onSearchChange}) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
    };

    return(
        <div className="flex justify-center">
            <input type="text" placeholder="Search Products.." value={searchTerm} onChange={handleInputChange} className="w-1/2 p-2 border bg-white border-gray-300 rounded-md mt-6"/>
        </div>
    );
};

export default SearchBar;