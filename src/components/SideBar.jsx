export default function SideBar({ toggleModal, data }) {
  return (
    <div className="sidebar">
      <div className="bgOverlay"></div>
      <div className="sidebarContents">
        <h2>{data?.title}</h2>
        <div className="descriptionContainer">
          <p className="descriptionTitle">{data?.date}</p>
          <p>{data?.explanation}</p>
        </div>

        <button onClick={toggleModal}>
          <i className="fa-solid fa-right-long"></i>
        </button>
      </div>
    </div>
  );
}
