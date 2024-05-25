from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from server.chat.base_chat import base_chat, expand

app = FastAPI()


@app.get("/chat")
def chat_stream(query):
    generate = base_chat(query)
    return StreamingResponse(generate, media_type="text/event-stream")


@app.get("/expand")
def chat_stream(text):
    generate = expand(text)
    return StreamingResponse(generate, media_type="text/event-stream")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app=app, host="127.0.0.1", port=10088)
