import {
  MapPinned,
  Star,
  Settings,
  LogOut,
  Menu,
  PlusCircle,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menus = [
    {
      name: "Mes lieux",
      icon: MapPinned,
      path: "/lieux",
    },
    {
      name: "Favoris",
      icon: Star,
      path: "/favoris",
    },
    {
      name: "Paramètres",
      icon: Settings,
      path: "/parametres",
    },
    {
      name: "Enregistrer un lieu",
      icon: PlusCircle,
      path: "/lieux",
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow p-2 rounded-xl"
        onClick={() => setOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative
          z-50
          h-full
          w-72
          bg-white
          shadow-xl
          flex
          flex-col
          transition-all
          duration-300

          ${open ? "left-0" : "-left-72"}
          lg:left-0
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b">

          <h1 className="text-3xl font-bold text-blue-600">
            GeoMemo
          </h1>

          <p className="text-sm text-gray-500">
            Retrouve tes lieux facilement
          </p>

        </div>

        {/* Menus */}
        <div className="flex-1 p-4">

          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className={`
                flex
                items-center
                gap-3
                p-3
                rounded-xl
                mb-2
                transition

                ${
                  location.pathname === menu.path
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-100"
                }
              `}
            >
              <menu.icon size={20} />
              {menu.name}
            </Link>
          ))}

        </div>

        {/* Footer */}
        <div className="border-t p-4">

          <button
            onClick={logout}
            className="
              w-full
              bg-red-500
              hover:bg-red-600
              text-white
              rounded-xl
              p-3
              transition
            "
          >
            <LogOut className="inline mr-2" size={18} />
            Déconnexion
          </button>

        </div>
      </aside>
    </>
  );
}