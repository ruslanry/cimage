# -*- coding: utf-8 -*-
import datetime

from django.test import TestCase
from fotos.models import Ufoto
from django.utils import timezone

class FotoTestCase(TestCase):
    def setUp(self):
      Ufoto.objects.create(foto_name='001',foto_lon=0,foto_lat=0,foto_date=timezone.now())
      Ufoto.objects.create(foto_name='002',foto_lon=200,foto_lat=200,foto_date=timezone.now())
      Ufoto.objects.create(foto_name='003',foto_lon=27.497998046874955,foto_lat=37.167489854457514,foto_date=timezone.now())
      Ufoto.objects.create(foto_name='004',foto_lon=-122.73925581249995,foto_lat=-73.65501859373667,foto_date=timezone.now())
      Ufoto.objects.create(foto_name='005',foto_lon=134.6044941875,foto_lat=-22.032693529748418,foto_date=timezone.now())

    def test_convert_coord_001(self):
      self.assertEqual(Ufoto.objects.get(foto_name='001').get_coord(),{'lat': ' 00° 00.000`N', 'lon': '000° 00.000`E'})
   
    def test_convert_coord_002(self):
      self.assertEqual(Ufoto.objects.get(foto_name='002').get_coord(),{'lat': None, 'lon': None})
   
    def test_convert_coord_005(self):
      self.assertEqual(Ufoto.objects.get(foto_name='003').get_coord(),{'lat': ' 37° 10.049`N', 'lon': '027° 29.880`E'})

    def test_convert_coord_006(self):
      self.assertEqual(Ufoto.objects.get(foto_name='004').get_coord(),{'lat': ' 73° 39.301`S', 'lon': '122° 44.355`W'})

    def test_convert_coord_006(self):
      self.assertEqual(Ufoto.objects.get(foto_name='005').get_coord(),{'lat': ' 22° 01.962`S', 'lon': '134° 36.270`E'})

