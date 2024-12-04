const Layout = ({ children }) => {
  const header = (
    <header>
      <div>
        <h1 className='text-gradient'>CAFFIEND</h1>
        <p>For Caffee Insatiates</p>
      </div>
      <button>
        <p>Sign up free</p>
        <i className='fa-solid fa-mug-hot'></i>
      </button>
    </header>
  );

  const footer = (
    <footer>
      <p>
        <span className='text-gradient'>Caffiend</span> was made by{" "}
        <a
          href='https://www.linkedin.com/in/khalidashraf95/'
          target='_blank'
        >
          Khalid Ashraf
        </a>{" "}
        using React.
      </p>
    </footer>
  );

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
};
export default Layout;
