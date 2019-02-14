function Play(info,post,lyric,src,bg){
    this.info = info;
    this.post = post;
    this.lyric = lyric;
    this.src = src;
    this.bg = bg;
    this.lrcArr = [];

    let timer,update;

    this.initData = function(){
        this.isPlay = false;
        this.angle = 0;
        this.count = 0;
        $('.play_poster').css({'transform':`rotate(${this.angle}deg)`});
        $('.play_iner').css({'transform':`translateY(-${this.count*26}px)`});
        $('.play_btn').show();
        $('#range input').val(0);
        
    }

    this.play = function(){
        if(this.isPlay){
            this.mp3.pause();
            $('.play_btn').show();
            this.stop();
        }else{
            this.mp3.play();
            $('.play_btn').hide();
            this.rot();
            this.sync();
        }
        this.isPlay = !this.isPlay;
    }

    this.rot = function(){
        timer = setInterval(()=>{
            this.angle += .5;
            $('.play_poster').css({'transform':`rotate(${this.angle}deg)`});
            // console.log(this.mp3.currentTime)
            
        },50)
    }

    this.sync = function(){
        update = setInterval(()=>{
            for(let i = 0; i < this.lrcArr.length; i ++){
                if((this.lrcArr[i][0] == parseInt(this.mp3.currentTime)) && this.lrcArr[i][1]){
                    $('#'+this.lrcArr[i][0]).addClass('white').siblings().removeClass('white');
                    if(i > 1 && i < this.lrcArr.length - 1){
                        this.count += 1;
                        $('.play_iner').css({'transform':`translateY(-${(i-1)*this.pHeight}px)`});
                    }
                    break;
                }
            }
            var pc = parseInt(this.mp3.currentTime/this.mp3.duration*100);
            $('#range input').val(pc);
            $('.etime').text(parseInt(this.mp3.duration/60)+':'+parseInt(this.mp3.duration)%60);
            $('.stime').text(parseInt(this.mp3.currentTime/60)+':'+(this.mp3.currentTime%60<10?'0':'')+parseInt(this.mp3.currentTime)%60)
            if(parseInt(this.mp3.duration) == parseInt(this.mp3.currentTime)){
                this.stop();
                this.initData();
                console.log('stop')
            }
        },1000)
    }

    this.stop = function(){
        clearInterval(timer);
        clearInterval(update);
    }

    this.listenChange = function(){
        var self = this;
        $('#range input').change(function(){
            self.mp3.currentTime = $(this).val()/100*self.mp3.duration;
        })
    }

    this.createLrc = function(){
        var self = this;
        var lrcArr = this.lyric.replace(/(↵|\s)/gm,'');
        lrcArr = lrcArr.split('[');
        // console.log(lrcArr);
        lrcArr.shift();
        lrcArr.forEach(function(obj,i){
            var single = obj.split(']'),
                time = single[0].split(':');
            time = time[0]*60 + Math.floor(time[1]);
            if(single[1]){
                var p = $('<p />').attr('id',time).text(single[1]);
                $('.play_iner').append(p);
                self.lrcArr.push([time,single[1]]);
            }
        })
    }

    this.createUI = function(){
        var self = this;
        var screenWidth = $(window).width();
        this.pHeight = screenWidth>=375?32:26;
        var box = $('<div />').addClass('play_wrap')
                          .append($('<div />').addClass('play_bg').css('background-image',`url(${this.bg})`))
                          .append(
                              $('<div />').addClass('play_template')
                                          .append($('<div />').addClass('play_disc')
                                                              .append(
                                                                  $('<div />').addClass('play_turn')
                                                                              .append($('<div />').addClass('play_poster').append($('<img />').attr('src',this.post)))
                                                                              .append($('<div />').addClass('play_light'))
                                                                              .on('click',function(){
                                                                                  self.play();
                                                                                })
                                                                )
                                                               .append($('<span />').addClass('play_btn')
                                                                                    .on('click',function(){
                                                                                            $('.play_turn').trigger('click')
                                                                                        })
                                                                )
                                )
                          )
                          .append(
                              $('<div />').addClass('play_info')
                                          .append(
                                              $('<h2 />').addClass('play_title')
                                                         .append($('<span />').addClass('play_sname').text(this.info.title))
                                                         .append($('<span />').addClass('play_gap').text('-'))
                                                         .append($('<span />').addClass('play_auth').text(this.info.singer))
                                          )
                                          .append(
                                              $('<div />').addClass('play_lrcwrap')
                                                          .append(
                                                              $('<div />').addClass('play_lrc').css({'height': screenWidth>=375?'96px':'78px'})
                                                                          .append(
                                                                              $('<div />').addClass('play_iner')
                                                                          )
                                                          )
                                          )
                          )
                          .append(
                              $('<div />').addClass('mui-input-row mui-input-range').attr('id','range')
                                          .append($('<em />').text('0:00').addClass('stime'))
                                          .append($('<input />').attr({'type':'range','min':0,'max':100,'value':0}))
                                          .append($('<em />').text('0:00').addClass('etime'))                                          
                          )
                          .append($('<audio />').attr({'src':this.src,'id':'mp3'}))
        $('body').append(box);
        this.mp3 = document.getElementById('mp3');
        this.createLrc();    
        this.initData();   
        this.listenChange();                                                           
    }

}