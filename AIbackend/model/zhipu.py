import os
from langchain_community.chat_models import ChatZhipuAI
import os

from langchain_community.chat_models import ChatZhipuAI


def init_zhipu() :
    os.environ["ZHIPUAI_API_KEY"] = "915b89224da38cece05322ee52849c9c.hlqKFSidGqZqL0jI"
    llm = ChatZhipuAI(streaming=True,temperature=0.3)
    return llm


# os.environ["ZHIPUAI_API_KEY"] = "915b89224da38cece05322ee52849c9c.hlqKFSidGqZqL0jI"
# chat = ChatZhipuAI(streaming=True,temperature=0.3)
# prompt = ChatPromptTemplate.from_template("tell me a joke about {topic}")
# chain = prompt | chat
# # messages = [
# #     SystemMessage(
# #         content="You are a helpful assistant that translates English to French."
# #     ),
# #     HumanMessage(
# #         content="Translate this sentence from English to French. I love programming."
# #     ),
# # ]
# #output=chain.invoke({"topic": "bears"})
# # for s in chain.stream({"topic": "bears"}):
# #     print(s.content, end="", flush=True)
# async def sss():
#     async for s in chain.astream({"topic": "bears"}):
#         print(s.content, end="", flush=True)

# asyncio.run(sss())