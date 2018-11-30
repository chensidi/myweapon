# 中文编码
# -*- coding: UTF-8 -*-
#coding=utf-8

#等待用户输入
#raw_input("按下 enter 键退出，其他任意键显示...\n")

#多行注释
'''
this is not effect
'''

#数据类型5种
#1.Numbers    1)float  2)int   3)long   4)complex
#2.String
#3.Tuple
#4.Dictionary
#5.List
#6.bool

#创造字典
#1.dic = dict(a=1,b=2,c=3)
#2.dic = dict([('a',1),('b',2)])
#3.dic = dict(zip(['a','b','c'],[1,2,3]))
 
#字符转为Unicode编码===> ord('a')
#编码转为字符===> chr(97)

#删除变量 del()

#math模块,ceil(),floor(),pow(),sqrt(),fabs()

#random模块
#1. random.choice(arr) 从数组里返回一个随机值
#2. random.randrange(start,end,step) 在start到end之间按照step长度，返回随机值
#3. random.random() 返回0,1随机值
#4. random.shuffle(arr) arr随机排序
#5. random.uniform(start,end) 返回随机实数

#字符串
#1. string*2  重复输出
#2. [a:b]  截取左闭右开
#3.格式化  '%s|%d|%04d|%f|%.3f'%('abc',10,10,1.2,1.1)
#4. capitalize()
#5. center(size,padchar)  center(20,'|')
#6. count(tagchar,start,end)  center('a',0,5) 左闭右开
#7. endswith(tagchar,start,end) 左闭右开
#8. find(tagchar,start,end) 左闭右开 找不到返回-1
#9. index(tagchar,start,end) 左闭右开 找不到报错
#10. isalnum() 是否为数字或字母组成
#11. isalpha() 是否全为字母
#12. isdigit() 是否全数字
#13. islower() 字母部分全为小写？
#14. isupper() 相反
#15. join(tagstr)  '|'.join('abcd')
#16. upper() 全部转换为大写
#17. lower() 相反
#18. ljust(width) 左对齐充填至width长度  'abc'.ljust(6) ==> 'abc   '
#19. lstrip() 截掉左边空格
#20. replace(tag,rep,maxcount) ==> 'abcadfa'.replace('a','P',2)
#21. split()
#22. title() 标题化
#23. swapcase() 大小写翻转
#24. zfill(width) 左侧充填0至长度达到width



# 列表/数组
# 1. append(onevalue) 列表尾部添加，仅一个值
# 2. del arr[5] 删除指定元素
# 3. len(arr) 长度
# 4. cmp(arr1,arr2) 相同返回0，不同返回1
# 5. count(tag),自身调用以下全部
# 6. extend(arr) 类型于arr.concat
# 7. insert(start,val)
# 8. pop()
# 9. remove(val)
# 10. reverse()
# 11. sort()


# 字典/Map
# 1. clear() 全为自身调用
# 2. fromkeys(arr,val)
# 3. pop(key)
# 4. keys()
# 5. values()
# 6. items()
# 7. update(tagdic)
# 8. popitem() 随机删除一对键值
# 9. copy()
# 10. get(key)


# 时间模块 import time
#1. time() 时间戳
#2. localtime() 年月日时分秒 全年第几天 本周第几天
#3. asctime() ===>'Thu Nov 29 16:58:45 2018'

# 日历模块 import calendar
# 1. month(year,month)
 
#文件操作
#1、打开 open(filename,mode,encodeing)
#2. mode (r,w,r+,w+,a,a+,+,x)
#3. txt.read(len)
#4. txt.write(string)
#5. seek(offset,0) 移动位置
#6. os.rename(curfilename,tagfilename)
#7. os.getcwd()
#8. txt.tell()

#搭建服务器
#1. python -m SimpleHTTPServer 80
#2. python -m http.server 80

#爬虫v1.0
# import urllib2
# ur1='http://www.taobao.com'
# reponse=urllib2.urlopen(ur1)
# r=reponse.read()
# r=r.decode('utf8')
# print(r)
