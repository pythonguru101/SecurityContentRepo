# Generated by Django 4.0.3 on 2022-03-14 19:09

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('sqa', '0008_alter_answer_replied_by_alter_answer_upsert_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='upsert_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 15, 1, 9, 18, 896969)),
        ),
        migrations.AlterField(
            model_name='category',
            name='upsert_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 15, 1, 9, 18, 896969)),
        ),
        migrations.AlterField(
            model_name='question',
            name='tenant',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='sqa.tenant'),
        ),
        migrations.AlterField(
            model_name='question',
            name='upsert_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 15, 1, 9, 18, 896969)),
        ),
        migrations.AlterField(
            model_name='tenant',
            name='upsert_at',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 15, 1, 9, 18, 895969)),
        ),
        migrations.CreateModel(
            name='TenantUserMapping',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tenant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sqa.tenant')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
