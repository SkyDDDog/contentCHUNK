import os
from langchain_community.chat_models.moonshot import MoonshotChat
from langchain_core.messages import HumanMessage, SystemMessage

# Generate your api key from: https://platform.moonshot.cn/console/api-keys
os.environ["MOONSHOT_API_KEY"] = "sk-H42Y6H7VvQbYxk26csvGosoeg6RBTq7LzxQdaQC0somYg1Ql"

chat = MoonshotChat()
# or use a specific model
# Available models: https://platform.moonshot.cn/docs
# chat = MoonshotChat(model="moonshot-v1-128k")

messages = [
    SystemMessage(
        content="You are a helpful assistant that translates English to French."
    ),
    HumanMessage(
        content="Translate this sentence from English to French. I love programming."
    ),
]

output= chat.invoke(messages)
print(output)