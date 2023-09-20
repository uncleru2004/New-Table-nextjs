export const columns = [
  { title: "ID", getVal: ({ id }) => id },

  { title: "Name", getVal: ({ name }) => name, setVal: (name) => ({ name }) },
  {
    title: "Email",
    getVal: ({ email }) => email,
    setVal: (email) => ({ email }),
  },
  {
    title: "Address: city",
    getVal: ({ address: { city } }) => city,
    setVal: (city) => ({ address: { city } }),
  },
  {
    title: "Phone",
    getVal: ({ phone }) => phone,
    setVal: (phone) => ({ phone }),
  },
  {
    title: "del",
    getVal: () => <button id="delUser">❌</button>,
  },
  {
    title: "ed",
    getVal: () => <button id="editUser">✏️</button>,
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
