import { Bot, LogOut, X } from "lucide-react";
import { useState } from "react";

const Sidebar = ({ Visible, toggleSidebar, messages, newChat }) => {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-[60%] md:static md:w-[20%] bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-100 p-2 transition-transform duration-300 ease-in-out z-40
    ${Visible ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3">
        <Bot />
        <button onClick={toggleSidebar}><X /></button>
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col h-[calc(100vh-4rem)]"> {/* Adjust height to exclude header */}

        {/* New Chat Button */}
        <div className="w-full py-4">
          <button onClick={newChat} className='w-full py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl'>+ New Chat</button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-white/20 scrollbar-track-transparent space-y-4 py-4">
          <div className="dark:text-gray-300 text-gray-900 text-sm text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores debitis officia assumenda veniam qui et rerum, recusandae voluptatibus, beatae nulla nobis dicta ut soluta eveniet! Qui deserunt officiis non unde perferendis accusantium natus dolor minus praesentium assumenda sed, eaque labore nesciunt voluptates, autem at magni iste vitae. Culpa eaque non perspiciatis voluptatum alias sapiente temporibus deserunt minima reiciendis blanditiis consequuntur, molestiae necessitatibus quaerat iste provident tempora dolore doloremque, optio, at totam hic debitis labore nobis! Iure provident numquam illum? Consequuntur blanditiis sapiente saepe earum debitis similique odit, voluptatem accusantium ipsum totam delectus minima mollitia eaque incidunt eveniet, sunt molestiae quia! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis enim hic aliquid. Ab quam quas, vel fuga iusto sint libero quo deserunt minus accusantium praesentium maxime esse perferendis quos quod odit aliquid debitis, earum qui nisi non beatae rerum blanditiis ipsa? Pariatur, suscipit rerum odio exercitationem deserunt dolore facilis? Quam, beatae totam! Quibusdam aliquid necessitatibus, hic labore sequi suscipit possimus rem voluptatem reiciendis, harum officiis sint dicta atque, esse saepe cum aspernatur quas! Eligendi nesciunt quaerat sapiente minus. Cum tempore reprehenderit odit perspiciatis saepe similique non aliquam veniam, corrupti animi libero? Neque atque natus reiciendis animi beatae. Excepturi, pariatur veniam.</div>
          {/* Future chat items go here */}
        </div>

        {/* Footer */}
        <div className="dark:bg-gray-800 bg-gray-200 rounded-xl ">
          <div
            className="flex items-center gap-x-3 cursor-pointer px-3 py-3"
            onClick={(prev) => setShowLogout(prev => !prev)}
          >
            <img className="rounded-full w-8 h-8" src="" alt="" />
            <span>user name</span>
          </div>

          {showLogout && (
            <button className="fixed left-3 bottom-16 flex z-50 items-center text-sm gap-2 rounded-lg transition bg-gray-200 px-2 py-1 hover:bg-gray-300 dark:bg-gray-600 hover:dark:bg-gray-500">
              <LogOut />
              Logout
            </button>
          )}
        </div>
      </div>
    </aside>

  );
};

export default Sidebar;