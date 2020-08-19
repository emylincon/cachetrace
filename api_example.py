import requests
import json

url = 'http://127.0.0.1:5000/'


def post_data(data, endpoint=''):
    response = requests.post(url + endpoint, json=data)
    data = json.loads(response.content)
    return data


req = {'no_of_requests': 50, 'no_of_contents':20, 'cache_sizes': [5,7], 'zipf':1.2}
print(post_data(data=req, endpoint='api'))
