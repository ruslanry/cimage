from django.conf.urls import url

from . import views

app_name = 'points'

urlpatterns = [
    # ex: /polls/
    url(r'^$', views.index, name='index'),
    # ex: /polls/5/
    url(r'^(?P<point_id>[0-9]+)/$', views.detail, name='detail'),
    # ex: /polls/collect/
    url(r'^collect/$', views.collect, name='collect'),
]

