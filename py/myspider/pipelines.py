# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
import json
import codecs
import os
import pymysql

class MyspiderPipeline(object):
    def process_item(self, item, spider):
        return item
    # def process_item(self, item, spider):
    #       # 获取当前工作目录
    #     base_dir = os.getcwd()
    #     fiename = 'news.txt'
    #      # 从内存以追加的方式打开文件，并写入对应的数据
    #     with open(fiename, 'a') as f:
    #          f.write(item['title'] + '\n')
    #          f.write(item['link'] + '\n')
    #          f.write(item['posttime'] + '\n\n')
    #     return item

class JsonWithEncodingPipeline(object):

    def __init__(self):
        self.file = codecs.open('scraped_data_utf8.json', 'w', encoding='utf-8')
        self.file.write('[')

    def process_item(self, item, spider):
        line = json.dumps(dict(item), ensure_ascii=False) + "\n"
        self.file.write(line+',')
        return item

    def close_spider(self, spider):
        self.file.seek(-1, os.SEEK_END)
        self.file.truncate();
        self.file.write(']')
        self.file.close()

class MysqlPipeline(object):
    def process_item(self,item,spider):
        '''
        将爬取的信息保存到mysql
        '''
        # 将item里的数据拿出来
        alt = item['alt']
        src = item['pic']

        # 和本地的newsDB数据库建立连接
        db = pymysql.connect(
            host='localhost',  # 连接的是本地数据库
            user='root',  # 自己的mysql用户名
            passwd='root',  # 自己的密码
            db='newsDB',  # 数据库的名字
            charset='utf8mb4',  # 默认的编码方式：
            cursorclass=pymysql.cursors.DictCursor)
        try:
            # 使用cursor()方法获取操作游标
            cursor = db.cursor()
            # SQL 插入语句
            sql = "INSERT INTO NEWS(alt,src) VALUES ('%s', '%s')" % (alt,src)
            # 执行SQL语句
            cursor.execute(sql)
            # 提交修改
            db.commit()
        finally:
            # 关闭连接
            db.close()
        return item

# class Top250Pipeline(ImagesPipeline):

#     def get_media_requests(self, item, info):
#         for image_url in item['image_urls']:
#             yield scrapy.Request(image_url)

#     def item_completed(self, results, item, info):
#         image_paths = [x['path'] for ok, x in results if ok]      # ok判断是否下载成功
#         if not image_paths:
#             raise DropItem("Item contains no images")
#         #item['image_paths'] = image_paths
#         return item
