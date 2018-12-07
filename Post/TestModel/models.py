# -*- coding: utf-8 -*-
from django.db import models

#数据表名称
class Test(models.Model):
    name = models.CharField(max_length=20)

class Test2(models.Model):
    alt = models.CharField(max_length=500)
    src = models.CharField(max_length=500)
# Create your models here.
