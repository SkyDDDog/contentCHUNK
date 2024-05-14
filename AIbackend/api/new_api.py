from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from AIbackend.server.chat.base_chat import base_chat
app = FastAPI()

@app.get("/chat")
def chat_stream(query: str = "你是谁"):

    generate = base_chat(query)
    return StreamingResponse(generate, media_type="text/event-stream")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app=app, host="127.0.0.1", port=10088)


