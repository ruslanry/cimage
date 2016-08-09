# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.utils.encoding import python_2_unicode_compatible

from django.db import models
import coordconvert as cc

@python_2_unicode_compatible  # only if you need to support Python 2
class Point(models.Model):
    point_name = models.CharField('text name foto',max_length=200)
    point_lat  = models.DecimalField('lat',max_digits=13,decimal_places=10)
    point_lon  = models.DecimalField('lon',max_digits=13,decimal_places=10)
    point_image = models.CharField('exterlan link to foto',max_length=500)
    point_link = models.CharField('exterlan link to details',max_length=500)

    def __str__(self):
      res = cc.getWGS84(lat=self.point_lat,lon=self.point_lon)
      res['name'] = self.point_name
      return "{name} : {lat} {lon}".format(**res)

    def get_coord(self):
      return cc.getWGS84(lat=self.foto_lat,lon=self.foto_lon)
