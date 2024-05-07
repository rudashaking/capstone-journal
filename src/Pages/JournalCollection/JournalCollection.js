import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./JournalCollection.scss";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import bookmark from "../../assets/images/—Pngtree—bookmark border_5647410.png";
import axios from "axios";
import LearningModals from "../../components/LearningModal/LearningModal";

const JournalCollectionPage = () => {
  const userId = localStorage.getItem("userId");
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `http://localhost:8080/journals/${userId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      );
      setJournals(response.data);
    } catch (error) {
      console.error("Error fetching journals:", error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddJournal = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        `http://localhost:8080/journals/${userId}`,
        {
          title,
          description: description || null,
          content: [],
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      );
      setTitle("");
      setDescription("");
      handleCloseModal();
      setJournals([...journals, response.data.journal]);
    } catch (error) {
      console.error("Error adding journal:", error);
    }
  };

  const handleDeleteJournal = async (journalId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8080/journals/${userId}/${journalId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      );
      setJournals(journals.filter((journal) => journal.id !== journalId));
    } catch (error) {
      console.error("Error deleting journal:", error);
    }
  };

  return (
    <div className="collection">
      <LearningModals />
      <Modal open={openModal} onClose={handleCloseModal}>
        <div
          className="collection__modal-content"
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Journal
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Description (optional)"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddJournal}
          >
            Add
          </Button>
        </div>
      </Modal>

      <Grid container spacing={3}>
        {journals.map((journal) => (
          <Grid item key={journal.id} xs={12} sm={3} md={3}>
            <Card>
              <CardContent className="card">
                <Typography variant="h5">{journal.title}</Typography>
                <Typography variant="body2">{journal.description}</Typography>
                <Link
                  to={`/journal/${userId}/${journal.id}/entries`}
                  style={{ textDecoration: "none" }}
                >
                  <img src={bookmark} className="card__bookmark"></img>
                </Link>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteJournal(journal.id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Add New Journal
      </Button>
    </div>
  );
};

export default JournalCollectionPage;
