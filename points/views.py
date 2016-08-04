from django.http import HttpResponse
from django.template import RequestContext, loader
from django.shortcuts import get_object_or_404, render
from .models import Point
import json
from decimal import Decimal

import wikicollector as wc

def testtemplate(request):
    points_list = Point.objects.order_by('point_name')[100:200]
    context = {'points_list': points_list}
    return render(request, 'points/test/list.html', context)

def index(request):
    points_list = Point.objects.order_by('point_name')[20:100]
    context = {'points_list': points_list}
    return render(request, 'points/lists.html', context)

def point_maps(request):
    points_list = Point.objects.order_by('point_name')
    context = {'points_list': points_list}
    return render(request, 'points/maps.html', context)

def detail(request, point_id):
    point = get_object_or_404(Point, pk=point_id)
    return render(request, 'points/detail.html', {'point': point})

def collect(request):
    print("********************Collect external data*****************")
    #print(wc.get_wiki_data())
    response = "Collect external data"
    return HttpResponse(response)

def default(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError

def all_point_json(request):
    result = Point.objects.values()[100:200]
    list_result = [entry for entry in result]
    return HttpResponse(json.dumps(list_result, default=default), content_type='application/json')

