from flask_socketio import SocketIO, emit
import os

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


# Handle a chat message
# Make sure using the same value when emit the events on the front end
@socketio.on("chat")
def handle_chat(data):
    # use broadcase=True will emit the message to all connected users
    emit("chat", data, broadcast=True)
