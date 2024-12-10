import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import { handleCloseModal } from "../state/modalSlice";

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  return createPortal(
    <div className='modal-container'>
      <button
        onClick={() => dispatch(handleCloseModal())}
        className='modal-underlay'
      />
      <div className='modal-content'>{children}</div>
    </div>,
    document.getElementById("portal")
  );
};
export default Modal;
