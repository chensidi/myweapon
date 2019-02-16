function Cmt(post){
    this.post = post;
    this.pageNum = 0;

    this.createUI = function(){
        var box = $('<div />').addClass('cmt_wrap')
                              .append(
                                  $('<header />').addClass('mui-bar mui-bar-transparent')
                                                 .attr({'data-top':0,'data-offset':150,'data-duration':16,'data-scrollby':'.mui-scroll-wrapper'})
                                                 .append($('<h1>').addClass('mui-title tt').text('评论'))
                              )
                              .append($('<div />').addClass('cmt_bg').css('background-image',`url(${this.post})`))
                              .append(
                                  $('<div />').addClass('cmt_drop').append(
                                                                        $('<span />').addClass('loadings')
                                                                                     .append($('<em />').text('加载中...'))
                                                                                     .append($('<i />').addClass('mui-icon mui-icon-spinner mui-spin'))  
                                                                    )
                                )
                              .append(
                                  $('<div />').addClass('mui-content mui-scroll-wrapper')
                                                  .attr('id','cmt')
                                                  .append($('<div />').addClass('mui-scroll')
                                                                        .append($('<h4 />').addClass('cmt_title').text('精彩评论'))
                                                                        .append($('<ul />').addClass('cmt_list_hot mui-table-view mui-table-view-chevron')) 
                                                                        .append($('<h4 />').addClass('cmt_title').text('全部评论')) 
                                                                        .append($('<ul />').addClass('cmt_list mui-table-view mui-table-view-chevron'))
                                                  )
                              )
            box.appendTo('body');
            this.muiInit();
    }
    
    this.createCmt = function(img,nname,time,zan,cnt,type){
        var li = $('<li />');
        var content = `<div class="cmt_head">
                            <img src="img/avatar4.png" alt="" class="lazy" data-original="${img}">
                        </div>
                        <div class="cmt_info">
                            <div class="cmt_header">
                                <div class="cmt_meta">
                                    <span class="cmt_user">${nname}</span>
                                    <div class="cmt_time">${this.converTime(time)}</div>
                                </div>
                                <div class="cmt_like">
                                    <span class="cmt_likearea">
                                        <span class="cmt_count">${zan}</span>
                                        <i class="mui-icon mui-icon-star zan"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="cmt_content">
                                ${cnt}
                            </div>
                        </div>`
        li.append(content);
        if(type==0){
            $('.cmt_list_hot').append(li);
        }else{
            $('.cmt_list').append(li);
        }
        li.find('img').lazyload({effect: "show",threshold :180});
    }

    this.createRecmt = function(img,nname,time,zan,cnt,recmt,type){
        var li = $('<li />');
        var content = `<div class="cmt_head">
                        <img src="img/avatar4.png" alt="" class="lazy" data-original="${img}">
                    </div>
                    <div class="cmt_info">
                        <div class="cmt_header">
                            <div class="cmt_meta">
                                <span class="cmt_user">${nname}</span>
                                <div class="cmt_time">${this.converTime(time)}</div>
                            </div>
                            <div class="cmt_like">
                                <span class="cmt_likearea">
                                    <span class="cmt_count">${zan}</span>
                                    <i class="mui-icon mui-icon-star zan"></i>
                                </span>
                            </div>
                        </div>
                        <div class="cmt_content">
                                回复<span class="touser">${recmt.nname}:</span> ${cnt}
                        </div>
                        <div class="recmt">
                            <span>@${recmt.nname}:</span>${recmt.cmt}
                        </div>
                    </div>`;
            if(type==0){
                $('.cmt_list_hot').append(li);
            }else{
                $('.cmt_list').append(li);
            }
            li.append(content);
            li.find('img').lazyload({effect: "show",threshold :180});
    }

    this.muiInit = function(){
        var self = this;
        mui.init({
            pullRefresh : {
                container:"#cmt",
                up : {
                    height:50,
                    auto: false,
                    contentdown : "下拉可以刷新",
                    contentover : "释放立即刷新",
                    contentrefresh : "正在刷新...",
                    callback :function(){
                        self.pageNum += 1;
                        if(self.pageNum >= self.page){
                            mui('#cmt').pullRefresh().endPullupToRefresh();
                            return;
                        }
                        self.ajax(`${self.url}&offset=${self.pageNum*20}`);
                    }
                }
            }
        })
    }

    this.converTime = function(time){
        var date = new Date(time);
        return date.getFullYear() + '年' + Number(date.getMonth() + 1) + '月' + date.getDate() + '日';
    }

    this.ajax = function(url){
        var self = this;
        self.url = url.replace(/&.+/,'');
        $.ajax({
            url: url,
            success: function(dt){
                if(dt.code==200){
                    $('.cmt_drop').hide();
                    mui('#cmt').pullRefresh().endPullupToRefresh();
                    self.page = Math.ceil(dt.total/20);
                    if(self.pageNum == 0){
                        dt.hotComments.map((obj,i)=>{
                            self.doLoop(obj,0);
                        })
                    }
                    dt.comments.map((obj,i)=>{
                        self.doLoop(obj,1);
                    })
                }
            }
        })
    }

    this.doLoop = function(obj,type){
        var self = this;
        if(obj.beReplied.length){
            self.createRecmt(
                obj.user.avatarUrl,
                obj.user.nickname,
                obj.time,
                obj.likedCount,
                obj.content,
                {nname:obj.beReplied[0].user.nickname,cmt:obj.content},
                type
            )
        }else{
            self.createCmt(
                obj.user.avatarUrl,
                obj.user.nickname,
                obj.time,
                obj.likedCount,
                obj.content,
                type
            )
        }
    }
}