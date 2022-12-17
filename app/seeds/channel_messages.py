from app.models import db, User, environment, SCHEMA, Channel, ChannelMessage


def seed_channel_messages():
    channel_message1 = ChannelMessage(
        channel_id = 1,
        user_id = 1,
        content = '{"blocks":[{"key":"3hla4","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":10,"style":"BOLD"},{"offset":12,"length":9,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}'
    )
    channel_message2 = ChannelMessage(
        channel_id = 1,
        user_id = 2,
        content = '{"blocks":[{"key":"dqmqf","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":5,"style":"STRIKETHROUGH"},{"offset":28,"length":11,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}'
    )
    channel_message3 = ChannelMessage(
        channel_id = 1,
        user_id = 3,
        content = '{"blocks":[{"key":"dqmqf","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi cras fermentum odio eu feugiat pretium nibh. Metus aliquam eleifend mi in. Cras sed felis eget velit aliquet. Maecenas accumsan lacus vel facilisis volutpat.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":290,"style":"STRIKETHROUGH"}],"entityRanges":[],"data":{}},{"key":"7om7h","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
    )
    channel_message4 = ChannelMessage(
        channel_id = 1,
        user_id = 2,
        content = '{"blocks":[{"key":"dqmqf","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi cras fermentum odio eu feugiat pretium nibh. ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1tp4n","text":"","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cbi7","text":"Metus aliquam eleifend mi in. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi cras fermentum odio eu feugiat pretium nibh.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
    )
    # channel_message5 = ChannelMessage(
    #     channel_id = 2,
    #     user_id = 1,
    #     content = ''
    # )
    # channel_message6 = ChannelMessage(
    #     channel_id = 1,
    #     user_id = 2,
    #     content = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi cras fermentum odio eu feugiat pretium nibh."'
    # )

    db.session.add(channel_message1)
    db.session.add(channel_message2)
    db.session.add(channel_message3)
    db.session.add(channel_message4)
    # db.session.add(channel_message5)
    # db.session.add(channel_message6)
    db.session.commit()


def undo_seed_channel_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channel_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channel_messages")

    db.session.commit()
