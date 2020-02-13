var stockinfo = stockinfo || {}
stockinfo=(()=>{
	const WHEN_ERR = '호출하는 stockinfoJS파일을 찾지 못했습니다.'
	let _, js, css, img, stockinfo_vue_js			
	let init=()=>{
		_=$.ctx()
		js=$.js()
		css=$.css()
		img=$.img()
		stockinfo_vue_js =js+'/vue/stockinfo_vue.js'
	}
	let onCreate=()=>{
		init()
		$.when(
			$.getScript(stockinfo_vue_js)
		)
		.done(()=>{
			setContentView()
		})
		.fail(()=>{
			alert(WHEN_ERR)
		})
	}
	let setContentView=()=>{
		crawling1({pageSize:5, nowPage:0})
		crawling2({pageSize:5, nowPage:0})
		crawling3()
		crawling4({pageSize:5, nowPage:0})
	}
	let crawling1 =x=>{
		$.getJSON(_+'/infos/crawl1/page/'+x.pageSize+'/'+x.nowPage, d=>{
			let list = d.list;
			$('#dev-table tbody').empty()
			$.each(list,(i,j)=>{
					  let tr = $("<tr></tr>").appendTo("#dev-table tbody");
				            $("<td></td>").text(j.company).appendTo(tr);
				            $("<td></td>").text(j.nowPrice).appendTo(tr);
				            $("<td></td>").text(j.highPrice).appendTo(tr);
				            $("<td></td>").text(j.lowPrice).appendTo(tr);
				            $("<td></td>").text(j.numChange).appendTo(tr);
				            $("<td></td>").text(j.perChange).appendTo(tr);
				            $("<td></td>").text(j.trade).appendTo(tr);
				})
		let arr = []
	    	for(let i=d.pxy.startPage+1; i<d.pxy.endPage+2;i++){
	    		arr.push(i)
	    	}
			  if(d.pxy.existPrev){
				  $(`<li class="page-item disabled">
						      <a class="page-link" href="#">&laquo;</a>
				  	</li>`).appendTo('#page_top')
				    .click(e=>{
				    	e.preventDefault()
				    		    		$('#page_top').empty()

				    	alert('이전'+d.pxy.prevBlock)
				    	crawling1({pageSize:d.pxy.pageSize, nowPage:d.pxy.prevBlock})
				    	})
				    }
	    $.each(arr, (i,j)=>{
	    	$(`<li class="page-item active">
					      <a class="page-link" href="#">${j}</a>
				</li>`)
	    	.appendTo('#page_top').click(function(e){
	    		e.preventDefault()
	    		$('#page_top').empty()
	    		alert('넘버'+Number($(this).text()))
				crawling1({pageSize: 5, nowPage:Number(($(this).text())-1)})	
	    	})
	    })
	    if(d.pxy.existNext){
	    	$(`<li class="page-item">
						      <a class="page-link" href="#">&raquo;</a>
						    </li>`).appendTo('#page_top')
		    .click(e=>{
		    	e.preventDefault()
		    		    		$('#page_top').empty()

		    	alert('다음'+d.pxy.nextBlock+d.pxy.pageSize)
		    	crawling1({pageSize:5, nowPage: d.pxy.nextBlock})
		    	})
		    }
		})	
	}
	let crawling2=x=>{
		$('tbody').empty()
		//여기서 연동되는데 뭔지 모르겠지만 이쪽이 문제겠지;
		$.getJSON(_+'/infos/crawl2/page/'+x.pageSize+'/'+x.nowPage, d=>{	
			$('#table_nation tbody').empty()
			$.each(d.list,(i,j)=>{
					  let tr = $("<tr></tr>").appendTo("#table_nation tbody");
				            $("<td></td>").text(j.first2).appendTo(tr);
				            $("<td></td>").text(j.second2).appendTo(tr);
				            $("<td></td>").text(j.third2).appendTo(tr);
				            $("<td></td>").text(j.fourth2).appendTo(tr);
				            $("<td></td>").text(j.fifth2).appendTo(tr);
				            $("<td></td>").text(j.sixth2).appendTo(tr);
				            $("<td></td>").text(j.seventh2).appendTo(tr);
				})
		let arr = []
	    	for(let i=d.pxy.startPage+1; i<d.pxy.endPage+2;i++){
	    		arr.push(i)
	    	}
			  if(d.pxy.existPrev){
				  $(`<li class="page-item disabled">
					      <a class="page-link" href="#">&laquo;</a>
						  	</li>`).appendTo('#page_nation')
				    .click(e=>{
				    	e.preventDefault()
				    	alert('이전'+d.pxy.prevBlock)
				    		    		$('#page_nation').empty()

				    	crawling2({pageSize:d.pxy.pageSize, nowPage:d.pxy.prevBlock})
				    })}
	    $.each(arr, (i,j)=>{
	    	$(`<li class="page-item active">
					      <a class="page-link" href="#">${j}</a>
					    </li>`)
	    	.appendTo('#page_nation').click(function(e){
	    		e.preventDefault()
	    		$('#page_nation').empty()
	    		alert('넘버'+($(this).text()))
				crawling2({pageSize: 5, nowPage:Number(($(this).text())-1)})	
	    	})
	    })
	    if(d.pxy.existNext){
	    	$(`<li class="page-item">
						      <a class="page-link" href="#">&raquo;</a>
						    </li>`).appendTo('#page_nation')
		    .click(e=>{
		    	e.preventDefault()
		    	$('#page_nation').empty()
		    	alert('다음'+d.pxy.nextBlock)
		    	crawling2({pageSize:d.pxy.pageSize, nowPage:d.pxy.nextBlock})
		    	})
		    }	
		})
	}
	let crawling3=()=>{
		$.getJSON(_+'/infos/crawl3/page/', d=>{
			$('#crawl_news tbody').empty()
			$.each(d, (i, j)=>{
				$('<tr><td></td></td><td>'+j.tempforTitle+'</td></tr>')
				.css({width: '25%',height: '100%',
		              border: '1px solid black'})
				.appendTo('#crawl_news tbody').click(()=>{
					alert("클릭"+i+j)
				})
			})
		})
	}
	let crawling4=x=>{
		$.getJSON(_+'/infos/crawl4/page/'+x.pageSize+'/'+x.nowPage, d=>{
			$('#table_internation tbody').empty()
			$.each(d.list,(i,j)=>{
					  let tr = $("<tr></tr>").appendTo("#table_internation tbody");
				            $("<td></td>").text(j.first4).appendTo(tr);
				            $("<td></td>").text(j.second4).appendTo(tr);
				            $("<td></td>").text(j.third4).appendTo(tr);
				            $("<td></td>").text(j.fourth4).appendTo(tr);
				            $("<td></td>").text(j.fifth4).appendTo(tr);
				            $("<td></td>").text(j.sixth4).appendTo(tr);
				            $("<td></td>").text(j.seventh4).appendTo(tr);
				})
		let arr = []
	    	for(let i=d.pxy.startPage+1; i<d.pxy.endPage+2;i++){
	    		arr.push(i)
	    	}
			  if(d.pxy.existPrev){
				  $(`<li class="page-item disabled">
						      <a class="page-link" href="#">&laquo;</a>
						    </li>`).appendTo('#page_internation')
				    .click(e=>{
				    	e.preventDefault()
				    		    		$('#page_internation').empty()

				    	alert('이전'+d.pxy.prevBlock)
				    	crawling4({pageSize:d.pxy.pageSize, nowPage:d.pxy.prevBlock})
				    })}
	    $.each(arr, (i,j)=>{
	    	$(`<li class="page-item active">
					      <a class="page-link" href="#">${j}</a>
					    </li>`)
	    	.appendTo('#page_internation').click(function(e){
	    		e.preventDefault()
	    		$('#page_internation').empty()
	    		alert('넘버'+($(this).text()))
				crawling4({pageSize: 5, nowPage:Number(($(this).text())-1)})	
	    	})
	    })
	    if(d.pxy.existNext){
	    	$(`<li class="page-item">	
						      <a class="page-link" href="#">&raquo;</a>
						    </li>`).appendTo('#page_internation')
		    .click(e=>{
		    	e.preventDefault()
		    	alert('다음'+d.pxy.nextBlock)
		    		    		$('#page_internation').empty()
		    	crawling4({pageSize:d.pxy.pageSize, nowPage:d.pxy.nextBlock})
		    	})
		    }
		})	
	}

	return {onCreate}
})()