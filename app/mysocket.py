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
    msg = data["msg"]
    room = data["room"]
    # join_room(room)
    emit("dm", msg, to=room)

@socketio.on('join')
def handle_join(data):
    user = data["user"]["username"]
    room = data["room"]
    join_room(room)
    # print(f"{user} has entered room {room}")
    # emit('dm', to=room)

@socketio.on("invite")
def handle_invite(data):
    invited_user = data['user']
    emit('invite', invited_user)

@socketio.on('leave')
def handle_leave(data):
    user = data['user']["username"]
    room = data['room']
    leave_room(room)
    # print(f'{user} has left room {room}')

@socketio.on("disconnect")
def diconnected():
    """event listener when client disconnects to the server"""
    # print("user disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)  


@socketio.on('join-private')
def handle_join(data):
    # print('-----------', data, '---------backend join-private handler')
    room = data["room"]
    user_id = data['userId']

    join_room(room)
    # print(f"{user_id} has entered room {room}")

@socketio.on("invite-private")
def handle_invite(data):
    # print("--------backend invite-private handler--------", data)
    receiver_id = data['receiverId']

    # print('-----------', f'invite-{receiver_id}')
    emit('invite-private', to=f'invite-{receiver_id}')