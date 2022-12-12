from app.models import db, User, Group, environment, SCHEMA

def seed_groups():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)

    group_1 = Group(
        group_user_groups=[user1, user2]
    )

    group_2 = Group(
        group_user_groups=[user1, user3]
    )

    group_3 = Group(
        group_user_groups=[user2, user3]
    )

    db.session.add(group_1)
    db.session.add(group_2)
    db.session.add(group_3)
    db.session.commit()

    # print("Groups were seeded")


def undo_groups():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM groups")

    db.session.commit()