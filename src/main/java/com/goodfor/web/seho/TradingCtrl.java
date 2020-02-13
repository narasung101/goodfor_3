package com.goodfor.web.seho;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.goodfor.web.pxy.Box;
import com.goodfor.web.pxy.CrawlingProxy;

@RestController
@RequestMapping("/tradings")
public class TradingCtrl {
	@Autowired CrawlingProxy crawler;
	@Autowired Map<String, Object> map;
	@Autowired Box<Object> box;
	
	@GetMapping("/navercrawl")
	public ArrayList<HashMap<String, String>> navercrawl(){
		return crawler.naverCrawling();
	}

}
