import "./modal.scss";
import withAuth from "../../withAuth";
const Modal = ({ handleClose, show, children, onSubmit }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <form className={showHideClassName} onSubmit={onSubmit}>
      <section className="modal-main">
        {children}
        <div className="modal-button">
          <button className="gonder" type="submit">
            Send
          </button>
          <button className="close" onClick={handleClose}>
            Close
          </button>
        </div>
      </section>
    </form>
  );
};

export default withAuth(Modal);
