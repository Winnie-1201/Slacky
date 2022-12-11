from flask_socketio import SocketIO, emit
import os
from flask import request

if os.environ.get("FLASK_ENV") == "production":
    # change it to the actual url later
    origins = [
        "*"
    ]
else:
    origins = ["*"]
    
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
    # use broadcase=True will emit the message to all connected users
    emit("dm", data, broadcast=True)
