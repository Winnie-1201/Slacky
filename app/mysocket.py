from flask_socketio import SocketIO, emit, send
import os
from flask import request

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
    print("data from the front end: ", data)
    # use broadcase=True will emit the message to all connected users
    emit("dm", data, broadcast=True)


@socketio.on("join_room")
def handle_join_room(room, socket):
    socket.join(room)


@socketio.on("disconnect")
def diconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)  
# @socketio.on("receive_msg")
# def handle_message(message):
#     emit("receive_msg", message, broadcase=True)