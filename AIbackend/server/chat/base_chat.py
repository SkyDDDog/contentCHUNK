import asyncio
import json

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate,HumanMessagePromptTemplate
from model.init_llm import init_llm
from server.template.expand import expand_template

async def base_chat(query : str):
    messages = [
        SystemMessage(
            content="你是一个专业的AI助手。"
        ),
        HumanMessagePromptTemplate.from_template("{query}"),
    ]
    prompt = ChatPromptTemplate.from_messages(messages)
    llm=init_llm("kimi")
    chain = prompt | llm


    async for chunk in chain.astream({"query":query}):
        token=chunk.content
        #print((token))
        text = ""
        js_data = {"code": "200", "msg": "ok", "data": token}
        yield f"data: {json.dumps(js_data, ensure_ascii=False)}\n\n"
        # yield chunk.content
        text+=token
        print(text)

async def expand(text) :
    prompt =  expand_template
    llm = init_llm("kimi")
    chain = prompt | llm
    async for chunk in chain.astream({"text":text}):
        token=chunk.content
        #print((token))
        js_data = {"code": "200", "msg": "ok", "data": token}
        yield f"data: {json.dumps(js_data, ensure_ascii=False)}\n\n"
        # yield chunk.content
        text+=token

    #print(text)

# async def main() :
#     #await base_chat("bear")
#     # async for chunk in content :
#     #
#     #     print(chunk)
# # chunk =  base_chat("bear")
# # for s in chunk :
# #     print(s.content)
# # 在异步环境中运行
#
# asyncio.run(main())


