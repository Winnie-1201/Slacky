from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password',
        image_url ='https://m.media-amazon.com/images/I/31sv5622scL._AC_.jpg',
        is_active = True,
        status = 'Lorem ipsum dolor sit amet'
        )
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password',
        image_url ='https://i.ebayimg.com/images/g/Ht8AAOSwywlhVCZT/s-l500.jpg',
        is_active = True,
        status = 'consectetur adipiscing elit'
        )
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password',
        image_url ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM14_ncX5-mf7emOikPDZRfznsKJigRU2RWwH9l0HvLIrRiebKpQz_rex70ZrPnRSz0bQ&usqp=CAU',
        is_active = True,
        status = 'sed do eiusmod tempor'
        )
    lucy = User(
        username='lucy', email='lucy@aa.io', password='password',
        image_url ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVfGbdrkOVpf6OYM4t4X2diQ8t7lCTI2Kp4aI7rE3JIErlFHhv4ndyqgkRSaxYsWb7PYE&usqp=CAU',
        is_active = True,
        status = 'incididunt ut labore et dolore'
        )
    jason = User(
        username='jason', email='jason@aa.io', password='password',
        image_url ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAg3YrTvORClxWkynmLcPWG4hQFvwY-Jaz6A&usqp=CAU',
        is_active = True,
        status = 'Ipsum a arcu cursus vitae congue'
        )
    ray = User(
        username='ray', email='ray@aa.io', password='password',
        image_url ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzwJ0SfzL4Q4MPmTVmsMLlEjcTF90_SkgHxQ&usqp=CAU',
        is_active = True,
        status = 'mauris rhoncus aenean vel'
        )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(lucy)
    db.session.add(jason)
    db.session.add(ray)
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
