import os
import asyncio
from langchain_core.tools import tool
from langchain_core.utils.function_calling import convert_to_openai_tool
from AIbackend.model.init_llm import init_llm
from langchain.agents import AgentExecutor,create_openai_functions_agent,create_react_agent,create_openai_tools_agent
from langchain import hub
from langchain_community.tools import DuckDuckGoSearchRun
from serpapi import BaiduSearch

os.environ["SERPAPI_API_KEY"] = 'b7c1c2b06498fffd3eeb3ca355c928602f814c6546ff3becaf3beabee3c39175'

# 加载 serpapi 工具
# seraapi = load_tools(["serpapi"])

@tool
def baidu_search(query:str) -> str:
    """联网搜索内容"""
    params = {
        "engine": "baidu",
        "q": query,
        "api_key": "b7c1c2b06498fffd3eeb3ca355c928602f814c6546ff3becaf3beabee3c39175",
        "rn":"6"
    }
    search = BaiduSearch(params)
    results = search.get_dict()
    return results["organic_results"]

tools=[baidu_search]

prompt = hub.pull("hwchase17/openai-tools-agent")

llm = init_llm("kimi")

# search = DuckDuckGoSearchRun()
# search.run("Obama's first name?")

agent = create_openai_tools_agent(llm, tools, prompt)

agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

async def chat_tools(history,input):
    async for event in agent_executor.astream_events(
            {"input":input,"chat_history":history},
            version="v1",
    ):
        kind = event["event"]
        # 根据不同的事件类型生成不同的 SSE 消息
        if kind == "on_chain_start":
            if event["name"] == "Agent":
                msg = f"data: Starting agent: {event['name']} with input: {event['data'].get('input')}\n\n"
                yield msg
        elif kind == "on_chain_end":
            if event["name"] == "Agent":
                msg = f"data:\n--\ndata: Done agent: {event['name']} with output: {event['data'].get('output')['output']}\n\n"
                yield msg
        elif kind == "on_chat_model_stream":
            content = event["data"]["chunk"].content
            if content:
                msg = f"data: {content}\n\n"
                yield msg
        elif kind == "on_tool_start":
            msg = f"data: --\ndata: Starting tool: {event['name']} with inputs: {event['data'].get('input')}\n\n"
            yield msg
        elif kind == "on_tool_end":
            msg = f"data: Done tool: {event['name']}\ndata: Tool output was: {event['data'].get('output')}\ndata: --\n\n"
            yield msg