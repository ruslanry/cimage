from django.conf.urls import url

from . import views

app_name = 'points'

urlpatterns = [
    # ex: /points/
    url(r'^$', views.index, name='index'),
    # ex: /points/5/
    url(r'^(?P<point_id>[0-9]+)/$', views.detail, name='detail'),
    # ex: /points/collect/
    url(r'^collect/$', views.collect, name='collect'),
    # ex: /points/maps/
    url(r'^maps/$', views.point_maps, name='point_maps'),
    # ex: /points/mapsjson/
    url(r'^maps/json.dat$', views.all_point_json, name='point_json'),
]

