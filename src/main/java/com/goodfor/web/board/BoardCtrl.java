package com.goodfor.web.board;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.goodfor.web.pxy.Inventory;
import com.goodfor.web.pxy.PageProxy;
import com.goodfor.web.pxy.Proxy;
import com.goodfor.web.pxy.Trunk;
import com.sun.org.apache.xpath.internal.functions.FuncId;
import com.goodfor.web.pxy.CrawlingProxy;
import com.goodfor.web.pxy.FileProxy;

@RestController
@RequestMapping("/boards")
public class BoardCtrl extends Proxy {
	@Autowired BoardMapper boardMapper;
	@Autowired
	Map<String, Object> map;
	@Autowired
	CrawlingProxy crawler;
	@Autowired
	PageProxy pager;
	@Autowired FileProxy filemgr;
	@Autowired Board board;
	@Autowired Trunk<Object> trunk;

	@PostMapping("/")
	public Map<?, ?> write(@RequestBody Board param) {
		System.out.println("글쓰기 param값 넘어옴 :" + param);

		Consumer<Board> consumer = t -> boardMapper.insertBoardWrite(t);
		consumer.accept(param);
		trunk.clear();
		trunk.put("msg", "WHITE SUCCESS");
//		service.insertBoardWrite(param);
//		map.clear();
//		map.put("msg", "WHITE SUCCESS");
		
		return trunk.get();
	}
	
	@GetMapping("/list/{ctype}/{pageSize}/{nowPage}/{option}/{search}")
	public Map<?, ?> listPage(@PathVariable("pageSize") String pageSize, @PathVariable("nowPage") String nowPage,
			 @PathVariable("option") String option, @PathVariable("search") String search, @PathVariable("ctype") String ctype) {
		
		System.out.println("페이지 사이즈 넘어옴" + pageSize);
		System.out.println("나우 페이지 넘어옴" + nowPage);
		System.out.println("옵션 넘어옴" + option);
		System.out.println("서치 넘어옴" + search);
		System.out.println("타입 넘어옴" + ctype);
		board.setCtype(ctype);
		pager.setCtype(ctype);
		
		Function<String, Integer> function = t -> boardMapper.selectBoardAllCount(t);
		System.out.println("Board 총 카운트는? :" + function.apply(ctype));		
		pager.setRowCount(function.apply(ctype));
		pager.setPageSize(Integer.parseInt(pageSize));
		pager.setBlockSize(5);
		pager.setNowPage(integer(nowPage));
		pager.setOption(option);
		pager.setSearch(search);
		pager.paging();
		System.out.println("pager값들 : " + pager.toString());
		

//		List<Board> list = service.selectAllBoardCustomer(pager);		
//		if(ctype ==1) {
//			List<Board> list = service.selectAllBoardCustomer(pager);
//		} else if(ctype==2) {
//			List<Board> list = service.selectAllBoardNotice(pager);
//		} else {
//			List<Board> list = service.selectAllBoardFAQ(pager);
//		}		
		
		List<Board> list = null;

		switch(pager.getCtype()) {
		case "1" : 
			Function<PageProxy, List<Board>> function1 = t -> boardMapper.selectAllBoardFAQ(t);
			list = function1.apply(pager);
//			list = service.selectAllBoardFAQ(pager);
			System.out.println("case1 list 값" + list);
			break;
			
		case "3" : 
			Function<PageProxy, List<Board>> function2 = t -> boardMapper.selectAllBoardCustomer(t);
			list = function2.apply(pager);
//			list = service.selectAllBoardCustomer(pager);
			
			break;
			
		case "4" : 
			Function<PageProxy, List<Board>> function3 = t -> boardMapper.selectAllBoardNotice(t);
			list = function3.apply(pager);
//			list = service.selectAllBoardNotice(pager);
			break;			
		}		
//		List<Board> list = null;
//		Function<PageProxy, List<Board>> f = null;
//		switch(pager.getCtype()) {
//		case "1" : 
//			f = t -> boardMapper.selectAllBoardFAQ(t);
//			list = f.apply(pager);
//
//			System.out.println("case1 list 값" + list);
//			break;
//			
//		case "3" : 
//		   f = t -> boardMapper.selectAllBoardCustomer(t);
//		  
//			list = f.apply(pager);
//			 System.out.println("credate 확인 :" + list);
//			
//			break;
//			
//		case "4" : 
//			f = t -> boardMapper.selectAllBoardNotice(t);
//			list = f.apply(pager);
//			 System.out.println("credate 확인 :" + list);
//
//			break;			
//		}		
					
		System.out.println("최종적으로 list 담긴값" + list);
		trunk.clear();
		trunk.put("list", list);
		trunk.put("listSize", list.size());
		trunk.put("pager", pager);

		return trunk.get();
	}

	@GetMapping("/content/{seq}")
	public Map<?, ?> contentView(@PathVariable String seq) {
		System.out.println("contentView seq값 넘어옴 :" + seq);
		
		Consumer<String> consumer = t -> boardMapper.viewCntIncrease(Integer.parseInt(t));
		consumer.accept(seq);
		System.out.println("consumer.accept viewcnt 1증가에 담긴 값" + consumer );
		
		Function<String, Board> function = t -> boardMapper.selectBoardRead(Integer.parseInt(t));
		trunk.clear();
		trunk.put("read", function.apply(seq));
		
				
		return trunk.get();
	}

	@PutMapping("/update")
	public Map<?, ?> update(@RequestBody Board param) {
		System.out.println("update param값 넘어옴 :" + param);
		Consumer<Board> consumer = t -> boardMapper.updateBoard(t);
		consumer.accept(param);
		trunk.clear();
		trunk.put("msg", "UPDATE SUCCESS");

		return trunk.get();
	}

	@GetMapping("/delete/{seq}")
	public Map<?, ?> delete(@PathVariable String seq) {
		System.out.println("DELETE seq값 넘어옴 :" + seq);
		Consumer<String> consumer = t -> boardMapper.deleteBoard(Integer.parseInt(t));
		consumer.accept(seq);
		trunk.clear();
		trunk.put("msg", "DELETE SUCCESS");


		return trunk.get();
	}
		
	@PostMapping("/fileupload")
	public void fileupload(MultipartFile[] uploadFile) {
		System.out.println("uploadFile 넘어옴" + uploadFile);
		filemgr.fileupload(uploadFile);
	}

}
