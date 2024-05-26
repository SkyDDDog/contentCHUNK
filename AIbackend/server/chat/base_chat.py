import asyncio
import json
import time
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate,HumanMessagePromptTemplate,MessagesPlaceholder
from AIbackend.model.init_llm import init_llm
from AIbackend.server.template.expand import expand_template
from langchain_core.prompts import ChatPromptTemplate,HumanMessagePromptTemplate
from AIbackend.model.init_llm import init_llm
from AIbackend.server.template.expand import expand_template

async def base_chat(history, input):
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "You are a helpful assistant."),
            MessagesPlaceholder("history"),
            ("human", "{input}")
        ]
    )
    llm=init_llm("kimi")
    chain = prompt | llm
    async for chunk in chain.astream({"history": history,"input": input}):
        token=chunk.content
        js_data = {"code": "200", "msg": "ok", "data": token}
        yield f"data: {json.dumps(js_data, ensure_ascii=False)}\n\n"


async def expand(input) :
    prompt =  expand_template
    llm = init_llm("kimi")
    chain = prompt | llm
    async for chunk in chain.astream({"input":input}):
        token=chunk.content
        #print((token))
        js_data = {"code": "200", "msg": "ok", "data": token}
        yield f"data: {json.dumps(js_data, ensure_ascii=False)}\n\n"


