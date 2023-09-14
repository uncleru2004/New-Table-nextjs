import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <main>
        <Component {...pageProps} />
      </main>
      <hr />
      <footer>(c) 2023</footer>
    </>
  );
}
