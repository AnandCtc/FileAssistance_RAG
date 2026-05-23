from fastapi import (
    UploadFile,
    HTTPException
)

ALLOWED_TYPES = [

    "application/pdf",

    "text/plain",

    "text/csv",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]

MAX_FILE_SIZE = 30 * 1024 * 1024

async def validate_uploaded_file(
    file: UploadFile
):

    # FILE TYPE VALIDATION

    if file.content_type not in ALLOWED_TYPES:

        raise HTTPException(
            status_code=400,
            detail="Invalid file type"
        )

    # FILE SIZE VALIDATION

    content = await file.read()

    if len(content) > MAX_FILE_SIZE:

        raise HTTPException(
            status_code=400,
            detail="File exceeds 30MB"
        )

    # RESET POINTER

    await file.seek(0)