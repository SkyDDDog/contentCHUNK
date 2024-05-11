import os
from langchain_community.chat_models.moonshot import MoonshotChat
from langchain_core.messages import HumanMessage, SystemMessage
import asyncio

os.environ["MOONSHOT_API_KEY"] = "sk-H42Y6H7VvQbYxk26csvGosoeg6RBTq7LzxQdaQC0somYg1Ql"

chat = MoonshotChat(streaming=True)
messages = [
    SystemMessage(
        content="You are a helpful assistant that translates English to French."
    ),
    HumanMessage(
        content="Translate this sentence from English to French. I love programming."
    ),
]
output= chat.schema(messages)
print(output)
# async def chat1():
#     for chunk in chat.astream(messages) :
#         print(chunk.content, end="|", flush=True)

# asyncio.run(chat1())
