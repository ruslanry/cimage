from django.conf.urls import patterns, include, url
from django.contrib import admin

from django.shortcuts import render,redirect

def index_view(request):
    return redirect('points:index')

urlpatterns = [
    url(r'^admin/', admin.site.urls, name='admin'),
    url(r'^points/', include('points.urls')),
    url(r'^$', index_view, name='index'),
]

