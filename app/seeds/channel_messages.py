from app.models import db, User, environment, SCHEMA, Channel, ChannelMessage


def seed_channel_messages():
    channel_message1 = ChannelMessage(
        channel = 1,
        user = 1,
        content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    )
    channel_message2 = ChannelMessage(
        channel = 1,
        user = 2,
        content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    )
    channel_message3 = ChannelMessage(
        channel = 1,
        user = 3,
        content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi cras fermentum odio eu feugiat pretium nibh. Metus aliquam eleifend mi in. Cras sed felis eget velit aliquet. Maecenas accumsan lacus vel facilisis volutpat."
    )
    channel_message4 = ChannelMessage(
        channel = 1,
        user = 2,
        content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi cras fermentum odio eu feugiat pretium nibh. Metus aliquam eleifend mi in."
    )
    channel_message5 = ChannelMessage(
        channel = 2,
        user = 1,
        content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi cras fermentum odio eu feugiat pretium nibh."
    )

    db.session.add(channel_message1)
    db.session.add(channel_message2)
    db.session.add(channel_message3)
    db.session.add(channel_message4)
    db.session.add(channel_message5)
    db.session.commit()


def undo_seed_channel_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channel_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channel_messages")

    db.session.commit()
