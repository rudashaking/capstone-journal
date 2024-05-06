import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VoiceIn from "../../components/VoiceText/VoiceIn";
import { Button, TextField } from "@mui/material";
import MoodAnalyzer from "../../components/Moodanalyzer/MoodAnalyzer";
import DoodlingComponent from "../../components/DoodlingComponent/DoodlingComponent"
import "./JournalPage.scss";

const JournalPage = () => {
  const { userId, id } = useParams();
  const [journalEntries, setJournalEntries] = useState([]);
  const [addingEntry, setAddingEntry] = useState(false);
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [speechToTextResult, setSpeechToTextResult] = useState("");

  useEffect(() => {
    fetchJournalEntries();
  }, [userId, id]);

  const fetchJournalEntries = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/journals/${userId}/${id}/entries`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const formattedEntries = response.data.map((entry) => ({
        ...entry,
        createdAt: new Date(entry.createdAt).toLocaleString(),
      }));
      setJournalEntries(formattedEntries);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    }
  };

  const handleAddEntry = () => {
    setAddingEntry(true);
  };

  const handleCancelAddEntry = () => {
    setAddingEntry(false);
    setNewEntryTitle("");
    setNewEntryContent("");
  };

  const handleSubmitNewEntry = async () => {
    try {
      const token = localStorage.getItem("token");
      const currentDate = new Date().toISOString();
      const response = await axios.put(
        `http://localhost:8080/journals/${userId}/${id}/entries`,
        {
          title: newEntryTitle,
          content: newEntryContent,
          createdAt: currentDate,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const newEntry = {
        ...response.data,
        createdAt: new Date(response.data.createdAt).toLocaleString(),
      };
      setJournalEntries((prevEntries) => [...prevEntries, newEntry]);
      setNewEntryTitle("");
      setNewEntryContent("");
      setAddingEntry(false);
      await fetchJournalEntries();
    } catch (error) {
      console.error("Error adding new entry:", error);
    }
  };

  const handleSpeechToTextResult = (result) => {
    setSpeechToTextResult(result);
    setNewEntryContent(result); 
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8080/journals/${userId}/${id}/entries/${entryId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      setJournalEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.entryId !== entryId)
      );
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="journal-page">
      <div className="journal-content">

        <ul>
          {journalEntries.map((entry, index) => (
            <li key={index}>
              <h3>{entry.title}</h3>
              <p>{entry.content}</p>
              <p>Created at: {entry.createdAt}</p>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteEntry(entry.entryId)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      
        {!addingEntry && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEntry}
          >
            Add Entry
          </Button>
        )}
        <div className="doodling-container">

      <DoodlingComponent />
        </div>
        {addingEntry && (
          <div className="add-entry-form">
            <TextField
              label="New Entry Title"
              value={newEntryTitle}
              onChange={(e) => setNewEntryTitle(e.target.value)}
              sx={{ width: 375 }}
          
              helperText="Please Fill In Title:)"
            />
            <TextField
              label="New Entry Content"
              value={newEntryContent}
              onChange={(e) => setNewEntryContent(e.target.value)}
              multiline
              maxRows={10}
              sx={{
                width: 375,
              }}
            />
            <VoiceIn onResult={handleSpeechToTextResult} />
            <MoodAnalyzer newFinalTranscript={speechToTextResult} />
            <Button
              onClick={handleSubmitNewEntry}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
            <Button
              onClick={handleCancelAddEntry}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
