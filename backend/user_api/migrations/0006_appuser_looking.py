# Generated by Django 5.0.3 on 2024-03-22 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0005_appuser_program'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='looking',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
