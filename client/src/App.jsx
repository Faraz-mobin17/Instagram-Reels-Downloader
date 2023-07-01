// Here are the improvements made to the code:

// 1. Added `useEffect` hook: The `useEffect` hook is used to handle the changes in the `videoUrl` state. Whenever the `videoUrl` changes, it creates a video element and appends it to the `show` div. This ensures that the video is displayed when the URL is set.

// 2. Separated video URL and error message states: Instead of using the `link` state to store both the video URL and error messages, separate states `videoUrl` and `errorMessage` are used. This allows for better handling and display of errors.

// 3. Cleared previous video element: Before appending a new video element to the `show` div, the existing content is cleared. This prevents multiple videos from being displayed when a new URL is entered.

// 4. Error handling: In case an error occurs during fetching the video, an error message is displayed in the `show` div, and the `videoUrl` state is cleared.

// These improvements aim to enhance the functionality and readability of the code.

import { useState, useEffect } from "react";
import { Footer } from "./components/Footer.component";
import "./App.css";
// https://www.instagram.com/reel/CslsrulAnfh/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==
function App() {
  const [link, setLink] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (videoUrl !== "") {
      const show = document.querySelector("#show");
      const vdo = document.createElement("video");
      vdo.width = "400";
      vdo.height = "400";
      vdo.controls = true;
      const vdoSrc = document.createElement("source");
      vdo.src = videoUrl;
      vdo.appendChild(vdoSrc);
      show.innerHTML = "";
      show.append(vdo);
    }
  }, [videoUrl]);
  const downloadInstaVideos = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:3000/download?url=${link}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch the video.");
      }
      const data = await response.text();
      const parser = new DOMParser();
      const parsedDoc = parser.parseFromString(data, "text/html");
      const getScript = JSON.parse(parsedDoc.querySelector("script").innerHTML);
      const getUrl = getScript.video[0].contentUrl;

      setVideoUrl(getUrl);
      setErrorMessage("");
    } catch (error) {
      console.log("Error: ", error);
      setErrorMessage(
        "Error occurred while fetching the video. Please try again."
      );
      setVideoUrl("");
    }
  };
  return (
    <>
      <div className="container">
        <h1>Instagram Reels Downloader</h1>
        <form onSubmit={downloadInstaVideos}>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="eg.. https://www.instagram.com/reel/CtyDKecsDEq/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
            className="input"
          />
          <button type="submit" className="btn-block">
            Download
          </button>
        </form>
        <div id="show">{errorMessage}</div>
      </div>

      <Footer />
    </>
  );
}

export default App;
