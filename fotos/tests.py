import datetime

from django.test import TestCase
from fotos.models import Ufoto
from django.utils import timezone

class FotoTestCase(TestCase):
    def setUp(self):
      Ufoto.objects.create(foto_name='001',foto_lan=1,foto_lat=1,foto_date=timezone.now())
      Ufoto.objects.create(foto_name='002',foto_lan=190,foto_lat=190,foto_date=timezone.now())
      Ufoto.objects.create(foto_name='003',foto_lan=-190,foto_lat=-190,foto_date=timezone.now())
      Ufoto.objects.create(foto_name='004',foto_lan=70.5,foto_lat=70.5,foto_date=timezone.now())

    def test_convert_coord_001(self):
      self.assertEqual(Ufoto.objects.get(foto_name='001').get_coord(),'0"0.0')
   
    def test_convert_coord_002(self):
      self.assertEqual(Ufoto.objects.get(foto_name='002').get_coord(),'0"0.0')
   
    def test_convert_coord_003(self):
      self.assertEqual(Ufoto.objects.get(foto_name='003').get_coord(),'0"0.0')
   
    def test_convert_coord_004(self):
      self.assertEqual(Ufoto.objects.get(foto_name='004').get_coord(),'0"0.0')

