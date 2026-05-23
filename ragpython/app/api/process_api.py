from fastapi import APIRouter

from pydantic import BaseModel

from app.services.rag_service import (
    process_document
)

router = APIRouter(
    prefix="/api/process",
    tags=["Process API"]
)

# REQUEST MODEL

class ProcessRequest(BaseModel):

    filePath: str


# PROCESS DOCUMENT API

@router.post("")
def process_file(
    request: ProcessRequest
):

    print("STEP 5: Python received file path")

    print(f"Processing file: {request.filePath}")

    process_document(
        request.filePath
    )

    return {
        "message": "Document processed successfully"
    }