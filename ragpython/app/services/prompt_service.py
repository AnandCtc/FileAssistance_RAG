def build_prompt(
    context: str,
    question: str
):

    prompt = f"""
    You are a helpful AI assistant.

    Answer ONLY from the provided context.

    If the answer is not available,
    say:
    "I could not find the answer in the uploaded documents."

    Context:
    {context}

    Question:
    {question}
    """
    print(prompt)
    return prompt