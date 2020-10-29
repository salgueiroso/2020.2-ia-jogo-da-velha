from bottle import default_app, post, get, error, response, request, static_file, hook, route
import json
import os
from jogo import Jogo

def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = '*'
        response.headers[
            'Access-Control-Allow-Headers'] = '*'

        if request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)

    return _enable_cors

@get('/<filepath:path>')
def server_static(filepath):
    path = os.path.dirname(__file__)
    path = os.path.join(path, 'tictactoe_webpage')
    return static_file(filepath, path)


@route('/minimax/play/', method=['OPTIONS', 'POST'])
def jogar():
    movimento = Jogo().run(request.json['game'])
    return {
        'status': 200,
        'move': movimento
    }


@error(500)
@error(404)
def fail(code):
    response.content_type = 'application/json'
    return json.dumps({
        'status': code.status_code,
        'msg': code.body
    })


application = default_app()
