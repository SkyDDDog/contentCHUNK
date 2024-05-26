from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from AIbackend.server.chat.base_chat import base_chat,expand
from AIbackend.server.chat.chat_tools import chat_tools
class ChatRequest(BaseModel):
    history: list = []
    input:str

app = FastAPI()
@app.get("/chat")
def chat_stream(chatRequest:ChatRequest):
    generate = base_chat(chatRequest.history,chatRequest.input)

@app.get("/expand")
def chat_stream(input):
    generate = expand(input)
    return StreamingResponse(generate, media_type="text/event-stream")

@app.get("/chat_tools")
def chat_stream(chatRequest:ChatRequest):

    generate = chat_tools(chatRequest.history,chatRequest.input)
    return StreamingResponse(generate, media_type="text/event-stream")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app=app, host="127.0.0.1", port=10088)
