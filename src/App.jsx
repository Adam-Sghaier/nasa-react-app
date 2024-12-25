import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;

      // instead of fetching data , we can use the daat from the cache if it exists
      const date = new Date().toDateString();
      const localKey = `NASA-${date}`;
      if(localStorage.getItem(localKey)){
        setData(JSON.parse(localStorage.getItem(localKey)));
        console.log('data from cache');
        return;
      }
      localStorage.clear();
      try {
        const res = await fetch(url);
        const apiData = await res.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        console.log('data from api');
        setData(apiData);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchAPIData();
  }, []);

  function toggleModal() {
    setShowModal(!showModal);
  }
  return (
    <>
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && <SideBar data={data} toggleModal={toggleModal} />}
      {data && <Footer data={data} toggleModal={toggleModal} />}
    </>
  );
}

export default App;
