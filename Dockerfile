FROM python:3.7.11-alpine3.14

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ['python', 'app.py']
