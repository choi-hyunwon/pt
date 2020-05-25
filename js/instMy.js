// 포토티켓
// 작성일 : 2020.04.20
// 작성자 : 이주연
var front = (function () {

    var event = {};

    event._popPassCardDetail = function(popupId, _btn) {
        jQuery(_btn).on('click', function () {  // 포토티켓 패스카드 클릭시 팝업 활성화
            jQuery(popupId).addClass('active');
            jQuery("body").addClass("scrlOff").removeClass('scrlOn');
        })
        jQuery('._closePopup').on('click', function () { // x 아이콘 클릭시 화면 닫히는 기능
            jQuery(popupId).removeClass('active');
            jQuery("body").addClass("scrlOn").removeClass('scrlOff');
        })
        jQuery('.popup_dim').on('click', function () { //dim화면 클릭시 화면 닫히는 기능
            jQuery(popupId).removeClass('active');
            jQuery("body").addClass("scrlOn").removeClass('scrlOff');
        })
    }

    event._commonHandlers = function () {

        /* [S] 사이트맵 */
        window.siteMapFn = siteMapFn;

        function siteMapFn() {
            jQuery('#headerTitle').siblings('#siteMap').show();
            jQuery('#fogbg').show();
            jQuery("body").addClass("scrlOff");
        }

        window.close_sitemapFn = close_sitemapFn;
        function close_sitemapFn() {
            jQuery('#fogbg').hide();
            jQuery('#headerTitle').siblings('#siteMap').hide();
            jQuery("body").removeClass("scrlOff");
        }
        /* [E] 사이트맵 */

        // _payState 클릭 이벤트
        jQuery('._payState').on('click', function () {
            jQuery(this).hasClass('active') ? '' : jQuery(this).addClass('active').siblings().removeClass('active');
        });

        /* [S] 조건검색레이어 팝업 */

        // 조회기간 클릭 이벤트 다중처리 X
        jQuery('._dayClick').on('click', function () {
            if (jQuery(this).hasClass('active')) {
                jQuery(this).siblings().removeClass('active');
                jQuery('._inputDate').attr('disabled', true);
            } else {
                jQuery(this).addClass('active').siblings().removeClass('active');
                jQuery('._inputDate').attr('disabled', true);
            }
        });

        // 조회기간 활성화/비활성화
        jQuery('._direct').on('click', function () {
            if (jQuery(this).hasClass('active')) {
                jQuery(this).siblings().removeClass('active');
                jQuery('._inputDate').attr('disabled', false);
            } else {
                jQuery(this).addClass('active').siblings().removeClass('active');
                jQuery('._inputDate').attr('disabled', false);
            }
        });

        //조회기간 - 초기값
        var _today        = moment().format('YYYY-MM-DD');
        var _prevMovieDay = moment().add(-7, 'days').format('YYYY-MM-DD');

        jQuery("#startDt").val(_prevMovieDay);
        jQuery("#endDt").val(_today);

        //조회기간 - 7일 선택시
        jQuery("#btn_seven_days").on("click", function() {
            var _today        = moment().format('YYYY-MM-DD');
            var _prevMovieDay = moment().add(-7, 'days').format('YYYY-MM-DD');

            jQuery("#startDt").val(_prevMovieDay);
            jQuery("#endDt").val(_today);
        });

        //조회기간 - 1개월 선택시
        jQuery("#btn_one_month").on("click", function() {
            var _today        = moment().format('YYYY-MM-DD');
            var _prevMovieDay = moment().add(-1, 'months').format('YYYY-MM-DD');

            jQuery("#startDt").val(_prevMovieDay);
            jQuery("#endDt").val(_today);
        });

        //조회기간 - 3개월 선택시
        jQuery("#btn_three_month").on("click", function() {
            var _today        = moment().format('YYYY-MM-DD');
            var _prevMovieDay = moment().add(-3, 'months').format('YYYY-MM-DD');

            jQuery("#startDt").val(_prevMovieDay);
            jQuery("#endDt").val(_today);
        });

        //조회기간 - 6개월 선택시
        jQuery("#btn_six_month").on("click", function() {
            var _today        = moment().format('YYYY-MM-DD');
            var _prevMovieDay = moment().add(-6, 'months').format('YYYY-MM-DD');

            jQuery("#startDt").val(_prevMovieDay);
            jQuery("#endDt").val(_today);
        });

        /* [E] 조건검색레이어 팝업 */

        /* [S] 포토티켓 패스카드 등록 안내 팝업 */
        jQuery('._alertPassCardInfo').on('click', function () {
            jQuery('#popPassCard').addClass('active');
        })
        /* [E] 포토티켓 패스카드 등록 안내 팝업 */

        // alert
        window.alertMessage = alertMessage;
        function alertMessage() {
            dimed();
        }

        //팝업 dim
        window.dimed = dimed;

        function dimed() {
            if (jQuery('#fogbg').hasClass('active')) {
                jQuery('#fogbg').hide();
            } else {
                jQuery('#fogbg').show();
            }
        }

    }
    /* [S] 팝업 */
    jQuery(function($){
        /* S 팝업
            1. property 'data-popup-direction' 값에 따라 애니메이션 다름
                - UP	: bottom -> top
                - DOWN	: top -> bottom
                - RIGHT : left -> right
                - DOWN	: right -> left
         */
        $.setClosePopup = function(_target, _popupDir){

            switch(_popupDir){
                case 'UP':
                case 'RIGHT':
                case 'DOWN':
                case 'LEFT':
                    _target.children('.popup').animate({
                        bottom:'-100%'
                    }, 300 );
                    break;

                case 'CENTER':
                default :
                    break;
            }

            _target.animate({
                opacity: '0'
            }, 300, function(){
                $(this).css({'top':'-100%'});
                if($(this).data('popupDepth') == undefined || $(this).data('popupDepth') == null){
                    $("body").removeClass("scrlOff");
                }
            });
        };
        //popup open
        $('[data-popup]').on('click', function (){

            var popupTarget = $(this).data('popup') || null;
            var popupDir = $(this).data('popupDirection') || null;
            var popupDepth = $(this).data('popupDepth') || null;


            // console.log('popup OPEN', popupTarget, popupDir);

            $('#' + popupTarget).css({'top':'0'});
            $('#' + popupTarget).attr('data-popup-direction', popupDir);

            switch(popupDir){
                case 'UP':
                    $('#' + popupTarget).children('.popup').css({'top':'auto', 'right':'auto', 'bottom':'-100vh', 'left':'auto'});
                    $('#' + popupTarget).children('.popup').stop().animate({
                        bottom:'0'
                    }, 300 );
                    break;
                case 'RIGHT':
                    $('#' + popupTarget).children('.popup').css({'top':'auto', 'right':'auto', 'bottom':'auto', 'left':'-100vw'});
                    $('#' + popupTarget).children('.popup').animate({
                        left:'0'
                    }, 300 );
                    break;
                case 'DOWN':
                    $('#' + popupTarget).children('.popup').css({'top':'-100vh', 'right':'auto', 'bottom':'auto', 'left':'auto'});
                    $('#' + popupTarget).children('.popup').animate({
                        top:'0'
                    }, 300 );
                    break;
                case 'LEFT':
                    $('#' + popupTarget).children('.popup').css({'top':'auto', 'right':'-100vw', 'bottom':'auto', 'left':'auto'});
                    $('#' + popupTarget).children('.popup').animate({
                        right:'0'
                    }, 300 );
                    break;
                case 'CENTER':
                default :
                    break;
            }

            if(popupDepth != null){	// 2Depth 이상 처리를 위한 값 세팅
                $('#' + popupTarget).attr('data-popup-depth', popupDepth);
            }

            $('#' + popupTarget).show().animate({
                opacity: '1'
            }, 300, function(){
                $("body").addClass("scrlOff");
            } );

        });

        // popup close
        $('.popup_dim').find('.btn_close, .btnPopClose').on('click',function(e){
            e.stopPropagation();

            var $target = jQuery(this).closest('.popup_dim');
            var popupDir = $target.attr('data-popup-direction');

            $.setClosePopup($target, popupDir);
        });


        $('.popup_dim').on('click', function(e){
            // console.log("console.log('popup DIM CLOSE');");

            if(e.currentTarget === e.target){	// console.log("DIM 영역");
                var popupDir = $(this).attr('data-popup-direction');
                $.setClosePopup($(this), popupDir);
            }else{	//	console.log("DIM 이외 영역");
            }
        });
        /* E 팝업 */

        $('.tabSortMenu').on({
            click:function(e){
                e.stopPropagation();
                var _target = e.target;
                var_tagName = _target.tagName;

                if(var_tagName == 'A'){
                    $(_target).parent().addClass('active').siblings().removeClass('active');

                    var _property = $(_target).data('fn') || null;
                    console.log(_property)

                    if(_property != null){
                        if(typeof $.fn[_property] == 'function'){
                            $.fn[property]();
                        }else{
                            // console.log('jQuery.fn.' + _property + ' 함수를 선언하세요');
                        }
                    }else{
                        // console.log('data-fn 에 실행할 함수명을 선언하세요');
                    }
                }
            }
        });

    });
    /* [E] 팝업 */

    /**
     * [S] m.cgv 가져온 함수
     */
    function popLayerHasTopShowHide(_btn, _popLayer, _fogBg, _screenId) {
        var jQuerybtn = jQuery('.' + _btn);
        var jQuerypopLayer = jQuery('.' + _popLayer);
        var jQueryfogBg = jQuery('.' + _fogBg);
        var _isFogBg = jQueryfogBg.is(':visible');

        //jQuerybtn.off('click');
        jQuerybtn.on({
            click: function () {
                jQueryfogBg.css({'opacity': '.8', 'top': '0'});
                jQuerypopLayer.find('input[type="password"]').focus();
                if (_btn == 'btnComCGVReg') {
                    jQuerypopLayer.off('click');
                    jQuerypopLayer.on({
                        click: function (e) {
                            if (jQuery(e.target).hasClass(_popLayer) || jQuery(e.target).hasClass('popComCGVRegTxtWrap')) {
                                jQuery('.btnPopClose').trigger('click');
                            }
                        }
                    });
                }
                //기프트콘
                if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY012") {
                    CGVHAAppInterface.SetNavigationBar('CGV 기프트콘(영화관람권) 등록', '|' + encodeURIComponent(getNavigationIconUrl('icon_close')) + '||12|jQuery(\'.' + _popLayer + '\').trigger(\'click\');|', '|||||', '|||||', '|||||');
                } else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY007") {
                    CGVHAAppInterface.SetNavigationBar('CGV 할인쿠폰 등록', '|' + encodeURIComponent(getNavigationIconUrl('icon_close')) + '||12|jQuery(\'.' + _popLayer + '\').trigger(\'click\');|', '|||||', '|||||', '|||||');
                } else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY010") {
                    CGVHAAppInterface.SetNavigationBar('CGV 영화관람권 등록', '|' + encodeURIComponent(getNavigationIconUrl('icon_close')) + '||12|jQuery(\'.' + _popLayer + '\').trigger(\'click\');|', '|||||', '|||||', '|||||');
                } else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY016") {
                    CGVHAAppInterface.SetNavigationBar('CGV 무비패스카드 등록', '|' + encodeURIComponent(getNavigationIconUrl('icon_close')) + '||12|jQuery(\'.' + _popLayer + '\').trigger(\'click\');|', '|||||', '|||||', '|||||');
                }

                popLayerHasTopBgShowHide(jQueryfogBg, jQuerypopLayer, _isFogBg, _screenId);
            }
        });
    }

    function popLayerHasTopBgShowHide(_target, _contentTarget, _is, _screenId) {    // pop dim
        if (!_is) {
            jQuery('html, body').css({'overflow': 'hidden', 'position': 'relative', 'width': '100%', 'height': '100%'});
            _contentTarget.show().stop().animate({'top': '0'}, 200, function () {
                _contentTarget.siblings("div:not('.popFogBg')").hide()
                _contentTarget.find('input[type=text]').focus();
                // 안드로이드 상위버전 정상(5.1.1/7.0), 하위버전 포커스만 이뤄짐(4.1.2/4.4.2), ios 정책상 키패드및 포커스 안됨
            });
            _target.show().on({
                click: function () {
                    _contentTarget.show().stop().animate({'top': '150%'}, 200, function () {
                        jQuery('html, body').css({
                            'overflow': 'visible',
                            'position': 'static',
                            'width': 'auto',
                            'height': 'auto'
                        });
                        _target.hide();

                        //기프트콘
                        if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY012") {
                            basicNavigation(1, '기프트콘', '');
                        } else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY007") {
                            basicNavigation(1, '쿠폰함', '');
                        } else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY010") {
                            basicNavigation(1, '영화관람권', '');
                        } else if (cgv.common.StandardInfo.IsWebView && typeof _screenId !== "undefined" && _screenId === "MY016") {
                            basicNavigation(1, '무비패스카드', '');
                        }
                    });
                }
            }, function () {
                _target.off('click');
            });

            jQuery('.btnPopClose').on({
                click: function () {
                    _target.trigger('click');
                }
            });
        } else {
            _contentTarget.show().stop().animate({'top': '150%'}, 200, function () {
                fnFixedScroll(false);
                _target.hide();
            });
            jQuery('.btnPopClose').off('click');
        }
    }

    this.fnPopLayerShowHide = function (_btn, _popLayer, _fogBg, _isInit) {
        var jQuerypopLayer = jQuery('.' + _popLayer);
        var jQueryfogBg = jQuery('.' + _fogBg);
        var _isFogBg = jQueryfogBg.is(':visible');

        if (_btn == "") {
            if (_isInit) {
                jQueryfogBg.css({'opacity': '.5', 'top': '0'});
                popLayerBgShowHide(jQueryfogBg, jQuerypopLayer, _isFogBg);
            }

        } else {
            var jQuerybtn = jQuery('.' + _btn);

            if (_isInit) {
                jQueryfogBg.css({'opacity': '.5', 'top': '0'});
                popLayerBgShowHide(jQueryfogBg, jQuerypopLayer, _isFogBg);
            } else {
                jQuerypopLayer.siblings("div:not('.popFogBg')").hide();
                jQuerybtn.off('click');
                jQuerybtn.on({
                    click: function () {
                        jQueryfogBg.css({'opacity': '.5', 'top': '0'});
                        popLayerBgShowHide(jQueryfogBg, jQuerypopLayer, _isFogBg);
                    }
                });
            }
        }
    }

    function popLayerShowHide(_btn, _popLayer, _fogBg) {
        var jQuerybtn = jQuery('.' + _btn);
        var jQuerypopLayer = jQuery('.' + _popLayer);
        var jQueryfogBg = jQuery('.' + _fogBg);
        var _isFogBg = jQueryfogBg.is(':visible');
        jQuerypopLayer.siblings("div:not('.popFogBg')").hide();
        jQuerybtn.off('click');
        jQuerybtn.on({
            click: function () {
                jQueryfogBg.css({'opacity': '.5', 'top': '0'});
                popLayerBgShowHide(jQueryfogBg, jQuerypopLayer, _isFogBg);
            }
        });
    }

    function popLayerSeatShowHide(_btn, _popLayer, _fogBg) {
        var jQuerybtn = jQuery('.' + _btn);
        var jQuerypopLayer = jQuery('.' + _popLayer);
        var jQueryfogBg = jQuery('.' + _fogBg);
        var _isFogBg = jQueryfogBg.is(':visible');

        jQuerybtn.off('click');
        jQuerybtn.on({
            click: function () {
                console.log(jQuerybtn.attr('data-is-event') == 'true')
                if (jQuerybtn.attr('data-is-event') == 'true') {

                    jQuerypopLayer.siblings("div:not('.popFogBg')").hide();
                    jQueryfogBg.css({'opacity': '.5', 'top': '0'});
                    popLayerBgShowHide(jQueryfogBg, jQuerypopLayer, _isFogBg);
                }
            }
        });
    }

    function popLayerBgShowHide(_target, _contentTarget, _is) {    // pop dim
        if (!_is) {
            fnFixedScroll(true);
            _contentTarget.show().stop().animate({'bottom': '0'}, 200);
            setTimeout(function () {
                jQuery('.popLayerHeader').find('a:first').focus();
            }, 0);
            _target.show().on({
                click: function () {
                    _contentTarget.stop().animate({'bottom': '-100%'}, 200, function () {
                        fnFixedScroll(false);
                        _target.hide();
                        _contentTarget.hide();
                        jQuery("#startDt").val(""); // 2020.05.15 추가(개발)
                        jQuery("#endDt").val("");  // 2020.05.15 추가(개발)
                    });
                }
            }, function () {
                _target.off('click');
            });

            jQuery('.btnPopClose').on({
                click: function () {
                    _contentTarget.find('.popLayerFooter').off('focusout');
                    jQuery('.btnPopClose').off('focusout');
                    _target.trigger('click');
                    setTimeout(function () {
                        jQuery('.btnLayerPop').focus();
                    }, 0);
                },
                focusout: function () {
                    setTimeout(function () {
                        if (!(jQuery(':focus').parents().hasClass('popLayer'))) {
                            jQuery('.btnPopConfirm').focus();
                        }
                    }, 0);
                }
            });

            _contentTarget.find('.popLayerFooter').on({
                focusout: function () {
                    setTimeout(function () {
                        if (!(jQuery(':focus').parents().hasClass('popLayer'))) {
                            jQuery('.btnPopClose').focus();
                        }
                    }, 0);
                }
            });
        } else {
            try {
                _contentTarget.stop().animate({'bottom': '-100%'}, 200, function () {
                    fnFixedScroll(false);
                    _target.hide();
                    _contentTarget.hide();
                });
            } catch {
            }
            jQuery('.btnPopClose').off('click');
        }
    }

    function popLayerFadeShowHide(_btn, _popLayer, _fogBg) {
        var jQuerybtn = jQuery('.' + _btn);
        var jQuerypopLayer = jQuery('.' + _popLayer);
        var jQueryfogBg = jQuery('.' + _fogBg);
        var _isFogBg = jQueryfogBg.is(':visible');

        if (!_isFogBg) {
            fnFixedScroll(true);
            jQuerypopLayer.show();
            jQueryfogBg.show().on({
                click: function () {
                    fnFixedScroll(false);
                    jQueryfogBg.hide();
                    jQuerypopLayer.hide();
                    jQuerypopLayer.parent().css({'top': '100%', 'background-color': '#000'});
                }
            });
            jQuerypopLayer.parent().css({'top': '0', 'background-color': 'transparent'});

            jQuery('.btnPopClose').on({
                click: function () {
                    jQuerybtn.trigger('click');
                }
            });

        } else {
            fnFixedScroll(false);
            jQueryfogBg.hide();
            jQuerypopLayer.hide();
            jQuerypopLayer.parent().css({'top': '100%', 'background-color': '#000'});
            jQuery('.btnPopClose').off('click');
        }
    }

    function fnFixedScroll(_is) {
        if (_is) {
            //currentScroll = jQuery(this).scrollTop();
            jQuery('body').addClass('scrlOff');
            //            jQuery(window).bind('scroll').scroll(function(e){jQuery(this).scrollTop(top).scrollLeft(left);e.preventDefault();e.stopPropagation();});
        } else {
            jQuery('body').removeClass('scrlOff');
            //jQuery('body').css({'top':'auto'});
            //            jQuery(window).unbind('scroll');
        }
        //jQuery('body').css({'top':(-1 * currentScroll) + 'px'});
    }

    function comma(num){
        var len, point, str;

        num = num + "";
        point = num.length % 3 ;
        len = num.length;

        str = num.substring(0, point);
        while (point < len) {
            if (str != "") str += ",";
            str += num.substring(point, point + 3);
            point += 3;
        }

        return str;

    }
    /**
     * [E] m.cgv 가져온 함수
     */

    var init = function () {
        // event
        event._commonHandlers();

    };

    return {
        init,
        event,
    };
})();

jQuery(function () {
    front.init();
});

