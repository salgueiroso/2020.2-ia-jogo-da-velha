# import bottle application
from bottle import run
from bottle_app import application

run(host='127.0.0.1', port=5001, debug=True, reloader=True)
