"use strict";
var s_trading_vue = s_trading_vue || {}
s_trading_vue = {
	trading_mainbody : x=>{
	return `
	<div style="margin-top : 50px">
		<div style="margin : auto ; width: 80% ">
			
			<div style="text-align: center ; float : left ; margin-left : 50px ; width:30%">
				<div style="width : 250px ; height : 40px ; border : 2px solid gray ; border-radius: 50px">
				<input type="text" placeholder="Search.." name="search" style="border-style: none ; width : 80% ; height : 30px ; font-size: 15px ; margin-left : 10px ; margin-top : 2px">
				<a href><i class="fa fa-search" style="float:right ; font-size: 25px ; color : MediumSeaGreen ; margin-right : 15px ; margin-top : 3px"></i></a>
				</div>
			</div>
			<div style="float: right">
				<button id="s_btn_maesu" class="s_button" style="margin-top:9px ; width : 100px ; height : 30px">매&nbsp;&nbsp;수</button>
				<button id="s_btn_maedo" class="s_button" style="margin-top:9px ;margin-left: 20px ; width : 100px ; height : 30px ">매&nbsp;&nbsp;도</button>
				<button id="s_btn_jungjung" class="s_button" style="margin-top:9px ;margin-left: 20px ; width : 100px ; height : 30px ">정&nbsp;&nbsp;정</button>
				<button id="s_btn_chuiso" class="s_button" style="margin-top:9px ;margin-left: 20px ; width : 100px ; height : 30px ">취&nbsp;&nbsp;소</button>
			</div>
			
			<div style="margin-top : 20px ; float:left ; width : 100% ; height : 6px ; background-color : gray"></div>
			
			<div style="float:left ; width : 100% ; height : 700px ; background-color : #F5F5F5">
				<div style="margin-top:10px ; margin-left : 8px ; float:left ; width : 65% ; height : 680px ; background-color : white">
					<div style="margin : auto ; width : 100% ; height : 50% ">
						<div style="margin-top : 7px ; margin-left : 10px ; float: left ; font-size : 15px ; font-weight : bolder ; color : gray">
							<i class="fa fa-bars" style="font-size: 17px ; color : gray"></i>&nbsp;&nbsp;보유종목
						</div>
						<div style="float: left ; width : 100% ; font-size:small; overflow-y: hidden; height:300px">
						  	<table class="table table-hover" id="sTradeHaveStock">
								<thead>
									<tr>
										<th style="position: sticky ; top : 0 ; background-color : white">종목명</th>
										<th style="position: sticky ; top : 0 ; background-color : white">종목코드</th>
										<th style="position: sticky ; top : 0 ; background-color : white">보유수량</th>
										<th style="position: sticky ; top : 0 ; background-color : white">매입단가</th>
										<th style="position: sticky ; top : 0 ; background-color : white">현재가격</th>
										<th style="position: sticky ; top : 0 ; background-color : white">평가금액</th>
										<th style="position: sticky ; top : 0 ; background-color : white">매매금액</th>
										<th style="position: sticky ; top : 0 ; background-color : white">평가손익</th>
										<th style="position: sticky ; top : 0 ; background-color : white">손익율(%)</th>
									</tr>
								</thead>
								<tbody>
									
								</tbody>
							</table>
						</div>
					</div>
					<div style="margin : auto ; width : 100% ; height : 50% ">
					
						<div class="s_dropdown" style="margin-top : 7px ; margin-left : 10px ; font-weight : bolder ; color : gray">
							<button class="s_dropbtn">
								<i class="fa fa-bars" style="font-size: 17px ; color : gray"></i>&nbsp;&nbsp;관심종목&nbsp;&nbsp;
								<i class="fa fa-caret-down" style="font-size: 17px ; color : gray"></i>
							</button>
							<div class="s_dropdown-content">
								<a href="#">관심종목 1</a>
							    <a href="#">관심종목 2</a>
							    <a href="#">관심종목 3</a>
							</div>
						</div>
							
						<div style="float: right ; margin-right: 20px ; margin-top: 10px">
							<i class="fa fa-plus-square" style="font-size: 20px ; color : blue"></i><span style="font-size:13px ; font-weight: bold">&nbsp;&nbsp;종목추가&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
							<i class="fa fa-minus-square" style="font-size: 20px ; color : red"></i><span style="font-size:13px ; font-weight: bold">&nbsp;&nbsp;종목삭제&nbsp;&nbsp;</span>
						</div>
							
						
						<div style="float: left ; width : 100% ; font-size:small; overflow-y: hidden; height:300px">
						  	<table class="table table-hover" id="sTradeHaveStock">
								<thead>
									<tr>
										<th style="position: sticky ; top : 0 ; background-color : white">종목명</th>
										<th style="position: sticky ; top : 0 ; background-color : white">종목코드</th>
										<th style="position: sticky ; top : 0 ; background-color : white">현재가격</th>
										<th style="position: sticky ; top : 0 ; background-color : white">거래량</th>
										<th style="position: sticky ; top : 0 ; background-color : white">등락금액</th>
										<th style="position: sticky ; top : 0 ; background-color : white">등락율</th>
										<th style="position: sticky ; top : 0 ; background-color : white">최고가격</th>
										<th style="position: sticky ; top : 0 ; background-color : white">최저가격</th>
										<th style="position: sticky ; top : 0 ; background-color : white">전일종가</th>
									</tr>
								</thead>
								<tbody>
									
								</tbody>
							</table>
						</div>
					</div>
				</div>
				
				<div id="s_trading_detailchang" style="margin-top:10px ; margin-left : 8px ; float:left ; width : 33% ; height : 680px ; background-color : white">
					
					<div style="width: 100% ; height: 80px ; background-color : white">
						<div style="float: left ; width:70% ; margin-left : 20px ; margin-top: 20px ; font-size: 30px ; font-weight : bolder ; color : DodgerBlue">삼성생명</div>
						<div style="float: right ; width: 20%; margin-top: 40px ; font-size: 15px ; font-weight : bolder ; color : gray">021545</div>
					</div>
					
					<div style="width:100% ; height : 2px ; background-color : gray"></div>
					
					<div class="ss_tableContent1" >시중가격</div>
					<div class="ss_tableContent2" >100,000원</div>
					<div class="ss_tableContent1" >등략율</div>
					<div class="ss_tableContent2" >-4.5%</div>
					
					<div class="ss_tableContent1" >최고가격</div>
					<div class="ss_tableContent2" >110,200</div>
					<div class="ss_tableContent1" >등략율</div>
					<div class="ss_tableContent2" >3.3%</div>
					
					<div class="ss_tableContent1" >최고가격</div>
					<div class="ss_tableContent2" >110,200</div>
					<div class="ss_tableContent1" >등략율</div>
					<div class="ss_tableContent2" >3.3%</div>
					
					<div class="ss_tableContent1" >최고가격</div>
					<div class="ss_tableContent2" >110,200</div>
					<div class="ss_tableContent1" >등략율</div>
					<div class="ss_tableContent2" >3.3%</div>
					
					<div class="ss_tableContent1" >최고가격</div>
					<div class="ss_tableContent2" >110,200</div>
					<div class="ss_tableContent1" >등략율</div>
					<div class="ss_tableContent2" >3.3%</div>
					
					<div class="ss_tableContent1" >최고가격</div>
					<div class="ss_tableContent2" >110,200</div>
					<div class="ss_tableContent1" >등략율</div>
					<div class="ss_tableContent2" >3.3%</div>
					
					<div class="ss_tableContent1" >최고가격</div>
					<div class="ss_tableContent2" >110,200</div>
					<div class="ss_tableContent1" >등략율</div>
					<div class="ss_tableContent2" >3.3%</div>
					
					<div class="ss_tableContent1" >최고가격</div>
					<div class="ss_tableContent2" >110,200</div>
					<div class="ss_tableContent1" >등략율</div>
					<div class="ss_tableContent2" >3.3%</div>
					
					<div class="ss_tableContent1" >최고가격</div>
					<div class="ss_tableContent2" >110,200</div>
					<div class="ss_tableContent1" >등략율</div>
					<div class="ss_tableContent2" >3.3%</div>
					
					<div class="ss_tableContent1" >최고가격</div>
					<div class="ss_tableContent2" >110,200</div>
					<div class="ss_tableContent1" >등략율</div>
					<div class="ss_tableContent2" >3.3%</div>
					
				</div>
				
			</div>
			
		</div>
	</div>
		<div style="margin-top : 30px ; float:left ; width : 100% ; height : 2px ; background-color : gray"></div>
		<div style="margin-top : 10px ; margin-right : 50px ; float:right ; height : 40px ; color : gray">
			<h5>Copyright 2020. © Goodfor - www.Goodfor.com All Rights Reserved</h5>
		</div>
	</div>`
	},
	trading_msChang : x=>{
	return `
		<div style="width : 90% ; margin-top : 7px ; margin-left : 10px ; float: left ; font-size : 15px ; font-weight : bolder ; color : hsl(250, 100%, 25%)">
			<i class="fa fa-bars" style="font-size: 17px ; color : hsl(250, 100%, 25%)"></i>&nbsp;&nbsp;매수화면
		</div>
		<div style="float: left ; width: 100% ; height: 70px ; background-color : white">
			<div style="float: left ; width:70% ; margin-left : 20px ; margin-top: 20px ; font-size: 30px ; font-weight : bolder ; color : DodgerBlue">삼성생명</div>
			<div style="float: right ; width: 20%; margin-top: 40px ; font-size: 15px ; font-weight : bolder ; color : gray">021545</div>
		</div>
		
		<div style="float: left ; width:100% ; height : 2px ; background-color : gray"></div>
		
		<div class="ss_tableContent1" >시중가격</div>
		<div class="ss_tableContent2" >100,000원</div>
		<div class="ss_tableContent1" >등략율</div>
		<div class="ss_tableContent2" >-4.5%</div>
		
		<div class="ss_tableContent1" >등락금액</div>
		<div class="ss_tableContent2" >400</div>
		<div class="ss_tableContent1" >등략율</div>
		<div class="ss_tableContent2" >3.3%</div>
		
		<div class="ss_tableContent1" >거래량</div>
		<div class="ss_tableContent2" >8,110,200</div>
		<div class="ss_tableContent1" >거래금액</div>
		<div class="ss_tableContent2" >503,804백만원</div>
		
		<div style="float: left ; 	width:100% ; height : 2px ; background-color : gray"></div>
		
		<div style="float: left ; text-align: center ; height : 60px ; width:100% ; line-height : 60px ; font-size: 15px">
    		<input type="radio" name="join_invest" value="1" required="required" checked="checked" style="display: inline-block ; vertical-align: middle"> 시장가&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    		<input type="radio" name="join_invest" value="2" required="required" style="display: inline-block ; vertical-align: middle"> 지정가
		</div>
		
		<div style="text-align: center ; width : 300px ; height : 50px ; float : right ; margin-right : 30px ">
				<a href><i class="fa fa-caret-square-o-down" style="float:right ; font-size: 30px ; color : gray ;  margin-top : 13px ; margin-left : 2px"></i></a>
				<a href><i class="fa fa-caret-square-o-up" style="float:right ; font-size: 30px ; color : gray ; margin-top : 13px" ></i></a>
				<input type="text" placeholder="수량" name="search" style="float: right ; border-style: none ; width :70% ; height : 45px ; font-size: 15px ; margin-right : 10px ; margin-top : 2px ; text-align : right ; border-bottom : 2px solid gray">
		</div>
		
		<div style="float: left ; 	width:100% ; height : 40px ; background-color : white"></div>
		
		<div style="text-align: center ; width : 300px ; height : 50px ; float : right ; margin-right : 30px ">
				<a href><i class="fa fa-caret-square-o-down" style="float:right ; font-size: 30px ; color : gray ;  margin-top : 13px ; margin-left : 2px"></i></a>
				<a href><i class="fa fa-caret-square-o-up" style="float:right ; font-size: 30px ; color : gray ; margin-top : 13px" ></i></a>
				<input type="text" placeholder="단가" name="search" style="float: right ; border-style: none ; width :70% ; height : 45px ; font-size: 15px ; margin-right : 10px ; margin-top : 2px ; text-align : right ; border-bottom : 2px solid gray">
		</div>
		
		<div style="float: left ; 	width:100% ; height : 30px ; background-color : white"></div>
		
		<div style="float: left ; 	width:100% ; height : 40px ; background-color : white ; font-size : 15px"><i class="fa fa-check-square-o" style="float: left ; font-size: 20px ; color : gray ; margin-left :10px"></i>&nbsp;&nbsp;매매금액</div>
		
		<div style="float: left ; width: 100% ; height : 60px ;  text-align : right">
			<span style="font-size: 30px ; margin-right : 5px" >3,000,000</span>
			<span style="font-size: 15px ; margin-right : 20px" >원</span>
		</div>
		
		<div style="text-align : center">
			<button id="s_mscf_btn" class="s2_button" style="margin-top:9px ; width : 200px ; height : 40px">매&nbsp;&nbsp;수&nbsp;&nbsp;확&nbsp;&nbsp;인</button>
		</div>
	`	
	},
	trading_mdChang : x=>{
	return `
		<div style="width : 90% ; margin-top : 7px ; margin-left : 10px ; float: left ; font-size : 15px ; font-weight : bolder ; color : hsl(0, 100%, 25%)">
			<i class="fa fa-bars" style="font-size: 17px ; color : hsl(0, 100%, 25%)"></i>&nbsp;&nbsp;매도화면
		</div>
		<div style="float: left ; width: 100% ; height: 70px ; background-color : white">
			<div style="float: left ; width:70% ; margin-left : 20px ; margin-top: 20px ; font-size: 30px ; font-weight : bolder ; color : DodgerBlue">삼성생명</div>
			<div style="float: right ; width: 20%; margin-top: 40px ; font-size: 15px ; font-weight : bolder ; color : gray">021545</div>
		</div>
		
		<div style="float: left ; width:100% ; height : 2px ; background-color : gray"></div>
		
		<div class="ss_tableContent1" >시중가격</div>
		<div class="ss_tableContent2" >100,000원</div>
		<div class="ss_tableContent1" >등략율</div>
		<div class="ss_tableContent2" >-4.5%</div>
		
		<div class="ss_tableContent1" >등락금액</div>
		<div class="ss_tableContent2" >400</div>
		<div class="ss_tableContent1" >등략율</div>
		<div class="ss_tableContent2" >3.3%</div>
		
		<div class="ss_tableContent1" >거래량</div>
		<div class="ss_tableContent2" >8,110,200</div>
		<div class="ss_tableContent1" >거래금액</div>
		<div class="ss_tableContent2" >503,804백만원</div>
		
		<div style="float: left ; 	width:100% ; height : 2px ; background-color : gray"></div>
		
		<div style="float: left ; text-align: center ; height : 60px ; width:100% ; line-height : 60px ; font-size: 15px">
    		<input type="radio" name="join_invest" value="1" required="required" checked="checked" style="display: inline-block ; vertical-align: middle"> 시장가&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    		<input type="radio" name="join_invest" value="2" required="required" style="display: inline-block ; vertical-align: middle"> 지정가
		</div>
		
		<div style="text-align: center ; width : 300px ; height : 50px ; float : right ; margin-right : 30px ">
				<a href><i class="fa fa-caret-square-o-down" style="float:right ; font-size: 30px ; color : gray ;  margin-top : 13px ; margin-left : 2px"></i></a>
				<a href><i class="fa fa-caret-square-o-up" style="float:right ; font-size: 30px ; color : gray ; margin-top : 13px" ></i></a>
				<input type="text" placeholder="수량" name="search" style="float: right ; border-style: none ; width :70% ; height : 45px ; font-size: 15px ; margin-right : 10px ; margin-top : 2px ; text-align : right ; border-bottom : 2px solid gray">
		</div>
		
		<div style="float: left ; 	width:100% ; height : 40px ; background-color : white"></div>
		
		<div style="text-align: center ; width : 300px ; height : 50px ; float : right ; margin-right : 30px ">
				<a href><i class="fa fa-caret-square-o-down" style="float:right ; font-size: 30px ; color : gray ;  margin-top : 13px ; margin-left : 2px"></i></a>
				<a href><i class="fa fa-caret-square-o-up" style="float:right ; font-size: 30px ; color : gray ; margin-top : 13px" ></i></a>
				<input type="text" placeholder="단가" name="search" style="float: right ; border-style: none ; width :70% ; height : 45px ; font-size: 15px ; margin-right : 10px ; margin-top : 2px ; text-align : right ; border-bottom : 2px solid gray">
		</div>
		
		<div style="float: left ; 	width:100% ; height : 30px ; background-color : white"></div>
		
		<div style="float: left ; 	width:100% ; height : 40px ; background-color : white ; font-size : 15px"><i class="fa fa-check-square-o" style="float: left ; font-size: 20px ; color : gray ; margin-left :10px"></i>&nbsp;&nbsp;매매금액</div>
		
		<div style="float: left ; width: 100% ; height : 60px ;  text-align : right">
			<span style="font-size: 30px ; margin-right : 5px" >3,000,000</span>
			<span style="font-size: 15px ; margin-right : 20px" >원</span>
		</div>
		
		<div style="text-align : center">
			<button id="s_mdcf_btn" class="s2_button" style="margin-top:9px ; width : 200px ; height : 40px">매&nbsp;&nbsp;도&nbsp;&nbsp;확&nbsp;&nbsp;인</button>
		</div>
	`		
	},
	trading_jungjungChang : x=>{
		return `
		<div style="width : 90% ; margin-top : 7px ; margin-left : 10px ; float: left ; font-size : 15px ; font-weight : bolder ; color : hsl(0, 100%, 25%)">
			<i class="fa fa-bars" style="font-size: 17px ; color : hsl(0, 100%, 25%)"></i>&nbsp;&nbsp;정정화면
		</div>
		
		<div style="float: left ; width: 100% ; height : 580px"></div>
		
		<div style="text-align : center">
			<button id="s_mdcf_btn" class="s2_button" style="margin-top:9px ; width : 200px ; height : 40px">정&nbsp;&nbsp;정&nbsp;&nbsp;확&nbsp;&nbsp;인</button>
		</div>
		
		`
	},
	trading_chuisoChang : x=>{
		return `
		<div style="width : 90% ; margin-top : 7px ; margin-left : 10px ; float: left ; font-size : 15px ; font-weight : bolder ; color : hsl(0, 100%, 25%)">
			<i class="fa fa-bars" style="font-size: 17px ; color : hsl(0, 100%, 25%)"></i>&nbsp;&nbsp;취소화면
		</div>
		
		<div style="float: left ; width: 100% ; height : 580px"></div>
		
		<div style="text-align : center">
			<button id="s_mdcf_btn" class="s2_button" style="margin-top:9px ; width : 200px ; height : 40px">취&nbsp;&nbsp;소&nbsp;&nbsp;확&nbsp;&nbsp;인</button>
		</div>
		
		`
	}
}