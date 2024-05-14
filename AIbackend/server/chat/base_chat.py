import asyncio
import json

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from AIbackend.model.init_llm import init_llm


async def base_chat(query):
    messages = [
        SystemMessage(
            content="你是一个专业的AI助手。"
        ),
        HumanMessage(
            content="{query}"
        ),
    ]
    prompt = ChatPromptTemplate.from_messages(messages)
    llm=init_llm("zhipu")
    chain = prompt | llm

    text=" "
    async for chunk in chain.astream({"query":query}):
        token=chunk.content
        #print((token))
        js_data = {"code": "200", "msg": "ok", "data": token}
        yield f"data: {json.dumps(js_data, ensure_ascii=False)}\n\n"
        # yield chunk.content
        text+=token
    print(text)

async def main() :
    base_chat("bear")
    # async for chunk in content :
    #
    #     print(chunk)
# chunk =  base_chat("bear")
# for s in chunk :
#     print(s.content)
# 在异步环境中运行

asyncio.run(main())


