from flask_socketio import SocketIO, emit, send, join_room, leave_room
import os
from flask import request
from .models import db, Group, User

if os.environ.get("FLASK_ENV") == "production":
    # change it to the actual url later
    origins = [
        "https://slack-clone-2k4m.onrender.com", "http://slack-clone-2k4m.onrender.com"
    ]
else:
    origins = "*"
    
# create the SocketIO instance
socketio = SocketIO(
    cors_allowed_origins=origins
)


@socketio.on("connect")
def user_connect():
    emit("connect", {"data": f"{request.sid} is connected"})

# Handle a chat message
# Make sure using the same value when emit the events on the front end
@socketio.on("dm")
def handle_dm(data):
    # print("data from the front end: ", data)
    print('-----------')
    msg = data["msg"]
    room = data["room"]
    # join_room(room)
    emit("dm", msg, to=room)

@socketio.on('join')
def handle_join(data):
    # print("data from front-end join", data)
    print('-----------')
    print('-----------')
    user = data["user"]["username"]
    room = data["room"]
    join_room(room)
    print(f"{user} has entered room {room}")
    # emit('dm', to=room)

@socketio.on("invite")
def handle_invite(data):
    print("--------enter invite")
    # msg = data['msg']
    room = data['room']
    invited_user = data['user']
    # group = Group.query.get(room)
    # user = User.query.get(invited_user)
    # user.user_user_groups.append(group)
    # db.session.commit()
    join_room(room)
    emit('invite', invited_user, to=room, broadcast=True)

@socketio.on('leave')
def handle_leave(data):
    user = data['user']["username"]
    room = data['room']
    leave_room(room)
    print(f'{user} has left room {room}')

@socketio.on("disconnect")
def diconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)  
