from app.models import db, User, Group, GroupMessage, environment, SCHEMA

def seed_dms():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)


    msg_1 = GroupMessage(
        content="Hello, f{user1.username}",
        groupId=1,
        user=user1
    )

    msg_2 = GroupMessage(
        content="Hi, f{user2.username}",
        groupId=1,
        user=user2
    )

    msg_3 = GroupMessage(
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        groupId=1,
        user=user1
    )
    msg_4 = GroupMessage(
        content="sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        groupId=1,
        user=user2
    )
    msg_5 = GroupMessage(
        content="Hi, f{user1.username}",
        groupId=2,
        user=user1
    )
    msg_6 = GroupMessage(
        content="Hi, f{user3.username}",
        groupId=2,
        user=user3
    )

    msg_7 = GroupMessage(
        content="Hi, f{user2.username}",
        groupId=3,
        user=user2
    )
    msg_8 = GroupMessage(
        content="Hi, f{user3.username}",
        groupId=3,
        user=user3
    )

    all_msgs = [msg_1, msg_2, msg_3, msg_4, msg_5, msg_6, msg_7, msg_8]
    [db.session.add(msg) for msg in all_msgs]
    db.session.commit()


def undo_dms():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.group_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM group_messages")

    db.session.commit()
    

    