package com.goodfor.web.bonghyeon;
import java.util.ArrayList;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.goodfor.web.pxy.Box;
import com.goodfor.web.pxy.CrawlingProxy;
import com.goodfor.web.pxy.PageProxy;
import sun.print.resources.serviceui;

@RestController
@RequestMapping("/infos")
public class InfoCtrl{
	@Autowired
	PageProxy pager;
	@Autowired
	CrawlingProxy crawler;
	@Autowired
	Map<String, Object> map;
	@Autowired Box<Object> box;
	@Autowired InfoServiceImpl service;

	@GetMapping("/crawl1/page/{pageSize}/{nowPage}")
	public Map<?,?> list1(@PathVariable("pageSize") String pageSize, @PathVariable("nowPage") String nowPage){
		pager.setNowPage(Integer.parseInt(nowPage));
		pager.setBlockSize(5);
		pager.setPageSize(5);
		pager.paging();	
		List<Info> list = service.changePageSize(pager);
		/*
		 * System.out.println("pager"+list); System.out.println("pager"+list.size());
		 */
		pager.setRowCount(service.crawl1AllCount());
		/*
		 * System.out.println("뭘까요?:"+service.crawl1AllCount());
		 * System.out.println("페이지"+pager);
		 */
		map.clear();
		map.put("list", list);
		map.put("pxy", pager);
		
		return map;
	}
	@GetMapping("/crawl2/page/{pageSize}/{nowPage}")
	public Map<?,?> list2(@PathVariable("pageSize") String pageSize, @PathVariable("nowPage") String nowPage){
		ArrayList<HashMap<String, String>> list =  crawler.crawling2();
		pager.setNowPage(Integer.parseInt(nowPage));
		pager.setBlockSize(5);
		pager.setPageSize(Integer.parseInt(pageSize));
		pager.setPageSize(5);
		pager.paging();
		ArrayList<HashMap<String, String>> temp = new ArrayList<>();
		for(int i=0;i< list.size(); i++) {
			if(i >= pager.getStartRow() && i <= pager.getEndRow() ) {
				temp.add(list.get(i));
			}
			if(i > pager.getEndRow()) {break;}
		}
		map.clear();
		map.put("list", temp);
		map.put("pxy", pager);
		return map;
	}
	@GetMapping("/crawl3/page/")
	public ArrayList<HashMap<String, String>> crawl3(){
		return crawler.crawling3();
	}
	@GetMapping("/crawl4/page/{pageSize}/{nowPage}")
	public Map<?,?> list4(@PathVariable("pageSize") String pageSize, @PathVariable("nowPage") String nowPage){
		ArrayList<HashMap<String, String>> list = crawler.crawling4();
		pager.setNowPage(Integer.parseInt(nowPage));
		pager.setBlockSize(5);
		pager.setPageSize(Integer.parseInt(pageSize));
		pager.setPageSize(5);
		pager.paging();
		ArrayList<HashMap<String, String>> temp = new ArrayList<>();
		for(int i=0;i< list.size(); i++) {
			if(i >= pager.getStartRow() && i <= pager.getEndRow() ) {
				temp.add(list.get(i));
			}
			if(i > pager.getEndRow()) {break;}
		}
		map.clear();
		map.put("list", temp);
		map.put("pxy", pager);
		return map;
	}
	
}
