import aiohttp
import asyncio
from langchain_community.chat_models.moonshot import MoonshotChat
from langchain_core.messages import HumanMessage, SystemMessage
import os
import openai
from typing import List
os.environ["MOONSHOT_API_KEY"] = "sk-H42Y6H7VvQbYxk26csvGosoeg6RBTq7LzxQdaQC0somYg1Ql"

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

async_client = openai.AsyncOpenAI(
                api_key="sk-H42Y6H7VvQbYxk26csvGosoeg6RBTq7LzxQdaQC0somYg1Ql",
                base_url="https://api.moonshot.cn/v1",)
prompt_template = "Tell me a short joke about {topic}"

async def acall_chat_model(messages: List[dict]) -> str:
    response = await async_client.chat.completions.create(
        model="moonshot-v1-8k", 
        messages=messages,
    )
    return response.choices[0].message.content

async def ainvoke_chain(topic: str) -> str:
    prompt_value = prompt_template.format(topic=topic)
    messages = [{"role": "user", "content": prompt_value}]
    
    output= await acall_chat_model(messages)
    print(output)
    return output

asyncio.run(ainvoke_chain("ice cream"))
asyncio.run(ainvoke_chain("tt"))
