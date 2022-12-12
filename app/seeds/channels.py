from app.models import db, User, environment, SCHEMA, Channel


def seed_channels():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)

    users = User.query.all()

    general = Channel(
        name='general', description='This channel is for team-wide communication and announcements. All team members are in this channel.', topic='app academy', organizer=user1, channel_members=users)

    help_request = Channel(
        name='help-requests', description='Summon Help!', topic='For technical issues! Ask for help or aid in answering a question!', organizer=user1, channel_members=users)

    aa_august = Channel(
        name='2022-08-01-online', organizer=user2, channel_members=users)

    aa_july = Channel(
        name='2022-07-01-online', organizer=user2, channel_members=users)

    aa_asian_srg = Channel(
        name='aa-asian-srg', description='Hi all! Welcome to the Asian Student Resource Group channel! Here we can post updates on meetings and events, and brainstorm ideas for meeting topics. Please feel free to reach out to Sarah Rankin if you have any questions!', is_public=False, organizer=user3, channel_members=users)

    aa_women_srg = Channel(
        name='aa-women-srg', topic='Women Empower Women!', organizer=user3, channel_members=users)


    db.session.add(general)
    db.session.add(help_request)
    db.session.add(aa_august)
    db.session.add(aa_july)
    db.session.add(aa_asian_srg)
    db.session.add(aa_women_srg)
    db.session.commit()


def undo_channels():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE; TRUNCATE table {SCHEMA}.users_channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channels")
        db.session.execute("DELETE FROM users_channels")

    db.session.commit()