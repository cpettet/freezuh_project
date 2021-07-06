import os
from flask import Flask, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User

# Space for importing routes from blueprints
from .api.auth_routes import auth_routes
from .api.user_routes import user_routes
from .api.sample_routes import sample_routes
from .api.plate_routes import plate_routes
from .api.rack_routes import rack_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = "auth.unauthorized"


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


app.cli.add_command(seed_commands)

app.config.from_object(Config)

# Space for registering routes from blueprints
app.register_blueprint(user_routes, url_prefix="/api/users")
app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(sample_routes, url_prefix="/api/samples")
app.register_blueprint(plate_routes, url_prefix="/api/plates")
app.register_blueprint(rack_routes, url_prefix="/api/racks")

db.init_app(app)
Migrate(app, db)

# application security
CORS(app)


# Redirect to https when using http requests
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
