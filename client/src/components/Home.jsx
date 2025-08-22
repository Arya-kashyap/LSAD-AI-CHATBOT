import Sidebar from "./Sidebar.jsx";
import MainContent from "./MainContent.jsx";
import { useState } from "react";

const Home = ({Visible, toggleSidebar}) => {
     
     const [messages, setMessages] = useState([]);

     const handleNewChat = () => {
          setMessages([]);
     }

     const handleSend = (msg) => {
          if (!msg.trim()) return;
          // Add user message
          const updatedMessages = [...messages, { role: "user", content: msg }];
          // Simulate bot response (replace with API later)
          const botReply = {
               role: "bot",
               content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptatibus architecto et alias non ratione corrupti hic deserunt aspernatur placeat blanditiis repellat necessitatibus id enim aliquam, voluptas harum! Atque sequi, tempora labore esse debitis ipsam eligendi minima nemo explicabo commodi reiciendis perspiciatis blanditiis sint quibusdam, porro aperiam facere assumenda. Ad cupiditate repellendus nam fugiat, expedita quisquam qui animi repellat eaque odio possimus voluptatem exercitationem impedit atque nemo harum, accusantium nihil tenetur, incidunt itaque cumque inventore enim ea. Perspiciatis, animi aspernatur. Illo blanditiis veritatis soluta minima veniam provident quibusdam, quis odio sequi ipsa sed, modi cumque reprehenderit, eius incidunt nemo sint!`
          };
          setMessages([...updatedMessages, botReply]);
     };

     return (
          <div className="flex w-screen h-screen bg-gray-50 dark:bg-gray-900">
               {/* Sidebar */}
               {
                    Visible && <Sidebar newChat={handleNewChat} messages={messages} Visible={Visible} toggleSidebar={toggleSidebar}/>
               }

               {/* Main Content */}
               <MainContent messages={messages} handleSend={handleSend}/>
          </div>
     );
};

export default Home;
