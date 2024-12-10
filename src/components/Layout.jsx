import { useDispatch } from "react-redux";
import { handleOpenModal } from "../state/modalSlice";
import { useModal } from "../state/store";

import Authentication from "./Authentication";
import Modal from "./Modal";

const Layout = ({ children }) => {
  const showModal = useModal();
  const dispatch = useDispatch();

  const header = (
    <header>
      <div>
        <h1 className='text-gradient'>CAFFIEND</h1>
        <p>For Caffee Insatiates</p>
      </div>
      <button onClick={() => dispatch(handleOpenModal())}>
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
        <br />
        Check out the project on{" "}
        <a
          href='https://github.com/khalid-ashraf/caffiend'
          target='_blank'
        >
          Github
        </a>
        .
      </p>
    </footer>
  );

  return (
    <>
      {showModal ? (
        <Modal>
          <Authentication />
        </Modal>
      ) : null}
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
};
export default Layout;
