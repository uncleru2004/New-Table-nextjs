import css from "./table.module.css";
import RenderUser from "./RenderUser";
import { memo } from "react";
import { columns } from "./fetcher";

export default memo(function Table({ data }) {
  console.log("Table render");
  if (data) {
    return (
      <table className={css.table}>
        <thead>
          <tr>
            {columns.map(({ title }) => (
              <th id={title} key={title}>
                <button id="sortUp" className="btnSort">
                  ▲
                </button>
                {title}
                <button id="sortDown" className="btnSort">
                  ▼
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <RenderUser user={user} key={user.id} />
          ))}
        </tbody>
      </table>
    );
  }
});
