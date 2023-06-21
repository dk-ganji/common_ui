"use strict";
const uiCommon = (function (uiCommon, $window, $body) {

    /*** contents ***/
    function init(){
        $('.box-input').length > 0 && input.init();
        $('.box-select').length > 0 && select.init();
        $('.accordian').length > 0 && accordian.init();
        $('.box-tooltip').length > 0 && tooltip.init();
        $('.date-picker').length > 0 && datepicker.init();
        $('.month-picker').length > 0 && monthpicker.init();
        $(".layer-popup").length > 0 && layer.init();
        $('.toggle-layer-popup').length > 0 && layer.togglePopup();
        $('[data-slick]').length > 0 && slickCtrl.setting();
		$('.box-tab').length > 0 && tabSwiper.init();
        $('.box-tab02').length > 0 && tab.init();
        $('.not-allow').length > 0 && allowOpen.init();
        $('select').length > 0 && niceSelect.init();
        tab.init();
        header.init();
        slickCtrl.init();
        evtBind.init();
        checkHtml.init();
    }

    //header
    const header = {
		gnb: $('header nav'),
        init () {
            this.gnbBar();
        },
        gnbBar () {

        },
        topSearch () {
        },
        totalMenu() {
        },
        breadCrumb() {
        }
    }

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

        },
        etc(target01,target02){
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

	// 일반 스크립트
    const evtBind = {
        init () {

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
		clickEvent(){
		},
        scrollEv () {

        }

    }


    init();

    return{
        layer : layer,
        systemLayer : systemLayer,
        toast: toast,
        tooltip: tooltip,
        datepicker : datepicker,
		monthpicker : monthpicker,
        slickCtrl : slickCtrl,
        evtBind : evtBind,
		tab : tab,
		bodyFix : bodyFix
    };


})(window.uiCommon || {}, $(window), $('body'));