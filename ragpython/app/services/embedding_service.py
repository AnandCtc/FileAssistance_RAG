from langchain_openai import (
    OpenAIEmbeddings
)

embedding_model = OpenAIEmbeddings(
    model="text-embedding-3-small"
)

def get_embedding_model():

    return embedding_model