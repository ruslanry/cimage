from django.conf.urls import url

from . import views

app_name = 'points'

urlpatterns = [
    # ex: /
    url(r'^$', views.point_map_index, name='index'),
    # ex: /points/list/
    url(r'^list/$', views.point_list, name='point_list'),
    # ex: /points/5/
    url(r'^(?P<point_id>[0-9]+)/$', views.point_detail, name='detail'),
	# ex: /points/collect/
    url(r'^collect/$', views.collect, name='collect'),
    # ex: /points/mapsjson/
    url(r'^maps/json.dat$', views.all_point_json, name='point_json'),
]

