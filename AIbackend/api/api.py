import nltk
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from configs import VERSION
from configs.model_config import NLTK_DATA_PATH
from configs.server_config import OPEN_CROSS_DOMAIN
import argparse
import uvicorn
from fastapi import Body
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse
from server.chat.chat import chat
from server.chat.completion import completion
from api.embeddings_api import embed_texts_endpoint
from api.llm_api import (list_running_models, list_config_models,
                            change_llm_model, stop_llm_model,
                            get_model_config, list_search_engines)
from utils.utils import (BaseResponse, ListResponse, FastAPI, MakeFastAPIOffline,
                          get_server_configs, get_prompt_template)
from typing import List, Literal

nltk.data.path = [NLTK_DATA_PATH] + nltk.data.path


async def document():
    return RedirectResponse(url="/docs")


def create_app(run_mode: str = None):
    app = FastAPI(
        title="Langchain-Chatchat API Server",
        version=VERSION
    )
    MakeFastAPIOffline(app)
    # Add CORS middleware to allow all origins
    # 在config.py中设置OPEN_DOMAIN=True，允许跨域
    # set OPEN_DOMAIN=True in config.py to allow cross-domain
    if OPEN_CROSS_DOMAIN:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
    mount_app_routes(app, run_mode=run_mode)
    return app

def mount_app_routes(app: FastAPI, run_mode: str = None):
    app.get("/",
            response_model=BaseResponse,
            summary="swagger 文档")(document)

    # Tag: Chat
    app.post("/chat/chat",
             tags=["Chat"],
             summary="与llm模型对话(通过LLMChain)",
             )(chat)
    
