import { MouseEventHandler, useState } from "react";
import { useFormBuilderProps } from "../../types";
import FormItem from "../Formİtem";
import { useNavigate } from "react-router-dom";

const FormModal = ({ visible, closeModal, form }: { visible: boolean, closeModal: () => void, form: useFormBuilderProps }) => {
  const { content, editedFormData, postForm, updateForm } = form

  const navigate = useNavigate();
  const [show, setShow] = useState(false)
  const [formName, setFormName] = useState(editedFormData.name);

  const handleClickOnOverlay: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    closeModal();
    setShow(false)
  };

  const handleClickOnContainer: MouseEventHandler<HTMLDivElement> = (e) =>
    e.stopPropagation();

  const submitForm = () => {
    if (formName.trim() !== "") {
      if (editedFormData?.id) {
        updateForm(formName, navigate);
      } else {
        postForm(formName, navigate);
      }
    }
  }

  return (
    <div className="modal-overlay" onClick={handleClickOnOverlay}>
      <div className="modal-container" onClick={handleClickOnContainer}>
        <div className={`${visible ? "modal-content animated" : "modal-content"}`}>
          <div className="modal-header">
            <h5 className="modal-title">Form Preview</h5>
            <button type="button" className="close" onClick={() => {
              closeModal()
              setShow(false)
            }}>
              <svg>
                <use xlinkHref="/svg/close.svg#close" />
              </svg>
            </button>
          </div>
          <div className="modal-body">
            {
              content.length > 0 ? (
                show ? (
                  <div className="form-group">
                    <label htmlFor="form-name">Form name</label>
                    <input
                      type="text"
                      value={formName}
                      id="form-name"
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="What should be the name of your form?"
                    />
                  </div>
                ) : (
                  content.map((item) => (
                    <div className="form-wrapper" key={item.id}>
                      <FormItem item={item} fromModal={true} />
                    </div>
                  )))
              ) : (
                <p className="text-center">Your form is empty</p>
              )
            }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn--gray" onClick={() => {
              closeModal()
              setShow(false)
            }}>
              Close
            </button>
            <button type="button"
              className={`${content.length > 0 ? "btn btn--green" : "btn btn--green disabled"} ${(formName.trim() === "" && show) ? "disabled" : ""}`}
              onClick={() => { show ? submitForm() : setShow(true) }}>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;