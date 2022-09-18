
$(function () {
    // VARIABLES
    var $arrowDown = $(".product-info #down-arrow");
    var $imgList = $(".product-img-list");
    let n = 25;
    let setTimer;
    let setTimer2;
    let setTimer3;
    let notScroll = false;
    let $imgHeight = $(".product-img-list ul li").height();
    let $imgConHeight = $(".product-img-list ul").height();
    let $prodName = $(".product-info .Ts-product");
    let stopPoint = 0;
    let $footer = $("footer");
    let $firstButton = $("main .product-info .product-order #order-now");
    let $secondButton = $("main .product-info .product-order #product-inv");
    let $productInfo = $("main .product-info");
    let $productP = $("main .product-info p");

    // FUNCTIONS
    function nextImg(ImgScrll, ImgHeight){
        $imgList.animate({
            scrollTop: (Math.floor((ImgScrll)/$imgHeight) * ImgHeight)
        },0);
    }

    function scrllHtml(num){
        $imgList.animate({
            scrollTop: $imgList.scrollTop() + num
        }, 0);
    }

    function wheelEvent(e){
        notScroll = true;
        clearTimeout(setTimer3)
        clearTimeout(setTimer);
        if(e.originalEvent.wheelDelta > 0){
            scrllHtml(-n);
            setTimer = setTimeout(function(){
                nextImg($imgList.scrollTop(), $imgHeight);
            }, 500);
            setTimer3 = setTimeout(function(){
                notScroll = false;
            }, 600);
        }
        else{
            scrllHtml(n);
            setTimer = setTimeout(function(){
                nextImg(-$imgList.scrollTop(), -$imgHeight);
            }, 500);
            setTimer3 = setTimeout(function(){
                notScroll = false;
            }, 600);
            
        }
    }

    // EVENTS
    $(window).on('beforeunload', function(){
        $(window).scrollTop(0);
        });

    $("html, body").on("wheel", wheelEvent);
    
    $imgList.scroll(function(e){
        clearTimeout(setTimer2);
        let imgNum = Math.floor(($imgList.scrollTop())/$imgHeight)+1;
        let imgNumFloat = $imgList.scrollTop()/$imgHeight+1;
        let $img = $(`#img${imgNum}`);
        let $imgOffset = -$img.offset().top;

        if(imgNumFloat <= 6.5){
            $firstButton.html("CUSTOM ORDER");
            $secondButton.html("EXISTING INVENTORY").show();
            $productP.html('Order Online for <a href="#">Touchless Delivery</a>').show();
            $footer.hide();

            if(imgNumFloat > 4.5){
                $firstButton.html("ORDER NOW");
                $secondButton.html("LEARN MORE");
                if(imgNumFloat <= 5.5 && imgNumFloat > 4.5){
                    $productP.html('Lowest Cost Solar Panels in America');
                }
                else{
                    $productP.html('Produce Clean Energy From Your Roof').show();
                }
            }
        }
        else{
            $firstButton.html("SHOP NOW");
            $secondButton.hide();
            $productP.hide();
            $footer.show();
        }
        
        $prodName.html($img.attr("data-id")); 

        if($imgList.scrollTop() > $imgHeight*.2){
            $arrowDown.fadeOut(100);
            if($imgOffset >= $imgHeight/2){
                $prodName.html($img.next().attr("data-id"));
            }
        }
        else{
            $arrowDown.fadeIn(100);
            
        }

        if(notScroll == false){
            console.log(imgNumFloat - imgNum)
            setTimer2 = setTimeout(function(){
                $imgList.mouseup(function () { 
                    if(imgNumFloat - imgNum >= 0.6){
                        $imgList.animate({
                            scrollTop: $imgHeight * imgNum
                        },0);
                    }
                    else if(imgNumFloat - imgNum < 0.6){
                        $imgList.animate({
                            scrollTop: $imgHeight * (imgNum-1)
                        }, 0);
                    }
                });
            }, 100);
        }

        if(stopPoint > $imgList.scrollTop()){ // Scroll Up
            if (imgNumFloat - imgNum < 0.7 && imgNumFloat - imgNum > 0.15){
                $productInfo.css({"opacity": "+=0.05"});
                if(imgNumFloat - imgNum > 0.4){
                    $productInfo.css({"opacity": "0"});
                }
            }
            else{
                $productInfo.css({"opacity": "-=0.05"});
                if(imgNumFloat - imgNum < 0.15){
                    $productInfo.css({"opacity": "1"});
                }
            }

        }
        else{ // Scroll Down
            if (imgNumFloat - imgNum < 0.7 && imgNumFloat - imgNum > 0.15){
                $productInfo.css({"opacity": "-=0.05"});
                if(imgNumFloat - imgNum > 0.4){
                    $productInfo.css({"opacity": "0"});
                }
            }
            else {
                $productInfo.css({"opacity": "+=0.05"});
                if(imgNumFloat - imgNum < 0.15){
                    $productInfo.css({"opacity": "1"});
                }
            }
        }
        stopPoint = $imgList.scrollTop();
    });

    $arrowDown.on("click", function(){
        $imgList.animate({
            scrollTop: $imgHeight
        }, 0);
        $arrowDown.hide()
    });

    $("html").keydown(function (e) { 
        notScroll = true;
        if(e.keyCode == 38){
            $imgList.animate({
                scrollTop: Math.floor((-$imgList.scrollTop())/$imgHeight+1) * -$imgHeight
            }, 0);
        }
        else if(e.keyCode == 40){
            $imgList.animate({
                scrollTop: Math.floor(($imgList.scrollTop())/$imgHeight+1) * $imgHeight
            }, 0);
        }
        return false; // return false is the combination of preventDefault() and stopPropagation()
    });
});


