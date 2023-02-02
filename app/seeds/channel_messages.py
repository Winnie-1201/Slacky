from app.models import db, User, environment, SCHEMA, Channel, ChannelMessage


def seed_channel_messages():
    channel_message1 = ChannelMessage(
        channel_id = 1,
        user_id = 1,
        content = "To everyone who might have missed it, it is group project sync time. Hop into a room with your group mates and coordinate how everyone is going to work on the project during sprint."
    )
    channel_message2 = ChannelMessage(
        channel_id = 1,
        user_id = 2,
        content = "group project sync time is over. It is now project time, feel free to hop into your own room and work on your solo projects."
    )
    channel_message3 = ChannelMessage(
        channel_id = 1,
        user_id = 3,
        content = " I will be hosting the IA Q&A session today in my breakout room at 9:30 PST / 12:30 EST."
    )
    channel_message4 = ChannelMessage(
        channel_id = 1,
        user_id = 2,
        content = "Will be closing down rooms for EOD in about 3 minutes."
    )
    channel_message5 = ChannelMessage(
        channel_id = 2,
        user_id = 1,
        content = "I noticed on the calendar that we have this upcoming Monday off. Do we celebrate Martin Luther King Jr. Day?"
    )
    channel_message6 = ChannelMessage(
        channel_id = 1,
        user_id = 2,
        content = "A 15 minute break a day keeps the strike-bot away. Time for break!"
    )

    db.session.add(channel_message1)
    db.session.add(channel_message2)
    db.session.add(channel_message3)
    db.session.add(channel_message4)
    db.session.add(channel_message5)
    db.session.add(channel_message6)
    db.session.commit()


def undo_seed_channel_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channel_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channel_messages")

    db.session.commit()
