# Generated by Django 4.0.3 on 2022-03-13 16:32

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sqa', '0005_tenant_user_alter_question_tenant'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='upsert_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 13, 22, 32, 44, 671476), null=True),
        ),
        migrations.AddField(
            model_name='answer',
            name='upsert_by',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='category',
            name='upsert_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 13, 22, 32, 44, 670476), null=True),
        ),
        migrations.AddField(
            model_name='category',
            name='upsert_by',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='question',
            name='upsert_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 13, 22, 32, 44, 671476), null=True),
        ),
        migrations.AddField(
            model_name='question',
            name='upsert_by',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='tenant',
            name='upsert_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 13, 22, 32, 44, 670476), null=True),
        ),
        migrations.AddField(
            model_name='tenant',
            name='upsert_by',
            field=models.IntegerField(null=True),
        ),
    ]