function Clock(width,height){
    this.width = width;
    this.height = height;
    this.init = function(){
        var canvas = document.createElement('canvas');
        this.canvas = canvas;
        canvas.width = this.width;
        canvas.height = this.height;
        this.ctx = canvas.getContext('2d');
        document.body.appendChild(canvas);

        // this.drawBg();
        this.timer();
    }

    //绘制背景
    this.drawBg = function(){
        //外部黑色边框
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 6;
        this.ctx.arc(this.width/2,this.height/2,this.width/2-3,0,2*Math.PI,false);
        this.ctx.stroke();
        //内部灰色内框
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#ccc';
        this.ctx.lineWidth = 2;
        this.ctx.arc(this.width/2,this.height/2,this.width/2-15,0,2*Math.PI,false);
        this.ctx.stroke();
        this.ctx.translate(this.width/2,this.height/2);
        //内部时刻圆点
        for(var i = 0; i < 60; i ++){
            var deg = 2*Math.PI/60*i;
            this.ctx.beginPath();
            this.ctx.fillStyle = '#ccc';
            if(i % 5 == 0){
                this.ctx.fillStyle = '#000';
            }
            this.ctx.arc((this.width/2-17)*Math.cos(deg),(this.width/2-17)*Math.sin(deg),2,0,2*Math.PI,false);
            this.ctx.fill();
        }
        //时刻数字
        for(var i = 0; i < 12; i ++){
            var deg = 2 * Math.PI / 12 * i - Math.PI/3;
            this.ctx.font = '20px Arial';
            this.ctx.fillStyle = '#333';
            this.ctx.textBaseline = 'middle';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(i+1,(this.width/2-30)*Math.cos(deg),(this.width/2-30)*Math.sin(deg));
        }

        // this.hour(11,29);
        // this.minute(29,50);
        // this.second(50);
        // this.point();
    }

    //绘制时针
    this.hour = function(h,m){
        this.ctx.save();
        this.ctx.beginPath();
        var degH = 2 * Math.PI / 12 * h,
            degM = 2 * Math.PI / 12 * m / 60;
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = '#333';
        this.ctx.rotate(degM+degH-Math.PI/2);
        this.ctx.lineCap = 'round';
        this.ctx.moveTo(-10,0);
        this.ctx.lineTo(55,0);
        this.ctx.stroke();
        this.ctx.restore();
    }
    
    //绘制分针
    this.minute = function(m,s){
        this.ctx.save();
        this.ctx.beginPath();
        var degM = 2 * Math.PI / 60 * m,
            degS = 2 * Math.PI / 60 * s / 60;
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = '#666';
        this.ctx.rotate(degM+degS-Math.PI/2);
        this.ctx.lineCap = 'round';
        this.ctx.moveTo(-13,0);
        this.ctx.lineTo(70,0);
        this.ctx.stroke();
        this.ctx.restore();
    }

    //绘制秒针
    this.second = function(s){
        this.ctx.save();
        this.ctx.beginPath();
        var degS = 2 * Math.PI / 60 * s;
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#f00';
        this.ctx.rotate(degS-Math.PI/2);
        this.ctx.lineCap = 'round';
        this.ctx.moveTo(-18,0);
        this.ctx.lineTo(90,0);
        this.ctx.stroke();
        this.ctx.restore();
    }

    //绘制中心点
    this.point = function(){
        this.ctx.save();
        this.ctx.fillStyle = '#fff';
        this.ctx.beginPath();
        this.ctx.arc(0,0,3,0,2*Math.PI,false);
        this.ctx.fill();       
        this.ctx.restore();
    }

    this.timer = function(){
        var self = this;
        // var timer = setTimeout(function(){
        //     self.ctx.clearRect(0,0,self.width,self.height);
        //     var date = new Date();
        //     var h = date.getHours(),
        //         m = date.getMinutes(),
        //         s = date.getSeconds();
        //     self.hour(h,m);
        //     self.minute(m,s);
        //     self.second(s);
        // },1000)

        function timeout(){
            // self.ctx.save();
            self.ctx.clearRect(0,0,self.width,self.height);
            

            var date = new Date();
            var h = date.getHours(),
                m = date.getMinutes(),
                s = date.getSeconds();
            self.drawBg();
            self.hour(h,m);
            self.minute(m,s);
            self.second(s);
            self.point();
            self.ctx.restore();
            setTimeout(timeout,1000)
        }

        timeout();
    }
}