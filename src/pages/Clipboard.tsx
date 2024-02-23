import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Container } from "react-bootstrap";
import ClipboardItemCard from "../components/ClipboardItemCard";
import useClipboard from "../hooks/useClipboard";

function Clipboard() {
  const { clipboardText, clipboardImage, error, getClipboardData } =
    useClipboard();
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleViewDetail = () => {
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
  };

  return (
    <Container>
      <h1 className="mt-5">Clipboard App</h1>
      <Button className="btn btn-primary mt-3" onClick={getClipboardData}>
        클립보드 데이터 가져오기
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {(clipboardText || clipboardImage) && (
        <ClipboardItemCard
          text={clipboardText || ""}
          imageUrl={clipboardImage || ""}
          onViewDetail={handleViewDetail}
        />
      )}

      <Modal show={showDetailModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>자세히 보기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clipboardText && (
            <p style={{ wordWrap: "break-word" }}>{clipboardText}</p>
          )}
          {clipboardImage && (
            <img
              src={clipboardImage}
              alt="Clipboard"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Clipboard;