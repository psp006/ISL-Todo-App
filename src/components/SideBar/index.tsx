import React from "react";
import { Clock, Calendar, FileText, Search } from "react-feather";

interface SidebarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <aside className="w-64 bg-gray-100 p-4 flex flex-col justify-between rounded-r-2xl shadow-sm">
      <div>
        <h2 className="font-bold text-lg mb-4">Menu</h2>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border px-8 py-1 text-sm focus:outline-none focus:ring"
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        <div className="mt-6">
          <p className="uppercase text-xs text-gray-500 mb-2">Tasks</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2 font-semibold">
              <Clock className="w-4 h-4" /> Upcoming
            </li>
            <li className="flex items-center gap-2 font-semibold text-black">
              <Calendar className="w-4 h-4" /> Today
            </li>
            <li className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Calendar
            </li>
            <li className="flex items-center gap-2">
              <FileText className="w-4 h-4" /> Sticky Wall
            </li>
          </ul>
        </div>
      </div>

      <div className="text-sm text-gray-500 space-y-2">
        <button className="hover:text-black">Settings</button>
        <br />
        <button className="hover:text-black">Sign out</button>
      </div>
    </aside>
  );
};

export default Sidebar;
