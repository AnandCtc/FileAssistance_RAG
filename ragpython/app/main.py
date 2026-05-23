from fastapi import FastAPI

from app.api.process_api import router as process_router
from app.api.chat_api import router as chat_router

app = FastAPI(
    title="RAG Assistant API"
)

# REGISTER ROUTERS

app.include_router(process_router)
app.include_router(chat_router)

# HEALTH CHECK

@app.get("/health")
def health():

    return {
        "status": "UP"
    }