var stockinfo_vue = stockinfo_vue || {}
stockinfo_vue = {
	stockinfo_body:x=>{
		return ` <!--그리드 틀+헤드제목-->
	<div class = "hwrapper">
		<div class = "hpage1">
			<div id="hflag_move">
				<a class="hflag_move1" href="#hwrapper"><img src="${x.img}/태극기.png" ></a>
				<a class="hflag_move2" href="#hwrapper"><img src="https://img.themoin.com/public/img/circle-flag-us.svg"></a>
			    <a class="hflag_move3" href="#hwrapper"><img src="https://img.themoin.com/public/img/circle-flag-jp.svg"></a>
			    <a class="hflag_move4" href="#hwrapper"><img src="https://img.themoin.com/public/img/circle-flag-cn.svg"></a>	
			</div>
		<div><h2 style=" position: relative; left: 40%;">국가별 증시현황</h2></div>	
	</div>
	<!--차트를 보여주는 디브-->
	<div class = "hpage2">
			<div style="width:1000px">
		<canvas id="chart1"></canvas>
			</div>
	</div>
	<div class = "hpage3">
	<div class="container111">
  <div class="row">
    <div class="col-6" style="width: 100%">
      <div style="width: 100%; height: 400px" class="card mt-3 tab-card">
        <div class="card-header tab-card-header">
          <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link" id="one-tab" data-toggle="tab" href="#one" role="tab" aria-controls="One" aria-selected="true">최근검색</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="two-tab" data-toggle="tab" href="#two" role="tab" aria-controls="Two" aria-selected="false">MYSTOCK</a>
            </li>
          </ul>
        </div>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active p-3" id="one" role="tabpanel" aria-labelledby="one-tab"> 
            <a href="#" class="btn btn-primary">최근 검색한 주식</a>              
          </div>
          <div class="tab-pane fade p-3" id="two" role="tabpanel" aria-labelledby="two-tab">
            <a href="#" class="btn btn-primary">내 주식 바로가기</a>              
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
	</div>
		<!--최근검색, 마이스톸-->
		
	<div class = "hpage4">
		<div class="container">
    		<div class="row">
				<div style="width:90%; height: 50%">
					<div class="panel panel-primary" style="width:100%; height: 400px">
						<div class="panel-heading">
							<h3 class="panel-title">상위 거래 목록</h3>
						</div> 
							<div class="panel-body">
								<input type="text" style="width:40vh;height:45px;font-size:20px; border-top-left-radius: 5px;border-top-right-radius: 5px;
								border-bottom-right-radius: 5px;border-bottom-left-radius: 5px" id="dev-table-filter" placeholder="주식 검색"/>
										<button type="button" style="width:60px;height:40px;font-size:20px" class="btn btn-info">검색</button>
							</div>
								<table class="table table-hover" id="dev-table">
									<thead>
										<tr>
											<th>종목</th>
											<th>현재가</th>
											<th>고가</th>
											<th>저가</th>
											<th>변동</th>
											<th>변동%</th>
											<th>거래량</th>
										</tr> 
									</thead>
									<tbody></tbody>
								</table>
					<div>
	                <ul class="pagination" id="page_top">
					    
					 </ul>
              </div>
				</div>
			</div>
			
		</div>
	</div>
	</div>
	
	<!--국내증시-->
	<div class = "hpage5">
		<div class="card border-danger mb-3" style="max-width: 90%; height: 90%; padding-left: 15px">
			<div class="card-header"><h2>국내증시</h2></div>
				<div class="card-body">
				<table class="table table-hover" id="table_nation">
						<thead>
							<tr>
								<th>종목</th>
								<th>현재가</th>
								<th>고가</th>
								<th>저가</th>
								<th>변동</th>
								<th>변동%</th>
								<th>거래량</th>
							</tr>
						</thead>
						<tbody>
							<tr id="hcrawltr_3"></tr>
						</tbody>
						
					</table>	
					<div>
						<ul class="pagination" id="page_nation">
							</ul>
							</div>
			</div>
		</div>
	</div>
		<!--이런식으로 많이 클릭한 것이나 
		많이 구매 한것 랭킹 구현-->
	<div class = "hpage6">
				<div style="width:90%; height: 90%">
					<div class="form-group form-inline">
					</div>
						<table class="table table-striped" id="crawl_news">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col" sbsortable="name">
									<span>증권뉴스</span>
							</thead>
								<tbody>
								</tbody>
						</table>
							  <ul class="pagination" id="page_news">
						    
						  </ul>
				</div>
	</div>
	<!--해외증시-->
	<div class = "hpage7">
		<div class="card border-primary mb-3" style="max-width: 90%; height: 90%; padding-left: 15px">
			<div class="card-header">
				<h2>해외증시</h2>
			</div>
			<div class="card-body" >
				<table class="table table-hover" id="table_internation">
					<colgroup>
						<col width = "16%"/>	
						<col width = "14%"/>	
						<col width = "14%"/>	
						<col width = "14%"/>	
						<col width = "14%"/>	
						<col width = "14%"/>	
						<col width = "14%"/>	
					</colgroup>
					<thead>
						<tr>
							<th>종목</th>
							<th>현재가</th>
							<th>고가</th>
							<th>저가</th>
							<th>변동</th>
							<th>변동%</th>
							<th>거래량</th>
						</tr>
					</thead>
					<tbody>
						<tr id="hcrawltr_2">
						</tr>
					</tbody>
				</table>	
					<div>
						<ul class="pagination" id="page_internation"></ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<style type="text/css">
.hwrapper {
    display: grid;
    height : 100vh;
    width: 100% auto;
    grid-template-columns: 50% 50%;
    grid-template-rows: 10% 50% 50% 50%;
}
.hpage1{
	grid-column: 1/3;
	float : right;
}
.hflag_move1{
 position: relative;
  left: 30%;
  top : 20%;
}
.hflag_move2{
 position: relative;
  left: 40%;
}
.hflag_move3{
 position: relative;
  left: 50%;
}
.hflag_move4{
 position: relative;
  left: 60%;
}
.pagination{
		justify-content: center;
}
</style>`
	}
}