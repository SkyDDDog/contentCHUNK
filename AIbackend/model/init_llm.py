from AIbackend.model.kimi import init_kimi
from AIbackend.model.zhipu import init_zhipu

def init_llm(model_name ) :
    if model_name=="kimi" :
        llm=init_kimi()
    if model_name=="zhipu" :
        llm=init_zhipu()

    return llm
    
