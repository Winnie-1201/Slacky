import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SearchMessages from "./SearchMessage";
import "./search.css";

function SearchFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div id="search">
        <input
          onClick={() => setShowModal(true)}
          placeholder="Search for messages"
        />
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <SearchMessages setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

// export default SearchFormModal;
