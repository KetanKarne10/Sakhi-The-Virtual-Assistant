# Sakhi-The-Virtual-Assistant

# Sakhi – The Virtual Assistant 🎙️🤖

Sakhi is a browser-based multilingual virtual assistant designed to interact with users through voice commands. It can listen to the user's voice, understand common commands, respond using speech, open websites, provide date and time information, and perform Google searches.

The project focuses on creating a simple, interactive and user-friendly virtual assistant with a female Indian voice experience.

## ✨ Features

- 🎙️ Voice-based interaction
- 🗣️ Speech recognition
- 🔊 Text-to-speech responses
- 👩 Female voice preference
- 🌐 Multilingual voice support
- 🔎 Google search through voice commands
- 🌍 Website opening through voice commands
- 🕐 Current time information
- 📅 Current date information
- 👋 Greeting and conversational responses
- 🎧 Microphone permission handling
- ⚠️ Speech recognition error handling
- 💻 Simple browser-based interface

## 🌎 Supported Languages

Sakhi is designed to support the following languages:

| Language | Code |
|---|---|
| English | en-IN |
| Hindi | hi-IN |
| Kannada | kn-IN |
| Marathi | mr-IN |
| Telugu | te-IN |
| French | fr-FR |
| Korean | ko-KR |
| Spanish | es-ES |

Users can switch languages using voice commands such as:

- "Speak English"
- "Speak Hindi"
- "Speak Kannada"
- "Speak Marathi"
- "Speak Telugu"
- "Speak French"
- "Speak Korean"
- "Speak Spanish"

## 🎤 Example Voice Commands

### Basic Conversation

```text
Hello Sakhi
How are you?
Who are you?
What is your name?
Who created you?
Thank you
Goodbye

## Website Commands
Open YouTube
Open Google
Open Facebook
Open Instagram
Open WhatsApp
Open Calculator

## Information Commands
What time is it?
What is today's date?

## Search Commands

### You can ask Sakhi something like:
Search latest technology news
Search Python tutorials
Search MCA project ideas

Sakhi can open a Google search for the requested topic.

## 🛠️ Technologies Used
HTML5
CSS3
JavaScript
Web Speech API
Speech Recognition API
Speech Synthesis API
Google Search
Browser APIs

## Project Structure
Sakhi-The-Virtual-Assistant/
│
├── index.html
├── style.css
├── script.js
├── image/
│   └── sakhi.png
└── README.md

## ⚙️ How It Works

Sakhi uses two major browser speech technologies.

### 1. Speech Recognition

The browser's Speech Recognition API captures the user's voice through the microphone and converts it into text.
User Voice
     ↓
Microphone
     ↓
Speech Recognition
     ↓
Text Command
     ↓
Command Processing

## 2. Speech Synthesis

After processing the command, Sakhi generates a spoken response using the browser's Speech Synthesis API.
Command
   ↓
JavaScript Processing
   ↓
Response Text
   ↓
Speech Synthesis
   ↓
Sakhi Voice Response

## Complete Flow

             ┌─────────────────┐
             │      User       │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │   Microphone    │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │ Speech          │
             │ Recognition     │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │ Command         │
             │ Processing      │
             └────────┬────────┘
                      │
             ┌────────┴────────┐
             ▼                 ▼
      ┌─────────────┐   ┌──────────────┐
      │ Voice       │   │ Web/Search   │
      │ Response    │   │ Action       │
      └──────┬──────┘   └──────────────┘
             │
             ▼
      ┌─────────────────┐
      │ Speech          │
      │ Synthesis       │
      └─────────────────┘
             │
             ▼
      ┌─────────────────┐
      │ Sakhi Speaks    │
      └─────────────────┘

