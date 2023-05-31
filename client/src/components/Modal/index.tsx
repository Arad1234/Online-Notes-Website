import { Modal } from "antd";
import "./index.scss";
import React, { SetStateAction, useState } from "react";
import { Socket } from "socket.io-client";

interface ModalProps {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
  socket: Socket | null;
}

interface NoteDetails {
  title: string;
  description: string;
}

const ModalComponent = ({ setShowModal, showModal, socket }: ModalProps) => {
  const [noteDetails, setNoteDetails] = useState<NoteDetails>({
    title: "",
    description: "",
  });
  const handleAddNote = async () => {
    const token = localStorage.getItem("token");

    // Emitting an event name "createNote" to the server.
    socket?.emit("createNote", {
      title: noteDetails.title,
      description: noteDetails.description,
      token: token, // Sending the token to verify user.
    });

    returnToDefault();
  };

  const returnToDefault = () => {
    setShowModal(false);
    setNoteDetails({ title: "", description: "" });
  };
  return (
    <div>
      <Modal
        open={showModal}
        onCancel={returnToDefault}
        onOk={handleAddNote}
        okText="Add Note"
        title="Add new note"
      >
        <div className="all-inputs-container">
          <div className="input-container">
            <label>Title: </label>
            <input
              value={noteDetails.title}
              type="text"
              onChange={(e) =>
                setNoteDetails({ ...noteDetails, title: e.target.value })
              }
            />
          </div>
          <div className="input-container">
            <label>Description: </label>
            <textarea
              value={noteDetails.description}
              onChange={(e) =>
                setNoteDetails({ ...noteDetails, description: e.target.value })
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalComponent;
