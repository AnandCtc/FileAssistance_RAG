<!--
Full End-to-End Flow

Upload File
   ↓
Validate File
   ↓
Extract Text
   ↓
Chunk Text
   ↓
Generate Embeddings
   ↓
Store In ChromaDB
   ↓
User Asks Question
   ↓
Similarity Search
   ↓
Build Prompt
   ↓
GPT Generates Response
   ↓
Return AI Response 
-->

# RAG File Assistance System

A Retrieval-Augmented Generation (RAG) application using:

- Java Spring Boot Backend
- Python FastAPI RAG Service
- LangChain
- ChromaDB
- OpenAI APIs

---

# Project Structure

```text
rag_file_assistance/
│
├── frontend/                 # Java Spring Boot Application
│
├── backend/                 # Java Spring Boot Application
│
├── ragpython/               # Python FastAPI RAG Service
│
└── README.md

Steps to follow for execution of the Application.

Install VSCode.(Ignore if installed already.)

Prerequisites Install Required Software

Java

Java 17 or above

Check:

java -version

Maven

Check:

mvn -version

Python

Recommended:

Python 3.11

Check:

python3.11 --version

VS Code Extensions

Install:

Python
Pylance
Extension Pack for Java

Setup Python RAG Service

Go to Python project folder:

cd ragpython
Create Virtual Environment
python3.11 -m venv venv

Activate Virtual Environment

Mac/Linux
source venv/bin/activate
Windows
venv\Scripts\activate

Install Dependencies
pip install --upgrade pip setuptools wheel
pip install fastapi uvicorn
pip install langchain
pip install langchain-openai
pip install langchain-chroma
pip install chromadb
pip install python-dotenv
pip install pypdf
pip install python-docx

Run Python FastAPI Server

Go to:

cd ragpython

Activate venv:

source venv/bin/activate

Run server:

uvicorn app.main:app --reload

FastAPI URLs
Swagger UI
http://127.0.0.1:8000/docs
Base URL
http://127.0.0.1:8000
Setup Spring Boot Backend

Go to backend folder:

cd backend
Build Project
./mvnw clean install

If permission issue:
chmod +x mvnw

Run Spring Boot Application
./mvnw spring-boot:run

Spring Boot URL
http://localhost:8080

API Testing
Spring Boot API

Example:

POST http://localhost:8080/api/query
FastAPI API

Example:

POST http://127.0.0.1:8000/upload

Recommended Startup Order
Step 1

Start Python FastAPI service:

cd ragpython
source venv/bin/activate
uvicorn app.main:app --reload

Step 2

Start Spring Boot backend:

cd backend
./mvnw spring-boot:run

Architecture Flow
----------------
Frontend
   ↓
Spring Boot Backend (8080)
   ↓
FastAPI RAG Service (8000)
   ↓
LangChain + ChromaDB + OpenAI
Common Issues
FastAPI Import Error

If getting:

Import "fastapi" could not be resolved

Select correct interpreter in VS Code:

Cmd + Shift + P
Python: Select Interpreter

Choose:

ragpython/venv/bin/python

Environment Variables

Create .env file inside ragpython/
Add below lines to the .env file.
OPENAI_API_KEY=your_api_key_here
CHROMA_DB_DIR=app/db/chroma_db
UPLOAD_DIR=app/uploads


# FrontEnd 

1.Open the terminal.
2.Go inside the frontend directory. (cd frontend)
3.lsof -i :5174 (To check if 5174 port is used by any other service)
4.kill -9 PID (If any service is using the port 5174 then kill the PID )
5.npm run dev (To run the frontend application.)
6.Open browser and check http://localhost:5174/

# Backend
1.Open the terminal.
2.Go inside the backend directory. (cd backend)
3.lsof -i :8080 (To check if 8080 port is used by any other service)
4.kill -9 PID (If any service is using the port 8080 then kill the PID )
5.mvn clean install (To clean build the application).
6.mvn spring-boot:run;
7.Open browser and check.(http://localhost:8080/api/test)