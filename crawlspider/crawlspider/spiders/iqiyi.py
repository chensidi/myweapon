# -*- coding: utf-8 -*-
import scrapy
from crawlspider.items import CrawlspiderItem

class IqiyiSpider(scrapy.Spider):
    name = 'iqiyi'
    allowed_domains = ['www.runoob.com']
    start_urls = ['http://www.runoob.com/']

    def parse(self, response):
        # items = []
        # navs = response.xpath('//*[@id="index-nav"]/li/a/text()').extract() #顶部导航
        # sides = response.xpath('//*[@class="navto-nav"]/text()').extract() #侧边导航
        # smalltitles = response.xpath('//*[@class="codelist codelist-desktop cate1"]/a/h4/text()').extract() #小标题
        # title = response.xpath('//*[@class="codelist codelist-desktop cate1"]/h2/text()').extract() #块级标题
        # strongs = response.xpath('//*[@class="codelist codelist-desktop cate1"]/a/strong/text()').extract() #描述
        # href = response.xpath('//*[@class="codelist codelist-desktop cate1"]/a/@href').extract() #链接
        
        # for obj in href:
        #     # nav = {'nav':obj}
        #     # items.append(nav)
        #     print(obj)
        nav = self.delnav(response)
        containers = self.container(response)
        return containers
    
    def delnav(self,res):
        navobj = {}
        navobj['nav'] = res.xpath('//*[@id="index-nav"]/li/a/text()').extract()
        navobj['sides'] = res.xpath('//*[@class="navto-nav"]/text()').extract()
        return navobj
    
    def container(self,res):
        items = []
        for i in range(1,11):
            smalltitles = res.xpath('//*[@class="codelist codelist-desktop cate'+ str(i) +'"]/a/h4/text()').extract()
            title = res.xpath('//*[@class="codelist codelist-desktop cate'+ str(i) +'"]/h2/text()').extract()
            strongs = res.xpath('//*[@class="codelist codelist-desktop cate'+ str(i) +'"]/a/strong/text()').extract()
            href = res.xpath('//*[@class="codelist codelist-desktop cate'+ str(i) +'"]/a/@href').extract()
            child = {}
            child['title'] = title[0]
            child['meber'] = []
            for j in range(0,len(smalltitles)-1):
                tempobj = {}
                tempobj['smalltitles'] = smalltitles[j]
                tempobj['strongs'] = strongs[j]
                tempobj['href'] = href[j]
                child['meber'].append(tempobj)
            items.append(child)
        return items
        

