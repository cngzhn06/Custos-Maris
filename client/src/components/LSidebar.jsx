import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const LSidebar = ({ ships, onSearchResults, onFilterChange, isOpen, onToggle }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [activeFilter, setActiveFilter] = useState("all");

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      onSearchResults(ships);
      return;
    }

    const filteredShips = ships.filter((ship) => {
      const term = searchTerm.toLowerCase();
      switch (searchType) {
        case "imo":
          return ship.imo?.toString().toLowerCase().includes(term);
        case "mmsi":
          return ship.mmsi?.toString().toLowerCase().includes(term);
        case "name":
          return ship.name?.toLowerCase().includes(term);
        case "shipType":
          return ship.shipType?.toLowerCase().includes(term);
        default:
          return (
            ship.imo?.toString().toLowerCase().includes(term) ||
            ship.mmsi?.toString().toLowerCase().includes(term) ||
            ship.name?.toLowerCase().includes(term) ||
            ship.shipType?.toLowerCase().includes(term)
          );
      }
    });

    onSearchResults(filteredShips);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const filterShips = (type) => {
    setActiveFilter(type);
    if (type === "all") {
      onFilterChange(ships);
    } else {
      const filtered = ships.filter(ship => 
        ship.shipType?.toLowerCase().includes(type.toLowerCase())
      );
      onFilterChange(filtered);
    }
  };

  return (
    <div className={`${isOpen ? 'w-72' : 'w-12'} bg-sidebar-color h-[calc(100vh-4rem)] flex relative transition-all duration-300`}>
      <div className={`${isOpen ? 'flex flex-col w-full' : 'hidden'} h-full`}>
        <div className="p-4 text-navbar-color flex-1 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Gemi Arama</h2>
          
          <div className="relative mb-6">
            <input
              type="text"
              placeholder={`${searchType} ile ara`}
              className="w-full p-3 pl-11 rounded-xl bg-navbar-color text-sidebar-color focus:outline-none focus:ring-2 focus:ring-[#4A702D] shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SearchIcon className="absolute left-3 top-3.5 text-sidebar-color" />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-navbar-color">Arama Türü:</label>
            <select
              className="w-full p-3 rounded-xl bg-navbar-color text-sidebar-color focus:outline-none focus:ring-2 focus:ring-[#4A702D] shadow-lg"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="imo">IMO</option>
              <option value="mmsi">MMSI</option>
              <option value="shipType">Gemi Türü</option>
            </select>
          </div>
          
          <button
            className="w-full bg-[#4A702D] text-white py-3 rounded-xl font-bold hover:bg-[#5b6e2c] transition duration-300 shadow-lg"
            onClick={handleSearch}
          >
            Ara
          </button>
        </div>
      </div>

      <button 
        onClick={onToggle}
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-sidebar-color text-navbar-color hover:bg-navbar-color hover:text-sidebar-color transition-colors rounded-full p-1 shadow-lg z-10"
      >
        {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </button>
    </div>
  );
};

export default LSidebar;