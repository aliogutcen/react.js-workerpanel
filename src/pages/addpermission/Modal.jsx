import "./modal.scss";

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
          <button onClick={handleClose}>Kapat</button>
        </div>
      </section>
    </form>
  );
};

export default Modal;
