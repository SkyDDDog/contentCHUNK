FROM python:3.12.3

WORKDIR /home

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 10088

# 启动 FastAPI 应用
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10088"]
