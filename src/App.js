import { useRef, useState, useEffect } from "react";
import UserLogo from "./userLogo.png";

function App() {
  const [value, setValue] = useState("");
  const [comments, setComments] = useState([]);
  const commentsEndRef = useRef(null);
  let username = "User1";

  const keyPress = (event) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setValue(value + "\n");
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (!checkForNull()) handlePost();
    }
  };

  function handlePost() {
    setComments([...comments, value]);
    setValue("");
  }

  function checkForNull() {
    return /^\s*$/.test(value);
  }

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  return (
    <div className=" bg-zinc-800 w-screen h-screen ">
      <br />
      <div className="w-1/2 bg-zinc-800 h-1/2 mx-auto border-2 border-zinc-900 rounded-2xl pb-6 pt-1 px-4">
        <h1 className="text-white bg-zinc-800 text-xl pb-1">Comments</h1>
        <div className="w-full h-[calc(100%-50px)] p-2  overflow-y-auto">
          {comments.map((comment, index) => {
            return (
              <div
                key={index}
                className="  bg-zinc-700 flex flex-row border-b-2 border-zinc-700 m-1 pr-2  break-words rounded-xl"
              >
                <img src={UserLogo} alt="" className="w-12 h-12 " />
                <span className="m-1  flex-1 break-words w-1/3">
                  <h2 className=" text-slate-300 font-bold">{username}</h2>
                  <p className=" text-white">{comment}</p>
                </span>
              </div>
            );
          })}
          <div ref={commentsEndRef} />
        </div>
        <div className="flex pl-2">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={keyPress}
            className="w-full border-l-2 border-b-2 border-zinc-900 rounded-l-lg text-white bg-zinc-500 pl-4"
            placeholder="Comment..."
          />
          <button
            onClick={checkForNull() ? null : handlePost}
            className=" bg-zinc-800 border-b-2 border-r-2 border-zinc-900 text-zinc-300 rounded-br-lg w-16"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
