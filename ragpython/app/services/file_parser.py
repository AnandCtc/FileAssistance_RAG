import os

import pandas as pd

from pypdf import PdfReader

from docx import Document

def extract_text(
    file_path: str
):

    extension = os.path.splitext(
        file_path
    )[1].lower()

    # PDF

    if extension == ".pdf":

        reader = PdfReader(file_path)

        text = ""

        for page in reader.pages:

            page_text = page.extract_text()

            if page_text:
                text += page_text

        return text

    # DOCX

    elif extension == ".docx":

        document = Document(file_path)

        return "\n".join(
            [
                para.text
                for para in document.paragraphs
            ]
        )

    # TXT

    elif extension == ".txt":

        with open(
            file_path,
            "r",
            encoding="utf-8"
        ) as file:

            return file.read()

    # CSV

    elif extension == ".csv":

        dataframe = pd.read_csv(file_path)

        return dataframe.to_string()

    else:

        raise Exception(
            "Unsupported file type"
        )