import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './DenyModal.scss'
import Button from "@shared/UI/Button/Button";

const DenyModal: React.FC<{id: string }> = ({id}) => {
	const api = import.meta.env.VITE_BASE_URL || "http://localhost:8080";
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleDeny = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${api}/admin/application/${id}/deny`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to deny application");

      setSuccess(true);
    } catch (err) {
		if (err instanceof Error) {
			setError(err.message);
		}
     
    } finally {
      setLoading(false);
    }
  };

  const closeAndNavigate = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      <Button className="modal__deny-button" onClick={() => setShowModal(true)}>
        Deny
      </Button>

      {showModal && (
        <div className="modal">
          <div className="modal__container">
            {!success ? (
              <>
                <h2 className="modal__title">Deny application</h2>
				<p className="modal__text">You exactly sure, you want to cancel this application?</p>
                {error && <p className="modal__error-message">{error}</p>}
                <div className="modal__modal-actions">
                  <Button
                    className="modal__confirm-button"
                    onClick={handleDeny}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Deny"}
                  </Button>
                  <Button
                    className="modal__cancel-button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h2 className="modal__title">Deny application</h2>
				<p className="modal__text">Your application has been deny!</p>
                <div className="modal__modal-actions">
                  <Button className="modal__close-button" onClick={closeAndNavigate}>
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
