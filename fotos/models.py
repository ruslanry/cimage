from django.db import models
import coordconvert as cc

class Ufoto(models.Model):
    foto_name = models.CharField('text name foto',max_length=200)
    foto_lan  = models.DecimalField('lan',max_digits=13,decimal_places=10)
    foto_lat  = models.DecimalField('lat',max_digits=13,decimal_places=10)
    foto_date = models.DateTimeField('add date')
    def __str__(self):
      return self.foto_name
    def get_coord(self):
      return cc.int_to_text(self.foto_lat,self.foto_lan)

