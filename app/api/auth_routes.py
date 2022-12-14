from flask import Blueprint, jsonify, session, request
from app.models import User, db, Channel
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    print('------------- authentication route ----------------')
    print('------------csrf token-----------', request.cookies['csrf_token'])
    print(dir(current_user), current_user.is_authenticated)
    print(dir(current_user.get_id))

    # ['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'get_id', 'is_online', 'is_anonymous', 'is_authenticated']
    if current_user.is_authenticated:
        print(' ****************user authenticated ****************')
        return current_user.to_dict()
    print('------------- authentication route end ----------------')
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    print('------------csrf token-----------', request.cookies['csrf_token'])
    # print here:IjI1ZmViYjU1YmU1OTNmNmZhMjRjMThhNzRhN2NkOTIyYWMxNWM1YWQi.Y5kujA.tEAx6YgyQ0PUDHfqFf6sp3PFimk
    # on brower: IjI1ZmViYjU1YmU1OTNmNmZhMjRjMThhNzRhN2NkOTIyYWMxNWM1YWQi.Y5kvIw.SsEDynYUMPPo18jiUIrmNcAzXe8
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """

    print('------------- signup route ----------------')
    print('------------csrf token-----------', request.cookies['csrf_token'])
    print(dir(current_user), current_user.is_authenticated)

    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )

        # channel = Channel.query.get(1)
        # channel.channel_members.append(user)

        # db.session.add(channel)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
