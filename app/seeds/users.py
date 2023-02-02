from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    USERS = [
        {
            'username': 'James',
            'email': 'demo1@aa.io',
            'password':'password',
            'image_url':'https://www.nicepng.com/png/detail/96-967009_rubber-duck-icon.png',
            'is_online':True,
            'status': 'Happy'
        },
        {
            'username': 'Maria',
            'email': 'demo2@aa.io',
            'password':'password',
            'image_url':'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/UP2538-CUSA05620_00-AV00000000000124/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000',
            'is_online':True,
            'status': 'Study'
        },             
        {
            'username': 'Yizhou',
            'email': 'yizhou@aa.io',
            'password':'password',
            'image_url':'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
            'is_online':True,
            'status': 'Hire me!'
        },
        {
            'username': 'Xuelan',
            'email': 'xuelan@aa.io',
            'password':'password',
            'image_url':'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
            'is_online':True,
            'status': 'Hire me!'
        },
        {
            'username': 'Wanting',
            'email': 'wanting@aa.io',
            'password':'password',
            'image_url':'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
            'is_online':True,
            'status': 'Hire me!'
        },
        {
            'username': 'Nan',
            'email': 'nan@aa.io',
            'password':'password',
            'image_url':'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
            'is_online':True,
            'status': 'Hire me!'
        },           
    ]

    for user in USERS:
        demo = User(
            username=user['username'], 
            email=user['email'], 
            password=user['password'],
            image_url =user['image_url'],
            is_online = user['is_online'],
            status = user['status']
            )
        db.session.add(demo)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
