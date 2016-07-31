from django.http import HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import get_object_or_404, render
from .models import Point

import wikicollector as wc

def index(request):
    points_list = Point.objects.order_by('point_name')
    context = {'points_list': points_list}
    return render(request, 'points/index.html', context)

def detail(request, point_id):
    point = get_object_or_404(Point, pk=point_id)
    return render(request, 'points/detail.html', {'point': point})

def collect(request):
    print("********************Collect external data*****************")
    #print(wc.get_wiki_data())
    response = "Collect external data"
    return HttpResponse(response)
