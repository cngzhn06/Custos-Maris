import React from "react";

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <nav className="p-4 text-white fixed w-full z-10 top-0 bg-slate-600">
          <div>navbar</div>
        </nav>
        <div className="flex mt-24 justify-between">
          <div className="w-3/4 ml-9 mr-9">
            <div>map</div>
          </div>
          <div className="w-1/4 ">anormaller karakteristik özellikler vs</div>
        </div>
        <footer className="bg-slate-600 p-4 text-white fixed w-full bottom-0 text-center">
          <p>&copy; {new Date().getFullYear()} Tüm hakları saklıdır.</p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
