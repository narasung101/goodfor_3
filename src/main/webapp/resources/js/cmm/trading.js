"use strict";
var trading = trading || {}
trading = (()=>{
	const WHEN_ERR = '호출하는 JS파일을 찾지 못했습니다.'
	let _, js, css, img, s_trading_vue_js
	let init =()=> {
		_=$.ctx()
		js=$.js()
		css=$.css()
		img=$.img()
		s_trading_vue_js=js+'/vue/s_trading_vue.js'
	}
	
	let onCreate =()=>{
		init()
		$.when(
			$.getScript(s_trading_vue_js)
		)
		.done(()=>{
			setContentView()
			button_click()
		})
		.fail()
	}
	
	let setContentView =()=>{
		$('#body_main').empty()
			.html(s_trading_vue.trading_mainbody({css: $.css(), img: $.img()}))
			.appendTo('#body_main')
	}
	
	let button_click=()=>{
		$('#s_btn_maesu').click(e=>{
            e.preventDefault()
            $('#s_trading_detailchang').empty()
            $('#s_trading_detailchang').html(s_trading_vue.trading_msChang({css: $.css(), img: $.img()}))
		})
		$('#s_btn_maedo').click(e=>{
            e.preventDefault()
            $('#s_trading_detailchang').empty()
            $('#s_trading_detailchang').html(s_trading_vue.trading_mdChang({css: $.css(), img: $.img()}))
		})
		$('#s_btn_jungjung').click(e=>{
            e.preventDefault()
            $('#s_trading_detailchang').empty()
            $('#s_trading_detailchang').html(s_trading_vue.trading_jungjungChang({css: $.css(), img: $.img()}))
		})
		$('#s_btn_chuiso').click(e=>{
            e.preventDefault()
            $('#s_trading_detailchang').empty()
            $('#s_trading_detailchang').html(s_trading_vue.trading_chuisoChang({css: $.css(), img: $.img()}))
		})
	}
	
	let basicCrawling =()=>{
		
	}

	return {onCreate}
})();