# -*- coding: utf-8 -*-
from django.http import HttpResponse,JsonResponse
import json
# from TestModel.models import Test2
from TestModel.models import Test2
from serializers import serializer
# 定义功能
def add_args(a, b):
    return a + b
 
# 接口函数
def post(request):
    if request.method == 'POST':  # 当提交表单时
        dic = {}
        # 判断是否传参
        if request.POST:
            a = request.POST.get('a', 0)
            b = request.POST.get('b', 0)
            # 判断参数中是否含有a和b
            if a and b:
                res = add_args(a, b)
                dic['number'] = res
                dic = json.dumps(dic)
                return HttpResponse(dic)
            else:
                return HttpResponse('输入错误')
        else:
            return HttpResponse('输入为空')
 
    else:
        return HttpResponse('方法错误')

def gets(request):
    if request.method == 'GET':
        res = ''
        resalt = ''
        data = {}
        resall = Test2.objects.order_by('id')[2:5]
        # for obj in resall:
        #     resalt += obj.alt
        # res = resalt
        # return HttpResponse(json.dumps(list(resall)))
        return HttpResponse(json.dumps(list(resall), default=lambda obj: obj.__dict__), content_type='application/json') #返回json数据