import React, { useState, useEffect, createContext, useContext } from 'react';
import { Modal, Typography, Button } from '@mui/material';
import "./LearningModal.scss";
import jackie from "../../assets/images/jackie.jpeg";
import mood from "../../assets/images/moodanalzyer.png";
import bookmark from "../../assets/images/—Pngtree—bookmark border_5647410.png";


const LearningModalContext = createContext();


const useLearningModal = () => useContext(LearningModalContext);


const LearningModal = ({ open, onClose, img, title, content }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="learning-modal-title"
      aria-describedby="learning-modal-content"
    >
      <div className="learning-modal">
        {img && <img src={img} alt="Learning Modal Image" className="modal-image" />}
        <Typography id="learning-modal-title" variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography id="learning-modal-content" variant="body1">
          {content}
        </Typography>
        <Button onClick={onClose} variant="contained" color="primary">
          Got It
        </Button>
      </div>
    </Modal>
  );
};


const LearningModals = () => {
  const [modalIndex, setModalIndex] = useState(0);
  const [open, setOpen] = useState(false); 
  
  const [modals] = useState([
    {
      title: "Meet Jackie, Your Personal Assistant!",
      content: "Click on Jackie to expand the reminders list and calendar.",
      img: jackie
    },
    {
      title: "Discover Your Mood with Mood Analyzer",
      content: "Activate the Mood Analyzer feature, speak into it, and Jackie will respond with a quote, song suggestion, and health tip based on your mood.",
      img: mood
    },
    {
      title: "Access Your Journal",
      content: "Click on the bookmark to open your journal and start documenting your thoughts and experiences.",
      img: bookmark
    },
    {
      title: "Disclaimer",
      content: "Please note that the use of this app is not a replacement for conventional mental health services. Seek professional help if needed.",
      img: jackie
    },
    {
      title: "Local Supports",
      content: "Explore the Profile section for a collection of local mental health support services.",
      img: jackie
    }
  ]);

  useEffect(() => {
    const isLearningModalShown = localStorage.getItem('isLearningModalShown');
    if (!isLearningModalShown) {
      setOpen(true);
    }
  }, []);

  const handleCloseModal = () => {
    if (modalIndex < modals.length - 1) {
      setModalIndex((prevIndex) => prevIndex + 1);
    } else {
      setOpen(false);
      localStorage.setItem('isLearningModalShown', true); 
    }
  };

  return (
    <LearningModalContext.Provider value={handleCloseModal}>
      {modals.map((modal, index) => (
        <LearningModal
          key={index}
          open={modalIndex === index && open}
          onClose={handleCloseModal}
          img={modal.img}
          title={modal.title}
          content={modal.content}
        />
      ))}
    </LearningModalContext.Provider>
  );
};

export default LearningModals;
