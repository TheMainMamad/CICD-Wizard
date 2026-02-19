FROM python:3.12-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

ENV PATH=/root/.local/bin:$PATH

COPY . .

COPY requirements.txt .

RUN mkdir logs && pip install --upgrade pip && pip install -r requirements.txt

CMD ["gunicorn", "cicd_wizard.app:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
