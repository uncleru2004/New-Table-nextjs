export const columns = [
  { title: "ID", getVal: (obj) => obj.id },
  { title: "Name", getVal: (obj) => obj.name },
  {
    title: "Email",
    getVal: ({ email }) => <a href={"mailto:" + email}>{email}</a>,
  },
  {
    title: "Address",
    getVal: ({ address: { city, street, suite } }) =>
      `${city}, ${street}, ${suite}`,
  },
  {
    title: "Phone",
    getVal: ({ phone }) => <a href={"tel:" + phone}>{phone}</a>,
  },
  {
    title: "",
    getVal: ({ id }) => (
      <button data-id={id} id="delUser">
        ❌
      </button>
    ),
  },
];

export async function fetcher(value) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/" + value
  );

  if (!response.ok) throw new Error("fetch " + response.status);
  const result = await response.json();

  //console.log(result)
  return result;
}
