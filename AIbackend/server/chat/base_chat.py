import os
from langchain_community.chat_models.moonshot import MoonshotChat
from langchain_core.messages import HumanMessage, SystemMessage
#API KEY
os.environ["MOONSHOT_API_KEY"] = "sk-H42Y6H7VvQbYxk26csvGosoeg6RBTq7LzxQdaQC0somYg1Ql"


messages = [
    SystemMessage(
        content="You are a helpful assistant that translates English to French."
    ),
    HumanMessage(
        content="给我输出一篇小红书文案，主题是鼠标"
    ),
]

# print(output)
# async def chat1():
#     for chunk in chat.astream(messages) :
#         print(chunk.content, end="|", flush=True)

# asyncio.run(chat1())

def base_chat(messages) :
    chat = MoonshotChat(streaming=True)
    output= chat.stream(messages)
    for chunk in chat.stream(messages) :
        yield chunk.content


a=base_chat(messages)
print(list(a))


