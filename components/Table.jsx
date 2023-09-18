import css from "./table.module.css";
import RenderUser from "./RenderUser";
import { memo } from "react";
import { columns } from "./fetcher";

export default memo(function Table({ data, editedID, children }) {
  console.log("Table render");
  //console.log(editedID);
  if (data) {
    return (
      <table className={css.table}>
        <thead>
          <tr>
            {columns.map(({ title }) => title !== 'del' && title !== 'ed' ? (
              <th id={title} key={title}>
                <button id="sortUp" className="btnSort">
                  ▲
                </button>
                {title}
                <button id="sortDown" className="btnSort">
                  ▼
                </button>
              </th>
            ) : false)}
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <>
              {user.id == editedID ? (
                <>{children}</>
              ) : (
                <RenderUser user={user} />
              )}
            </>
          ))}
        </tbody>
        {!editedID && <tfoot>{children}</tfoot>}
      </table>
    );
  }
});
