"use strict"
var brd = brd || {}
brd = (() => {
	const WHEN_ERR = '호출하는 JS파일을 찾을 수 없습니다.'
	let _, js, brd_vue_js, css, img, type
	let init = x => {
		_ = $.ctx()
		js = $.js()
		img = $.img()
		css = $.css()
	    brd_vue_js = js + '/vue/brd_vue.js'
	   type = x
		
	}
	let onCreate = x => {
		
		init(x)

		$.when(
			$.getScript(brd_vue_js)			
		
		).done(() => {
			setContentView()
			
			
			
		}).fail(() => {
			alert('실패')
		})
	}
	let setContentView = () => {
		$('#body_main').empty()
		if(type==3){

			list({ctype: type, pageSize: 5, nowPage: 0, img: $.img()})
		}
		else{

			listNotice({ctype: type, pageSize: 5, nowPage: 0, img: $.img()})
		}
		
		
		//list({ pageSize: 5, nowPage: 0, option:$('#selectOption').val(), search: $('#search').val()})
	
	}
		
	let list = x => {

		$.getJSON(_ + '/boards/list/'+x.ctype+'/'+x.pageSize+'/'+x.nowPage+'/'+x.option+'/'+x.search, d => {
			
			$('#body_main').empty()
			
					
			$(`
						
		<style>
		#ContentPlaceHolder1_div_wts p span {
			color: #179ede;
			font-size: 16px;
			font-family: "맑은고딕","Malgun Gothic","돋움", "dotum", "verdana", sans-serif;
		    line-height: 20px;
		    letter-spacing: -1px;		
		} 
		</style>
		
		<div class="container">
		
		<nav class="navbar navbar-expand-lg navbar-light bg-light" style="font-size: 14px;">
			   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			    <span class="navbar-toggler-icon"></span>
			  </button>
			  <div class="collapse navbar-collapse" id="navbarNav">
			    <ul class="navbar-nav">
			      <li class="nav-item active">
			        <a class="nav-link" href="#">자주하는질문<span class="sr-only">(current)</span></a>
			      </li>
			      <li class="nav-item">
			        <a class="nav-link" href="#">고객게시판</a>
			      </li>
			      <li class="nav-item">
			        <a class="nav-link" href="#">공지사항</a>
			      </li>
			      <li class="nav-item">
			        <a class="nav-link" href="#">1:1문의</a>
			      </li>
			    </ul>
			  </div>
			</nav>
		
		<div id="wrapper">
		
		<h1 style="margin-bottom: 20px;"><img src="${x.img}/customer.png" style="width: 30px;">&nbsp;&nbsp;고객게시판</h2>
		
		<div id="ContentPlaceHolder1_div_wts" class="alert alert-light" role="alert" style="margin-bottom: 20px;">
				<p style="font-size: large;">고객님의 <span>궁금한 사항</span>을 <span>빠르고 친절하게</span> 처리해 드립니다. </p>
				<p class="lineTxt" style="font-size: small">굿포를 이용하시는데 불편하신 사항이나 의견이 있으시면 말씀해주세요. 고객님의 의견을 적극 반영하여 개선하도록 하겠습니다. </p>
		</div>
		
		<div id="page_sizeForm" class="btn btn-default pull-left" style="font-size: small;padding-right: 0px;">
		</div>
		<div id="search_form" class="btn btn-default pull-right" style="font-size: small;padding-right: 0px;">
		
		</div>

		<table class="table table-striped">
				
			<thead>
				<tr style="text-align:center; font-size: 13px;">
					<th width="10%">번호</th>
					<th width="30%">제목</th>
					<th width="10%">작성자</th>
					<th width="10%">작성일</th>
					<th width="10%">조회</th>
				</tr>
			</thead>
			
			<tbody>
			
			</tbody>
		</table>

		
			<div>
				<ul class="pagination" id="page_form" style="justify-content: center; margin-bottom: 0px; font-size: 13px;">
				</ul>
			</div>

				
		<button id="btn_brd" class="btn btn-default pull-right" style="border: solid 1px #ddd; width: 77px; font-size: 13px;">글쓰기</button>
		
		</div>
		</div>
		`).appendTo('#body_main')
		
		write(type)
			
		$('#btn_list').click(e => {
		e.preventDefault()
		$('#crawlTab').empty()
		$('#tmain').empty()
		list({ctype: type, pageSize: 5, nowPage: 0, img: $.img()})
		// list({ pageSize: 5, nowPage: 0, option:$('#selectOption').val(),
		// search: $('#search').val()})
		
		})				
									
			$.each(d.list, (i, j) => {
				console.log(d.list)
				var tr = $(`<tr></tr>`).appendTo("tbody");
				$(`<td style="text-align:center; font-size: 13px;"></td>`).text(j.seq).appendTo(tr);
				$(`<td style="text-align:center; font-size: 13px;"><a href="#">${j.title}</a></td>`).appendTo(tr)
				.click(e=>{
					e.preventDefault()
					alert('seq 확인'+ j.seq)
										
					$.getJSON(_ + '/boards/content/'+j.seq, d =>{
						
						content(d)						
					})
				});
				$(`<td style="text-align:center; font-size: 13px;"></td>`).text(j.writer).appendTo(tr);
				$(`<td style="text-align:center; font-size: 13px;"></td>`).text(j.credate).appendTo(tr);
				$(`<td style="text-align:center; font-size: 13px;"></td>`).text(j.viewcnt).appendTo(tr);

			})
		
			if (d.pager.existPrev) {
				$(`<li class="page-item">
					      <a href="#">이전</a>
				</li>`)
//				$(`<span style="border:1px solid black; padding-left: 5px; padding-right: 5px; class="btn-page">이전</span>`)
					.appendTo('#page_form')
					.click((e) => {
						e.preventDefault()
						alert('이전 페이지 클릭' + d.pager.prevBlock)
						list({ctype: type, pageSize: 5, nowPage: d.pager.prevBlock, img: $.img()})
						//list({pageSize:5, nowPage:d.pager.prevBlock})
					
					})
			}

			let blocks = []
			for (let i = d.pager.startPage + 1; i <= d.pager.endPage + 1; i++) {
				blocks.push(i)

			}

			$.each(blocks, (i, j) => {
				$(`<li class="page-item">
					      <a href="#">${j}</a>
				</li>`)
					.appendTo('#page_form')
					.click(function (e) {
						e.preventDefault()
						alert('a링크 클릭' + $(this).text())
						
						 list({ ctype: type, pageSize: 5, nowPage: (Number($(this).text()) - 1), img: $.img() })
					   // list({pageSize: 5, nowPage: (Number($(this).text()) - 1), option:$('#selectOption').val(), search: $('#search').val()})

					})
			})
			if (d.pager.existNext) {
				$(`<li class="page-item">
					      <a href="#">다음</a>
				</li>`)
//				$(`<span style="border:1px solid black; padding-left: 5px; padding-right: 5px; class="btn-page">다음</span>`)
					.appendTo('#page_form')
					.click(function (e) {
						e.preventDefault()
						alert('다음 페이지 클릭' + d.pager.nextBlock)
						 list({ ctype: type, pageSize: 5, nowPage: d.pager.nextBlock, img: $.img() })
						// list({pageSize: 5, nowPage: d.pager.nextBlock, option:$('#selectOption').val(), search: $('#search').val()})

					})
			}
			
//			<form>
//			페이지 사이즈 입력 <input type="text" id="pageSize" />
//			<input id="btn_page_size" type="submit" value="입력" />
//			</form>	
		
		$(`
				
		<form>
		 <select id="pageSize" class="btn btn-default" style="border: solid 1px #ddd; font-size: 13px;">
		  <option value="5">5개씩 </option>
		  <option value="10">10개씩</option>
		  <option value="15">15개씩</option>
		</select>
		<input id="btn_page_size" type="submit" value="보기" class="btn btn-default" style="border: solid 1px #ddd; font-size: 13px;"/>
		</form>
			
		`).appendTo('#page_sizeForm')
	
		
			$('#btn_page_size').click(e => {
				e.preventDefault()
				list({ ctype: type, pageSize: $('#pageSize').val(), nowPage: 0, img: $.img() })
				 //list({ pageSize: $('#pageSize').val(), nowPage: 0, option:$('#selectOption').val(), search: $('#search').val() })
			})
			
		 $(`
		 <select id="selectOption" class="btn btn-default" style="border: solid 1px #ddd; font-size: 13px;">
		  <option value="title">제목</option>
		  <option value="content">내용</option>
		  <option value="writer">작성자</option>
		</select>
	
		 <input type="text" id="search" class="btn btn-default" style="border: solid 1px #ddd; font-size: small;"/>	 	
		 <input id="btn_search" type="submit" value="입력" class="btn btn-default" style="border: solid 1px #ddd; font-size: 13px;"/> 
		 `)
		 .appendTo('#search_form')
		  $('#btn_search').click(e=>{
			 e.preventDefault()
			 alert('서치' + $('#search').val()+", 옵션:"+$('#selectOption').val())
			 list({ ctype:type, pageSize: 5, nowPage: 0, option:$('#selectOption').val(), search: $('#search').val(), img: $.img() })
			 //list({ pageSize: 5, nowPage: 0, option:$('#selectOption').val(), search: $('#search').val() })
			
		 })
			
		})
				

	}
	
	let listNotice = x => {

		$.getJSON(_ + '/boards/list/'+x.ctype+'/'+x.pageSize+'/'+x.nowPage+'/'+x.option+'/'+x.search, d => {
			
			$('#body_main').empty()
			
					
			$(`
		<style>
		#ContentPlaceHolder1_div_wts p span {
			color: #179ede;
			font-size: 16px;
			font-family: "맑은고딕","Malgun Gothic","돋움", "dotum", "verdana", sans-serif;
		    line-height: 20px;
		    letter-spacing: -1px;		
		} 
		</style>
		
		<div class="container">
		<div id="wrapper">
		
		<h1 id="btn_customerGo" style="margin-bottom: 20px;"><img src="${x.img}/notice.png" style="width: 30px;">&nbsp;&nbsp;공지사항</h2>
		
		<div id="ContentPlaceHolder1_div_wts" class="alert alert-light" role="alert" style="margin-bottom: 20px;">
				<p style="font-size: large;">고객님의 <span>궁금한 사항</span>을 <span>빠르고 친절하게</span> 처리해 드립니다. </p>
				<p class="lineTxt" style="font-size: small">굿포를 이용하시는데 불편하신 사항이나 의견이 있으시면 말씀해주세요. 고객님의 의견을 적극 반영하여 개선하도록 하겠습니다. </p>
		</div>
		
		<div id="page_sizeForm" class="btn btn-default pull-left" style="font-size: small;padding-right: 0px;">
		</div>
		<div id="search_form" class="btn btn-default pull-right" style="font-size: small;padding-right: 0px;">
		
		</div>

		<table class="table table-striped">
				
			<thead>
				<tr style="text-align:center; font-size: 13px;">
					<th width="10%">번호</th>
					<th width="30%">제목</th>
					<th width="10%">작성자</th>
					<th width="10%">작성일</th>
					<th width="10%">조회</th>
				</tr>
			</thead>
			
			<tbody>
			
			</tbody>
		</table>

		
			<div>
				<ul class="pagination" id="page_form" style="justify-content: center; margin-bottom: 0px; font-size: 13px;">
				</ul>
			</div>

				
		<button id="btn_brd" class="btn btn-default pull-right" style="border: solid 1px #ddd; width: 77px; font-size: 13px;">글쓰기</button>
		
		</div>
		</div>
		`).appendTo('#body_main')
		
		write(type)
			
		$('#btn_list').click(e => {
		e.preventDefault()
		$('#crawlTab').empty()
		$('#tmain').empty()
		list({ctype: type, pageSize: 5, nowPage: 0, img: $.img()})
		// list({ pageSize: 5, nowPage: 0, option:$('#selectOption').val(),
		// search: $('#search').val()})
		
		})				
									
			$.each(d.list, (i, j) => {
				console.log(d.list)
				var tr = $(`<tr></tr>`).appendTo("tbody");
				$(`<td style="text-align:center; font-size: 13px;"></td>`).text(j.seq).appendTo(tr);
				$(`<td style="text-align:center; font-size: 13px;"><a href="#">${j.title}</a></td>`).appendTo(tr)
				.click(e=>{
					e.preventDefault()
					alert('seq 확인'+ j.seq)
										
					$.getJSON(_ + '/boards/content/'+j.seq, d =>{
						
						content(d)						
					})
				});
				$(`<td style="text-align:center; font-size: 13px;"></td>`).text(j.writer).appendTo(tr);
				$(`<td style="text-align:center; font-size: 13px;"></td>`).text(j.credate).appendTo(tr);
				$(`<td style="text-align:center; font-size: 13px;"></td>`).text(j.viewcnt).appendTo(tr);

			})
		
			if (d.pager.existPrev) {
				$(`<li class="page-item">
					      <a href="#">이전</a>
				</li>`)
//				$(`<span style="border:1px solid black; padding-left: 5px; padding-right: 5px; class="btn-page">이전</span>`)
					.appendTo('#page_form')
					.click((e) => {
						e.preventDefault()
						alert('이전 페이지 클릭' + d.pager.prevBlock)
						list({ctype: type, pageSize: 5, nowPage: d.pager.prevBlock, img: $.img()})
						//list({pageSize:5, nowPage:d.pager.prevBlock})
					
					})
			}

			let blocks = []
			for (let i = d.pager.startPage + 1; i <= d.pager.endPage + 1; i++) {
				blocks.push(i)

			}

			$.each(blocks, (i, j) => {
				$(`<li class="page-item">
					      <a href="#">${j}</a>
				</li>`)
					.appendTo('#page_form')
					.click(function (e) {
						e.preventDefault()
						alert('a링크 클릭' + $(this).text())
						
						 list({ ctype: type, pageSize: 5, nowPage: (Number($(this).text()) - 1), img: $.img() })
					   // list({pageSize: 5, nowPage: (Number($(this).text()) - 1), option:$('#selectOption').val(), search: $('#search').val()})

					})
			})
			if (d.pager.existNext) {
				$(`<li class="page-item">
					      <a href="#">다음</a>
				</li>`)
//				$(`<span style="border:1px solid black; padding-left: 5px; padding-right: 5px; class="btn-page">다음</span>`)
					.appendTo('#page_form')
					.click(function (e) {
						e.preventDefault()
						alert('다음 페이지 클릭' + d.pager.nextBlock)
						 list({ ctype: type, pageSize: 5, nowPage: d.pager.nextBlock, img: $.img() })
						// list({pageSize: 5, nowPage: d.pager.nextBlock, option:$('#selectOption').val(), search: $('#search').val()})

					})
			}
			
//			<form>
//			페이지 사이즈 입력 <input type="text" id="pageSize" />
//			<input id="btn_page_size" type="submit" value="입력" />
//			</form>	
		
		$(`
				
		<form>
		 <select id="pageSize" class="btn btn-default" style="border: solid 1px #ddd; font-size: 13px;">
		  <option value="5">5개씩 </option>
		  <option value="10">10개씩</option>
		  <option value="15">15개씩</option>
		</select>
		<input id="btn_page_size" type="submit" value="보기" class="btn btn-default" style="border: solid 1px #ddd; font-size: 13px;"/>
		</form>
			
		`).appendTo('#page_sizeForm')
	
		
			$('#btn_page_size').click(e => {
				e.preventDefault()
				list({ ctype: type, pageSize: $('#pageSize').val(), nowPage: 0, img: $.img() })
				 //list({ pageSize: $('#pageSize').val(), nowPage: 0, option:$('#selectOption').val(), search: $('#search').val() })
			})
			
		 $(`
		 <select id="selectOption" class="btn btn-default" style="border: solid 1px #ddd; font-size: 13px;">
		  <option value="title">제목</option>
		  <option value="content">내용</option>
		  <option value="writer">작성자</option>
		</select>
	
		 <input type="text" id="search" class="btn btn-default" style="border: solid 1px #ddd; font-size: small;"/>	 	
		 <input id="btn_search" type="submit" value="입력" class="btn btn-default" style="border: solid 1px #ddd; font-size: 13px;"/> 
		 `)
		 .appendTo('#search_form')
		  $('#btn_search').click(e=>{
			 e.preventDefault()
			 alert('서치' + $('#search').val()+", 옵션:"+$('#selectOption').val())
			 list({ ctype:type, pageSize: 5, nowPage: 0, option:$('#selectOption').val(), search: $('#search').val(), img: $.img() })
			 //list({ pageSize: 5, nowPage: 0, option:$('#selectOption').val(), search: $('#search').val() })
			
		 })
			
		})
				

	}
	
	let toggleList =()=>{
		$('#body_main').empty()
		$('#body_main').append(customer_vue.customer_head({css: $.css()}))

		$(`
		<div class="container">
			<h2>자주 하는 질문</h2>
				<p>In this example we have added a "plus" sign to each button. When the user clicks on the button, the "plus" sign is replaced with a "minus" sign.</p>
				<button class="accordion">Section 1</button>
				<div class="panel">
				  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				</div>
				
				<button class="accordion">Section 2</button>
				<div class="panel">
				  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				</div>
				
				<button class="accordion">Section 3</button>
				<div class="panel">
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				</div>
				
				<button class="accordion">Section 3</button>
				<div class="panel">
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				</div>
				
				<button class="accordion">Section 3</button>
				<div class="panel">
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				</div>
				
				<button class="accordion">Section 3</button>
				<div class="panel">
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				</div>
				
				<button class="accordion">Section 3</button>
				<div class="panel">
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				</div>
			</div>
		`).appendTo('#body_main')
		
		var acc = document.getElementsByClassName("accordion");
	
		let i;

		for (i = 0; i < acc.length; i++) {
			$('button[class="accordion"]')[i].addEventListener("click", function() {
		    this.classList.toggle("active");
		    var panel = this.nextElementSibling;
		    if (panel.style.maxHeight) {
		      panel.style.maxHeight = null;
		    } else {
		      panel.style.maxHeight = panel.scrollHeight + "px";
		    } 
		  });
		}
		
//		alert('넘어온 x의값'+x.list)
//		console.log(x.list)
//		$.each(x.list, (i, j) => {
//			var tr = $(`<tr></tr>`).appendTo("#tbody");
//			$(`<td></td>`).text(j.seq).appendTo(tr);
//			$(`<td><a href="#">${j.title}</a></td>`).appendTo(tr)
//			.click(e=>{
//				e.preventDefault()
//				alert('seq 확인'+ j.seq)
//										
//			});
//			$(`<td></td>`).text(j.writer).appendTo(tr);
//
//		})
	}
	
	let write =x=>  {
		
			
		$('#btn_brd').click((e) => {
			e.preventDefault()
			// if로 로그인 했을때 화면을 보여주고 아니면 alert창 띄어준다.
//			if(){
//				
//			}
						
			$('#body_main').empty()
			$('#body_main').append(brd_vue.write_form({type:x}))		
				
			$('#btn_write_submit').click(e => {
				e.preventDefault()
				alert('글 작성 페이지 글쓰기 버튼 클릭')
				$.ajax({
					url: _ + '/boards/',
					type: 'POST',
					data: JSON.stringify({
						title: $('#write_form input[name="title"]').val(),
						ctype: $('#write_form input[name="ctype"]').val(),
						writer: $('#write_form input[name="writer"]').val(),
						content: $('#write_form textarea[name="content"]').val()
						}),
					dataType: 'json',
					contentType: 'application/json',
					success: d => {
						alert('글쓰기 성공'+type+" 으로 이동")
						 list({ctype: type, pageSize: 5, nowPage: 0, img: $.img()})
						// list({pageSize: 5, nowPage: 0, option:$('#selectOption').val(), search: $('#search').val()})

					},
					error: e => {
						alert('AJAX 실패')
					}
				})
			})			
			
			
			
			$(`<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">파일 업로드</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body">
				           <form>
						     <input id="fileUpload" type="file"/>
						    </form>
				      </div>
				      <div class="modal-footer">
				        <button id="btn_fileCheck" type="button" class="btn btn-primary">확인</button>
				        <button id="btn_fileCancel" type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
				        </div>
				    </div>
				  </div>
			</div>`).appendTo('#body_main')
			
			
//			$(`<div id="myModal" class="modal">
//
//							  <!-- Modal content -->
//							  <div class="modal-content">
//							    <span class="close">&times;</span>
//							    <form>
//							    <input id="fileUpload" type="file"/>
//							    <button id="btn_fileCheck">확인</button>
//							    <button id="btn_fileCancel">취소</button>
//							    </form>
//							  </div>
//							
//							</div>`).appendTo('#body_main')	
			
			$('#add_file').click(e=>{
				e.preventDefault()
				$('#myModal').modal()
//				alert('>>>> ')

				
				const span = document.getElementsByClassName("close")[0];
				span.onclick = function() {
					  modal.style.display = "none";
					}
				
		
				
			})
			$('#btn_fileCheck').click(e=>{
				e.preventDefault()
				alert('확인')
				let formData = new FormData()
				let files = $('#fileUpload')[0].files

				let i = 0
				for(; i< files.length; i++){
					formData.append("uploadFile", files[i])
				}
				
				$.ajax({
					url : _+'/boards/fileupload',
					processData : false,
					contentType : false,
					data : formData,
					type : 'POST',
					success : d => {
						alert("파일업로드 성공")
						$('#myModal').modal("hide")
						
					},
					error : e => {
						alert('파일 업로드 실패')
					}
				})
				
				
			})
			
			$('#btn_cancel').click(e=>{
				e.preventDefault()
				alert('취소버튼 클릭')
			})
			
		})
		
	}

	
	let content =(x)=>{
		
		$('#body_main').empty()
		$('#body_main').html(brd_vue.content_form())
		
						console.log(x.read)
						$('#content_form input[name="title"]').val(x.read.title)
						$('#content_form input[name="writer"]').val(x.read.writer)
						$('#content_form textarea[name="content"]').val(x.read.content)
		
		
		$('#btn_updateForm').click(e=>{
			e.preventDefault()
			alert('수정 클릭')
			update(x)
		})
		
		$('#btn_listback').click(()=>{
			alert('리스트 클릭')
		})
	
	}
	
	let update =(x)=>{
		$('#body_main').empty()
		$('#body_main').html(brd_vue.update_form())
		alert('seq 넘어옴' + x.read.seq)
				
		$('#update_form input[name="title"]').val(x.read.title)
		$('#update_form input[name="writer"]').val(x.read.writer)
		$('#update_form textarea[name="content"]').val(x.read.content)
		
		$('#btn_updateWrite').click(e=> {
			alert('수정 버튼 클릭' + x.read.title +',' + x.read.content)
			e.preventDefault()
				$.ajax({
					url: _ + '/boards/update',
					type: 'PUT',
					data: JSON.stringify({
						seq : x.read.seq,
						title: $('#update_form input[name="title"]').val(),
						content: $('#update_form textarea[name="content"]').val()

					}),
					dataType: 'json',
					contentType: 'application/json',
					success: d => {
						alert('AJAX 성공')
						 list({ ctype: type, pageSize: 5, nowPage: 0 })
						// list({pageSize: 5, nowPage: 0, option:$('#selectOption').val(), search: $('#search').val()})
					},
					error: e => {
						alert('AJAX 실패')
					}
				})
		
		})
		
		
		deleteBoard(x)
		
	}
	
	let deleteBoard = (x)=>{
		$('#btn_deleteWrite').click((e)=>{
			e.preventDefault()
			alert('삭제버튼 클릭 seq 값 넘어옴 :' + x.read.seq)
			$.getJSON(_ + '/boards/delete/'+ x.read.seq, d =>{
			alert('getJSON 성공' +d)})
			list({ ctype: type, pageSize: 5, nowPage: 0 })
			//list({pageSize: 5, nowPage: 0, option:$('#selectOption').val(), search: $('#search').val()})
		})
		
	}
	
	let nav_move =()=>{
		
	}

	
	
	

	return { onCreate, write, toggleList }
})();