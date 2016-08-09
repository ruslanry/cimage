# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.utils.encoding import python_2_unicode_compatible

from django.db import models
import coordconvert as cc

@python_2_unicode_compatible  # only if you need to support Python 2
class Ufoto(models.Model):
    foto_name = models.CharField('text name foto',max_length=200)
    foto_lat  = models.DecimalField('lat',max_digits=13,decimal_places=10)
    foto_lon  = models.DecimalField('lon',max_digits=13,decimal_places=10)
    foto_date = models.DateTimeField('add date')

    def __str__(self):
      res = cc.getWGS84(lat=self.foto_lat,lon=self.foto_lon)
      res['name'] = self.foto_name
      return "{name} : {lat} {lon}".format(**res)

    def get_coord(self):
      return cc.getWGS84(lat=self.foto_lat,lon=self.foto_lon)

