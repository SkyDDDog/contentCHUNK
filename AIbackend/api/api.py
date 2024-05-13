import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse

from configs import VERSION, OPEN_CROSS_DOMAIN
from server.chat.base_chat import base_chat


# app = FastAPI()
async def document():
    return RedirectResponse(url="/docs")


class Chat_out(BaseModel):
    name: str
    context: str


app = FastAPI(
    title="Langchain-Chatchat API Server",
    version=VERSION
)
if OPEN_CROSS_DOMAIN:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


# def mount_app_routes(app: FastAPI, run_mode: str = None):
#     # Tag: Chat
#     app.post("/chat",
#              tags=["Chat"],
#              summary="与llm模型对话(通过LLMChain)",
#              )(base_chat)
@app.post("/chat/", response_model=Chat_out)
async def create_item(item: Chat_out):
    return item


if __name__ == '__main__':
    uvicorn.run(app=app, host="127.0.0.1", port=12000)
