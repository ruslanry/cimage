from django.http import HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import get_object_or_404, render
from .models import Point
import json
from decimal import Decimal

import wikicollector as wc

def index(request):
    points_list = Point.objects.order_by('point_name')
    context = {'points_list': points_list}
    return render(request, 'points/index.html', context)

def point_maps(request):
    points_list = Point.objects.order_by('point_name')
    context = {'points_list': points_list}
    return render(request, 'points/pointmaps.html', context)

def default(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError

def all_point_json(request):
    result = Point.objects.values()
    list_result = [entry for entry in result]
    return HttpResponse(json.dumps(list_result, default=default), content_type='application/json')

def detail(request, point_id):
    point = get_object_or_404(Point, pk=point_id)
    return render(request, 'points/detail.html', {'point': point})

def collect(request):
    print("********************Collect external data*****************")
    #print(wc.get_wiki_data())
    response = "Collect external data"
    return HttpResponse(response)
