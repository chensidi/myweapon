# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class MyspiderItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    alt = scrapy.Field() #alt
    pic = scrapy.Field() #picurl
    posttime = scrapy.Field()
    image_urls = scrapy.Field()  #保存图片地址
    images = scrapy.Field()      #保存图片的信息
