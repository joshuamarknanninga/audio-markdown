// Elements
const startRecordBtn = document.getElementById('start-record-btn');
const stopRecordBtn = document.getElementById('stop-record-btn');
const uploadAudioBtn = document.getElementById('upload-audio-btn');
const audioUploadInput = document.getElementById('audio-upload');
const transcriptArea = document.getElementById('transcript');
const downloadBtn = document.getElementById('download-btn');

// Check for browser support
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if ('SpeechRecognition' in window) {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    let finalTranscript = '';

    startRecordBtn.addEventListener('click', () => {
        recognition.start();
        startRecordBtn.disabled = true;
        stopRecordBtn.disabled = false;
        transcriptArea.value = '';
        finalTranscript = '';
    });

    stopRecordBtn.addEventListener('click', () => {
        recognition.stop();
        startRecordBtn.disabled = false;
        stopRecordBtn.disabled = true;
    });

    recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript + '\n';
            }
        }
        transcriptArea.value = convertToMarkdown(finalTranscript);
        downloadBtn.disabled = false;
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error detected: ' + event.error);
        startRecordBtn.disabled = false;
        stopRecordBtn.disabled = true;
    };
} else {
    alert('Sorry, your browser does not support Speech Recognition.');
}

// Handle Audio Upload
uploadAudioBtn.addEventListener('click', () => {
    audioUploadInput.click();
});

audioUploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        transcribeAudio(file);
    }
});

// Transcribe Uploaded Audio using Web Speech API is not straightforward
// The Web Speech API is designed for live microphone input.
// For uploaded audio files, you need to use a third-party API or service.
// Below is a placeholder for such functionality.

function transcribeAudio(file) {
    alert('Uploading and transcribing audio files is not supported in this demo.');
    // Implement transcription using a backend service or third-party API.
}

// Convert plain text to Markdown
function convertToMarkdown(text) {
    // Simple conversion: You can enhance this function based on requirements.
    // For example, adding headers, lists, etc., based on specific patterns.
    // Here, we'll just return the plain text.
    return text;
}

// Download Transcription as Markdown
downloadBtn.addEventListener('click', () => {
    const markdownText = transcriptArea.value;
    const blob = new Blob([markdownText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcription.md';
    a.click();
    URL.revokeObjectURL(url);
});
