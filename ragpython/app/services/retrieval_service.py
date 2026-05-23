from app.services.vector_store import db

def retrieve_documents(
    question: str,
    k: int = 4
):

    results = db.similarity_search(
        question,
        k=k
    )
    print(results)
    return results