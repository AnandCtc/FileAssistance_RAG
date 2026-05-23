from fastapi import APIRouter

from app.models.chat_models import (
    ChatRequest
)

from app.services.rag_service import (
    ask_question
)
print("STEP 13: Python received question")
router = APIRouter(
    prefix="/api/chat",
    tags=["Chat"]
)

@router.post("")
async def chat(
    request: ChatRequest
):

    response = ask_question(
        request.question
    )

    return {
        "answer": response
    }