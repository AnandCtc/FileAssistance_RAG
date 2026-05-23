from langchain_chroma import Chroma

from app.services.embedding_service import (
    get_embedding_model
)

db = Chroma(

    persist_directory="app/db/chroma_db",

    embedding_function=get_embedding_model()
)