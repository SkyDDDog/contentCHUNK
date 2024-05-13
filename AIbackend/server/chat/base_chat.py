import asyncio

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate
import time
from model.init_llm import init_llm

prompt = ChatPromptTemplate.from_template("tell me a joke about {topic}")

#from model import init_llm

messages = [
    SystemMessage(
        content="You are a helpful assistant."
    ),
    HumanMessage(
        content="{text}"
    ),
]

messages1 = [
    SystemMessage(
        content="You are a helpful assistant that translates English to French."
    ),
    HumanMessage(
        content="{text}"
    ),
]
prompt1 = ChatPromptTemplate.from_messages(messages)


async def base_chat(topic):
    llm=init_llm("zhipu")
    chain = prompt1 | llm
    #async for chunk in chain.astream({"test":}):
    async for chunk in chain.astream({"text":"帮我写个小红书文案，主题是鼠标"}):
        #print(chunk.content, end="", flush=True)
        yield chunk.content

async def main() :
    content= base_chat("bear")
    async for chunk in content :

        print(chunk)
# chunk =  base_chat("bear")
# for s in chunk :
#     print(s.content)
# 在异步环境中运行
asyncio.run(main())


