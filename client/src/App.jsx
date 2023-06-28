import { useState } from "react";
import "./App.css";
// https://www.instagram.com/reel/CslsrulAnfh/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==
function App() {
  const [link, setLink] = useState("");
  const downloadInstaVideos = async (e) => {
    e.preventDefault();
    try {
      const show = document.querySelector("#show");
      const url = `http://localhost:3000/download?url=${link}';`;
      const response = await fetch(url);
      const data = await response.text();
      const parser = new DOMParser();
      const parsedDoc = parser.parseFromString(data, "text/html");
      const getScript = JSON.parse(parsedDoc.querySelector("script").innerHTML);
      const getUrl = getScript.video[0].contentUrl;
      console.log(typeof getScript.video[0].contentUrl);

      setLink(getUrl);
      console.log(link);

      const vdo = document.createElement("video");
      vdo.width = "300";
      vdo.height = "300";
      vdo.controls = true;
      const vdoSrc = document.createElement("source");
      vdo.src = getUrl;
      vdo.appendChild(vdoSrc);
      show.append(vdo);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <>
      <div>
        <h1>Instagram Reels Downloader</h1>
        <form onSubmit={downloadInstaVideos}>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter Instagram Reel URL"
          />
          <button type="submit">Download</button>
        </form>
      </div>
      <div id="show"></div>
    </>
  );
}

export default App;
