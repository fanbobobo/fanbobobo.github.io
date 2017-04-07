;(function($){
	var Carousel = function(poster){
		var _this = this;
		this.poster = poster;
		this.rotateFlag = true;

		this.posterItemMain = this.poster.find("ul.pictureslist");
		this.btns = this.poster.find("div.arrow");
		this.preBtn = this.poster.find("div.arrow_pre");
		this.aftBtn = this.poster.find("div.arrow_aft");
		this.posterItems = this.posterItemMain.find("li.picshow");
		this.posterFirstItem = this.posterItems.first();
		this.posterLastItem = this.posterItems.last();

		this.setting = {
			"width":800,
			"height":270,
			"posterWidth":640,
			"posterHeight":270,
			"scale":0.9,
			"speed":500,
			"autoplay":true,
			"delay":2000,
			"verticalAlign":"bottom"
		}

		$.extend(this.setting, this.getSettingValue());
		console.log(this.setting);
		this.setSettingValue();
		this.setOthersValue();

		this.preBtn.click(function(){
			if(_this.rotateFlag){
				_this.rotateFlag = false;
				_this.posterRotate("left")
			}
		});
		this.aftBtn.click(function(){
			if(_this.rotateFlag){
				_this.rotateFlag = false;
				_this.posterRotate("right")
			}
		});

		if(this.setting.autoplay){
			this.autoplay();

			this.poster.hover(function(){
				window.clearInterval(_this.timer);
			},function(){
				_this.autoplay();
			})
		};

	};
	Carousel.prototype = {
		autoplay:function(){
			var _self = this;
			this.timer = window.setInterval(function(){
				_self.preBtn.click()
			},this.setting.delay)
		},
		posterRotate:function(dir){
			if(dir === "left"){
				var _this = this;
				var zIndexArr = [];
				this.posterItems.each(function(){
					var sel = $(this),
						next = sel.next().get(0)?sel.next():_this.posterFirstItem,
						width = next.width(),
						height = next.height(),
						zIndex = next.css("zIndex"),
						left = next.css("left"),
						top = next.css("top"),
						opacity = next.css("opacity");
						zIndexArr.push(zIndex);
						sel.animate({
							width:width,
							height:height,
							left:left,
							top:top,
							opacity:opacity
						},_this.setting.speed,function(){
							_this.rotateFlag = true;
						});
				});
				this.posterItems.each(function(i){
						$(this).css("zIndex", zIndexArr[i]);
					   });
			}else if(dir === "right"){
				var _this = this;
				var zIndexArr = [];
				this.posterItems.each(function(){
					var sel = $(this),
						prev = sel.prev().get(0)?sel.prev():_this.posterLastItem,
						width = prev.width(),
						height = prev.height(),
						zIndex = prev.css("zIndex"),
						left = prev.css("left"),
						top = prev.css("top"),
						opacity = prev.css("opacity");
						zIndexArr.push(zIndex);
						sel.animate({
							width:width,
							height:height,
							left:left,
							top:top,
							opacity:opacity
						},_this.setting.speed,function(){
							_this.rotateFlag = true;
						});
				});
				this.posterItems.each(function(i){
						$(this).css("zIndex", zIndexArr[i]);
					   });
			}
		},
		setOthersValue:function(){
			var _self = this
			var sliceItems = this.posterItems.slice(1),
				sliceSize = Math.floor(sliceItems.length/2),
				sliceRight = sliceItems.slice(0,sliceSize),
				sliceLeft = sliceItems.slice(sliceSize),
				level = Math.floor(this.posterItems.length/2);

			var rw = this.setting.posterWidth,
				rh = this.setting.posterHeight,
				gap = Math.floor(((this.setting.width-this.setting.posterWidth)/2)/level);

			var firstleft = Math.floor((this.setting.width-this.setting.posterWidth)/2),
				fixOffsetleft = firstleft + rw;
			sliceRight.each(function(i){
				rw = Math.floor(rw*_self.setting.scale);
				rh = Math.floor(rh*_self.setting.scale);
				level--;
				var j = i;

				$(this).css({
					width:rw,
					height:rh,
					zIndex:level,
					opacity:1/(++j),
					left:Math.floor(fixOffsetleft+(++i)*gap-rw),
					top:_self.setVerticalAlign(rh)
				});
			});

			var lw = sliceRight.last().width(),
				lh = sliceRight.last().height(),
				oloop = Math.floor(this.posterItems.length/2);

			sliceLeft.each(function(i){
				$(this).css({
					width:lw,
					height:lh,
					zIndex:i,
					opacity:1/oloop,
					left:Math.floor(gap*i),
					top:_self.setVerticalAlign(lh)
				});
				lw = Math.floor(lw/_self.setting.scale);
				lh = Math.floor(lh/_self.setting.scale);
				oloop--;
			});

		},
		setVerticalAlign:function(h){
			var verticalType = this.setting.verticalAlign,
				top = 0;
			if(verticalType === "middle"){
				top = Math.floor((this.setting.height-this.setting.posterHeight)/2);
			}else if(verticalType === "top"){
				top = 0;
			}else if(verticalType === "bottom"){
				top = Math.floor(this.setting.height-this.setting.posterWidth)
			}else{
				top = Math.floor((this.setting.height-this.setting.posterHeight)/2);
			}
		},
		setSettingValue:function(){
			this.poster.css({
				width:this.setting.width,
				height:this.setting.height
			});
			this.posterItemMain.css({
				width:this.setting.width,
				height:this.setting.height
			});
			var w = Math.floor((this.setting.width-this.setting.posterWidth)/2);
			this.btns.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil(this.posterItems.length/2)
			});
			this.posterFirstItem.css({
				width:this.setting.posterWidth,
				height:this.setting.posterHeight,
				zIndex:Math.floor(this.posterItems.length/2),
				left:w
			})
		},
		getSettingValue:function(){
			var setting = this.poster.attr("data-setting");
			if(setting && setting!=""){
				return JSON.parse(setting);
			}else{
				return {};
			};
		}
	};
	Carousel.init = function(posters){
		var _this = this
		posters.each(function(){
			new _this($(this));
		});
	}
	window['Carousel'] = Carousel;
})(jQuery)