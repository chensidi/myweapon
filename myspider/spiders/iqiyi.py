# -*- coding: utf-8 -*-
import scrapy
from myspider.items import MyspiderItem

class IqiyiSpider(scrapy.Spider):
    name = 'iqiyi'
    allowed_domains = ['www.iqiyi.com']
    start_urls = ['https://www.iqiyi.com/dianying/']

    def parse(self, response):
        alts = response.xpath('//*[@class="qy-mod-link bright"]/@title').extract()
        srcs = response.xpath('//*[@class="qy-mod-link"]/img/@src').extract()
        for obj in alts:
            print(obj)
        # for obj in srcs:
        #     print(obj)
        # for i in range(0,len(alts)):
        #     obj = {'alt':alts[i],'pic':srcs[i]}
        #     items.append(obj)
        #     print(obj)
        # return items
