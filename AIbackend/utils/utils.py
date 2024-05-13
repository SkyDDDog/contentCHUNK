import pydantic
from pydantic import BaseModel
from typing import List
from fastapi import FastAPI
from pathlib import Path
import asyncio
from configs import (LLM_MODELS, LLM_DEVICE, EMBEDDING_DEVICE,
                     MODEL_PATH, MODEL_ROOT_PATH, ONLINE_LLM_MODEL, logger, log_verbose,
                     FSCHAT_MODEL_WORKERS, HTTPX_DEFAULT_TIMEOUT)
import os
from concurrent.futures import ThreadPoolExecutor, as_completed
from langchain.chat_models import ChatOpenAI
from langchain.llms import OpenAI
import httpx
from typing import (
    TYPE_CHECKING,
    Literal,
    Optional,
    Callable,
    Generator,
    Dict,
    Any,
    Awaitable,
    Union,
    Tuple
)
import logging
import torch

from server.chat.chat_openai import MinxChatOpenAI

def get_model_path(model_name: str, type: str = None) -> Optional[str]:
    if type in MODEL_PATH:
        paths = MODEL_PATH[type]
    else:
        paths = {}
        for v in MODEL_PATH.values():
            paths.update(v)

    if path_str := paths.get(model_name):  # 以 "chatglm-6b": "THUDM/chatglm-6b-new" 为例，以下都是支持的路径
        path = Path(path_str)
        if path.is_dir():  # 任意绝对路径
            return str(path)

        root_path = Path(MODEL_ROOT_PATH)
        if root_path.is_dir():
            path = root_path / model_name
            if path.is_dir():  # use key, {MODEL_ROOT_PATH}/chatglm-6b
                return str(path)
            path = root_path / path_str
            if path.is_dir():  # use value, {MODEL_ROOT_PATH}/THUDM/chatglm-6b-new
                return str(path)
            path = root_path / path_str.split("/")[-1]
            if path.is_dir():  # use value split by "/", {MODEL_ROOT_PATH}/chatglm-6b-new
                return str(path)
        return path_str  # THUDM/chatglm06b
    
def llm_device(device: str = None) -> Literal["cuda", "mps", "cpu"]:
    device = device or LLM_DEVICE
    if device not in ["cuda", "mps", "cpu"]:
        device = detect_device()
    return device


def detect_device() -> Literal["cuda", "mps", "cpu"]:
    try:
        import torch
        if torch.cuda.is_available():
            return "cuda"
        if torch.backends.mps.is_available():
            return "mps"
    except:
        pass
    return "cpu"

