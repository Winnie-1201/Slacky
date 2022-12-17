from app.models import db, User, Group, GroupMessage, environment, SCHEMA

def seed_dms():
    groups = Group.query.all()

    for group in groups:
        all_msgs=[]
        pairs = group.group_user_groups
        # msg_1 = GroupMessage(
        #         content=f"'Hello, I am {pairs[0].username}'",
        #         groupId=group.id,
        #         user=pairs[0]
        #     )

        # msg_2 = GroupMessage(
        #         content=f"'Hello, I am {pairs[1].username}'",
        #         groupId=group.id,
        #         user=pairs[1]
        #     )

        msg_1 = GroupMessage(
                content='{"blocks":[{"key":"3hla4","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":10,"style":"BOLD"},{"offset":12,"length":9,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
                groupId=group.id,
                user=pairs[0]
            )
        
        msg_2 = GroupMessage(
                content='{"blocks":[{"key":"3hla4","text":"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":22,"length":10,"style":"ITALIC"},{"offset":46,"length":6,"style":"STRIKETHROUGH"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
                groupId=group.id,
                user=pairs[1]
            )

        all_msgs = [msg_1, msg_2]
        [db.session.add(msg) for msg in all_msgs]

    db.session.commit()


def undo_dms():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.group_messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM group_messages")

    db.session.commit()
