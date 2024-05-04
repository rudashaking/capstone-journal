import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const MoodAnalyzer = ({ newFinalTranscript }) => {
  const [mood, setMood] = useState('');
  const [moodHelperData, setMoodHelperData] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const analyzeTranscript = (transcript) => {
    const moodWords = {
      Happy: ['happy', 'joy', 'excited', 'delighted', 'glad', 'ecstatic', 'pleased', 'cheerful', 'blissful', 'jovial', 'exhilarated', 'elated', 'upbeat', 'merry', 'contented', 'sunny', 'radiant', 'gleeful', 'vibrant', 'euphoric'],
      Sad: ['sad', 'unhappy', 'depressed', 'down', 'gloomy', 'melancholy', 'sorrowful', 'miserable', 'despairing', 'despondent', 'heartbroken', 'wistful', 'forlorn', 'disheartened', 'blue', 'downcast', 'tearful', 'grief-stricken', 'low', 'somber'],
      Angry: ['angry', 'mad', 'furious', 'irate', 'outraged', 'enraged', 'infuriated', 'incensed', 'livid', 'wrathful', 'exasperated', 'agitated', 'irritated', 'annoyed', 'hostile', 'fuming', 'vexed', 'indignant', 'incandescent', 'tempestuous'],
      Neutral: ['neutral', 'indifferent', 'calm', 'content', 'serene', 'tranquil', 'composed', 'unperturbed', 'unruffled', 'nonchalant', 'detached', 'aloof', 'imperturbable', 'equanimous', 'phlegmatic', 'placid', 'undisturbed', 'unemotional', 'unflappable', 'stoic'],
      Excited: ['excited', 'thrilled', 'enthusiastic', 'eager', 'animated', 'pumped', 'elated', 'stoked', 'ecstatic', 'fired up', 'jubilant', 'hyped', 'passionate', 'sparkling', 'bubbling', 'electric', 'giddy', 'exhilarated', 'exuberant', 'keen'],
      Relaxed: ['relaxed', 'chilled', 'easygoing', 'laid-back', 'unhurried', 'placid', 'unruffled', 'serene', 'mellow', 'tranquil', 'calm', 'composed', 'leisurely', 'at ease', 'peaceful', 'restful', 'undemanding', 'carefree', 'untroubled', 'casual'],
      Surprised: ['surprised', 'astonished', 'amazed', 'stunned', 'shocked', 'dumbfounded', 'flabbergasted', 'taken aback', 'bewildered', 'astounded', 'gobsmacked', 'startled', 'awe-struck', 'speechless', 'flummoxed', 'aghast', 'floored', 'disbelieving', 'staggered', 'unbelieving']
    };
    
  
    const moodScores = {
      Happy: 0,
      Sad: 0,
      Angry: 0,
      Neutral: 0,
    };
  
    // Convert transcript to lowercase for case-insensitive matching
    const transcriptLowercase = transcript.toLowerCase();
  
    // Iterate through mood words and count occurrences in the transcript
    for (const mood in moodWords) {
      moodWords[mood].forEach((word) => {
        if (transcriptLowercase.includes(word)) {
          moodScores[mood]++;
        }
      });
    }
  
    // Determine the mood with the highest score
    let maxScore = -1;
    let analyzedMood = 'Neutral';
  
    for (const mood in moodScores) {
      if (moodScores[mood] > maxScore) {
        maxScore = moodScores[mood];
        analyzedMood = mood;
      }
    }
  
    return analyzedMood;
  };

  const fetchMoodHelperData = async (mood) => {
    try {
      const response = await axios.get(`http://localhost:8080/moods/${mood}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching mood helper data:', error);
      return null;
    }
  };

  const analyzeMood = async () => {
    try {
      const transcriptMood = analyzeTranscript(newFinalTranscript);
      setMood(transcriptMood);
      const moodData = await fetchMoodHelperData(transcriptMood);
      setMoodHelperData(moodData);
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error analyzing mood:', error);
      setOpenSnackbar(true);
    }
  };
  

  return (
    <div>
      <Button onClick={analyzeMood} variant="contained" color="primary">
        Analyze Mood
      </Button>
      <p>Mood: {mood}</p>

      {moodHelperData && (
        <div>
          <TextField
            label="Quote"
            value={moodHelperData.quote}
            variant="outlined"
            fullWidth
            multiline
            rows={1}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Song Suggestion"
            value={moodHelperData.song}
            variant="outlined"
            fullWidth
            multiline
            rows={1}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Health Tip"
            value={moodHelperData.healthTip}
            variant="outlined"
            fullWidth
            multiline
            rows={1}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          Mood analyzed successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default MoodAnalyzer;
