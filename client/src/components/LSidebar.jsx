import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const LSidebar = ({ ships, onSearchResults, onFilterChange }) => {
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
    <div className="w-1/5 bg-sidebar-color p-4 text-navbar-color">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Gemi Arama</h2>
        
        <div className="relative mb-4">
          <input
            type="text"
            placeholder={`Search by ${searchType}...`}
            className="w-full p-2 pl-10 rounded-lg bg-navbar-color text-sidebar-color focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <SearchIcon className="absolute left-3 top-3 text-sidebar-color" />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Arama Türü:</label>
          <select
            className="w-full p-2 rounded-lg bg-navbar-color text-sidebar-color focus:outline-none"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="name">Gemi Adı</option>
            <option value="imo">IMO</option>
            <option value="mmsi">MMSI</option>
            <option value="shipType">Gemi Türü</option>
          </select>
        </div>
        
        <button
          className="w-full bg-navbar-color text-sidebar-color py-2 rounded-lg font-bold hover:bg-[#b8ae79] transition duration-300 mb-6"
          onClick={handleSearch}
        >
          Ara
        </button>

        <h2 className="text-xl font-bold mb-4">Gemi Filtrele</h2>
        <div className="flex flex-row flex-wrap gap-2 mb-4">
          <button
            onClick={() => filterShips("all")}
            className={`py-2 px-3 rounded-lg font-bold text-sm ${
              activeFilter === "all" 
                ? "bg-[#4A702D] text-white" 
                : "bg-navbar-color text-sidebar-color hover:bg-[#b8ae79]"
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => filterShips("yolcu")}
            className={`py-2 px-3 rounded-lg font-bold text-sm ${
              activeFilter === "yolcu" 
                ? "bg-[#4A702D] text-white" 
                : "bg-navbar-color text-sidebar-color hover:bg-[#b8ae79]"
            }`}
          >
            Yolcu
          </button>
          <button
            onClick={() => filterShips("donanma")}
            className={`py-2 px-3 rounded-lg font-bold text-sm ${
              activeFilter === "donanma" 
                ? "bg-[#4A702D] text-white" 
                : "bg-navbar-color text-sidebar-color hover:bg-[#b8ae79]"
            }`}
          >
            Donanma
          </button>
          <button
            onClick={() => filterShips("kargo")}
            className={`py-2 px-3 rounded-lg font-bold text-sm ${
              activeFilter === "kargo" 
                ? "bg-[#4A702D] text-white" 
                : "bg-navbar-color text-sidebar-color hover:bg-[#b8ae79]"
            }`}
          >
            Kargo
          </button>
        </div>
      </div>
    </div>
  );
};

export default LSidebar;