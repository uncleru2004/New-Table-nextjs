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
    [openDialogPosts, setOpenDialogPosts] = useState(null),
    [editedID, setEditedID] = useState(null),
    [values, setValues] = useState(columns.map(() => "-"));
  console.log(values);
  //console.log(data[+editedID])
  console.log(editedID);
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
    if (event.target.id === "editUser") {
      setEditedID(tr.id);
      const index = data.findIndex((obj) => String(obj.id) === String(tr.id));
      setValues(
        columns.map(({ setVal, getVal }) =>
          setVal ? getVal(data[index]) : "-"
        )
      );
      setOpenDialogUserID(null);
      setOpenDialogPosts(null);
    }
    if (event.target.id === "cancel") {
      setEditedID(null);
      setValues(columns.map(() => "-"));
    }
    if (event.target.id === "ok") {
      if (editedID) {
        const ind = data.findIndex(
          (obj) => String(obj.id) === String(editedID)
        );
        const newObj = data[ind];
        columns.forEach(({ setVal }, index) =>
          Object.assign(newObj, setVal?.(values[index]))
        );
        setData((old) => old.with(ind, newObj));
      } else {
        const newObj = {
          id: Math.max(...data.map((item) => +item.id)) + 1,
          address: {},
        };
        columns.forEach(({ setVal }, index) =>
          Object.assign(newObj, setVal?.(values[index]))
        );
        setData(data.concat(newObj));
      }
      setEditedID(null);
      setValues(columns.map(() => "-"));
    }
  }

  function Form() {
    return (
      <tr>
        {columns.map(({ title, setVal }, index) =>
          title === "del" ? (
            <td key={title}>
              <button id="ok">🆗</button>
            </td>
          ) : title === "ed" ? (
            <td key={title}>
              <button id="cancel">🗙</button>
            </td>
          ) : (
            <td key={title}>
              {setVal ? (
                <input
                  value={values[index]}
                  onInput={(event) =>
                    setValues((old) => old.with(index, event.target.value))
                  }
                />
              ) : (
                "..."
              )}
            </td>
          )
        )}
      </tr>
    );
  }

  return (
    <div onClick={() => onClick(event)}>
      <div className="inputHolder">
        <input
          value={filterStr}
          placeholder="Поиск..."
          onInput={(event) => setFilterStr(event.target.value)}
        />
      </div>
      <ItemsFetcher onLoadCallback={setData}>
        <Table
          data={data?.filter(filterObjects)}
          columns={columns}
          editedID={editedID}
        >
          <Form />
        </Table>
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
