from flask import Flask, render_template, session, url_for, request, jsonify
from worker import plot_comparison
import json
import ast

app = Flask(__name__)
app.secret_key = 'hello'


@app.route('/')
def home():
    return render_template('home.html', codes=session.keys())


@app.route('/api', methods=['POST'])
def compare_api():
    try:
        json_req = request.get_json()
        result, name = plot_comparison(no_of_requests=json_req['no_of_requests'], no_of_contents=json_req['no_of_contents'],
                                       cache_sizes=json_req['cache_sizes'], zipf=json_req['zipf'])
        f = open(f'static/{name}', 'r')
        data = json.loads(f.read())
        f.close()
        return jsonify({'result': data}), 201
    except Exception as e:
        return jsonify({'error': f'{e}'}), 404


@app.route('/about')
def about():
    return render_template('about.html', codes=session.keys())


@app.route('/app-api')
def app_api():
    return render_template('api.html', codes=session.keys())


@app.route('/compare')
def compare():
    req_var = dict(request.args)   # {'zipf': '1.1', 'noc': '20', 'nor': '50', 'csize': '[3,5]'}
    print(ast.literal_eval(req_var['csize']), req_var)
    result, name = plot_comparison(no_of_requests=int(req_var['nor']), no_of_contents=int(req_var['noc']),
                                   cache_sizes=ast.literal_eval(req_var['csize']), zipf=float(req_var['zipf']))
    return render_template('compare.html', code=result, name=name)


if __name__ == '__main__':
    app.run(debug=True)
