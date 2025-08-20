import { BookOpenIcon, Bot, LogOut, X } from 'lucide-react'

function Sidebar({ onClose, messages }) {

  return (
    <div className="fixed inset-y-0 left-0 top-0 w-[50%] bg-gray-100 dark:bg-[#232327] p-4 md:static md:w-64 flex flex-col justify-between h-screen md:flex md:flex-col md:justify-between md:h-screen shadow-2xl">
      {/* Header */}
      <div className='flex items-center justify-between '>
        <div className='text-xl font-bold'><Bot /></div>
        <button onClick={onClose}><X /></button>
      </div>

      {/* History */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4 mt-4'>
        <button onClick={messages} className='w-full bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 rounded-xl'>+ New Chat</button>
        <div className='text-gray-500 text-sm text-center'>No chat history yet</div>
      </div>

      {/* Footer */}
      <div className='p-4 '>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-2 cursor-pointer'>
            <img className='rounded-full w-8 h-8' src='' alt="" />
            <span className=''>user name</span>
          </div>
          <button className='flex items-center text-sm gap-2 rounded-lg  transition bg-gray-200 px-2 py-1 hover:bg-gray-300 dark:bg-gray-600 hover:dark:bg-gray-500'><LogOut />Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
