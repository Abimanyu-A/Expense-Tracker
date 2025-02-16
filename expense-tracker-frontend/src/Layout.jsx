import { Outlet, NavLink } from "react-router-dom";
import { PlusCircle, Home, Wallet } from "lucide-react";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header for Mobile/Tablet */}
      <header className="bg-white shadow-md md:hidden sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Expense Tracker</h1>
          <nav className="flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-1 p-2 rounded-md ${
                  isActive ? "bg-gray-200" : "hover:bg-gray-100"
                }`
              }
            >
              <Home size={20} />
            </NavLink>
            <NavLink
              to="/add-expense"
              className={({ isActive }) =>
                `flex items-center gap-1 p-2 rounded-md ${
                  isActive ? "bg-gray-200" : "hover:bg-gray-100"
                }`
              }
            >
              <PlusCircle size={20} />
            </NavLink>

            <NavLink
              to={"/view-expense"}
              className={({ isActive }) =>
                `flex items-center gap-1 p-2 rounded-md ${
                  isActive ? "bg-gray-200" : "hover:bg-gray-100"
                }`
              }
            >
              <Wallet size={20} />
            </NavLink>
          </nav>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for Desktop */}
        <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg p-6 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">Expense Tracker</h1>
          <nav>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <Home size={20} />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-expense"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <PlusCircle size={20} />
                  Add Expense
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/view-expense"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <Wallet size={20} />
                  Today's Expenses
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
