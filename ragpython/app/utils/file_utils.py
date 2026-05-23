import os

def get_file_extension(
    filename: str
):

    return os.path.splitext(
        filename
    )[1].lower()