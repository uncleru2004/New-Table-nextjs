import { memo } from "react";

export default memo(function RenderInfo({ info }) {
  if (info) {
    const {
      id,
      name,
      username,
      email,
      address: {
        street,
        suite,
        city,
        zipcode,
        geo: { lat, lng },
      },
      phone,
      website,
      company: { name: cname, catchPhrase, bs },
    } = info;

    return (
      <>
        <p>{id}</p>
        <h3>{name}</h3>
        <a href={"URL" + website}>{website}</a>
        <p>{cname}</p>
        <p>{bs}</p>
        <p>"{catchPhrase}"</p>
      </>
    );
  }
});
