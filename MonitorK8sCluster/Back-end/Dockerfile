FROM python:3.12.0a7-slim-bullseye

WORKDIR /app

COPY requirements.txt /app/

RUN pip3 install -r requirements.txt

COPY . /app/

CMD ["python3", "app.py"]