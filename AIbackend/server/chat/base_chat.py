import os
import sys
from langchain_community.chat_models.moonshot import MoonshotChat
from langchain_core.messages import HumanMessage, SystemMessage
import asyncio
from langchain_core.prompts import ChatPromptTemplate
from AIbackend.model.init_llm import init_llm

prompt = ChatPromptTemplate.from_template("tell me a joke about {topic}")

#from model import init_llm

messages = [
    SystemMessage(
        content="You are a helpful assistant that translates English to French."
    ),
    HumanMessage(
        content="给我输出一篇小红书文案，主题是鼠标"
    ),
]

messages1 = [
    SystemMessage(
        content="You are a helpful assistant that translates English to French."
    ),
    HumanMessage(
        content="给我输出一篇小红书文案，主题是键盘"
    ),
]


async def base_chat(topic):
    llm=init_llm("zhipu")
    chain = prompt | llm
    async for chunk in chain.astream({"topic": topic}):
        #print(chunk.content, end="", flush=True)
        yield chunk.content



# 在异步环境中运行
asyncio.run(base_chat("bear"))


