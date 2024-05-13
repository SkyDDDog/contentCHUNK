import os
from langchain_community.chat_models.moonshot import MoonshotChat
from langchain_core.messages import HumanMessage, SystemMessage
import asyncio
from langchain_core.prompts import ChatPromptTemplate

def init_kimi() :
    os.environ["MOONSHOT_API_KEY"] = "sk-H42Y6H7VvQbYxk26csvGosoeg6RBTq7LzxQdaQC0somYg1Ql"
    llm = MoonshotChat(streaming=True,temperature=0.3)
    return llm



# prompt = ChatPromptTemplate.from_template("tell me a joke about {topic}")
# chain = prompt | llm
# messages = [
#     SystemMessage(
#         content="You are a helpful assistant that translates English to French."
#     ),
#     HumanMessage(
#         content="Translate this sentence from English to French. I love programming."
#     ),
# ]
# #output=chain.invoke({"topic": "bears"})
# # for s in chain.stream({"topic": "bears"}):
# #     print(s.content, end="", flush=True)
# async def sss():
#     async for s in chain.astream({"topic": "bears"}):
#         print(s.content, end="", flush=True)
#     await chain.ainvoke({"topic": "bears"})
# asyncio.run(sss())


#output= chain.invoke(messages)
#print(output)
# async def chat1():
#     for chunk in chat.astream(messages) :
#         print(chunk.content, end="|", flush=True)

# asyncio.run(chat1())
