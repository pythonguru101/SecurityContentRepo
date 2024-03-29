# Generated by Django 4.0.3 on 2022-03-14 19:19

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sqa', '0009_alter_answer_upsert_at_alter_category_upsert_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='upsert_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 15, 1, 19, 38, 745236)),
        ),
        migrations.AlterField(
            model_name='category',
            name='upsert_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 15, 1, 19, 38, 744236)),
        ),
        migrations.AlterField(
            model_name='question',
            name='upsert_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 15, 1, 19, 38, 744236)),
        ),
        migrations.AlterField(
            model_name='tenant',
            name='upsert_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 15, 1, 19, 38, 743236)),
        ),
        migrations.AlterField(
            model_name='tenantusermapping',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
