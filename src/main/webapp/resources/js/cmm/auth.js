"use strict";
var auth = auth || {};
auth = (()=>{
     const WHEN_ERR = '호출하는 JS파일을 찾지 못했습니다.'
     let _, js, css, img, auth_vue_js,trading_vue_js,s_admin_vue_js, s_admin_jsjs,trading_js, customer_vue_js, myPage_vue_js, stockinfo_vue_js
     let init =()=> {
           _=$.ctx()
           js=$.js()
           css=$.css()
           img=$.img()
           auth_vue_js=js+'/vue/auth_vue.js'
           trading_vue_js=js+'/vue/trading_vue.js'
           s_admin_vue_js=js+'/vue/s_admin01_vue.js'
           s_admin_jsjs=js+'/cmm/s_admin.js'
           trading_js=js+'/cmm/trading.js'
           customer_vue_js = js+'/vue/customer_vue.js'
           myPage_vue_js = js+'/vue/myPage_vue.js'
           stockinfo_vue_js =js+'/vue/stockinfo_vue.js'
     }
     
     let onCreate =()=>{
           init();
           $.when(
                $.getScript(auth_vue_js),
                $.getScript(trading_vue_js),
                $.getScript(trading_js),
                $.getScript(s_admin_vue_js),
                $.getScript(s_admin_jsjs),
                $.getScript(customer_vue_js),
                $.getScript(myPage_vue_js),
                $.getScript(stockinfo_vue_js)
                
           ).done(()=>{
                setContentView()
                naviButton()
           })
     }
     let setContentView =()=>{
           $('body').html(auth_vue.auth_body({css: $.css(), img: $.img()}))
     }
     let naviButton=()=>{
           $('#btn_main').click(e=>{
                      e.preventDefault()
                      $('#body_main').empty()
                      $('#body_main').html(auth_vue.auth_login_body({css: $.css(), img: $.img()}))
           })
           $('#btn_trading').hover(function(){
        	   $(this).css("color", "gray")
           }, function(){
        	   $(this).css("color", "white")
           })
           .click(e=>{
              e.preventDefault()
              trading.onCreate()
           })
           $('#btn_notice').hover(function(){
        	   $(this).css("color", "gray")
           }, function(){
        	   $(this).css("color", "white")
           }).click(e=>{
              e.preventDefault()
              $('#body_main').empty()
              .html(customer_vue.customer_body({css: $.css(), img: $.img()}))
               customer.onCreate()
           })
           $('#btn_admin').hover(function(){
        	   $(this).css("color", "gray")
           }, function(){
        	   $(this).css("color", "white")
           }).click(e=>{
              e.preventDefault()
              s_admin.onCreate()
           })
           $('#btn_stockinfo').hover(function(){
        	   $(this).css("color", "gray")
           }, function(){
        	   $(this).css("color", "white")
           }).click(e=>{
              e.preventDefault()
              $('#body_main').empty()
              .html(stockinfo_vue.stockinfo_body({css: $.css(), img: $.img()}))
              .appendTo('#body_main')
              stockinfo.onCreate()
           })
           $('#btn_mypage').hover(function(){
        	   $(this).css("color", "gray")
           }, function(){
        	   $(this).css("color", "white")
           }).click(e=>{
              e.preventDefault()
              $('#body_main').empty()
              .html(myPage_vue.main({css: $.css(), img: $.img()}))
              .appendTo('#body_main')
           })
           $('#btn_loginForm').hover(function(){
        	   $(this).css("color", "gray")
           }, function(){
        	   $(this).css("color", "white")
           }).click(e=>{
              e.preventDefault()
              $('#body_main').empty()
              .html(auth_vue.login({css: $.css(), img: $.img()}))
              .appendTo('#body_main')
              login()
           })
           $('#btn_joinForm').hover(function(){
        	   $(this).css("color", "gray")
           }, function(){
        	   $(this).css("color", "white")
           }).click(e=>{
              e.preventDefault()
              $('#body_main').empty()
              .html(auth_vue.join({css: $.css(), img: $.img()}))
              .appendTo('#body_main')
              join()
           })
           $('#btn_logout').hover(function(){
        	   $(this).css("color", "gray")
           }, function(){
        	   $(this).css("color", "white")
           }).click(e=>{
        	   e.preventDefault()
        	   onCreate()
           })
            $('#btn_logout2').hover(function(){
        	   $(this).css("color", "gray")
           }, function(){
        	   $(this).css("color", "white")
           }).click(e=>{
        	   e.preventDefault()
        	   onCreate()
           })
           $('#s_etc_btn').hover(function(){
        	   $(this).css("color", "gray")
           }, function(){
        	   $(this).css("color", "white")
           }).click(e=>{
				e.preventDefault()
				let modal = document.getElementById("sejong_Modal2");
				
				modal.style.display = "block"
				
				window.onclick = function(event) {
				  if (event.target == modal) {
				    modal.style.display = "none";
				  }
				}
			})
			
     }
     
  // 비밀번호 정규식
 	var pwJ = /^[A-Za-z0-9]{2,12}$/;
 	// 이름 정규식
 	var nameJ = /^[가-힣]{1,10}$/;
 	
 	let join =()=>{	
 		
 		existId()
 		
// 		$('#join_cid').blur(function(){
// 			if(idJ.test($('#join_cid').val())){
// 				$('#id_check1').text('사용가능한 아이디입니다.').css('color','blue')
// 			}else{
// 				$('#id_check1').text('영문 or 숫자를 사용해 2~12자리 입력하세요 ').css('color','red')
// 			}
// 		})
 		$('#join_cpw1').blur(function(){
 			if(pwJ.test($('#join_cpw1').val())){
 				$('#pw_check').text('사용가능한 비밀번호입니다').css('color','blue')
 			}else{
 				$('#pw_check').text('숫자 or 문자로만 2~12자리 입력').css('color','red')
 			}
 		})
 		$('#join_cpw2').blur(function(){
 			if($('#join_cpw1').val() === $('#join_cpw2').val()){
 				$('#pw2_check').text('비밀번호가 일치합니다').css('color','blue')
 			}else{
 				$('#pw2_check').text('비밀번호가 틀립니다. 다시 입력하세요').css('color','red')
 			}
 		})
 		
 		$('#join_userName').blur(function(){
 			if(nameJ.test($('#join_userName').val())){
 				$('#name_check').text('')
 			}else{
 				$('#name_check').text('이름을 다시 확인해주세요.')
 				$('#name_check').css('color','red')
 			}
 		})
 		
 	      		
 		$('#btn_join').click(e=>{
 			e.preventDefault()
 				
 		$.ajax({
 			url: _+'/customers/',
 			type: 'POST',
 			dataType: 'json',
 			data: JSON.stringify({
 				cid: $('#join_cid').val(),
 				cpw: $('#join_cpw1').val(),
 				cname: $('#join_userName').val(),
 				email: $('#join_email').val(),
 				pnumber: $('#join_pnumber').val(),
 				invest: $("#join_investRadio input[name='join_invest']:checked").val(),
 				rating : $('#join_rating').val()
 			}),
 			contentType: 'application/json',
 			success: d => {
 				alert('AJAX성공')
 				if (d.msg === 'success') {
 					$('body').html(auth_vue.main({css: $.css(), img: $.img()}))
 					onCreate()
 					
 				} else {
 					alert('회원가입 실패')
 				}

 			},
 			error: e => {
 				alert('AJAX 실패')
 			}

 			})
 		})
 		
 	}
     
 	let login =()=>{
		
		$('#btn_login').click(e=>{
			e.preventDefault()
		
		$.ajax({
			url: _ + '/customers/login',
			type: 'POST',
			data: JSON.stringify({
				cid: $('#login_cid').val(),
				cpw: $('#login_cpw').val()
				
			}),
			dataType: 'json',
			contentType: 'application/json',
			success: d => {
				alert('AJAX성공')
				if(d.msg === 'success'){
					let t = d.customer
					console.log(t)
					$.extend(new Customer(t))
					
					const logout_btn= $(`<div id="btn_logout" style="display:inline-block;width:15%;color:white;font-size:15px">로그아웃</div>`)
					$('#btn_loginForm').replaceWith(logout_btn) 
					
					$('#body_main').empty()
					$('#body_main').html(auth_vue.auth_login_body({css: $.css(), img: $.img()}))
				
					logout()
					// edit_mypage에 t 값을 넘겨 글쓰기 수정 삭제를 구현 
					
//					$(`<div id="btn_logout" style="display:inline-block;width:15%;color:white;font-size:15px">로그아웃</div>`)
//					$('#body_main').empty()
//					$('#s-header').empty()
//					$('#s-header').html(auth_vue.auth_header({css: $.css(), img: $.img()}))
//					.appendTo('#s-header')
					alert(`세션 스토리지 저장된 값 ${sessionStorage.getItem('cid')}`)	
				
					}else{$('span[class="duple_cid"]').text('아이디를 다시 확인해주세요').css('color','red')}								

			},
			error: e => {
				alert('AJAX 실패')
			}

			})
		})
		
	}

	let existId =()=>{
		$('#join_cid').keyup(()=>{
			if($('#join_cid').val().length >= 1){
				$.getJSON(_ + '/customers/existid/'+$('#join_cid').val(), d=>{
					
					if(d.msg === 'y'){
						$('#id_check').text('이미 존재하는 아이디입니다').css({color : 'red'})
					}else{
						$('#id_check').text('가입 가능한 아이디입니다.').css({color : 'blue'})
					}
				})
			}
		})
	}
	let logout =()=>{
		$('#btn_logout').click((e)=>{
			e.preventDefault()
			alert('로그아웃 클릭')
			sessionStorage.removeItem('cid')
			sessionStorage.clear()
			app.run(_)
		})
	}

     
     return {onCreate}     
     
})();