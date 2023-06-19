"use strict";

// const { url } = require('video.js');
const uiCommon = (function (uiCommon, $window, $body) {

    /*** contents ***/
    function init(){
        $('.box-input').length > 0 && input.init();
        $('.box-select').length > 0 && select.init();
        $('.accordian').length > 0 && accordian.init();
        //$('.payment-accordian-card').length > 0 && payAcc.init();
        //$('.payment-list').length > 0 && paymentList.init();
        $('.box-tooltip').length > 0 && tooltip.init();
        $('.date-picker').length > 0 && datepicker.init();
        $('.month-picker').length > 0 && monthpicker.init();
        $(".layer-popup").length > 0 && layer.init();
        $('.full-popup.layer-type').length > 0 && fullPopup.init();
        $('.toggle-layer-popup').length > 0 && layer.togglePopup();
        $('[data-slick]').length > 0 && slickCtrl.setting();
		$('[data-slack]').length > 0 && slickTest.init();
        $('[data-class-toggle]').length > 0 && classToggle.init();
        $('.box-tab').length > 0 && tabSwiper.init();
        $('.box-tab02').length > 0 && tab.init();
        $('.not-allow').length > 0 && allowOpen.init();
        $('select').length > 0 && niceSelect.init();
        $('[data-pop-attr]').length > 0 && windowPopup.init();
		$('.win-pop-wrap').length > 0 && evtViewport.init();
        tab.init();
        header.init();
        slickCtrl.init();
        floating.init();
        evtBind.init();
        checkHtml.init();
        $('button').length > 0 && addRole.role();
    }

	const slickTest ={
		init(){
			this._set();
		},
		_set(){
			this._str = $('.cardList').data().slick;
			// console.log(this._str)
			this._str = JSON.parse("{this._str}")
			// console.log(this._str)
		}
	}

    //header
    const header = {
        init () {
            this.gnb();
            this.topSearch();
            this.totalMenu();
            this.breadCrumb();
        },
        gnb () {
            //gnb
            $("body").on('mouseenter focusin', '#gnb>ul>li>a', function(){
                let gnbH = $(this).siblings('.gnb-depth1').height();
                $("#header").removeClass('search-on').removeAttr('style');
                $("#gnb>ul>li").removeClass('on');
                $("#header").addClass('gnb-on');
                $(this).parent('li').addClass('on');
            });
            $("#gnb").on('mouseleave',function(){
                $("#header").removeClass('gnb-on').removeAttr('style');
                $("#gnb>ul>li").removeClass('on');
            });
        },
        topSearch () {
            //상단검색
            $("#header .top-search").click(function(){
                if($("#header").hasClass('search-on')){
                    $("#header").removeClass('search-on')
                }else{
                    $("#header").addClass('search-on').removeAttr('style');
                }
            });
			$('.header-search .btn-close').click(function(){
				if($("#header").hasClass('search-on')){
                    $("#header").removeClass('search-on')
                }else{
                    $("#header").addClass('search-on').removeAttr('style');
                }
			});
        },
        totalMenu() {
            //전체메뉴
            $("#header .top-menu").click(function(){
                bodyFix.on();
                $(".total-menu").removeClass('off').addClass('on');
            });
            $("#header .total-menu .btn-close").click(function(){
                $(".total-menu").removeClass('on').addClass('off');
                bodyFix.off();
            });

        },
        breadCrumb() {
            //breadcrumb
            $(".breadcrumb>li").mouseenter(function(){
                $(".breadcrumb>li").removeClass('on');
                $(this).addClass('on').find('.breadcrumb-sub').fadeIn(300);
            });
            $(".breadcrumb>li").mouseleave(function(){
                $(".breadcrumb>li").removeClass('on').find('.breadcrumb-sub').fadeOut(300);
            });
        }
    }

	//플로팅 버튼 제어
    const floating = {
        init(){
            this.top();
            this.survey();
            // $('.btn-group.btn-fix').length > 0 && this.button();
            // $('.btn-group.sticky').length > 0 && this.button();
            $('.chat-bot').length > 0 && this.chatbot();
			this.fixBtn();
        },
        top(){
            $('.float-top a').on('click', function(){
                $('html, body').animate({scrollTop : 0}, 300);
            })
        },
        survey(){
            $('.survey-btn01').parent().parent().addClass('survey-wrap survey01');
            $('.survey-btn02').parent().parent().addClass('survey-wrap survey02');
            $('.survey-btn03').parent().parent().addClass('survey-wrap survey03');
            $('.survey-btn04').parent().parent().addClass('survey-wrap survey04');
            $('.survey-wrap').next('iframe').addClass('survey-conts');
			$('.survey-wrap').on('click', function(){
				if($('.product-info').length > 0 && $('.product-info .bottom-layer-pop').length > 0) {
					$('.survey-conts').addClass('survey-product');
				};
			});
        },
        chatbot(){
            zE('messenger', 'close');
            $('body').on('click','.chat-bot .open', () => {
                this.chatbotOpen();
            });
            $('body').on('mouseenter','.chat-bot .open', function(){
                $(this).addClass('on');
            });
            $('body').on('mouseleave','.chat-bot .open', function(){
                $(this).removeClass('on');
            });
            $('body').on('click','.chat-bot .close', () => {
                this.chatbotClose();
            });

        },
        chatbotOpen(){
            $('iframe[title="메시징 창"]').parent('div').addClass('chat-box');
            zE('messenger', 'open');
            $('.chat-bot .open').hide();
            $('.chat-bot .close').css('display', 'block');
			if($('.product-info').length > 0 && $('.product-info .bottom-layer-pop').length > 0) {
				$('.chat-box').addClass('chat-product');
			};
        },
        chatbotClose(){
            zE('messenger', 'close');
            $('.chat-bot .close').hide();
            $('.chat-bot .open').show();
        },
        button(){
            $('.chat-bot').css('bottom', $('.btn-group.btn-fix').height() + 10);
            $('.survey01, .survey02, .survey03, .survey04').css('bottom', $('.btn-group.btn-fix').height() + 75);
        },
		fixBtn() {
			if($('.product-info').length > 0 && $('.product-info .bottom-layer-pop').length > 0) {
				$('.chat-bot').css('bottom', $('.bottom-layer-pop').outerHeight() + 74);
				$('.float-top').css('bottom', $('.bottom-layer-pop').outerHeight() + 10);
				$('.survey-wrap').attr('style', 'bottom:' + ($('.bottom-layer-pop').outerHeight() + 138)+'px' + '!important');
			}
		}
    };

    //slick slider
    const slickCtrl = {
        init(){
            if($('.step-slick').length > 0){
                return;
            }
            $('.slick-default').length > 0 && this.default();
        },
        default(){
            slickSlider.init($('.slick-default'), {
                infinite: true,
                dots: $('.slick-default > *').length > 1 ? true : false,
                arrows: false
            });
        },
        setting(){

            $('[data-slick]').each(function(){
                let $this = $(this),
                    str = $(this).data().slick,
                    strRep = str.replace(/;/gi, ','),
                    option = eval('({' + strRep + '})')

                    if($this.hasClass('ajax') && !checkHtml._check()){
						return;
					}

                slickCtrl.draw($this, option);
				$('.slick-dots > li', $this).length < 2 && $('.slick-dots', $this).remove();

            });

        },
        ajaxSetting($slickObj){

            if($slickObj.hasClass('slick-default')){
                this.default();
            } else {
                let str = $slickObj.data().slick,
                    strRep = str.replace(/;/gi, ','),
                    option = eval('({' + strRep + '})');

                    this.draw($slickObj, option);
            };

        },
        mainPlanSetting(){

            $('.item-payment .slick-payment').each(function(){
                let $this = $(this),
                    str = $(this).data().slick,
                    strRep = str.replace(/;/gi, ','),
                    option = eval('({' + strRep + '})');

                slickCtrl.draw($this, option);
				// 요금제가 2개 미만일시 슬릭 화살표와 드래그 기능 제거
				if($this.find('.slick-slide').length < 3){
					$this.find('.slick-arrow').hide();
					$this.slick('slickSetOption', 'draggable', false);
				};		
            });

        },
        draw($this, option){
				return $this.slick(option);
        },
        // phoneDetail() {
        //     $('.big-thumb-wrap').slick({
        //         asNavFor: '.thumb-slide'
        //     });
        // }
    };

    //slick slider
    const slickSlider = {
        init(obj, option) {
            return obj.not('.slick-initialized').slick(option);
        }
    };

    // class toggle
    const classToggle = {
        init(){
            this.toggle();
        },
        toggle(){
            $('[data-class-toggle]').each(function(i,t){

                let _c = $(this).data().classToggle,
                    _t = $(this).data().classTarget && '.' + $(this).data().classTarget;

                $(t).on('click', function(){
                    $(_t).toggleClass(_c);
                    $(this).toggleClass(_c);
                });

            });
        }
    }

    // Body Scroll Fix(레이어 오픈 시 본 페이지 위치 고정)
    const bodyFix = {
        on() {
            const $wrap = $('#wrap');
            let wScroll = $window.scrollTop();
            $('body').addClass('scrOff').css({ 'top': -wScroll });
        },
        off() {
            let wScroll = Math.abs(parseInt($('body').css('top')));

            $('body').removeClass('scrOff').removeAttr('style');
            $window.scrollTop(wScroll);
        }
    };

    // Toast popup
    const toast = {
        dom: new Object,
        str: new String,
        obj: new Object,
        init(str) {
            this.str = str;
            this.set();
        },
        set(){
            this.dom = `<div class="pop-toast">${this.str}</div>`
            this.draw();
        },
        draw(){
            $body.append(this.dom);
            this.action();
        },
        action(){
            this.obj =  $body.find('.pop-toast');
            setTimeout(() => {
                this.obj.addClass('on');
            }, 10);
            setTimeout(() => {
                this.obj.removeClass('on');
            }, 2000);
            setTimeout(() => {
                this.obj.remove();
            }, 3000);
        }
    };

    const  allowOpen = {
        init(){
            this.allowOpen();
        },
        allowOpen(){
            $('.not-allow-open').on('mouseenter',function(e){
                e.stopPropagation();
                $('.not-allow').stop().fadeIn(150);
            });
            $('.not-allow').on('mouseleave',function(e){
                e.stopPropagation();
                $('.not-allow').stop().fadeOut(150);
            });
        }
    };

   // LAYER POPUP
    const layer = {
        init() {
            $(".layer-popup").attr({ role: "dialog", "aria-hidden": "true"});
            $('[data-popup]').on('click', (e) => this.open(e));
            // $('body').on('click','.popup-close, .btn-close-x', (e) => this.close(e));
            $('body').on('click','.popup-close', (e) => this.close(e));

        },
        open($target) {
            let _id;
            if (typeof ($target) == 'object') {
                _id = '#' + $($target.currentTarget).attr('data-popup');
            } else {
                _id = '#' + $target;
            }

            this.obj = $($target.currentTarget);
            bodyFix.on();

            $(_id).attr({ tabindex: 0, "aria-hidden": "false" })
                .stop().fadeIn()
                .css({'display': 'flex', 'z-index': '101'})
                .addClass('show')
                .focus();
        },
        close($target) {

            if (typeof ($target) == 'object') {
                $($target.currentTarget).closest('.layer-popup')
                    .attr({ tabindex: "", "aria-hidden": "true" })
                    .stop().fadeOut()
                    // .css({'display': 'flex', 'z-index': '101'})
                    .removeClass('show');
            } else {
                $('#' + $target)
                    .attr({ tabindex: "", "aria-hidden": "true" })
                    .stop().fadeOut()
                    // .css({'display': 'flex', 'z-index': '101'})
                    .removeClass('show');
            }
            bodyFix.off();
            this.obj && this.obj.focus();
        },
        togglePopup(){
            const togglePop_wrap = $('.toggle-layer-popup');
            const popupClose = $('.toggle-layer-popup .popup-header .popup-close');
            popupClose.on('click',()=>{
                togglePop_wrap.toggleClass('on');
            });

        }
    };

    // full popup
    const fullPopup = {
        init() {
            $(".full-popup.layer-type").attr({ role: "dialog", "aria-hidden": "true"});
            $('[data-fullPopup]').on('click', (e) => this.open(e));
            // $('body').on('click','.layer-type header > button', (e) => this.close(e));
        },
        open($target) {
            let _id;
            if (typeof ($target) == 'object') {
                _id = '#' + $($target.currentTarget).attr('data-fullPopup');
            } else {
                _id = '#' + $target;
            }

            this.obj = $($target.currentTarget);
            bodyFix.on();

            $(_id).attr({ tabindex: 0, "aria-hidden": "false" })
                .stop().fadeIn()
                .css({'display': 'flex', 'z-index': '101'})
                .addClass('on')
                .focus();
        },
        close($target) {
            if (typeof ($target) == 'object') {
                $($target.currentTarget).closest('.full-popup.layer-type')
                    .attr({ tabindex: "", "aria-hidden": "true" })
                    .stop().fadeOut()
                    .css({'display': 'flex', 'z-index': '101'})
                    .removeClass('on');
            } else {
                $('#' + $target)
                    .attr({ tabindex: "", "aria-hidden": "true" })
                    .stop().fadeOut()
                    .css({'display': 'flex', 'z-index': '101'})
                    .removeClass('on');
            }
            bodyFix.off();
            this.obj && this.obj.focus();
        },
    };

    // System layer
    const systemLayer = {
        type: new String,
        str: new String,
        btn1: new String,
        link1: new String,
        btn2: new String,
        link2: new String,
        str2: new String,
        dom: new Object,
        init(type, str, btn1, link1, btn2, link2, str2){

            this.type = type,
            this.str = str.replace(/\n/gi, '<br>'),
            this.btn1 = btn1 || '확인',
            this.link1 = link1 || 'javascript:;',
            this.btn2 = btn2 || '취소',
            this.link2 = link2 || 'javascript:;',
            // this.str2 = str2.replace(/\n/gi, '<br>') || '';
            str2 != null ? this.str2 = str2.replace(/\n/gi, '<br>') : '';
            this.set();
            this.draw();
            this.close();
        },
        set(){
          this.dom =   `<div id="test-layer01" class="alert-popup">
                            <div class="layer-popup-item">
                                <div class="popup-body">
                                    <strong class="txt-main">
                                        ${this.str}
                                    </strong>
                                    <p class="txt-sub">${this.str2}</p>
                                </div>
                                <div class="popup-footer">
                                    <div class="btn-group">
                                        ${this.type == 'confirm' ?
                                        `<a href="${this.link1}" class="btns w-sm lightgray md-ripples ripples-light close-popup" data-boo="false" role="button">${this.btn1}</a><a href="${this.link2}" class="btns w-sm md-ripples ripples-dark close-popup" data-boo="true" role="button">${this.btn2}</a>` :
                                        `<a href="${this.link1}" class="btns md-ripples ripples-dark close-popup w-sm" role="button">${this.btn1}</a>`}
                                    </div>
                                </div>
                            </div>
                        </div>`
        },
        draw(){
            $body.append(this.dom)
            $body.find('.alert-popup').focus();
        },
        close(){
            $body.on('click', '.close-popup', function(){
                $(this).closest('.alert-popup').remove();
            });
        }
    };

    // nice select
    const niceSelect = {
        init(){
            $('select').niceSelect();
        }
    };

	// 현재 페이자가 html 인지 개발 페이지 인지 체크
    const checkHtml = {
        url :  document.location.href.substring(document.location.href.lastIndexOf('.')+1),
        init(){
            this._check();
        },
        _check(){
            // 퍼블 페이지면 true, 개발페이지면 false
            return this.url.indexOf('html') > -1  ? true : false;
        }
    };

    // input
    const input = {
        init() {
            this.delete();
            this.etc();
            this.fn();
        },
        delete() {
            const $el = $('.box-input'),
                $input = $el.find('.is-delete'),
                $del = $el.find('.ico-delete'),
                $timeTxt = $el.find('.txt-time'),
                $icoEye = $el.find('.ico-eye'),
                $unit = $(this).siblings('.input-unit');

            // input 타이핑 이벤트
            setTimeout(() => {
                $input.on('change keyup', function () {
                    let currentVal = $(this).val(),
                        btn = $(this).siblings('.ico-delete'),
                        $timeTxt = $(this).siblings('.txt-time'),
                        $icoEye = $(this).siblings('.ico-eye'),
                        $unit = $(this).siblings('.input-unit');

                    if ( currentVal !== '' ) {
                        btn.show();
                        $timeTxt.addClass('on');
                        $icoEye.addClass('on');
                        $unit.addClass('on');
                    } else {
                        btn.hide();
                        $timeTxt.removeClass('on');
                        $icoEye.removeClass('on');
                        $unit.removeClass('on');
                    }
                });
            }, 100);

            $del.on('click', function () {
                $(this).hide();
                $(this).siblings().val('').focus();

                $(this).siblings($timeTxt).removeClass('on');
                $(this).siblings($icoEye).removeClass('on');
                $(this).siblings($unit).removeClass('on');
            });

            // document.querySelector('body').addEventListener('click', ({ target }) => {
            //     if (!target.closest('.box-input')) {
            //         $del.hide();
            //         $timeTxt.removeClass('on');
            //     }
            // });
        },
        etc(target01,target02){
            // const etcBtn = $('.etc-btn');
            // const etcInput = $('.etc-input .box-input input');
            // const faxCheck = $('.faxCheck');
            const etcBtn = $(target01),
                etcInput = $(target02),
                etcDisableInput = $('.call-history-appli .etc-input-wrap .box-input input');
            etcBtn.on('click',()=>{
                etcInput.show();
            });
            etcBtn.siblings('li').on('click',()=>{
                etcInput.hide();
            })

            $('.etc-button-01').on('click',()=>{
                etcDisableInput.attr("disabled", false);
            });
            $('.etc-button-01').siblings('li').on('click',()=>{
                etcDisableInput.attr("disabled", true);
            })

            // 내정보 > 열람신청 수신방법선택
            $('.rec input[type="radio"]').on('click',()=>{
                if($('#emailCheck').is(':checked') == true){
                    $('.emailBox').show();
                    $('.faxBox').hide();
                } else if($('#faxCheck').is(':checked') == true){
                    $('.emailBox').hide();
                    $('.faxBox').show();
                }
            });

            // 내정보 > 휴대폰 정보 등록
            $('.os-wrap input[type="radio"]').on('click',() => {
                if($('.radio-android').is(':checked') == true){
                    $('.phone-android').show();
                    $('.phone-ios').hide();
                } else if($('.radio-ios').is(':checked') == true){
                    $('.phone-android').hide();
                    $('.phone-ios').show();
                }
            });

            // 고객지원 > 법인가입 문의 > 상품유형
            $('.radio-usim-phone input[type="radio"]').on('click',() => {
                if($('input.radio-usim').is(':checked') == true){
                    $('div.radio-usim').show();
                    $('div.radio-phone').hide();
                } else if($('input.radio-phone').is(':checked') == true){
                    $('div.radio-usim').hide();
                    $('div.radio-phone').show();
                }
            });

            // 고객지원 > 법인가입 문의 > 가입유형
            $('.radio-transfer-new input[type="radio"]').on('click',() => {
                if($('input.radio-transfer').is(':checked') == true){
                    $('p.radio-transfer').show();
                    $('p.radio-new').hide();
                } else if($('input.radio-new').is(':checked') == true){
                    $('p.radio-transfer').hide();
                    $('p.radio-new').show();
                }
            });

        },
        fn(){
            this.etc('.etc-btn','.etc-input');
            this.etc('.choice','.datepicker-wrap');

            // 명의변경
            this.etc('.show-email-input','.email-input');
            this.etc('.show-info-card','.info-card');
            this.etc('.show-info-account','.info-account');
            // this.etc('.etc-button-01','.etc-input-wrap');
            this.etc('.etc-email-btn','.etc-email-input');
            this.etc('.etc-fax-btn','.etc-fax-input');

            // 납부방법 변경
            this.etc('.show-bank-input','.bank-input');
            this.etc('.show-card-input','.card-input');

			// 회원가입
			this.etc('.show-save-radio','.save-phone-radio-wrap');
        },

    }

    // select
    const select = {
        init() {
            this.borderChange();
             $('.self-write-wrap').length > 0 && this.showTextArea();
        },
        borderChange() {
            $(".select-default").change(function(){
                const optionSelect = $(this).children(':selected'),
                    depthSelect = $(this).parents(".box-select").siblings('.select-more');

                if (optionSelect.index() == 0) {
                    $(this).css("border-color", "#dddddd");
                    depthSelect.removeClass('on');
                } else {
                    $(this).css("border-color", "#191919");
                    depthSelect.addClass('on');
                }
            });
        },
        showTextArea() {
             $(".select-default").change(function(){
                const selfWrite = $('.self-write-wrap');

                $(this).find('option:selected').each(function(){
                    if($(this).hasClass('etc-select')) {
                        $(this).parents('.box-select').find(selfWrite).show();
                    }else {
                        $(this).parents('.box-select').find(selfWrite).hide();
                    }

                    if($('.usim .directmall').length > 0 == true) {
                        if($(this).hasClass('etc-select')) {
                            $(this).parents('.box-select').next(selfWrite).show();
                        }else {
                            $(this).parents('.box-select').next(selfWrite).hide();
                        }
                    }
                });
             });
        }
    }

    // ACCORDIAN
    const accordian = {
        init() {
            this.set();
            this.evtBind();
        },
        open(){
            // 퍼블 페이지면 true, 개발페이지면 false
            if($('.container.extra').length > 0 || $('.container.goodok').length > 0){
                return true;
            }
        },
        set(){
            const accordianWrap = $('.accordian');
            accordianWrap.each(function(){
                const trigger = $(this).find('.acc-trigger'),
                      conts = $(this).find('.acc-conts')

                trigger.attr('aria-expanded','false');
                conts.attr('aria-hidden','true');

                // 상품 부가서비스 첫번째 컨텐츠 열려있게 클래스로 제어
               if(accordian.open() && $(this).hasClass('open') == true) {
                    trigger.attr('aria-expanded','true');
                    trigger.addClass('on');
                    trigger.next('.acc-conts').attr('aria-hidden','false').slideDown(150);
                    trigger.next('.acc-conts-type2').find('.acc-conts').attr('aria-hidden','true').slideDown(150);
                }
            });
        },
        evtBind(){
            $body.on('click','.acc-trigger', function(){
                const phoneSlide = $('.evt-phone-template .phone-info-slide');
                if( $(this).hasClass('on') ){
                    $(this).attr('aria-expanded','false');
                    $(this).removeClass('on');
                    $(this).next('.acc-conts').attr('aria-hidden','true').slideUp(150);
                    $(this).next('.acc-conts-type2').find('.acc-conts').attr('aria-hidden','true').slideUp(150);
                }else{
                    $(this).attr('aria-expanded','true');
                    $(this).addClass('on');
                    $(this).next('.acc-conts').attr('aria-hidden','false').slideDown(150);
                    $(this).next('.acc-conts-type2').find('.acc-conts').attr('aria-hidden','true').slideDown(150);
                }
                $(this).next('.acc-conts').find('.slick-initialized').length > 0 && accordian._position($(this).next('.acc-conts').find('.slick-initialized'));
                phoneSlide.height('auto');
            });
        },
        _position($slick){
            $slick.slick('setPosition');
        }
    };

    // TAB
    const tab = {
        init() {
            this.scroll();
            $('.box-tab').hasClass('tab-ctrl') && this.tabEvent();
            $('.box-tab02').hasClass('tab-ctrl') && this.tabEvent();
            $('.select-link').length > 0 && this.selectLink();
        },
        tabEvent() {
            $(".box-tab").each(function(index, item) {
                $(item).find(".tab-btn-wrap > li")
                    .eq(0)
                    .find("a, button")
                    .attr({ title: "현재 탭", "aria-selected": "true", role: "tab" })
                $(item).find(".tab-contents-wrap")
                    .find("> div")
                    .eq(0)
                    .attr("aria-hidden", "false")
                    .siblings("div")
                    .attr("aria-hidden", "true");
            });
            $(".box-tab02").each(function(index, item) {
                $(item).find(".tab-btn-wrap > li")
                    .eq(0)
                    .find("a, button")
                    .attr({ title: "현재 탭", "aria-selected": "true", role: "tab" })
                $(item).find(".tab-contents-wrap")
                    .find("> div")
                    .eq(0)
                    .attr("aria-hidden", "false")
                    .siblings("div")
                    .attr("aria-hidden", "true");
            });

            $("body").on("focusin click",".tab-ctrl .tab-btn-wrap > li > *", function (e) {
                let l = $(this).closest("li").offset().left,
                    i = $(this).closest("li").index();
                $(this)
                    .addClass("on")
                    .attr({ title: "현재 탭", "aria-selected": "true" })
                    .closest("li")
                    .siblings("li")
                    .find("a, button")
                    .removeClass("on")
                    .attr({ title: "", "aria-selected": "false" });
                $(this)
                    .closest(".tab-btn-wrap")
                    .siblings(".tab-contents-wrap")
                    .children("div")
                    .attr("aria-hidden", "false")
                    .eq(i)
                    .show()
                    .siblings("div")
                    .hide()
                    .attr("aria-hidden", "true");

                    $(".tab-ctrl .tab-btn-wrap").scrollLeft(l);
            });
        },
        scroll(){

        },
        selectLink(){
            $('.select-link li a').on('click',function(){
                $(this).parent('li').addClass('on').siblings('li').removeClass('on');
            });
        },
		reset($obj){
			$obj.closest('.layer-popup-item').find('.tab-btn-wrap li').eq(0).children().trigger('click');
		}
    }

    const tabSwiper = {
        init(){
            // $('.box-tab > ul.swiper-wrapper').length > 0 && this.swiper();

            this.scroll();
        },
        swiper(){
            let boxTabSwiper = new Swiper('.box-tab', {
                freeMode: true,
                slidesPerView: "auto",
                spaceBetween: 20,
                draggable: true,
            });
        },
        scroll(){
            // $('.swiper-wrapper').animate({'transform':'translateX(-253px)'})
        }
    }

    // Tool Tip
    const tooltip = {
        init() {
            this.default();
        },
        default () {
            const $tooltipBtn = $('.box-tooltip .btn-tooltip');
            $tooltipBtn.on('mouseenter', function(){
                $('.txt-tooltip').removeClass('on');
                $(this).siblings('.txt-tooltip').toggleClass('on');
            });

            $('.box-tooltip').on('mouseleave',function() {
                $('.txt-tooltip').removeClass('on');
            });
        }

    }

    // datepicker
    const datepicker = {
        $datePick: new Object,
        init() {
            $('.payment-confirm-application').length > 0 ? this.setting() : this.default();
        },
        default () {
            this.$datePick = $('.date-picker');
            this.$datePick.datepicker({
                dateFormat: "yy-mm-dd",
                showOtherMonths: true,
                selectOtherMonths: true
            });
        },
		setting () {
			this.$datePick = $('.date-picker');
            this.$datePick.datepicker({
                dateFormat: "yy-mm",
                showOtherMonths: true,
                selectOtherMonths: true
            });
		}
    }
    // datepicker 직접입력
    $(".search-period .btn-radio-group label").click(function(){
        if($(this).hasClass('btn-direct')){
            $(".direct-search").addClass('on');
        }else {
            $(".direct-search").removeClass('on');
        }
    });

	// monthpicker
	const monthpicker = {
		init () {
			this.default();
		},
		default () {
			$('.month-picker').MonthPicker({ StartYear: 2022, ShowIcon: false, showAnim: '' });
			$('.month-picker').on('click', function(){
				$('.month-picker-previous > a').removeClass('ui-state-disabled');
				$('.month-picker-next > a').removeClass('ui-state-disabled');
			});
		}
	}

    // progress animation
    const progressAni = {
        init() {
            this.amountCircle();
            // this.amountBar();
            this.chartBar();
        },
        amountCircle (t,v) {
            const circleDeg = v,
                strokeW = 3,
                circleValue = v == 1 ? 0 : 103 - (circleDeg * 100) + (v > 0.5 && 2) + (v > 0.9 && 3);
				$('#'+t+'').css("stroke-dashoffset", circleValue);


            function circleAni (index) {
                // $section.each(function(index) {
                    // $section.eq(index).find(barCircle).css("transform","translateY(-50%) rotate("+smallValue+"deg)");
                // });
            }
        },
        chartBar (id, data ,avg) {
            const bar = $('.chart-wrap').find('#' + id),
                avgLine = bar.parents('.chart-conts').siblings('.box-average'),
                $section = $('.use-amount.month section');

            function chartAni () {
                $('.use-amount.month section.on').each(function(index) {
                    $section.eq(index).find(bar).css('height',data + '%');
                    $section.eq(index).find(avgLine).css('bottom',avg + '%').addClass('on');
                    setTimeout(function() {
                        $section.eq(index).find(avgLine).find('.average-txt').addClass('on');
                    },500);
                });
            }
            chartAni();

            if($('.use-amount.month').length > 0 ) {
                $section.addClass('on');
                chartAni();
            }
        }
    }

    const addRole = {
        role(){
            $('button').each(function(){
                $(this).attr('type','button')
            });
        }
    }

	// 일반 스크립트
    const evtBind = {
        init () {
            this.anchorEv();
            this.productEvent();
            this.colorEvent();
			this.clickEvent();
            $('.phone .product-info').length > 0 && this.phoneColorEvent();
            $('.event').length > 0 && this.scrollEv();
            $('.phone .bottom-layer-pop').length > 0 && this.phoneBottomLayer();
            $('.tab-anchor').length > 0 && this.tabAnchor();
            $('.phone .thumb-slide').length > 0 && this.phoneNavSlide();
            $('.phone .link_group').length > 0 && this.filterOn();
            $('.terms.terms-privacy').length > 0 && this.termsAnchor();
            $('.util .introduce-ualmo').length > 0 && this.brandScrollEv();
        },
        anchorEv () {
            // 휴대폰 상세보 - 월납부금액 anker
            $(".product-info .btn-sum button").click(function(){
                let loc = $(".payment-detail").offset().top;
                $('html, body').animate({
                    scrollTop : loc - 100
                }, '100');
            });
        },
        productEvent() {
            //상품-생활구독 신청하기 약관
            /*$(".subscribe-agree .agree-wrap .btn-text-line").click(function(){
                $(this).addClass('on').next('.agree-group').slideDown(200);
            });*//* 아코디언 기능 삭제*/
        },
        colorEvent (){
            //이벤트-폰색상 이미지 변경
            $(".phone-color-box .color-type li").click(function(){
                $(this).siblings('li').removeClass('on');
                $(this).parent('ul').siblings('.phone-img').find('li').removeClass('on');

                $(this).addClass('on');
                $(this).parent('ul').siblings('.phone-img').find('li').eq($(this).index()).addClass('on');
            });
        },
        phoneColorEvent() {
            const colorType = $('.color-type li'),
                showColorName = $('.box-color-name strong');

            colorType.on('click',function() {
                const thisRadio = $(this).find('input');
                colorType.removeClass('on');
                if(thisRadio.is(':checked') == true) {
                    thisRadio.parents('li').addClass('on');

                    const radioTxt = thisRadio.siblings('label').find('b').text();
                    showColorName.text(radioTxt);
                }
            });
        },
		clickEvent(){
			$('body').on('click', '.buy-pickup-convenience-pop .btn-close-x', function(){
				tab.reset($(this));
			});
			$('#wrap').on('click', function(){
				$('.survey-close').trigger('click');
				floating.chatbotClose();
			});			
		},
        scrollEv () {
            $(window).scroll(function(){
                let conts_loc = $(window).scrollTop();

               //이벤트-마케팅메세지
                let msg_end = $("#footer").offset().top - window.innerHeight;

                if(conts_loc > msg_end) {
                    $(".event .template").addClass('fix-msg');
                }else{
                    $(".event .template").removeClass('fix-msg');
                }

                //유알모포인트
                //let pointTab_loc = $(".ualmo-point .intro").offset().top + $(".ualmo-point .intro").height() - window.innerHeight + 98;

                /*if(conts_loc > pointTab_loc) {
                    $(".ualmo-point .tab-btn-wrap").addClass('fixed');
                }else{
                    $(".ualmo-point .tab-btn-wrap").removeClass('fixed');
                }*/
                // let pointTab_end = $("#footer").offset().top - window.innerHeight - 50;

                // if(conts_loc > pointTab_end) {
                //     $(".ualmo-point .tab-btn-wrap").addClass('fixed');
                // }else{
                //     $(".ualmo-point .tab-btn-wrap").removeClass('fixed');
                // }
            });
        },
        phoneBottomLayer () {
            $('body').on('click','.bottom-pop-btn',function(){
                const bottomPop = $('.bottom-layer-pop'),
                tableConts = bottomPop.find('.table-conts');

                bottomPop.toggleClass('on');
                tableConts.stop().slideToggle();
            });
        },
        tabAnchor () {
            const tabAnchor = $('.tab-anchor .line-tab a'),
                anchor01 = $('.phone .phone-detail-info'),
                anchor02 = $('.phone .phone-review'),
                anchor03 = $('.phone .phone-regist-info');

            $window.on('scroll',function() {
                const headerH = $('#header').height(),
                tabGnbHT =$('.line-tab').height(),
                    offSet01 = anchor01.offset().top - headerH - tabGnbHT,
                    offSet02 = anchor02.offset().top - headerH - tabGnbHT,
                    offSet03 = anchor03.offset().top - headerH - tabGnbHT;

                tabAnchor.on('click',function() {
                    const thisTab = $(this).parents().index();

                    switch(thisTab) {
                        case 0 :
                            window.scrollTo({top:offSet01, behavior:'smooth'});
                            break;
                        case 1:
                            window.scrollTo({top:offSet02, behavior:'smooth'});
                            break;
                        case 2:
                            window.scrollTo({top:offSet03, behavior:'smooth'});
                        default:
                            break;
                    }
                });
            });
        },
        phoneNavSlide () {
            const thumbSlide = $('.thumb-slide'),
                slideBtn = thumbSlide.find('.slick-arrow'),
                prevBtn = thumbSlide.find('.slick-prev'),
                nextBtn = thumbSlide.find('.slick-next'),
                slideItem = thumbSlide.find('.slick-slide'),
                lastSlide = slideItem.length - 1;

                prevBtn.addClass('disabled');
                slideBtn.on('click',function() {
                    const currentSlide = thumbSlide.find('.slick-current').index();
                    if(currentSlide === 0) {
                        prevBtn.addClass('disabled');
                    } else if( currentSlide === lastSlide ){
                        nextBtn.addClass('disabled');
                    } else {
                        slideBtn.removeClass('disabled');
                    }
                })
        },
        filterOn () {
            const filterList = $('.link_group li');

            filterList.on('click',function() {
                filterList.removeClass('on');
                $(this).addClass('on');
            });
        },
        termsAnchor () {
            const showTerms = $('.terms-privacy-list li a'),
            thisTerms = $('.person_rule'),
            headerH = $('header').outerHeight();

            showTerms.on('click',function() {
                const thisIdx = $(this).parents('li').index();
                $('html').animate({
                    scrollTop: thisTerms.eq(thisIdx).offset().top - (headerH + 20)
                },1000);
            });
        },
        brandScrollEv() {
			const $section = $('.introduce-ualmo section');
            $section.eq(0).find('.txt-wrap').addClass('on');
            $(window).scroll(function(){
                const scTop = $(window).scrollTop(),
                    sec01 = $section.eq(0).offset().top + 200,
                    sec02 = $section.eq(1).offset().top + 200,
                    sec03 = $section.eq(2).offset().top + 200,
                    sec04 = $section.eq(3).offset().top + 200,
                    txt = $('.introduce-ualmo section .txt-wrap');

                if(sec01 < scTop && scTop < sec02 ) {
                    $section.eq(1).find(txt).addClass('on');
                } else if(sec02 < scTop && scTop < sec03) {
                    $section.eq(2).find(txt).addClass('on');
                } else if(sec03 < scTop && scTop < sec04) {
                    $section.eq(3).find(txt).addClass('on');
                } else if(sec04 < scTop) {
                    $section.eq(4).find(txt).addClass('on');
                }
            });
        }
    }

    // 윈도우 팝업 스크립트
    const windowPopup = {
        attrArr : new Array,
        attrArr2 : new Array,
        init(){
            this._evt();
        },
        _evt(){
            $('[data-pop-attr]').on('click', function(){
                if(!$(this).data().popAttr){
                    return;
                }
                windowPopup.attrArr = $(this).data().popAttr.split(';'),
                windowPopup._set();
            });
        },
        _set(){
            this.attrArr.forEach((item, i) => {
                this.attrArr[i] = item.substring(item.lastIndexOf(':') + 1);
            });
            this._open();
        },
        _open(){
            window.open(this.attrArr[0], this.attrArr[1], this.attrArr[2]);
        }
    };

	// 이벤트 윈도우 팝업 viewport 제어
	const evtViewport = {
		init(){
			this.replace();
		},
		replace(){
			$('[name="viewport"]').attr('content','width=device-width');
		}
	};

    init();

    return{
        layer : layer,
        systemLayer : systemLayer,
        fullPopup : fullPopup,
        toast: toast,
        tooltip: tooltip,
        progressAni : progressAni,
        datepicker : datepicker,
		monthpicker : monthpicker,
        slickCtrl : slickCtrl,
        evtBind : evtBind,
        floating : floating,
		tab : tab,
		bodyFix : bodyFix
    };


})(window.uiCommon || {}, $(window), $('body'));

// **** 내정보 > 사용량 조회 ****
// 퍼센트를 파라미터로 전달
uiCommon.progressAni.amountCircle('bar01', 1);
uiCommon.progressAni.amountCircle('bar02', 0.75);
uiCommon.progressAni.amountCircle('bar03', 0.5);
uiCommon.progressAni.amountCircle('bar04', 0.25);
uiCommon.progressAni.amountCircle('bar05', 0.86);


// 30일기준 14일 남았다
// uiCommon.progressAni.amountBar(30,14);


//월별사용량 (아이디, 퍼센트, 평균값)
uiCommon.progressAni.chartBar('bar-data-01',50, 70);
uiCommon.progressAni.chartBar('bar-data-02',80, 70);
uiCommon.progressAni.chartBar('bar-data-03',30, 70);

uiCommon.progressAni.chartBar('bar-call-01',100, 30);
uiCommon.progressAni.chartBar('bar-call-02',50, 30);
uiCommon.progressAni.chartBar('bar-call-03',20, 30);

uiCommon.progressAni.chartBar('bar-sms-01',10, 90);
uiCommon.progressAni.chartBar('bar-sms-02',45, 90);
uiCommon.progressAni.chartBar('bar-sms-03',85, 90);

// as-is event.js
// 포커스 이동
$(function(){
	$('.event_focus').on('click', function(event) {
		event.preventDefault();
		var href = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(href).offset().top - 50
		});
	});


});
// 유단자
 $(function() {
        $(".togle_img").hide();

        $(".udanja .togle_btn").on("click",function(){
            if($(this).hasClass("on")){
                $(this).removeClass("on");
                $(this).find("img").attr("src","/static/shop/images/event/event_udanja_tobtn.jpg");
                $(".togle_img").hide();
            }else{
                $(this).addClass("on");
                $(this).find("img").attr("src","/static/shop/images/event/event_udanja_tobtn_on.jpg");
                $(".togle_img").show();
            }
        });
 });

// 갤럭시8 노트 사전예약
$(function(){

	var $colorNav = $('.color_list li');
	var $tabrNav = $('.tab li');
	var currentPosition = parseInt($(".quick_benner").css("top"));

	$colorNav.on('click', function(){
		var idx = $(this).index();
		$colorNav.removeClass('checked');
		$(this).addClass('checked');
		$('.phone_list li').eq(idx).show().addClass('fadein').siblings().hide();
		$('.phone_list li').eq(idx).siblings().removeClass('fadein');
	});

	$tabrNav.on('click', function(){
		var idx = $(this).index();
		$tabrNav.removeClass('on');
		$(this).addClass('on');
		$('.tab_inner li').eq(idx).show().siblings().hide();
	});

	$(window).scroll(function() {
		var position = $(window).scrollTop();
		var secitonHeight = $('.event_galaxynote8_reserve .section01').height();
		var contHeight = $('.event_galaxynote8_reserve').height();

		if(position >= secitonHeight && position <= contHeight ){
			$('.quick_benner').stop().animate({"top":position+"px"},500);
		};
	});

	$('.option_box label').on('click', function(){
		var $price = $(this).data('price');
		$('.phone_price').text($price);
	});

});

// v30 일반판매
$(function(){
	// 2018.11.08 이영근 *도메인 변경 시 영향 범위 : 홈페이지 다이렉트몰
	var urlArray = ['https://www.uplussave.com/shop/dev/intrDetail.mhp?modelCd=LGM-V300L&ppnCd=LPZ0000205&ctgrId=003','https://www.uplussave.com/shop/dev/intrDetail.mhp?modelCd=LGM-V300L&ppnCd=LPZ0000206&ctgrId=003','https://www.uplussave.com/shop/dev/intrDetail.mhp?modelCd=LGM-V300L&ppnCd=LPZ0000207&ctgrId=003','https://www.uplussave.com/shop/dev/intrDetail.mhp?modelCd=LGM-V300L&ppnCd=LPZ0000208&ctgrId=003'];
	$("#tabImg li").hide().eq(0).show();
	$(".v30_normal #tabBtn a").on("click",function(){
		var idx = $(this).closest("li").index();
		$("#tabImg li").hide().eq(idx).show();
		$("#linkChange").attr('href',urlArray[idx]);
	});

	$("#v30BtnPc").on("click",function(){
		if($("#v30PopPc").hasClass("on")){
			return false;
		}else{
			$("#v30PopPc").addClass("on").css("display","inline-block");
		}
		$("#v30PopPc .btn_close").on("click",function(){
			$("#v30PopPc").removeClass("on").css("display","none");
		});
	});
});

//GS 기획전
$(function(){
	//GS 기획전 사용가능 휴대폰 조회
	$('#devListPopbtn').on("click",function(){fn_devListPop();});

	var ppnCd = 'LPZ000212';
	var flag = 'online';
	//온라인 신청 버튼
	$('#applyGsWebBtn').on("click",function(){fn_applyGsPop(ppnCd);});
	$('#applyGsMobBtn').on("click",function(){fn_applyGsPop(ppnCd);});
	$('#applyGsUsimBtn').on("click",function(){fn_applyGsPop(ppnCd);});
	//온라인 신청 버튼
	$('#applyGs5Btn').on("click",function(){
		ppnCd = 'LPZ0000214';
		flag = 'online';
		fn_applyGsPop(ppnCd, flag);
	});
	$('#applyGs15Btn').on("click",function(){
		ppnCd ='LPZ0000212';
		flag = 'online';
		fn_applyGsPop(ppnCd, flag);
	});
	$('#applyGs6Btn').on("click",function(){
		ppnCd = 'LPZ0002343';
		flag = 'online';
		fn_applyGsPop(ppnCd, flag);
	});
	$('#applyGs10Btn').on("click",function(){
		ppnCd ='LPZ0002344';
		flag = 'online';
		fn_applyGsPop(ppnCd, flag);
	});
	//전화로 신청 버튼 추가. 180121 minjoo
	$('#applyTelGs5Btn').on("click",function(){
		ppnCd = 'LPZ0000214';
		flag = 'tel';
		fn_applyGsPop(ppnCd, flag);
	});
	$('#applyTelGs15Btn').on("click",function(){
		ppnCd ='LPZ0000212';
		flag = 'tel';
		fn_applyGsPop(ppnCd, flag);
	});
	$('#applyTelGs6Btn').on("click",function(){
		ppnCd = 'LPZ0002343';
		flag = 'tel';
		fn_applyGsPop(ppnCd, flag);
	});
	$('#applyTelGs10Btn').on("click",function(){
		ppnCd ='LPZ0002344';
		flag = 'tel';
		fn_applyGsPop(ppnCd, flag);
	});
});

var fn_deviceChk = function(e){
	 var mobileOs = new Array('iPhone', 'iPad', 'iPod', 'Android', 'BlackBerry', 'Window CE'
			  , 'Nokia', 'nokia', 'Webos', 'Opera Mini', 'sonyEricsson'
			  , 'Opera Mobi', 'IEMobile', 'LG', 'MOT', 'SAMSUNG', 'Samsung'
			  , 'lgtelecom', 'PPC', 'Symbian', 'Windows Phone', 'webOS', 'POLARIS');

	 var userAgent = navigator.userAgent;
	 var j = -1;
	 var agentMobYn = 'N';

	 for(var i=0; i<mobileOs.length; i++){
		 j = userAgent.indexOf(mobileOs[i]);
		 if(j > -1){
			 agentMobYn = 'Y';
			 break;
		 }
	 }
	 return agentMobYn;
}
//웹용 온라인신청 버튼
var fn_applyGsPop = function(ppnCd, flag){
	var selectedSn =$('#selectedSn').val();
	var submitYn = $('#submitYn').val();

	if(submitYn != "Y"){
		$('#submitYn').val('Y');


		(function (img) { img.onload = function () {
			var length = localStorage.BuzzAd.length;
		    /*if(localStorage.BuzzAd.indexOf('10023_71ffbffd-ccf1-4edf-9c4c') != -1){
		        alert("[Success] Action Completed!");
		    };*/
		    //*필요시 여기서 리다이렉트 수행*
		    /*if(localStorage.BuzzAd.indexOf('10023_71ffbffd-ccf1-4edf-9c4c') != -1){
	        alert("[Success] Action Completed!");
	    } */
			var agentMobYn = fn_deviceChk();

			//모바일
			if(agentMobYn == 'Y'){
				location.href = "/gs/cmmn/applyGsUsimPop.mhp?ppnCd="+ppnCd+"&selectedSn="+selectedSn+"&flag="+flag;
			}else{
				window.open('/gs/cmmn/applyGsUsimPop.mhp?ppnCd='+ppnCd+'&selectedSn='+selectedSn+"&flag="+flag, 'applyGsUsimPop', 'width=800, height=414, top=0, left=0, scrollbars=yes');
			}
		};
		if (localStorage.BuzzAd == null) { localStorage.BuzzAd = ""; }
		img.src = "//track.buzzvil.com/action/pb/cpa/default/pixel.gif" + localStorage.BuzzAd; }) (new Image())

	} else {
		var agentMobYn = fn_deviceChk();

		//모바일
		if(agentMobYn == 'Y'){
			location.href = "/gs/cmmn/applyGsUsimPop.mhp?ppnCd="+ppnCd+"&selectedSn="+selectedSn+"&flag="+flag;
		}else{
			window.open('/gs/cmmn/applyGsUsimPop.mhp?ppnCd='+ppnCd+'&selectedSn='+selectedSn+"&flag="+flag, 'applyGsUsimPop', 'width=800, height=414, top=0, left=0, scrollbars=yes');
		}
	}


}

var fn_devListPop = function(e){
	var agentMobYn = fn_deviceChk();
	//모바일
	if(agentMobYn == 'Y'){
		//window.open('https://gs25.uplussave.com/gs/cmmn/serviceableDevListPop.mhp', 'serviceableDevListPop');
		location.href="https://gs25.uplussave.com/gs/cmmn/serviceableDevListPop.mhp?evntFlag=Y";
	}else{
		window.open('https://gs25.uplussave.com/gs/cmmn/serviceableDevListPop.mhp', 'serviceableDevListPop', 'width=1000, height=670, top=0, left=0, scrollbars=yes');
	}
}


//구매후기 2탄
$(function(){
	//청구서 URL 등록 버튼
	$('#evntRegBtn').on("click",function(){
		$.ajax({
			url: '/shop/cc/loginChk.mhpx',
			async: true,
			type: 'POST',
			dataType: 'json',
			success: function (data) {
				if(data.result == '0000'){
					var agentMobYn = fn_deviceChk();
					if(agentMobYn == 'Y'){
						//window.open('https://gs25.uplussave.com/gs/cmmn/serviceableDevListPop.mhp', 'serviceableDevListPop');
						location.href="/shop/cc/purchaseReviewPop.mhp";
					}else{
						window.open('/shop/cc/purchaseReviewPop.mhp', 'purchaseReviewPop', 'width=880, height=281, top=0, left=0, scrollbars=yes');
					}

				} else {
					alert("로그인 후 참여 가능합니다.");
					location.href = '/shop/apply/loginForm.mhp?nextUrl=/shop/cc/evntDetail.mhp&selectedSn=82';
				}

				return false;
			}, error: function (err) {
				alert("작업 중 오류가 발생하였습니다.");
				return false;
			}
		});
	});

});

/*[윤] 171214 유심 마지막 특가전 슬라이드 */
/*
$(function(){
	var filter = "win16|win32|win64|mac";

	if(navigator.platform){
		if(0 > filter.indexOf(navigator.platform.toLowerCase())){
			$(".slide_wraps.usimlast .banner_box").find("a").attr("href","https://www.uplussave.com/shop/dev/goodsEpilogueList.mhp?modelCd=USIM");
		}else{
			$(".slide_wraps.usimlast .banner_box").find("a").attr("href","https://www.uplussave.com/shop/dev/usim.mhp?tab=goodsEpilogueList");
		}
	}

    $(".slide_wraps.usimlast > div").slick({
        autoplay: true,
        autoplaySpeed: 10000,
        infinite: true,
        arrows: true,
        dots: false,
        playButton: false
    });
});
*/

$(function(){
	$(document).on("change", ".event_galaxyS9_reserve input[type='radio']", function() {
		if($(".month24").hasClass("checked") && $(".usim1").hasClass("checked")){
			$('#ppnCd').val('LPZ0000205');
			$('#alotMnts').val('24');
			$(".event_galaxyS9_reserve .price_table > img").hide();
			$(".event_galaxyS9_reserve .price_table > .img01").show();
		}else if($(".month24").hasClass("checked") && $(".usim3").hasClass("checked")){
			$('#ppnCd').val('LPZ0000206');
			$('#alotMnts').val('24');
			$(".event_galaxyS9_reserve .price_table > img").hide();
			$(".event_galaxyS9_reserve .price_table > .img02").show();
		}else if($(".month24").hasClass("checked") && $(".usim6").hasClass("checked")){
			$('#ppnCd').val('LPZ0000207');
			$('#alotMnts').val('24');
			$(".event_galaxyS9_reserve .price_table > img").hide();
			$(".event_galaxyS9_reserve .price_table > .img03").show();
		}else if($(".month24").hasClass("checked") && $(".usim11").hasClass("checked")){
			$('#ppnCd').val('LPZ0000208');
			$('#alotMnts').val('24');
			$(".event_galaxyS9_reserve .price_table > img").hide();
			$(".event_galaxyS9_reserve .price_table > .img04").show();
		}else if($(".month24").hasClass("checked") && $(".usim11plus").hasClass("checked")){
			$('#ppnCd').val('LPZ0000202');
			$('#alotMnts').val('24');
			$(".event_galaxyS9_reserve .price_table > img").hide();
			$(".event_galaxyS9_reserve .price_table > .img05").show();
		}else if($(".month30").hasClass("checked") && $(".usim1").hasClass("checked")){
			$('#ppnCd').val('LPZ0000205');
			$('#alotMnts').val('30');
			$(".event_galaxyS9_reserve .price_table > img").hide();
			$(".event_galaxyS9_reserve .price_table > .img06").show();
		}else if($(".month30").hasClass("checked") && $(".usim3").hasClass("checked")){
			$('#ppnCd').val('LPZ0000206');
			$('#alotMnts').val('30');
			$(".event_galaxyS9_reserve .price_table > img").hide();
			$(".event_galaxyS9_reserve .price_table > .img07").show();
		}else if($(".month30").hasClass("checked") && $(".usim6").hasClass("checked")){
			$('#ppnCd').val('LPZ0000207');
			$('#alotMnts').val('30');
			$(".event_galaxyS9_reserve .price_table > img").hide();
			$(".event_galaxyS9_reserve .price_table > .img08").show();
		}else if($(".month30").hasClass("checked") && $(".usim11").hasClass("checked")){
			$('#ppnCd').val('LPZ0000208');
			$('#alotMnts').val('30');
			$(".event_galaxyS9_reserve .price_table > img").hide();
			$(".event_galaxyS9_reserve .price_table > .img09").show();
		}else if($(".month30").hasClass("checked") && $(".usim11plus").hasClass("checked")){
			$('#ppnCd').val('LPZ0000202');
			$('#alotMnts').val('30');
			$(".event_galaxyS9_reserve .price_table > img").hide();
			$(".event_galaxyS9_reserve .price_table > .img10").show();
		}else if($(".month36").hasClass("checked") && $(".usim1").hasClass("checked")){
			$('#ppnCd').val('LPZ0000205');
			$('#alotMnts').val('36');
			$(".event_galaxyS9_reserve .price_table > img").hide();
			$(".event_galaxyS9_reserve .price_table > .img11").show();
		}else if($(".month36").hasClass("checked") && $(".usim3").hasClass("checked")){
			$('#ppnCd').val('LPZ0000206');
			$('#alotMnts').val('36');
			$(".event_galaxyS9_reserve .price_table > img").hide();
			$(".event_galaxyS9_reserve .price_table > .img12").show();
		}else if($(".month36").hasClass("checked") && $(".usim6").hasClass("checked")){
			$('#ppnCd').val('LPZ0000207');
			$('#alotMnts').val('36');
			$(".event_galaxyS9_reserve .price_table > img").hide();
			$(".event_galaxyS9_reserve .price_table > .img13").show();
		}else if($(".month36").hasClass("checked") && $(".usim11").hasClass("checked")){
			$('#ppnCd').val('LPZ0000208');
			$('#alotMnts').val('36');
			$(".event_galaxyS9_reserve .price_table > img").hide();
			$(".event_galaxyS9_reserve .price_table > .img14").show();
		}else if($(".month36").hasClass("checked") && $(".usim11plus").hasClass("checked")){
			$('#ppnCd').val('LPZ0000202');
			$('#alotMnts').val('36');
			$(".event_galaxyS9_reserve .price_table > img").hide();
			$(".event_galaxyS9_reserve .price_table > .img15").show();
		}
	});
});


// 유알모 추천

	$(function(){
		if($('.event_frugal_mobile').length){
			var moincontent = $('.event_frugal_mobile').offset().top;
			var moviewH = moincontent - 91;

			$(window).scroll(function(){
				var moscrTop = $(window).scrollTop();
				var motargetTop = (moscrTop - moviewH)+10;

				if(moviewH - moscrTop <= 0 ){
					$('.mb_quick').css('top',  motargetTop+'px');
				} else {
					$('.mb_quick').css('top', '10px');
				}
			});
		}
	});

	$(function(){
		var filter = "win16|win32|win64|mac";

		if(navigator.platform){
			if(0 <= filter.indexOf(navigator.platform.toLowerCase())){
				if($('.event_frugal_mobile').length){
					var pcincontent = $('.event_frugal_mobile').offset().top;
					var snspst = $('.sns_box').offset().top;
					var qick = snspst -900;
					var pcviewH = pcincontent - 200;

					var contHieht = $('.event_frugal_mobile').height()-550;

					$(window).scroll(function(){
						var scrTop = $(window).scrollTop();
						var targetTop = (scrTop - pcviewH)+10;


						if(pcviewH - scrTop <= 0 ){
							$('.quick_sns').css('top',  targetTop+'px');
						}else {
							$('.quick_sns').css('top', '200px');
						}

						if(scrTop >= qick ){
							$('.quick_sns').css('top',  contHieht+'px');
						}

					});
				}
			}
		}

	});

	$(window).scroll(function() {
		var filter = "win16|win32|win64|mac";

		if(navigator.platform){
			if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
				var position = $(window).scrollTop();
				var contHeight = $('.event_frugal_mobile').height();

				if(position <= contHeight ){
					$('.event_frugal_mobile .mb_quick ').css({"top":position+"px"});
				};
			}
		}

	});


$(function(){
	$('.evnt_g7 .clr_list li').on('click', function(){
		var $indx = $(this).index();
		var $phe =$('.evnt_g7 .phne_list li');

		$('.evnt_g7 .clr_list li, .evnt_g7 .phne_list li').removeClass('on');
		$(this).addClass('on');
		$phe.eq($indx).addClass('on');

	});
});

$(function(){
	$(document).on("change", ".evnt_g7 input[type='radio']", function() {
		if($(".month24").hasClass("checked") && $(".usim_3g_200m").hasClass("checked")){
			$(".evnt_g7 .price_view > img").hide();
			$(".evnt_g7 .price_view > .img01").show();
		}else if($(".month24").hasClass("checked") && $(".usim_6g_250m").hasClass("checked")){
			$(".evnt_g7 .price_view > img").hide();
			$(".evnt_g7 .price_view > .img02").show();
		}else if($(".month24").hasClass("checked") && $(".usim_11g_300m").hasClass("checked")){
			$(".evnt_g7 .price_view > img").hide();
			$(".evnt_g7 .price_view > .img03").show();
		}else if($(".month24").hasClass("checked") && $(".usim_infinite").hasClass("checked")){
			$(".evnt_g7 .price_view > img").hide();
			$(".evnt_g7 .price_view > .img04").show();
		}else if($(".month30").hasClass("checked") && $(".usim_3g_200m").hasClass("checked")){
			$(".evnt_g7 .price_view > img").hide();
			$(".evnt_g7 .price_view > .img05").show();
		}else if($(".month30").hasClass("checked") && $(".usim_6g_250m").hasClass("checked")){
			$(".evnt_g7 .price_view > img").hide();
			$(".evnt_g7 .price_view > .img06").show();
		}else if($(".month30").hasClass("checked") && $(".usim_11g_300m").hasClass("checked")){
			$(".evnt_g7 .price_view > img").hide();
			$(".evnt_g7 .price_view > .img07").show();
		}else if($(".month30").hasClass("checked") && $(".usim_infinite").hasClass("checked")){
			$(".evnt_g7 .price_view > img").hide();
			$(".evnt_g7 .price_view > .img08").show();
		}else if($(".month36").hasClass("checked") && $(".usim_3g_200m").hasClass("checked")){
			$(".evnt_g7 .price_view > img").hide();
			$(".evnt_g7 .price_view > .img09").show();
		}else if($(".month36").hasClass("checked") && $(".usim_6g_250m").hasClass("checked")){
			$(".evnt_g7 .price_view > img").hide();
			$(".evnt_g7 .price_view > .img10").show();
		}else if($(".month36").hasClass("checked") && $(".usim_11g_300m").hasClass("checked")){
			$(".evnt_g7 .price_view > img").hide();
			$(".evnt_g7 .price_view > .img11").show();
		}else if($(".month36").hasClass("checked") && $(".usim_infinite").hasClass("checked")){
			$(".evnt_g7 .price_view > img").hide();
			$(".evnt_g7 .price_view > .img12").show();


		}else if($(".self").hasClass("checked") && $(".usim_3g_200m").hasClass("checked")){
			$(".evnt_g7 .price_view > img").hide();
			$(".evnt_g7 .price_view > .img13").show();
		}else if($(".self").hasClass("checked") && $(".usim_6g_250m").hasClass("checked")){
			$(".evnt_g7 .price_view > img").hide();
			$(".evnt_g7 .price_view > .img14").show();
		}else if($(".self").hasClass("checked") && $(".usim_11g_300m").hasClass("checked")){
			$(".evnt_g7 .price_view > img").hide();
			$(".evnt_g7 .price_view > .img15").show();
		}else if($(".self").hasClass("checked") && $(".usim_infinite").hasClass("checked")){
			$(".evnt_g7 .price_view > img").hide();
			$(".evnt_g7 .price_view > .img16").show();
		};

		if($(".self").hasClass("checked")){
			$(".evnt_g7 .evnt_section03 .btn_wrp a").hide();
			$(".evnt_g7 .evnt_section03 .btn_wrp .btn_lnk01").show();
			$(".evnt_g7 .price_chk .gs25").show();
			$(".evnt_g7 .price_chk .freely").hide();
		}else {
			$(".evnt_g7 .evnt_section03 .btn_wrp a").hide();
			$(".evnt_g7 .evnt_section03 .btn_wrp .btn_lnk02").show();
			$(".evnt_g7 .price_chk .gs25").hide();
			$(".evnt_g7 .price_chk .freely").show();
		};
	});
});

// 180719 휴대폰 특가전
$(function() {
	$('.event_get_item').find('.lnk').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		var href = $(this).attr('href');
		$('.event_get_item').find('.gi_view_cont').hide();
		$(href).show();
		$('html, body').animate({
			scrollTop: $(href).offset().top - 100
		}, 300);
	});
});

// 180807 갤럭시노트9 사전예약
$(function(){
	$(document).on("change", ".event_galaxynote9_reserve input[type='radio']", function() {
		// 24개월
		if($(".month24").hasClass("checked") && $(".usim_3g_200m").hasClass("checked")){
			$(".event_galaxynote9_reserve .price_view img").hide();
			$(".event_galaxynote9_reserve .price_view .img01").show();
		}else if($(".month24").hasClass("checked") && $(".usim_6g_250m").hasClass("checked")){
			$(".event_galaxynote9_reserve .price_view img").hide();
			$(".event_galaxynote9_reserve .price_view .img02").show();
		}else if($(".month24").hasClass("checked") && $(".usim_11g_300m").hasClass("checked")){
			$(".event_galaxynote9_reserve .price_view img").hide();
			$(".event_galaxynote9_reserve .price_view .img03").show();
		}else if($(".month24").hasClass("checked") && $(".usim_infinite").hasClass("checked")){
			$(".event_galaxynote9_reserve .price_view img").hide();
			$(".event_galaxynote9_reserve .price_view .img04").show();
		// 30개월
		}else if($(".month30").hasClass("checked") && $(".usim_3g_200m").hasClass("checked")){
			$(".event_galaxynote9_reserve .price_view img").hide();
			$(".event_galaxynote9_reserve .price_view .img05").show();
		}else if($(".month30").hasClass("checked") && $(".usim_6g_250m").hasClass("checked")){
			$(".event_galaxynote9_reserve .price_view img").hide();
			$(".event_galaxynote9_reserve .price_view .img06").show();
		}else if($(".month30").hasClass("checked") && $(".usim_11g_300m").hasClass("checked")){
			$(".event_galaxynote9_reserve .price_view img").hide();
			$(".event_galaxynote9_reserve .price_view .img07").show();
		}else if($(".month30").hasClass("checked") && $(".usim_infinite").hasClass("checked")){
			$(".event_galaxynote9_reserve .price_view img").hide();
			$(".event_galaxynote9_reserve .price_view .img08").show();
		// 36개월
		}else if($(".month36").hasClass("checked") && $(".usim_3g_200m").hasClass("checked")){
			$(".event_galaxynote9_reserve .price_view img").hide();
			$(".event_galaxynote9_reserve .price_view .img09").show();
		}else if($(".month36").hasClass("checked") && $(".usim_6g_250m").hasClass("checked")){
			$(".event_galaxynote9_reserve .price_view img").hide();
			$(".event_galaxynote9_reserve .price_view .img10").show();
		}else if($(".month36").hasClass("checked") && $(".usim_11g_300m").hasClass("checked")){
			$(".event_galaxynote9_reserve .price_view img").hide();
			$(".event_galaxynote9_reserve .price_view .img11").show();
		}else if($(".month36").hasClass("checked") && $(".usim_infinite").hasClass("checked")){
			$(".event_galaxynote9_reserve .price_view img").hide();
			$(".event_galaxynote9_reserve .price_view .img12").show();
		// 즉시결제
		}else if($(".now").hasClass("checked") && $(".usim_3g_200m").hasClass("checked")){
			$(".event_galaxynote9_reserve .price_view img").hide();
			$(".event_galaxynote9_reserve .price_view .img13").show();
		}else if($(".now").hasClass("checked") && $(".usim_6g_250m").hasClass("checked")){
			$(".event_galaxynote9_reserve .price_view img").hide();
			$(".event_galaxynote9_reserve .price_view .img14").show();
		}else if($(".now").hasClass("checked") && $(".usim_11g_300m").hasClass("checked")){
			$(".event_galaxynote9_reserve .price_view img").hide();
			$(".event_galaxynote9_reserve .price_view .img15").show();
		}else if($(".now").hasClass("checked") && $(".usim_infinite").hasClass("checked")){
			$(".event_galaxynote9_reserve .price_view img").hide();
			$(".event_galaxynote9_reserve .price_view .img16").show();
		}
	});

	// 플로팅 배너
	var filter = "win16|win32|win64|mac";
	if (navigator.platform) {
		if(0 <= filter.indexOf(navigator.platform.toLowerCase())){
			if ($('.event_GN9').length) {
				var pcincontent = $('.event_GN9').offset().top;
				var snspst = $('#footer').offset().top;
				var qick = snspst - 900;
				var pcviewH = pcincontent - 200;
				var contHieht = $('.event_GN9').height() - 550;

				$(window).scroll(function() {
					var scrTop = $(window).scrollTop();
					var targetTop = (scrTop - pcviewH) + 10;

					if (pcviewH - scrTop <= 0) {
						$('.quick_sns').css('top', targetTop + 'px');
					} else {
						$('.quick_sns').css('top', '200px');
					}

					if (scrTop >= qick) {
						$('.quick_sns').css('top', contHieht + 'px');
					}
				});
			}
		}
	}

});

// 181015 LGV40 사전예약
$(function(){
	$(document).on("change", ".event_lg_v40 input[type='radio']", function() {
		// 24개월
		if($(".month24").hasClass("checked") && $(".usim_infinite").hasClass("checked")){
			$(".event_lg_v40 .price_view img").hide();
			$(".event_lg_v40 .price_view .img01").show();
		}else if($(".month24").hasClass("checked") && $(".usim_3g_200m").hasClass("checked")){
			$(".event_lg_v40 .price_view img").hide();
			$(".event_lg_v40 .price_view .img02").show();
		}else if($(".month24").hasClass("checked") && $(".usim_6g_250m").hasClass("checked")){
			$(".event_lg_v40 .price_view img").hide();
			$(".event_lg_v40 .price_view .img03").show();
		}else if($(".month24").hasClass("checked") && $(".usim_11g_300m").hasClass("checked")){
			$(".event_lg_v40 .price_view img").hide();
			$(".event_lg_v40 .price_view .img04").show();
		// 30개월
		}else if($(".month30").hasClass("checked") && $(".usim_infinite").hasClass("checked")){
			$(".event_lg_v40 .price_view img").hide();
			$(".event_lg_v40 .price_view .img05").show();
		}else if($(".month30").hasClass("checked") && $(".usim_3g_200m").hasClass("checked")){
			$(".event_lg_v40 .price_view img").hide();
			$(".event_lg_v40 .price_view .img06").show();
		}else if($(".month30").hasClass("checked") && $(".usim_6g_250m").hasClass("checked")){
			$(".event_lg_v40 .price_view img").hide();
			$(".event_lg_v40 .price_view .img07").show();
		}else if($(".month30").hasClass("checked") && $(".usim_11g_300m").hasClass("checked")){
			$(".event_lg_v40 .price_view img").hide();
			$(".event_lg_v40 .price_view .img08").show();
		// 36개월
		}else if($(".month36").hasClass("checked") && $(".usim_infinite").hasClass("checked")){
			$(".event_lg_v40 .price_view img").hide();
			$(".event_lg_v40 .price_view .img09").show();
		}else if($(".month36").hasClass("checked") && $(".usim_3g_200m").hasClass("checked")){
			$(".event_lg_v40 .price_view img").hide();
			$(".event_lg_v40 .price_view .img10").show();
		}else if($(".month36").hasClass("checked") && $(".usim_6g_250m").hasClass("checked")){
			$(".event_lg_v40 .price_view img").hide();
			$(".event_lg_v40 .price_view .img11").show();
		}else if($(".month36").hasClass("checked") && $(".usim_11g_300m").hasClass("checked")){
			$(".event_lg_v40 .price_view img").hide();
			$(".event_lg_v40 .price_view .img12").show();
		}
	});

	// 플로팅 배너
	var filter = "win16|win32|win64|mac";
	if (navigator.platform) {
		if(0 <= filter.indexOf(navigator.platform.toLowerCase())){
			if ($('.event_LGV40').length) {
				var pcincontent = $('.event_LGV40').offset().top;
				var snspst = $('#footer').offset().top;
				var qick = snspst - 900;
				var pcviewH = pcincontent - 200;
				var contHieht = $('.event_LGV40').height() - 550;

				$(window).scroll(function() {
					var scrTop = $(window).scrollTop();
					var targetTop = (scrTop - pcviewH) + 10;

					if (pcviewH - scrTop <= 0) {
						$('.quick_sns').css('top', targetTop + 'px');
					} else {
						$('.quick_sns').css('top', '200px');
					}

					if (scrTop >= qick) {
						$('.quick_sns').css('top', contHieht + 'px');
					}
				});
			}
		}
	}

});

//기획전
$(function(){
	//기획전 사용가능 휴대폰 조회
	$('.applyEvnt').on("click",function () {
		var valueList = $(this).attr('data-val').split(",");
		var bestYn = ($(this).parent().parent().hasClass('bestUsimNew'))?'Y':'N';
		fn_applyEvnt(valueList[0],valueList[1],valueList[2],valueList[3],bestYn);	// mgmYn값 추가 190805
	});
});

function fn_applyEvnt(ppnCd, selectedSn, opmktCd, mgmYn, bestYn) {
	/*
	 * ppnCd : 요금제 코드
	 * selectedSn : 이벤트 번호
	 * opmktCd : 오픈마켓 코드
	 * mgmYn값 추가 190805 (mgmYn : Y 일때만 mgm 이벤트)
	 * bestYn : BEST요금제 190905
	 */

	if(selectedSn != $('#selectedSn').val() ) {
		alert("이벤트 번호 설정 확인이 필요합니다.\n관리자에서 확인 후 다시 시도해주세요.");
		return;
	} else {
		var agentMobYn = fn_deviceChk();

		//모바일
		if(agentMobYn == 'Y'){
			if(mgmYn=="Y"){
				location.href = "/shop/cc/applyEvnt.mhp?ppnCd="+ppnCd+"&selectedSn="+selectedSn+"&opmktCd="+opmktCd+"&mgmYn=Y"+"&bestYn="+bestYn;
			}else{
				location.href = "/shop/cc/applyEvnt.mhp?ppnCd="+ppnCd+"&selectedSn="+selectedSn+"&opmktCd="+opmktCd+"&bestYn="+bestYn;
			}
		}else{
			if(mgmYn=="Y"){
				window.open('/shop/cc/applyEvnt.mhp?ppnCd='+ppnCd+'&selectedSn='+selectedSn+"&opmktCd="+opmktCd+"&mgmYn=Y"+"&bestYn="+bestYn, 'applyGsUsimPop', 'width=670, height=430, top=0, left=0, scrollbars=yes');
			}else{
				window.open('/shop/cc/applyEvnt.mhp?ppnCd='+ppnCd+'&selectedSn='+selectedSn+"&opmktCd="+opmktCd+"&bestYn="+bestYn, 'applyGsUsimPop', 'width=670, height=430, top=0, left=0, scrollbars=yes');
			}
		}
	}
}

// 추석맞이 이벤트
$(function() {
	$('.event_chsk').on('click', function() {
		alert('9월 11일 부터 구매 가능합니다.');
		return false;
	});
});

// S10 사전예약
$(function(){
	$(document).on("change", ".event_s10 input[type='radio']", function() {
		// 24개월
		if($(".month24").hasClass("checked") && $(".plan_free").hasClass("checked")){
			$(".event_s10 .s10_planview img").hide();
			$(".event_s10 .s10_planview .img01").show();
		}else if($(".month24").hasClass("checked") && $(".plan_3gb_200").hasClass("checked")){
			$(".event_s10 .s10_planview img").hide();
			$(".event_s10 .s10_planview .img02").show();
		}else if($(".month24").hasClass("checked") && $(".plan_6gb_250").hasClass("checked")){
			$(".event_s10 .s10_planview img").hide();
			$(".event_s10 .s10_planview .img03").show();
		}else if($(".month24").hasClass("checked") && $(".plan_15gb_100").hasClass("checked")){
			$(".event_s10 .s10_planview img").hide();
			$(".event_s10 .s10_planview .img04").show();
		// 30개월
		}else if($(".month30").hasClass("checked") && $(".plan_free").hasClass("checked")){
			$(".event_s10 .s10_planview img").hide();
			$(".event_s10 .s10_planview .img05").show();
		}else if($(".month30").hasClass("checked") && $(".plan_3gb_200").hasClass("checked")){
			$(".event_s10 .s10_planview img").hide();
			$(".event_s10 .s10_planview .img06").show();
		}else if($(".month30").hasClass("checked") && $(".plan_6gb_250").hasClass("checked")){
			$(".event_s10 .s10_planview img").hide();
			$(".event_s10 .s10_planview .img07").show();
		}else if($(".month30").hasClass("checked") && $(".plan_15gb_100").hasClass("checked")){
			$(".event_s10 .s10_planview img").hide();
			$(".event_s10 .s10_planview .img08").show();
		// 36개월
		}else if($(".month36").hasClass("checked") && $(".plan_free").hasClass("checked")){
			$(".event_s10 .s10_planview img").hide();
			$(".event_s10 .s10_planview .img09").show();
		}else if($(".month36").hasClass("checked") && $(".plan_3gb_200").hasClass("checked")){
			$(".event_s10 .s10_planview img").hide();
			$(".event_s10 .s10_planview .img10").show();
		}else if($(".month36").hasClass("checked") && $(".plan_6gb_250").hasClass("checked")){
			$(".event_s10 .s10_planview img").hide();
			$(".event_s10 .s10_planview .img11").show();
		}else if($(".month36").hasClass("checked") && $(".plan_15gb_100").hasClass("checked")){
			$(".event_s10 .s10_planview img").hide();
			$(".event_s10 .s10_planview .img12").show();
		}
	});

	// 플로팅 배너
	var filter = "win16|win32|win64|mac";
	if (navigator.platform) {
		if(0 <= filter.indexOf(navigator.platform.toLowerCase())){
			if ($('.event_s10').length) {
				var pcincontent = $('.event_s10').offset().top;
				var snspst = $('#footer').offset().top;
				var qick = snspst - 900;
				var pcviewH = pcincontent - 200;
				var contHieht = $('.event_s10').height() - 550;

				$(window).scroll(function() {
					var scrTop = $(window).scrollTop();
					var targetTop = (scrTop - pcviewH) + 10;

					if (pcviewH - scrTop <= 0) {
						$('.event_s10 .quick').css('top', targetTop + 'px');
					} else {
						$('.event_s10 .quick').css('top', '200px');
					}

					if (scrTop >= qick) {
						$('.event_s10 .quick').css('top', contHieht + 'px');
					}
				});
			}
		}
	}

});


// 이벤트 tab
$(function(){
	$('.event_tabs').each(function(){
		var $active, $content, $links = $(this).find('a');

		$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
		$active.addClass('on');
		$content = $($active.attr('href'));

		$links.not($active).each(function () {
			$($(this).attr('href')).hide();
		});
		$(this).on('click', 'a', function(e){
			$active.removeClass('on');
			$content.hide();

			$active = $(this);
			$content = $($(this).attr('href'));

			$active.addClass('on');
			$content.show();

			e.preventDefault();
		});
	});
});

// g8 사전예약
$(function(){
	$(document).on("change", ".event_g8 input[type='radio']", function() {
		// 24개월
		if($(".month24").hasClass("checked") && $(".plan_free").hasClass("checked")){
			$(".event_g8 .g8_planview img").hide();
			$(".event_g8 .g8_planview .img01").show();
		}else if($(".month24").hasClass("checked") && $(".plan_3gb_200").hasClass("checked")){
			$(".event_g8 .g8_planview img").hide();
			$(".event_g8 .g8_planview .img02").show();
		}else if($(".month24").hasClass("checked") && $(".plan_6gb_250").hasClass("checked")){
			$(".event_g8 .g8_planview img").hide();
			$(".event_g8 .g8_planview .img03").show();
		}else if($(".month24").hasClass("checked") && $(".plan_15gb_100").hasClass("checked")){
			$(".event_g8 .g8_planview img").hide();
			$(".event_g8 .g8_planview .img04").show();
		// 30개월
		}else if($(".month30").hasClass("checked") && $(".plan_free").hasClass("checked")){
			$(".event_g8 .g8_planview img").hide();
			$(".event_g8 .g8_planview .img05").show();
		}else if($(".month30").hasClass("checked") && $(".plan_3gb_200").hasClass("checked")){
			$(".event_g8 .g8_planview img").hide();
			$(".event_g8 .g8_planview .img06").show();
		}else if($(".month30").hasClass("checked") && $(".plan_6gb_250").hasClass("checked")){
			$(".event_g8 .g8_planview img").hide();
			$(".event_g8 .g8_planview .img07").show();
		}else if($(".month30").hasClass("checked") && $(".plan_15gb_100").hasClass("checked")){
			$(".event_g8 .g8_planview img").hide();
			$(".event_g8 .g8_planview .img08").show();
		// 36개월
		}else if($(".month36").hasClass("checked") && $(".plan_free").hasClass("checked")){
			$(".event_g8 .g8_planview img").hide();
			$(".event_g8 .g8_planview .img09").show();
		}else if($(".month36").hasClass("checked") && $(".plan_3gb_200").hasClass("checked")){
			$(".event_g8 .g8_planview img").hide();
			$(".event_g8 .g8_planview .img10").show();
		}else if($(".month36").hasClass("checked") && $(".plan_6gb_250").hasClass("checked")){
			$(".event_g8 .g8_planview img").hide();
			$(".event_g8 .g8_planview .img11").show();
		}else if($(".month36").hasClass("checked") && $(".plan_15gb_100").hasClass("checked")){
			$(".event_g8 .g8_planview img").hide();
			$(".event_g8 .g8_planview .img12").show();
		}
	});

	// 플로팅 배너
	var filter = "win16|win32|win64|mac";
	if (navigator.platform) {
		if(0 <= filter.indexOf(navigator.platform.toLowerCase())){
			if ($('.event_g8').length) {
				var pcincontent = $('.event_g8').offset().top;
				var snspst = $('#footer').offset().top;
				var qick = snspst - 900;
				var pcviewH = pcincontent - 200;
				var contHieht = $('.event_g8').height() - 550;

				$(window).scroll(function() {
					var scrTop = $(window).scrollTop();
					var targetTop = (scrTop - pcviewH) + 10;

					if (pcviewH - scrTop <= 0) {
						$('.event_g8 .quick').css('top', targetTop + 'px');
					} else {
						$('.event_g8 .quick').css('top', '200px');
					}

					if (scrTop >= qick) {
						$('.event_g8 .quick').css('top', contHieht + 'px');
					}
				});
			}
		}
	}

});


//한눈에 보기 팝업
function isMobile(){
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
if (isMobile()){
	// mobile
	function homeEventPopup(){
		window.open("/shop/cc/evntContentPop.mhp?dv=homeplus", "_blank", "width=auto, height=auto, left=0, top=0");
	}
	function gs25EventPopup(){
		window.open("/shop/cc/evntContentPop.mhp?dv=gs25", "_blank", "width=auto, height=auto, left=0, top=0");
	}
	function hlsEventPopup(){
		window.open("/shop/cc/siwonschoolContentPop.mhp", "_blank", "width=auto, height=auto, left=0, top=0, scrollbars=yes");
	}
}else{
	// web
	function homeEventPopup(){
		window.open("/shop/cc/evntContentPop.mhp?dv=homeplus", "_blank", "width=700px, height=700, left=100, top=50");
	}
	function gs25EventPopup(){
		window.open("/shop/cc/evntContentPop.mhp?dv=gs25", "_blank", "width=700px, height=758, left=100, top=50");
	}
	function hlsEventPopup(){
		window.open("/shop/cc/siwonschoolContentPop.mhp", "_blank", "width=718px, height=781, left=100, top=50, scrollbars=yes");
	}
}

$(function(){
	//gs25 이미지 다운
	$(".btn_gsdown").click(function(){
		alert("이미지가 저장되었습니다.");
	});
	//홈플러스 새창 팝업
	$(".event_homePop").click(function(){
		homeEventPopup();
	});
	//GS25 새창 팝업
	$(".event_gs25Pop").click(function(){
		gs25EventPopup();
	});
	//홈플러스 카카오스토리
	$(".btn_homeKakao").click(function(){
		sendLink();
	});
	//홈플러스 URL 복사
	$(".btn_homeCopy").click(function(){
		fnClipUrl();
	});
	//제휴경품이벤트 새창 팝업
	$(".event_hlsPop").click(function(){
		hlsEventPopup();
	});
});


//골든타임 시간설정
var dateType01_17 = new Date("2019/04/17 11:00:00");
var dateType02_17 = new Date("2019/04/17 14:00:00");
var dateType03_17 = new Date("2019/04/17 16:00:00");

var dateType01_18 = new Date("2019/04/18 11:00:00");
var dateType02_18 = new Date("2019/04/18 14:00:00");
var dateType03_18 = new Date("2019/04/18 16:00:00");

var dateType01_19 = new Date("2019/04/19 11:00:00");
var dateType02_19 = new Date("2019/04/19 14:00:00");
var dateType03_19 = new Date("2019/04/19 16:00:00");

var dateType01_22 = new Date("2019/04/22 11:00:00");
var dateType02_22 = new Date("2019/04/22 14:00:00");
var dateType03_22 = new Date("2019/04/22 16:00:00");

var dateType01_23 = new Date("2019/04/23 11:00:00");
var dateType02_23 = new Date("2019/04/23 14:00:00");
var dateType03_23 = new Date("2019/04/23 16:00:00");

var dateType01_24 = new Date("2019/04/24 11:00:00");
var dateType02_24 = new Date("2019/04/24 14:00:00");
var dateType03_24 = new Date("2019/04/24 16:00:00");

var dateType01_25 = new Date("2019/04/25 11:00:00");
var dateType02_25 = new Date("2019/04/25 14:00:00");
var dateType03_25 = new Date("2019/04/25 16:00:00");

var dateType01_26 = new Date("2019/04/26 11:00:00");
var dateType02_26 = new Date("2019/04/26 14:00:00");
var dateType03_26 = new Date("2019/04/26 16:00:00");

var dateType01_29 = new Date("2019/04/29 11:00:00");
var dateType02_29 = new Date("2019/04/29 14:00:00");
var dateType03_29 = new Date("2019/04/29 16:00:00");

var dateType01_30 = new Date("2019/04/30 11:00:00");
var dateType02_30 = new Date("2019/04/30 14:00:00");
var dateType03_30 = new Date("2019/04/30 16:00:00");

var dateEnd17 = new Date("2019/04/18 09:00:00");
var dateEnd18 = new Date("2019/04/19 09:00:00");
var dateEnd19 = new Date("2019/04/22 09:00:00");
var dateEnd22 = new Date("2019/04/23 09:00:00");
var dateEnd23 = new Date("2019/04/24 09:00:00");
var dateEnd24 = new Date("2019/04/25 09:00:00");
var dateEnd25 = new Date("2019/04/26 09:00:00");
var dateEnd26 = new Date("2019/04/29 09:00:00");
var dateEnd29 = new Date("2019/04/30 09:00:00");
var dateEnd30 = new Date("2019/05/01 09:00:00");

$(function(){

	if(Date.now() >= dateType01_17 && Date.now() <= dateEnd17){
		$("#eventThumb01").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType02_17 && Date.now() <= dateEnd17){
		$("#eventThumb02").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType03_17 && Date.now() <= dateEnd17){
		$("#eventThumb03").children(".evt_close").css("display","block");
	}

	if(Date.now() >= dateType01_18 && Date.now() <= dateEnd18){
		$("#eventThumb01").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType02_18 && Date.now() <= dateEnd18){
		$("#eventThumb02").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType03_18 && Date.now() <= dateEnd18){
		$("#eventThumb03").children(".evt_close").css("display","block");
	}

	if(Date.now() >= dateType01_19 && Date.now() <= dateEnd19){
		$("#eventThumb01").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType02_19 && Date.now() <= dateEnd19){
		$("#eventThumb02").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType03_19 && Date.now() <= dateEnd19){
		$("#eventThumb03").children(".evt_close").css("display","block");
	}

	if(Date.now() >= dateType01_22 && Date.now() <= dateEnd22){
		$("#eventThumb01").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType02_22 && Date.now() <= dateEnd22){
		$("#eventThumb02").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType03_22 && Date.now() <= dateEnd22){
		$("#eventThumb03").children(".evt_close").css("display","block");
	}

	if(Date.now() >= dateType01_23 && Date.now() <= dateEnd23){
		$("#eventThumb01").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType02_23 && Date.now() <= dateEnd23){
		$("#eventThumb02").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType03_23 && Date.now() <= dateEnd23){
		$("#eventThumb03").children(".evt_close").css("display","block");
	}

	if(Date.now() >= dateType01_24 && Date.now() <= dateEnd24){
		$("#eventThumb01").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType02_24 && Date.now() <= dateEnd24){
		$("#eventThumb02").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType03_24 && Date.now() <= dateEnd24){
		$("#eventThumb03").children(".evt_close").css("display","block");
	}

	if(Date.now() >= dateType01_25 && Date.now() <= dateEnd25){
		$("#eventThumb01").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType02_25 && Date.now() <= dateEnd25){
		$("#eventThumb02").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType03_25 && Date.now() <= dateEnd25){
		$("#eventThumb03").children(".evt_close").css("display","block");
	}

	if(Date.now() >= dateType01_26 && Date.now() <= dateEnd26){
		$("#eventThumb01").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType02_26 && Date.now() <= dateEnd26){
		$("#eventThumb02").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType03_26 && Date.now() <= dateEnd26){
		$("#eventThumb03").children(".evt_close").css("display","block");
	}

	if(Date.now() >= dateType01_29 && Date.now() <= dateEnd29){
		$("#eventThumb01").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType02_29 && Date.now() <= dateEnd29){
		$("#eventThumb02").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType03_29 && Date.now() <= dateEnd29){
		$("#eventThumb03").children(".evt_close").css("display","block");
	}

	if(Date.now() >= dateType01_30 && Date.now() <= dateEnd30){
		$("#eventThumb01").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType02_30 && Date.now() <= dateEnd30){
		$("#eventThumb02").children(".evt_close").css("display","block");
	}
	if(Date.now() >= dateType03_30 && Date.now() <= dateEnd30){
		$("#eventThumb03").children(".evt_close").css("display","block");
	}

});

//단말 이벤트 간편신청
$(function(){
	$('.phone_list .radio_chk li').on('click', function(){

		var $index = $(this).index();

		$(this).siblings('li').removeClass('checked');
		$(this).addClass('checked');

		$(this).closest('.phone_list').find('.phone_planview').children('img').siblings('img').removeClass('on');
		$(this).closest('.phone_list').find('.phone_planview').children('img').eq($index).addClass('on');

	});

});


//이벤트 스크롤 fixed
$(function(){

	var eventWidth = $(window).width();
	var tabHeight = $('.event_tabCont').height();

	tabH();

	$('.event_focus_type02').on('click', function(event) {
		event.preventDefault();
		var href = $(this).attr('href');
		var $MheaderH = $('.sub_top').outerHeight();
		var $tabNav = $('.event_freedataWrap .fixed_wrap').outerHeight();

		if(eventWidth > 600) {
			$('html, body').animate({
				scrollTop: $(href).offset().top - 160
			});
		};

		if(eventWidth < 768){
			$('html, body').animate({
				scrollTop: $(href).offset().top - ($MheaderH + $tabNav)
			});
		}
	});


	if ($(".event_freedataWrap").length){

		$(window).on('scroll', function(){
			var $scrollTp = $(window).scrollTop();
			var $eventContBox = $(".event_freedataWrap").height();
			var $PheaderH = $('.header_area.fixe').outerHeight();
			var $PeventTopBox = $(".event_freedataWrap").offset().top - $PheaderH;

			var $MheaderH = $('.sub_top').outerHeight();
			var $MeventTopBox = $(".event_freedataWrap").offset().top - $MheaderH;

			if ($scrollTp >= $PeventTopBox == $scrollTp <= $eventContBox){
				$('.fixed_wrap').addClass('event_fix');
			}else{
				$('.fixed_wrap').removeClass('event_fix');
			}

			if(eventWidth < 768){
				if ($scrollTp >= $MeventTopBox == $scrollTp <= $eventContBox){
					$('.fixed_wrap').addClass('event_fix');
				}else{
					$('.fixed_wrap').removeClass('event_fix');
				}
			}
		});
	}



	if(eventWidth < 768){
		 tabH ()
	}

	$(window).on('resize', function(){
		 tabH ()
	});

	function tabH (){
		var $tabNav = $('.event_freedataWrap .fixed_wrap').outerHeight();
		$('.event_freedataWrap').css({'padding-top': $tabNav + 'px' })
	};

});

// mgm 개편 이벤트
$(function(){
	if ($('.section_tit').length){
		$(window).scroll(function(){
			$('.comd_cnt .section_tit').each(function(){
				var $targetP = $(this).offset().top;
				var $thisH = $(this).height();

				if ($(window).scrollTop() >= $targetP -150 ){
					$(this).addClass('on')
				}else {
					$(this).removeClass('on')
				}
			});
		});
	}

	$('.comnd_friend .btn_instantly').on('click', function(){

		var $target = $(this).attr('href');
		var $offst = $($target).offset().top;

		$('html, body').animate({scrollTop : $offst-80}, 600);

	});

});

// GS25 개편
$(function(){

	$('.btn_gs_video').on('click', function(e){
		var $href = $(this).attr('href');
	        layerEventPop($href);
	    	e.preventDefault();
	});

	if ($(".gs25_wrap").length){
		var gsContent = $('.gs25_wrap').offset().top;
		var footerArea = $('#footer').offset().top;
		var gsPcheight = gsContent + 60;

		$(window).on('scroll', function(){

			var gsWrapH = $('.gs25_wrap').outerHeight();
			var gsScrTop = $(window).scrollTop();
			var gsTargetTop = (gsScrTop - gsPcheight) + 448;

			if (gsPcheight - gsScrTop <= 0) {
				$('.gs25_wrap .quick_banner').css('top', gsTargetTop + 'px');
			} else {
				$('.gs25_wrap .quick_banner').css('top', '460px');
			}
			if (gsScrTop >= gsWrapH) {
				$('.gs25_wrap .quick_banner').css('top','100px');
			}

		});
	}

	if ($(".event_com_js").length){
		var gsContent = $('.event_com_js').offset().top;
		var footerArea = $('#footer').offset().top;
		var gsPcheight = gsContent + 60;

		$(window).on('scroll', function(){

			var gsWrapH = $('.event_com_js').outerHeight();
			var gsScrTop = $(window).scrollTop();
			var gsTargetTop = (gsScrTop - gsPcheight) + 448;

			if (gsPcheight - gsScrTop <= 0) {
				$('.event_com_js .quick_banner').css('top', gsTargetTop + 'px');
			} else {
				$('.event_com_js .quick_banner').css('top', '460px');
			}
			if (gsScrTop >= gsWrapH) {
				$('.event_com_js .quick_banner').css('top','100px');
			}

		});
	}

	if ($(".event_540").length){
		var gsContent = $('.event_540').offset().top;
		var footerArea = $('#footer').offset().top;
		var gsPcheight = gsContent + 60;

		$(window).on('scroll', function(){

			var gsWrapH = $('.event_540').outerHeight();
			var gsScrTop = $(window).scrollTop();
			var gsTargetTop = (gsScrTop - gsPcheight) + 448;

			if (gsPcheight - gsScrTop <= 0) {
				$('.event_540 .quick_banner').css('top', gsTargetTop + 'px');
			} else {
				$('.event_540 .quick_banner').css('top', '430px');
			}
			if (gsScrTop >= gsWrapH) {
				$('.event_540 .quick_banner').css('top','100px');
			}

		});
	}

	if ($(".jehu_wrap").length){
		var comContent = $('.jehu_wrap').offset().top;
		var quickTop = $('.quick_banner').offset().top;
		var comPcheight = comContent + 60;


		$(window).on('scroll', function(){

			var comWrapH = $('.jehu_wrap').outerHeight();
			var comScrTop = $(window).scrollTop();
			var comTargetTop = (comScrTop - comPcheight) + 448;

			if (comPcheight - comScrTop <= 0) {
				$('.jehu_wrap .quick_banner').css('top', comTargetTop + 'px');
			} else {
				$('.jehu_wrap .quick_banner').css('top', '460px');
			}
			if (comScrTop >= comWrapH) {
				$('.jehu_wrap .quick_banner').css('top','100px');
			}

		});

	}

	$(".gs_store").click(function(){
		gsStorePopup();
	});
	function gsStorePopup(){
		window.open("https://gs25.uplussave.com/prtn/gs25/shopSearchPop.mhp", "_blank", "width=1000px, height=800, left=100, top=50");
	}
	$(".homeplus_store").click(function(){
		homeplusStorePopup();
	});
	function homeplusStorePopup(){
		window.open("https://homeplus.uplussave.com/prtn/hp/shopSearchPop.mhp", "_blank", "width=1000px, height=800, left=100, top=50");
	}
	$(".lalavla_store").click(function(){
		lalavlaStorePopup();
	});
	function lalavlaStorePopup(){
		window.open("https://lalavla.uplussave.com/prtn/lv/shopSearchPop.mhp", "_blank", "width=1000px, height=800, left=100, top=50");
	}

});

function layerEventPop(eventpop){

    var $eventpop = $(eventpop);
    $eventpop.addClass('on');
    $('#msk').show();

	function gsMobile(){
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}
	if (gsMobile()){
		$eventpop.css({
	        "top": (($(window).height()-$eventpop.outerHeight())/2+$(window).scrollTop())+"px",
	        "left": (($(window).width()-$eventpop.outerWidth())/2+$(window).scrollLeft())+"px"
	    });

	}
    $('a.close_video').click(function(){
    	$eventpop.removeClass("on");
   		$(this).parent(".video_gs").removeClass("on");
		$(this).prev(".video_inner").find("iframe")[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
		$('#msk').hide();

    });
}

//이벤트 WHY 공통
$(function(){

	if ($('.event_why_wrap .why_slide').length){
		$('.event_why_wrap .why_slide').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: false
		});
	}

});

//벨벳을 사야 하는 이유
$(function(){

	if ($('.event_velet_wrap .velet_slide').length){
		$('.event_velet_wrap .velet_slide').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
			dots: true,

		});
	}

});


//외국어 선불
$(function(){

	var tabindex = 0;

	$('.tabbox .tab_list li').click(function(){

		tabindex = $(this).index();
		$('.tabbox .tab_list li').each(function(idx){
			$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_off','_on'));
			if(tabindex != idx){
				$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_on','_off'));
			}
		});
		$('.tabbox .contbx').eq(tabindex).addClass('on').siblings('.contbx').removeClass('on');

	});
	$(".eng_pop01").click(function(){
		engPopup01();
	});
	$(".eng_pop02").click(function(){
		engPopup02();
	});
	$(".eng_pop03").click(function(){
		engPopup03();
	});
	$(".kor_pop01").click(function(){
		korPopup01();
	});
	$(".kor_pop02").click(function(){
		korPopup02();
	});
	$(".zho_pop01").click(function(){
		zhoPopup01();
	});
	$(".singup_en").click(function(){
		singup_en();
	});
	$(".singup_zh").click(function(){
		singup_zh();
	});
	$(".singup_en_mo").click(function(){
		singup_en_mo();
	});
	$(".singup_zh_mo").click(function(){
		singup_zh_mo();
	});
	function engPopup01(){
		window.open("https://foreign.uplussave.com/fnr/telCnslPop.mhp?lang=eng", "_blank", "width=657px, height=750, left=100, top=50");
	}
	function engPopup02(){
		window.open("https://foreign.uplussave.com/fnr/serviceablePhone.mhp?lang=eng", "_blank", "width=1018px, height=800, left=100, top=50");
	}
	function engPopup03(){
		window.open("https://pps.uplussave.com/prepay/popup/ppInterCallPrice.mpp?lang=eng", "_blank", "width=1018px, height=800, left=100, top=50");
	}
	function korPopup01(){
		window.open("https://pps.uplussave.com/prepay/popup/ppServiceablePhonePop.mpp", "_blank", "width=1002px, height=770, left=100, top=50");
	}
	function korPopup02(){
		window.open("https://pps.uplussave.com/prepay/popup/ppInterCallPrice.mpp", "_blank", "width=1018px, height=900, left=100, top=50");
	}
	function zhoPopup01(){
		window.open("https://foreign.uplussave.com/fnr/serviceablePhone.mhp?lang=zho", "_blank", "width=1018px, height=900, left=100, top=50");
	}
	function singup_en(){
		window.open("https://foreign.uplussave.com/fnr/telCnslPop.mhp?lang=eng", "_blank", "width=657px, height=750, left=100, top=50");
	}
	function singup_zh(){
		window.open("https://foreign.uplussave.com/fnr/telCnslPop.mhp?lang=zho", "_blank", "width=657px, height=750, left=100, top=50");
	}
	function singup_en_mo(){
		window.open("https://foreign.uplussave.com/fnr/telCnslPop.mhp?lang=eng", "_parent", "width=657px, height=750, left=100, top=50");
	}
	function singup_zh_mo(){
		window.open("https://foreign.uplussave.com/fnr/telCnslPop.mhp?lang=zho", "_parent", "width=657px, height=750, left=100, top=50");
	}

	if (location.href.indexOf('foreignerTab1') > 0) {
	 $(".tab_list li:nth-child(1)").click();
	} else if (location.href.indexOf('foreignerTab2') > 0) {
	 $(".tab_list li:nth-child(2)").click();
	} else if (location.href.indexOf('foreignerTab3') > 0) {
	 $(".tab_list li:nth-child(3)").click();
	} else if (location.href.indexOf('foreignerTab4') > 0) {
	 $(".tab_list li:nth-child(4)").click();
	}

});

//법인가입
$(function(){
	$('.event_partnerForm').on('click', function(){
		var href = $(this).attr('href');
		popupEvent(href,'priv','900','800','yes');
		return false;
	});
});

// 아이폰이벤트
$(function(){
	$('.btn_event_view').on('click', function(event){
		event.preventDefault();
		var href = $(this).attr('href');
		$(href).slideToggle();
		$(this).toggleClass('on');
		$('html, body').animate({
			scrollTop: $(href).offset().top - 80
		});
	});
});


//이벤트 414 tab
$(function() {
	$('div.event_tabWrap div.cont').hide();
	$('div.event_tabWrap div.cont:first').show();
	$('div.event_tabWrap .tab_list a:first').addClass('on');

	$('div.event_tabWrap .tab_list a').on('click focus', function(){
		$('div.event_tabWrap .tab_list a').removeClass('on');
		$(this).addClass('on');
		var currentTab = $(this).attr('href');
		$('div.event_tabWrap div.cont').hide();
		$(currentTab).show();
		return false;
	});
 });

 //이벤트 236 스키드
 $(function(){

		$('.nav_box .nav').each(function(i){
			var $navHeight = $(this).outerHeight();

			$(this).closest('.nav_box').css({'height':$navHeight })

			// 메뉴 클릭시 스크롤이동 및 메뉴 on & off
			$('.nav_box li a').on('click', function(){

				var $hdrH = $('.header_area.fixe').outerHeight();
				var $thisH = $(this).closest('.nav_box').outerHeight();

				var $scrolTarget = $(this).data('target');
				var $target = $($scrolTarget).offset().top - ($hdrH + $thisH);

				$('html, body').stop().animate({scrollTop:$target},500);
			});
		});


		$(window).on('scroll', function(){

			var $headerH = $('.header_area.fixe').outerHeight();
			var $scroll = $(window).scrollTop();

			$('.scroll_event').each(function(){
				var $targetP = $(this).offset().top - $headerH;
				var $navH = $(this).prev().find('.nav_box').outerHeight();
				var $hhh = $(this).offset().top - $('.header_area').outerHeight() - $navH;

				if ($scroll >= $hhh){
					$(this).siblings('.scroll_event').removeClass('scroll');
					$(this).addClass('scroll');
				}

				if ($scroll >= $targetP){
					$(this).children('.nav_box').find('.nav').addClass('fixd');
				}else {
					$(this).children('.nav_box').find('.nav').removeClass('fixd');
				}
			});


			// 스크롤시 메뉴 on & off
			 $('.section_box .event_seciton').each(function(){
				// var $scrLnavH = $(this).closest('.section_box').siblings('.nav_box').outerHeight();
				var $scrLnavH = $('.scroll .category_wrap').outerHeight()
				var $navTarget = $(this).attr('id');
				var $navOfst = $('#' + $navTarget).offset().top  - ($headerH + $scrLnavH + 10);
				if ($scroll >= $navOfst ){
				   $('.nav_box li a').removeClass('on')
				   $('.nav_box li a[data-target="#' + $navTarget + '"]').parent('li').children('a').addClass('on');
				}
			 });

		});


	});

 //이벤트 2G 고객 전환
$(function(){
	$("#event2G_folder, #event2G_A10e").on("click", function() {
		var modelCd = $(this).data("seq")	//LM-Y110L  SM-A102N
		window.open("/shop/cc/twoGContentPop.mhp?modelCd="+modelCd,  'popupChk', 'width=830, height=620, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbars=yes');
	})
});

//가족추천 텝
$(function(){
	/* tab */
	var tabClickUI = function() {
		var $this = $(this),
			$thisWrap = $this.parent(),
			$cont = $thisWrap.closest(".tab_wrapbox").find("> .tab_cont");

		$thisWrap.siblings().removeClass('on');
		$thisWrap.addClass('on');

		if( $cont.length > 1 ){
			$cont.removeClass("on");
			$cont.eq($thisWrap.index()).addClass("on");

			if($cont.find("select").length){
				$("select").selectBox();
			}
			return false;
		}
	}

	/* tab */
	$(document).on("click", ".tab li > a", tabClickUI);


});

// 507 사은품수령방법
$(function(){
    $('#btn_view507').on('click', function () {
        $(this).parents('.dropdown_sec').addClass('on');
    });
    $('#btn_close507').on('click', function () {
        $(this).parents('.dropdown_sec').removeClass('on');
    });
});

// 236
$(function(){

    // Tab Content 236, 567
    var $tbtn = $(".tab_btn li");
    var $tbtn_leng = $tbtn.length;
    var $tab_contentsOb = $(".tab_content");

    $tab_contentsOb.hide();
    $tab_contentsOb.eq(0).show();
    $tbtn.eq(0).addClass("on");

    $tbtn.click(function(e){

        e.preventDefault();

        let idx = $(this).index();

        $tbtn.removeClass();
        $tbtn.eq(idx).addClass("on");
        $tab_contentsOb.hide();
        $tab_contentsOb.eq(idx).show();
    });
});

// [공통] Drop Down 530, 568, 541
$(function(){
    $('.dropdown_btn').on('click', function () {
        $(this).parent('.dropdown_wrap').toggleClass('on');
    });
});

// [공통] Tab Menu 544, 552
$(function(){
    var $tbtn = $(".tab_wrap li");
    var $tbtn_leng = $tbtn.length;
    var $tab_contentsOb = $(".tab_content");

    $tab_contentsOb.hide();
    $tab_contentsOb.eq(0).show();
    $tbtn.eq(0).addClass("on");

    $tbtn.click(function(e){

        e.preventDefault();

        let idx = $(this).index();

        $tbtn.removeClass();
        $tbtn.eq(idx).addClass("on");
        $tab_contentsOb.hide();
        $tab_contentsOb.eq(idx).show();
    });
});

// Scroll Spy 537(X), 567
$(function(){
	var topMenu = $(".floating_menu, .moveBtn");

	var lastId,
		topMenuHeight = topMenu.outerHeight()+1,
		menuItems = topMenu.find("a"),
		scrollItems = menuItems.map(function(){
			var item = $($(this).attr("href"));
			if (item.length) { return item; }
		});

	menuItems.click(function(e){
		var href = $(this).attr("href"),
		offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
		$('html, body').stop().animate({
			scrollTop: offsetTop+50
		}, 600);
		e.preventDefault();
	});

});

// [공통] 편의점 유심판매점 조회(Window Popup) 506, 128, 148, 520, 255, 445, 552
$(function(){
	var _width = '960';
	var _height = '800';

	// 가운데 정렬
	var _left = (window.screen.width / 2) - (_width / 2);
	var _top = (window.screen.height / 2) - (_height / 2);

	$(".location_gs25").on("click",function(){
		window.open('https://gs25.uplussave.com/prtn/gs25/shopSearchPop.mhp', 'GS25 유심판매점 찾기', 'toolbar=no, menubar=no, scrollbars=yes, width='+ _width +', height='+ _height +', left=' + _left + ', top='+ _top);
	})
	$(".location_emart24").on("click",function(){
		window.open('https://www.uplussave.com/prtn/e24/shopSearchPop.mhp', '이마트24 유심판매점 찾기', 'toolbar=no, menubar=no, scrollbars=yes, width='+ _width +', height='+ _height +', left=' + _left + ', top='+ _top);
	})
	$(".location_homeplus").on("click",function(){
		window.open('https://homeplus.uplussave.com/prtn/hp/shopSearchPop.mhp', '홈플러스 유심판매점 찾기', 'toolbar=no, menubar=no, scrollbars=yes, width='+ _width +', height='+ _height +', left=' + _left + ', top='+ _top);
	})
});