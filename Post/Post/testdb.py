# -*- coding: utf-8 -*-
 
from django.http import HttpResponse
 
from TestModel.models import Test2
 
# 数据库操作
def testdb(request):
    # test1 = Test(name='runoob')
    # test2 = Test(nums='123')
    # test1.save()
    # test2.save()
    # return HttpResponse("<p>数据添加成功！</p>")


    # 初始化
    response = ""
    response1 = ""
    
    
    # 通过objects这个模型管理器的all()获得所有数据行，相当于SQL中的SELECT * FROM
    list = Test2.objects.all()
        
    # filter相当于SQL中的WHERE，可设置条件过滤结果
    response2 = Test2.objects.filter(id=1) 
    
    # 获取单个对象
    response3 = Test2.objects.get(id=1) 
    
    # 限制返回的数据 相当于 SQL 中的 OFFSET 0 LIMIT 2;
    response4 = Test2.objects.order_by('id')[2:5]
    
    #数据排序
    Test2.objects.order_by("id")
    
    # 上面的方法可以连锁使用
    # Test2.objects.filter(name="runoob").order_by("id")
    
    # 输出所有数据
    for var in response4:
        response1 += var.alt + " "
    response = response1
    return HttpResponse("<p>" + response1 + "</p>")
    # 修改其中一个id=1的name字段，再save，相当于SQL中的UPDATE
    # test1 = Test.objects.get(id=1)
    # test1.name = 'Google'
    # test1.save()
    
    # 另外一种方式
    # Test.objects.filter(id=1).update(name='baidu')
    
    # 修改所有的列
    # Test.objects.all().update(name='jacky')
    
    # return HttpResponse("<p>修改成功</p>")