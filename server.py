from flask import Flask, render_template, session, url_for, request, send_file
from worker import plot_comparison
import ast

app = Flask(__name__)
app.secret_key = 'hello'


@app.route('/')
def home():
    return render_template('home.html', codes=session.keys())


def format_input():
    # all numbers in csize must be integer
    pass


@app.route('/download/')
def download():
    try:
        return send_file('/var/www/PythonProgramming/PythonProgramming/static/images/python.jpg', attachment_filename='python.jpg')
    except Exception as e:
        return str(e)


@app.route('/compare')
def compare():
    req_var = dict(request.args)   # {'zipf': '1.1', 'noc': '20', 'nor': '50', 'csize': '[3,5]'}
    print(ast.literal_eval(req_var['csize']), req_var)
    result, name = plot_comparison(no_of_requests=int(req_var['nor']), no_of_contents=int(req_var['noc']),
                                   cache_sizes=ast.literal_eval(req_var['csize']), zipf=float(req_var['zipf']))
    return render_template('compare.html', code=result, name=name)


if __name__ == '__main__':
    app.run(debug=True)
