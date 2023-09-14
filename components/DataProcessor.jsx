import { memo, useState } from "react";
import Table from "./Table";
import { columns } from "./fetcher";
import ItemsFetcher from "./ItemsFetcher";
import RenderInfo from "./RenderInfo";
import Dialog from "./Dialog";
import RenderPosts from "./RenderPosts";

export default function DataProcessor() {
  //console.log("DataProcessor render");

  const [data, setData] = useState(null),
    [filterStr, setFilterStr] = useState(""),
    [info, setInfo] = useState(null),
    [posts, setPosts] = useState([]),
    [openDialogUserID, setOpenDialogUserID] = useState(null),
    [openDialogPosts, setOpenDialogPosts] = useState(null);

  function filterObjects(el) {
    if (!filterStr) return true;
    return columns
      .map(({ getVal }) => getVal(el))
      .filter((item) => "string" === typeof item)
      .some((item) => item.toLowerCase().includes(filterStr.toLowerCase()));
  }

  function sortItems(btn, head) {
    let direction = btn === "sortUp" ? 1 : -1;

    setData(
      data
        .sort((a, b) => (a[head] > b[head] ? direction : direction * -1))
        .map((item) => item)
    );
  }

  function onClick(event) {
    const tr = event.target.closest("tr");

    if (event.target.id === "btnCloseInfo") {
      setOpenDialogUserID(null);
      setOpenDialogPosts(null);
    }

    if (event.target.id === "btnClosePosts") {
      setOpenDialogPosts(null);
    }

    if (event.target.id === "delUser") {
      setData(data.filter((item) => item.id != tr.id));
      setOpenDialogUserID(null);
      setOpenDialogPosts(null);
    }
    if (event.target.id !== "delUser" && event.target.tagName === "TD") {
      setOpenDialogUserID(tr.id);
      setOpenDialogPosts(null);
    }
    if (event.target.id === "getPosts") {
      setOpenDialogPosts(openDialogUserID + "/posts");
    }
    if (event.target.id === "sortUp" || event.target.id === "sortDown") {
      const th = event.target.closest("th");
      sortItems(event.target.id, th.id.toLowerCase());

      setOpenDialogUserID(null);
      setOpenDialogPosts(null);
    }
  }

  return (
    <div onClick={() => onClick(event)}>
      <input
        value={filterStr}
        placeholder="Поиск..."
        onInput={(event) => setFilterStr(event.target.value)}
      />
      <ItemsFetcher onLoadCallback={setData}>
        <Table data={data?.filter(filterObjects)} columns={columns} />
      </ItemsFetcher>

      {openDialogUserID && (
        <ItemsFetcher onLoadCallback={setInfo} value={openDialogUserID}>
          <Dialog class_name="popupInfo">
            <RenderInfo info={info} />
            <button id="btnCloseInfo" className="buttonClose">
              ❌
            </button>
            <button id="getPosts">Post</button>
          </Dialog>
        </ItemsFetcher>
      )}

      {openDialogPosts && (
        <ItemsFetcher onLoadCallback={setPosts} value={openDialogPosts}>
          <Dialog class_name="popupPost">
            {posts.map((post) => (
              <RenderPosts key={post.id} post={post} />
            ))}
            <button id="btnClosePosts" className="buttonClose">
              ❌
            </button>
          </Dialog>
        </ItemsFetcher>
      )}
    </div>
  );
}
