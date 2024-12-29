import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DenyModal.scss';
import { Button } from '@shared';
import { useModalStore } from '@store';

const DenyModal: React.FC<{ id: string }> = ({ id }) => {
  const {
    showModal,
    isSuccess,
    loading,
    error,
    openModal,
    closeModal,
    denyApplication,
  } = useModalStore();
  const navigate = useNavigate();

  const handleDeny = async () => {
    await denyApplication(id);
  };

  const closeAndNavigate = () => {
    closeModal();
    navigate('/');
  };

  return (
    <>
      <Button className="modal__deny-button" onClick={openModal}>
        Deny
      </Button>

      {showModal && (
        <div className="modal">
          <div className="modal__container">
            {!isSuccess ? (
              <>
                <h2 className="modal__title">Deny application</h2>
                <p className="modal__text">
                  Are you sure you want to cancel this application?
                </p>
                {error && <p className="modal__error-message">{error}</p>}
                <div className="modal__modal-actions">
                  <Button
                    className="modal__confirm-button"
                    onClick={handleDeny}
                    disabled={loading}
                  >
                    Deny
                  </Button>
                  <Button className="modal__cancel-button" onClick={closeModal}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h2 className="modal__title">Deny application</h2>
                <p className="modal__text">Your application has been denied!</p>
                <div className="modal__modal-actions">
                  <Button
                    className="modal__close-button"
                    onClick={closeAndNavigate}
                  >
                    Go Home
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DenyModal;
